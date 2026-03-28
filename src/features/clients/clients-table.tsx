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
    <div className="mt-4 min-h-[400px] rounded-[10px] border border-[#ece7de] bg-white overflow-hidden">
      <Table className="border-separate border-spacing-0">
        <TableHeader>
          <TableRow className="h-[48px] border-b border-[#ece7de] bg-white hover:bg-white text-[13px]">
            <TableHead className={cn("w-[15%] pl-4 font-semibold text-[#1a1a1a]", typography.body)}>Customer name</TableHead>
            <TableHead className={cn("w-[12%] font-semibold text-[#1a1a1a]", typography.body)}>Company</TableHead>
            <TableHead className={cn("w-[12%] font-semibold text-[#1a1a1a]", typography.body)}>Open service</TableHead>
            <TableHead className={cn("w-[14%] font-semibold text-[#1a1a1a]", typography.body)}>Number of hours</TableHead>
            <TableHead className={cn("w-[15%] font-semibold text-[#1a1a1a]", typography.body)}>
              <div className="flex items-center gap-1">
                Number of services
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className={cn("w-[15%] font-semibold text-[#1a1a1a]", typography.body)}>Date of last request</TableHead>
            <TableHead className={cn("w-[15%] font-semibold text-[#1a1a1a]", typography.body)}>Assigned to</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="h-[52px] border-b border-[#ece7de] hover:bg-neutral-50/50 text-[13px]">
            <TableCell className={cn("pl-4 text-[#4a4a4a]", typography.body)}>success</TableCell>
            <TableCell className={cn("text-[#4a4a4a]", typography.body)}>success</TableCell>
            <TableCell className={cn("text-[#4a4a4a]", typography.body)}>a contract</TableCell>
            <TableCell className={cn("text-[#4a4a4a]", typography.body)}>2</TableCell>
            <TableCell className={cn("text-[#4a4a4a]", typography.body)}>1</TableCell>
            <TableCell className={cn("text-[#4a4a4a]", typography.body)}>08-01-2026</TableCell>
            <TableCell className={cn("text-[#4a4a4a]", typography.body)}>Shwra user</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
