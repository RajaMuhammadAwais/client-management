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
    ? `${String(selectedDob.getDate()).padStart(2, "0")}-${String(selectedDob.getMonth() + 1).padStart(2, "0")}-${selectedDob.getFullYear()}`
    : "";

  const closedDobPlaceholder = formattedDob || "Select date of birth";
  const panelDobPlaceholder = formattedDob || "Specify the date of birth";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(clientName.trim() ? "success" : "error");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-full max-h-[90vh] w-[95vw] max-w-[424px] flex-col overflow-y-auto rounded-lg border border-[#efebe4] p-6 sm:h-[884px] sm:max-h-[96vh]">
        <div className="mb-1 flex shrink-0 items-center justify-between">
          <DialogTitle className={cn("text-[18px] font-semibold text-[#1a1a1a]", typography.title)}>
            Add client
          </DialogTitle>
        </div>
        <DialogDescription className="sr-only">
          Form to add a new client with their details and documents.
        </DialogDescription>

        <form className="mt-4 flex flex-1 flex-col gap-[16px] overflow-visible" onSubmit={handleSubmit}>
          <div>
            <FieldLabel required>Client name</FieldLabel>
            <Input
              value={clientName}
              placeholder="Enter Client name"
              className={cn(
                "h-[36px] rounded-[7px] border-[#efebe4] px-3 text-[13px] placeholder:text-[12px]",
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
                  "flex h-[36px] w-full items-center justify-between rounded-[7px] border border-[#efebe4] bg-white px-3 text-left text-[13px]",
                  formattedDob ? "text-[#1a1a1a]" : "text-[#9c9c9c]",
                  typography.body,
                )}
                onClick={() => {
                  setShowDobCalendar((current) => !current);
                  setDobModeMenuOpen(false);
                }}
              >
                <span className="truncate">{closedDobPlaceholder}</span>
                <CalendarIcon className="h-4 w-4 text-[#8a8a8a] stroke-[1.8]" />
              </button>

              {showDobCalendar ? (
                <div className="absolute left-1/2 top-full z-20 mt-1 w-full max-w-[294px] -translate-x-1/2 rounded-[8px] border border-[#efebe4] bg-white p-2 shadow-panel sm:left-auto sm:right-0 sm:w-auto sm:max-w-none sm:translate-x-0">
                  <div className="mb-2 flex items-center gap-2">
                    <button
                      type="button"
                      className="flex h-[30px] min-w-[104px] items-center gap-1.5 rounded-[6px] border border-[#efebe4] bg-white px-2.5 text-[12px] text-[#1a1a1a]"
                      onClick={() => setDobModeMenuOpen((current) => !current)}
                    >
                      <span className="truncate">{dobMode}</span>
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 text-[#8a8a8a] transition-transform",
                          dobModeMenuOpen ? "rotate-180" : "",
                        )}
                      />
                    </button>
                    <div className="flex h-[30px] min-w-0 flex-1 items-center justify-between rounded-[6px] border border-[#efebe4] px-2.5 text-[12px] text-[#9c9c9c]">
                      <span className="truncate">{panelDobPlaceholder}</span>
                      <CalendarIcon className="h-3.5 w-3.5 text-[#8a8a8a] stroke-[1.8]" />
                    </div>
                  </div>

                  {dobModeMenuOpen ? (
                    <div className="mb-2 rounded-[8px] border border-[#efebe4] bg-white p-1">
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

                  <CalendarContent
                    selectedDate={selectedDob}
                    onSelect={(date) => {
                      setSelectedDob(date);
                      setShowDobCalendar(false);
                      setDobModeMenuOpen(false);
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
              placeholder="Enter ID or residency number"
              className={cn(
                "h-[36px] rounded-[7px] border-[#efebe4] px-3 text-[13px] placeholder:text-[12px]",
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
                "h-[36px] rounded-[7px] border-[#efebe4] px-3 text-[13px] placeholder:text-[12px]",
                typography.body,
              )}
              onChange={(event) => setPhone(sanitizePhoneInput(event.target.value))}
            />
          </div>

          <div>
            <FieldLabel>E-mail</FieldLabel>
            <Input
              value={email}
              placeholder="Enter email address"
              className={cn(
                "h-[36px] rounded-[7px] border-[#efebe4] px-3 text-[13px] placeholder:text-[12px]",
                typography.body,
              )}
              onChange={(event) => setEmail(sanitizeTextInput(event.target.value))}
            />
          </div>

          <div>
            <FieldLabel>Documents</FieldLabel>
            <div className="flex min-h-[170px] flex-col items-center justify-center rounded-[8px] border border-dashed border-[#efebe4] bg-[#fdfcfb] px-4 py-4 text-center">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#efebe4] bg-white">
                <CloudUpload className="h-[18px] w-[18px] text-[#4a4a4a] stroke-[1.5]" />
              </div>
              <p className={cn("mb-1 font-semibold text-[#1a1a1a]", typography.body)}>Upload Documents</p>
              <p className="mb-4 max-w-[240px] text-[10px] leading-[15px] text-[#838383]">
                The file size must be less than 30 MB, and it can be in PDF, Word, Excel, or image format
              </p>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "h-[26px] rounded-[6px] border-[#efebe4] px-4 text-[11px] font-medium text-[#1a1a1a]",
                  typography.body,
                )}
              >
                Upload Documents
              </Button>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button
              type="button"
              className={cn(
                "h-[34px] w-full min-w-[70px] rounded-[6px] bg-[#f2f2f2] px-4 font-medium text-[#1a1a1a] hover:bg-[#e5e5e5] sm:w-auto",
                typography.body,
              )}
              onClick={() => onOpenChange(false)}
            >
              Back
            </Button>
            <Button
              type="submit"
              className={cn(
                "h-[34px] w-full min-w-[110px] rounded-[6px] bg-black px-4 font-medium text-white hover:bg-black/90 sm:w-auto",
                typography.body,
              )}
            >
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
