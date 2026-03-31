import { useEffect, useRef, useState, type FormEvent } from "react";
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
  const formRef = useRef<HTMLFormElement>(null);
  const clientNameRef = useRef<HTMLInputElement>(null);
  const idNumberRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const dobButtonRef = useRef<HTMLButtonElement>(null);
  const dobModeMenuRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const nationalityButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showDobCalendar &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        dobButtonRef.current &&
        !dobButtonRef.current.contains(event.target as Node)
      ) {
        setShowDobCalendar(false);
        setDobModeMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDobCalendar]);

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

  function validateClientName(value: string) {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return "Client name is required.";
    }

    if (trimmedValue.length < 2) {
      return "Client name must be at least 2 characters.";
    }

    if (!/[A-Za-z]/.test(trimmedValue)) {
      return "Client name must include letters.";
    }

    return "";
  }

  function validateIdNumber(value: string) {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return "";
    }

    if (!/^[A-Za-z0-9 -]+$/.test(trimmedValue)) {
      return "Identity or residence must contain only letters, numbers, spaces, or hyphens.";
    }

    if (trimmedValue.length < 6 || trimmedValue.length > 20) {
      return "Identity or residence must be between 6 and 20 characters.";
    }

    return "";
  }

  function validatePhone(value: string) {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return "";
    }

    const digitsOnly = trimmedValue.replace(/\D/g, "");

    if (digitsOnly.length < 8 || digitsOnly.length > 15) {
      return "Mobile number must contain between 8 and 15 digits.";
    }

    return "";
  }

  function validateDob(value?: Date) {
    if (!value) {
      return "";
    }

    if (value > new Date()) {
      return "Date of birth cannot be in the future.";
    }

    return "";
  }

  function clearCustomValidity(element: HTMLInputElement | HTMLButtonElement | null) {
    element?.setCustomValidity("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const clientNameMessage = validateClientName(clientName);
    const idNumberMessage = validateIdNumber(idNumber);
    const phoneMessage = validatePhone(phone);
    const dobMessage = validateDob(selectedDob);

    clientNameRef.current?.setCustomValidity(clientNameMessage);
    idNumberRef.current?.setCustomValidity(idNumberMessage);
    phoneRef.current?.setCustomValidity(phoneMessage);
    dobButtonRef.current?.setCustomValidity(dobMessage);
    nationalityButtonRef.current?.setCustomValidity("");
    emailRef.current?.setCustomValidity("");

    const firstInvalidControl =
      (clientNameMessage && clientNameRef.current) ||
      (dobMessage && dobButtonRef.current) ||
      (idNumberMessage && idNumberRef.current) ||
      (phoneMessage && phoneRef.current) ||
      null;

    if (firstInvalidControl) {
      onSubmit("error");
      firstInvalidControl.reportValidity();
      return;
    }

    if (!formRef.current?.reportValidity()) {
      onSubmit("error");
      return;
    }

    onSubmit("success");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-full max-h-[90vh] w-[95vw] max-w-[424px] flex-col overflow-y-auto scrollbar-hide rounded-lg border border-[#efebe4] p-6 sm:h-[884px] sm:max-h-[96vh]">
        <div className="mb-1 flex shrink-0 items-center justify-between">
          <DialogTitle className={cn("text-[18px] font-semibold text-[#1a1a1a]", typography.title)}>
            Add client
          </DialogTitle>
        </div>
        <DialogDescription className="sr-only">
          Form to add a new client with their details and documents.
        </DialogDescription>

        <form ref={formRef} className="mt-4 flex flex-1 flex-col gap-[16px] overflow-visible" onSubmit={handleSubmit}>
          <div>
            <FieldLabel required>Client name</FieldLabel>
            <Input
              ref={clientNameRef}
              value={clientName}
              required
              minLength={2}
              maxLength={80}
              autoComplete="name"
              placeholder="Enter Client name"
              className={cn(
                "h-[36px] rounded-[7px] border-[#efebe4] px-3 text-[13px] placeholder:text-[12px] focus-visible:ring-0",
                typography.body,
              )}
              onChange={(event) => {
                clearCustomValidity(clientNameRef.current);
                setClientName(sanitizeTextInput(event.target.value));
              }}
            />
          </div>

          <div>
            <FieldLabel>Date of birth</FieldLabel>
            <div className="relative">
              <button
                type="button"
                ref={dobButtonRef}
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
                <div ref={calendarRef} className="absolute left-1/2 top-full z-20 mt-1 w-full max-w-[294px] -translate-x-1/2 rounded-[8px] border border-[#efebe4] bg-white p-2 shadow-panel sm:left-auto sm:right-0 sm:w-auto sm:max-w-none sm:translate-x-0">
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
                      clearCustomValidity(dobButtonRef.current);
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
              ref={idNumberRef}
              value={idNumber}
              maxLength={20}
              autoComplete="off"
              placeholder="Enter ID or residency number"
              className={cn(
                "h-[36px] rounded-[7px] border-[#efebe4] px-3 text-[13px] placeholder:text-[12px] focus-visible:ring-0",
                typography.body,
              )}
              onChange={(event) => {
                clearCustomValidity(idNumberRef.current);
                setIdNumber(sanitizeTextInput(event.target.value));
              }}
            />
          </div>

          <div>
            <FieldLabel>Nationality</FieldLabel>
            <NationalitySelect
              value={nationality}
              onValueChange={setNationality}
              placeholder="Select nationality"
              triggerRef={nationalityButtonRef}
            />
          </div>

          <div>
            <FieldLabel>Mobile number</FieldLabel>
            <Input
              ref={phoneRef}
              value={phone}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Enter mobile number"
              className={cn(
                "h-[36px] rounded-[7px] border-[#efebe4] px-3 text-[13px] placeholder:text-[12px] focus-visible:ring-0",
                typography.body,
              )}
              onChange={(event) => {
                clearCustomValidity(phoneRef.current);
                setPhone(sanitizePhoneInput(event.target.value));
              }}
            />
          </div>

          <div>
            <FieldLabel>E-mail</FieldLabel>
            <Input
              ref={emailRef}
              value={email}
              type="email"
              maxLength={254}
              autoComplete="email"
              placeholder="Enter email address"
              className={cn(
                "h-[36px] rounded-[7px] border-[#efebe4] px-3 text-[13px] placeholder:text-[12px] focus-visible:ring-0",
                typography.body,
              )}
              onChange={(event) => {
                clearCustomValidity(emailRef.current);
                setEmail(sanitizeTextInput(event.target.value));
              }}
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
