import { useEffect, useRef, useState } from "react";
import { 
  Calendar as CalendarIcon, 
  ChevronDown, 
  CloudUpload,
  X 
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { typography } from "@/lib/typography";
import { cn, sanitizePhoneInput, sanitizeTextInput } from "@/lib/utils";
import { CalendarContent } from "./calendar-content";
import { NationalitySelect } from "./nationality-select";

interface AddClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddClientDialog({ open, onOpenChange }: AddClientDialogProps) {
  const [clientName, setClientName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [nationality, setNationality] = useState("Saudi nationality");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showDobCalendar, setShowDobCalendar] = useState(false);
  const [selectedDob, setSelectedDob] = useState<Date | undefined>(undefined);
  const [dobModeMenuOpen, setDobModeMenuOpen] = useState(false);
  const [dobMode, setDobMode] = useState<"Gregorian" | "Hijri">("Gregorian");
  
  const formattedDob = selectedDob 
    ? `${String(selectedDob.getDate()).padStart(2, '0')}/${String(selectedDob.getMonth() + 1).padStart(2, '0')}/${selectedDob.getFullYear()}`
    : "";

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!open) {
      setClientName("");
      setIdNumber("");
      setNationality("Saudi nationality");
      setPhone("");
      setEmail("");
      setShowDobCalendar(false);
      setSelectedDob(undefined);
    }
  }, [open]);

  function FieldLabel({ children, required }: { children: string; required?: boolean }) {
    return (
      <label className={cn("mb-2.5 block font-semibold text-[#1a1a1a]", typography.emphasis)}>
        {children}{required && "*"}
      </label>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[min(90vh,880px)] w-[416px] overflow-y-auto p-8 rounded-[12px] border-[#efebe4]"
      >
        <div className="flex items-center justify-between mb-2">
           <DialogTitle className={cn("font-bold text-[#1a1a1a]", typography.title)}>Add client</DialogTitle>
        </div>
        <DialogDescription className="sr-only">
          Form to add a new client with their details and documents.
        </DialogDescription>

        <form className="mt-4 flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); onOpenChange(false); }}>
          {/* Client name */}
          <div>
            <FieldLabel required>Client name</FieldLabel>
            <Input
              value={clientName}
              placeholder="Enter Client name"
              className={cn("h-[44px] rounded-[8px] border-[#efebe4] px-4 text-[14px]", typography.body)}
              onChange={(e) => setClientName(sanitizeTextInput(e.target.value))}
            />
          </div>

          {/* Date of birth */}
          <div>
            <FieldLabel>Date of birth</FieldLabel>
            <div className="relative">
              <div className="flex h-[44px] w-full items-center rounded-[8px] border border-[#efebe4] bg-white text-[14px]">
                {/* Mode Selector */}
                <div 
                  className="flex h-full items-center gap-1.5 border-r border-[#efebe4] bg-[#fdfcfb] px-3 cursor-pointer rounded-l-[8px]"
                  onClick={() => setDobModeMenuOpen(!dobModeMenuOpen)}
                >
                  <span className={cn("text-[#1a1a1a] font-medium", typography.body)}>{dobMode}</span>
                  <ChevronDown className={cn("h-4 w-4 text-[#8a8a8a] transition-transform", dobModeMenuOpen && "rotate-180")} />
                </div>
                
                {/* Input Area */}
                <div 
                  className={cn(
                    "flex flex-1 items-center justify-between px-4 cursor-pointer",
                    !formattedDob ? "text-[#9c9c9c]" : "text-[#1a1a1a]",
                    typography.body
                  )}
                  onClick={() => setShowDobCalendar(!showDobCalendar)}
                >
                  <span>{formattedDob || "Specify the date of birth"}</span>
                  <CalendarIcon className="h-4 w-4 text-[#8a8a8a] stroke-[1.8]" />
                </div>
              </div>

              {/* Gregorian/Hijri Radio Flyout */}
              {dobModeMenuOpen && (
                <div className="absolute left-0 top-full z-30 mt-1 w-[120px] rounded-[8px] border border-[#efebe4] bg-white p-2 shadow-lg">
                  <div 
                    className="flex items-center gap-2.5 px-2 py-1.5 cursor-pointer hover:bg-neutral-50 rounded-md"
                    onClick={() => { setDobMode("Gregorian"); setDobModeMenuOpen(false); }}
                  >
                    <div className={cn("h-4 w-4 rounded-full border border-[#efebe4] flex items-center justify-center", dobMode === "Gregorian" && "border-black")}>
                      {dobMode === "Gregorian" && <div className="h-2 w-2 rounded-full bg-black" />}
                    </div>
                    <span className="text-[13px]">Gregorian</span>
                  </div>
                  <div 
                    className="flex items-center gap-2.5 px-2 py-1.5 cursor-pointer hover:bg-neutral-50 rounded-md"
                    onClick={() => { setDobMode("Hijri"); setDobModeMenuOpen(false); }}
                  >
                    <div className={cn("h-4 w-4 rounded-full border border-[#efebe4] flex items-center justify-center", dobMode === "Hijri" && "border-black")}>
                      {dobMode === "Hijri" && <div className="h-2 w-2 rounded-full bg-black" />}
                    </div>
                    <span className="text-[13px]">Hijri</span>
                  </div>
                </div>
              )}

              {/* Calendar Flyout */}
              {showDobCalendar && (
                <div className="absolute right-0 top-full z-20 mt-1 shadow-lg">
                  <CalendarContent 
                    selectedDate={selectedDob}
                    onSelect={(date) => {
                      setSelectedDob(date);
                      setShowDobCalendar(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Identity/Residency */}
          <div>
            <FieldLabel>Identity or residency</FieldLabel>
            <Input
              value={idNumber}
              placeholder="Enter Identity number"
              className={cn("h-[44px] rounded-[8px] border-[#efebe4] px-4 text-[14px]", typography.body)}
              onChange={(e) => setIdNumber(sanitizeTextInput(e.target.value))}
            />
          </div>

          {/* Nationality */}
          <div>
            <FieldLabel>Nationality</FieldLabel>
            <NationalitySelect 
              value={nationality} 
              onValueChange={setNationality} 
              placeholder="Select nationality"
            />
          </div>

          {/* Mobile number */}
          <div>
            <FieldLabel>Mobile number</FieldLabel>
            <Input
              value={phone}
              placeholder="Enter mobile number"
              className={cn("h-[44px] rounded-[8px] border-[#efebe4] px-4 text-[14px]", typography.body)}
              onChange={(e) => setPhone(sanitizePhoneInput(e.target.value))}
            />
          </div>

          {/* E-mail */}
          <div>
            <FieldLabel>E-mail</FieldLabel>
            <Input
              value={email}
              placeholder="Enter e-mail address"
              className={cn("h-[44px] rounded-[8px] border-[#efebe4] px-4 text-[14px]", typography.body)}
              onChange={(e) => setEmail(sanitizeTextInput(e.target.value))}
            />
          </div>

          {/* Documents Section */}
          <div>
             <FieldLabel>Documents</FieldLabel>
             <div className="flex flex-col items-center justify-center rounded-[12px] border-2 border-dashed border-[#efebe4] bg-[#fdfcfb] p-6 text-center">
                <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                  <CloudUpload className="h-5 w-5 text-[#8a8a8a]" />
                </div>
                <p className={cn("mb-1 font-semibold text-[#1a1a1a]", typography.body)}>Upload documents</p>
                <p className={cn("mb-4 text-[#6f6f6f] text-[12px] leading-relaxed max-w-[200px]", typography.secondary)}>
                  or file and draw files here, or push the file limit 5mb for a single file
                </p>
                <Button 
                  type="button" 
                  variant="outline" 
                  className={cn("h-[32px] rounded-[6px] border-[#efebe4] px-4 text-[12px] font-medium", typography.body)}
                >
                  Choice the file
                </Button>
             </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-3 flex items-center justify-end gap-3">
             <Button
               type="button"
               variant="outline"
               className={cn("h-[44px] min-w-[96px] rounded-[8px] border-[#efebe4] font-semibold", typography.body)}
               onClick={() => onOpenChange(false)}
             >
               Back
             </Button>
             <Button
               type="submit"
               className={cn("h-[44px] min-w-[120px] rounded-[8px] bg-black font-semibold text-white hover:bg-black/90", typography.body)}
             >
               Save changes
             </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
