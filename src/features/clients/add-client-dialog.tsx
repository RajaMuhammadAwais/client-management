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
  const [dobModeMenuOpen, setDobModeMenuOpen] = useState(false);
  const [dobMode, setDobMode] = useState<"Gregorian" | "Hijri">("Gregorian");

  useEffect(() => {
    if (!open) {
      setClientName("");
      setIdNumber("");
      setNationality("");
      setPhone("");
      setEmail("");
      setShowDobCalendar(false);
      setSelectedDob(undefined);
      setDobModeMenuOpen(false);
      setDobMode("Gregorian");
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
              <div className="flex h-[32px] w-full items-center rounded-[7px] border border-[#efebe4] bg-white text-[13px]">
                <button
                  type="button"
                  className="flex h-full min-w-[100px] items-center gap-1.5 border-r border-[#efebe4] bg-[#fdfcfb] px-3"
                  onClick={() => {
                    setDobModeMenuOpen((current) => !current);
                    setShowDobCalendar(false);
                  }}
                >
                  <span className={cn("font-medium text-[#1a1a1a]", typography.body)}>{dobMode}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-[#8a8a8a] transition-transform",
                      dobModeMenuOpen ? "rotate-180" : "",
                    )}
                  />
                </button>

                <button
                  type="button"
                  className={cn(
                    "flex flex-1 items-center justify-between px-3 text-left",
                    formattedDob ? "text-[#1a1a1a]" : "text-[#9c9c9c]",
                    typography.body,
                  )}
                  onClick={() => {
                    setShowDobCalendar((current) => !current);
                    setDobModeMenuOpen(false);
                  }}
                >
                  <span className="truncate">{formattedDob || "Select date of birth"}</span>
                  <CalendarIcon className="h-4 w-4 text-[#8a8a8a] stroke-[1.8]" />
                </button>
              </div>

              {dobModeMenuOpen ? (
                <div className="absolute left-0 top-full z-30 mt-1 w-[132px] rounded-[8px] border border-[#efebe4] bg-white p-1 shadow-lg">
                  {(["Gregorian", "Hijri"] as const).map((mode) => {
                    const isSelected = dobMode === mode;

                    return (
                      <button
                        key={mode}
                        type="button"
                        className="flex w-full items-center gap-2 rounded-[6px] px-2.5 py-2 text-left text-[13px] hover:bg-neutral-50"
                        onClick={() => {
                          setDobMode(mode);
                          setDobModeMenuOpen(false);
                        }}
                      >
                        <span
                          className={cn(
                            "flex h-4 w-4 items-center justify-center rounded-full border border-[#efebe4]",
                            isSelected ? "border-black" : "",
                          )}
                        >
                          {isSelected ? <span className="h-2 w-2 rounded-full bg-black" /> : null}
                        </span>
                        <span>{mode}</span>
                      </button>
                    );
                  })}
                </div>
              ) : null}

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
