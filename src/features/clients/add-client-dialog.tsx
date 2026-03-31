import { useEffect, useState, type FormEvent } from "react";
import { Calendar as CalendarIcon, ChevronDown, CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { typography } from "@/lib/typography";
import { cn, sanitizePhoneInput, sanitizeTextInput } from "@/lib/utils";
import { CalendarContent } from "./calendar-content";
import { NationalitySelect } from "./nationality-select";

interface AddClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (status: "success" | "error") => void;
}

function FieldLabel({ children, required }: { children: string; required?: boolean }) {
  return (
    <label className={cn("mb-1 block text-[12px] font-medium text-[#1a1a1a]", typography.body)}>
      {children}
      {required ? "*" : null}
    </label>
  );
}

export function AddClientDialog({ open, onOpenChange, onSubmit }: AddClientDialogProps) {
  const [clientName, setClientName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showDobCalendar, setShowDobCalendar] = useState(false);
  const [selectedDob, setSelectedDob] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (!open) {
      setClientName("");
      setIdNumber("");
      setNationality("");
      setPhone("");
      setEmail("");
      setShowDobCalendar(false);
      setSelectedDob(undefined);
    }
  }, [open]);

  const formattedDob = selectedDob
    ? `${String(selectedDob.getDate()).padStart(2, "0")}/${String(selectedDob.getMonth() + 1).padStart(2, "0")}/${selectedDob.getFullYear()}`
    : "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(clientName.trim() ? "success" : "error");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(92vh,760px)] w-[min(414px,calc(100vw-32px))] overflow-y-auto rounded-[10px] border-[#efebe4] p-4 md:p-5">
        <div className="mb-1 flex items-center justify-between">
          <DialogTitle className={cn("text-[18px] font-semibold text-[#1a1a1a]", typography.title)}>
            Add client
          </DialogTitle>
        </div>
        <DialogDescription className="sr-only">
          Form to add a new client with their details and documents.
        </DialogDescription>

        <form className="mt-2 flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <FieldLabel required>Client name</FieldLabel>
            <Input
              value={clientName}
              placeholder="Enter Client name"
              className={cn(
                "h-[32px] rounded-[7px] border-[#efebe4] px-3 text-[13px] placeholder:text-[12px]",
                typography.body,
              )}
              onChange={(event) => setClientName(sanitizeTextInput(event.target.value))}
            />
          </div>

          <div>
            <FieldLabel>Date of birth</FieldLabel>
            <div className="relative">
              <button
                type="button"
                className={cn(
                  "flex h-[32px] w-full items-center justify-between rounded-[7px] border border-[#efebe4] bg-white px-3 text-[13px]",
                  formattedDob ? "text-[#1a1a1a]" : "text-[#9c9c9c]",
                  typography.body,
                )}
                onClick={() => {
                  setShowDobCalendar((current) => !current);
                }}
              >
                <span className="truncate">{formattedDob || "Select date of birth"}</span>
                <CalendarIcon className="h-4 w-4 text-[#8a8a8a] stroke-[1.8]" />
              </button>

              {showDobCalendar ? (
                <div className="absolute right-0 top-full z-20 mt-1">
                  <CalendarContent
                    selectedDate={selectedDob}
                    onSelect={(date) => {
                      setSelectedDob(date);
                      setShowDobCalendar(false);
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <FieldLabel>Identity or Residence</FieldLabel>
            <Input
              value={idNumber}
              placeholder="Enter ID or residence number"
              className={cn(
                "h-[32px] rounded-[7px] border-[#efebe4] px-3 text-[13px] placeholder:text-[12px]",
                typography.body,
              )}
              onChange={(event) => setIdNumber(sanitizeTextInput(event.target.value))}
            />
          </div>

          <div>
            <FieldLabel>Nationality</FieldLabel>
            <NationalitySelect
              value={nationality}
              onValueChange={setNationality}
              placeholder="Select nationality"
            />
          </div>

          <div>
            <FieldLabel>Mobile number</FieldLabel>
            <Input
              value={phone}
              placeholder="Enter mobile number"
              className={cn(
                "h-[32px] rounded-[7px] border-[#efebe4] px-3 text-[13px] placeholder:text-[12px]",
                typography.body,
              )}
              onChange={(event) => setPhone(sanitizePhoneInput(event.target.value))}
            />
          </div>

          <div>
            <FieldLabel>E-mail</FieldLabel>
            <Input
              value={email}
              placeholder="Enter e-mail address"
              className={cn(
                "h-[32px] rounded-[7px] border-[#efebe4] px-3 text-[13px] placeholder:text-[12px]",
                typography.body,
              )}
              onChange={(event) => setEmail(sanitizeTextInput(event.target.value))}
            />
          </div>

          <div>
            <FieldLabel>Documents</FieldLabel>
            <div className="flex flex-col items-center justify-center rounded-[8px] border border-dashed border-[#efebe4] bg-[#fdfcfb] px-4 py-3 text-center">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100">
                <CloudUpload className="h-4 w-4 text-[#8a8a8a]" />
              </div>
              <p className={cn("mb-1 font-medium text-[#1a1a1a]", typography.body)}>Upload Documents</p>
              <p className="mb-3 max-w-[220px] text-[11px] leading-[15px] text-[#6f6f6f]">
                The files should be JPG, JPEG, PNG, or PDF. Maximum file size is 5 MB.
              </p>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "h-[28px] rounded-[6px] border-[#efebe4] px-3 text-[11px] font-medium",
                  typography.body,
                )}
              >
                Upload Documents
              </Button>
            </div>
          </div>

          <div className="mt-1 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              className={cn("h-[30px] min-w-[66px] rounded-[6px] border-[#efebe4] px-3 font-medium", typography.body)}
              onClick={() => onOpenChange(false)}
            >
              Back
            </Button>
            <Button
              type="submit"
              className={cn("h-[30px] min-w-[96px] rounded-[6px] bg-black px-3 font-medium text-white hover:bg-black/90", typography.body)}
            >
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
