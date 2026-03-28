import { ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function ClientsTable() {
  return (
    <div className="mt-3 min-h-[274px] overflow-hidden rounded-[10px] border border-[#ece7de] bg-white md:min-h-[298px]">
      <Table className="border-separate border-spacing-0">
        <TableHeader>
          <TableRow className="h-[36px] border-b border-[#ece7de] bg-white text-[13px] hover:bg-white">
            <TableHead className={cn("w-[16%] pl-4 font-semibold text-[#1a1a1a]", typography.body)}>Customer name</TableHead>
            <TableHead className={cn("w-[12%] font-semibold text-[#1a1a1a]", typography.body)}>Company</TableHead>
            <TableHead className={cn("w-[16%] font-semibold text-[#1a1a1a]", typography.body)}>Open service</TableHead>
            <TableHead className={cn("w-[14%] font-semibold text-[#1a1a1a]", typography.body)}>Number of hours</TableHead>
            <TableHead className={cn("w-[15%] font-semibold text-[#1a1a1a]", typography.body)}>
              <div className="flex items-center gap-1">
                <span>Number of services</span>
                <ArrowUpDown className="h-3.5 w-3.5 stroke-[1.8]" />
              </div>
            </TableHead>
            <TableHead className={cn("w-[14%] font-semibold text-[#1a1a1a]", typography.body)}>Date of last request</TableHead>
            <TableHead className={cn("w-[13%] pr-4 font-semibold text-[#1a1a1a]", typography.body)}>Assigned to</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="h-[44px] border-b border-[#ece7de] text-[13px] hover:bg-neutral-50/50">
            <TableCell className={cn("pl-4 text-[#4a4a4a]", typography.body)}>success</TableCell>
            <TableCell className={cn("text-[#4a4a4a]", typography.body)}>success</TableCell>
            <TableCell className={cn("text-[#4a4a4a]", typography.body)}>a contract</TableCell>
            <TableCell className={cn("text-[#4a4a4a]", typography.body)}>2</TableCell>
            <TableCell className={cn("text-[#4a4a4a]", typography.body)}>1</TableCell>
            <TableCell className={cn("text-[#4a4a4a]", typography.body)}>08-01-2026</TableCell>
            <TableCell className={cn("pr-4 text-[#4a4a4a]", typography.body)}>Shwra user</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
