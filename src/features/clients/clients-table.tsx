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

const clientRows = [
  {
    name: "success",
    company: "success",
    service: "a contract",
    hours: "2",
    services: "1",
    lastRequest: "08-01-2026",
    assignedTo: "Shwra user",
  },
] as const;

const tableColumns = [
  { key: "name", label: "Customer name", align: "left" },
  { key: "company", label: "Company", align: "left" },
  { key: "service", label: "Open service", align: "left" },
  { key: "hours", label: "Number of hours", align: "center" },
  { key: "services", label: "Number of services", align: "center" },
  { key: "lastRequest", label: "Date of last request", align: "center" },
  { key: "assignedTo", label: "Assigned to", align: "left" },
] as const;

export function ClientsTable() {
  return (
    <div className="mt-3 min-h-[274px] overflow-hidden rounded-[10px] border border-[#ece7de] bg-white md:min-h-[298px]">
      <div className="grid gap-3 p-3 md:hidden">
        {clientRows.map((client) => (
          <article
            key={`${client.name}-${client.lastRequest}`}
            className="rounded-[10px] border border-[#ece7de] bg-[#fdfcfb] p-3"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h3 className={cn("font-semibold text-[#1a1a1a]", typography.body)}>{client.name}</h3>
                <p className={cn("text-[#6f6f6f]", typography.secondary)}>{client.company}</p>
              </div>
              <span className={cn("rounded-full bg-white px-2.5 py-1 text-[#1a1a1a]", typography.secondary)}>
                {client.service}
              </span>
            </div>

            <dl className="grid grid-cols-2 gap-x-3 gap-y-2">
              <div>
                <dt className={cn("text-[#6f6f6f]", typography.secondary)}>Hours</dt>
                <dd className={cn("text-[#4a4a4a]", typography.body)}>{client.hours}</dd>
              </div>
              <div>
                <dt className={cn("text-[#6f6f6f]", typography.secondary)}>Services</dt>
                <dd className={cn("text-[#4a4a4a]", typography.body)}>{client.services}</dd>
              </div>
              <div>
                <dt className={cn("text-[#6f6f6f]", typography.secondary)}>Last request</dt>
                <dd className={cn("text-[#4a4a4a]", typography.body)}>{client.lastRequest}</dd>
              </div>
              <div>
                <dt className={cn("text-[#6f6f6f]", typography.secondary)}>Assigned to</dt>
                <dd className={cn("text-[#4a4a4a]", typography.body)}>{client.assignedTo}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="hidden md:block">
        <Table className="min-w-[860px] border-separate border-spacing-0">
          <TableHeader>
            <TableRow className="h-[36px] border-b border-[#ece7de] bg-white text-[13px] hover:bg-white">
              <TableHead className={cn("w-[16%] pl-4 text-left font-semibold text-[#1a1a1a]", typography.body)}>
                Customer name
              </TableHead>
              <TableHead className={cn("w-[12%] text-left font-semibold text-[#1a1a1a]", typography.body)}>Company</TableHead>
              <TableHead className={cn("w-[16%] text-left font-semibold text-[#1a1a1a]", typography.body)}>Open service</TableHead>
              <TableHead className={cn("w-[14%] text-center font-semibold text-[#1a1a1a]", typography.body)}>
                Number of hours
              </TableHead>
              <TableHead className={cn("w-[15%] font-semibold text-[#1a1a1a]", typography.body)}>
                <div className="flex items-center justify-center gap-1">
                  <span>Number of services</span>
                  <ArrowUpDown className="h-3.5 w-3.5 stroke-[1.8]" />
                </div>
              </TableHead>
              <TableHead className={cn("w-[14%] text-center font-semibold text-[#1a1a1a]", typography.body)}>
                Date of last request
              </TableHead>
              <TableHead className={cn("w-[13%] pr-4 text-left font-semibold text-[#1a1a1a]", typography.body)}>
                Assigned to
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientRows.map((client) => (
              <TableRow
                key={`${client.name}-${client.lastRequest}`}
                className="h-[44px] border-b border-[#ece7de] text-[13px] hover:bg-neutral-50/50"
              >
                {tableColumns.map((column, index) => (
                  <TableCell
                    key={column.key}
                    className={cn(
                      "text-[#4a4a4a]",
                      index === 0 ? "pl-4" : "",
                      index === tableColumns.length - 1 ? "pr-4" : "",
                      column.align === "center" ? "text-center" : "text-left",
                      typography.body,
                    )}
                  >
                    {client[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
