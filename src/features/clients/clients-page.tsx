import { useState } from "react";
import { Bell, ChevronLeft, ChevronRight, Plus, UserRound } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddClientDialog } from "@/features/clients/add-client-dialog";
import { ClientBottomNav } from "@/features/clients/client-bottom-nav";
import { ClientSidebar } from "@/features/clients/client-sidebar";
import { ClientsTable } from "@/features/clients/clients-table";
import { FilterMenu } from "@/features/clients/filter-menu";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import {
  breadcrumbText,
  currentUserName,
  licenseBanner,
  pageTitle,
} from "@/features/clients/data";

function TopBar() {
  return (
    <div className="flex h-full items-center justify-between">
      <div className={cn("flex items-center gap-[9px] text-[#6f6f6f]", typography.secondary)}>
        <span>{breadcrumbText}</span>
        <ChevronRight className="h-[12px] w-[12px] stroke-[1.8]" />
        <span className="font-semibold text-[#1a1a1a]">{pageTitle}</span>
      </div>

      <div className="flex items-center gap-4 text-[#1a1a1a]">
        <button type="button" className="p-1">
          <Bell className="h-[20px] w-[20px] stroke-[1.8]" />
        </button>
        <div className="flex items-center gap-2">
          <UserRound className="h-[20px] w-[20px] stroke-[1.8]" />
          <span className={cn("font-semibold", typography.body)}>{currentUserName}</span>
        </div>
      </div>
    </div>
  );
}

function LicenseBanner() {
  return (
    <div className="flex min-h-[44px] flex-wrap items-center gap-[10px] rounded-[4px] bg-black px-[14px] py-[8px] text-white">
      <p className={cn("font-medium", typography.secondary)}>{licenseBanner.message}</p>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={cn(
          "h-[26px] rounded-[4px] border-transparent bg-white px-[10px] font-medium text-black hover:bg-neutral-100",
          typography.secondary,
        )}
      >
        {licenseBanner.cta}
        <ChevronRight className="ml-1.5 h-[10px] w-[10px] stroke-[2.4]" />
      </Button>
    </div>
  );
}


function Pagination() {
  return (
    <div className="mt-8 flex justify-end">
      <div className="flex items-center overflow-hidden rounded-[8px] border border-[#efebe4] bg-white">
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            type="button"
            className={cn(
              "flex h-9 w-9 items-center justify-center border-r border-[#efebe4] font-medium transition-colors last:border-r-0",
              typography.body,
              page === 3 ? "bg-neutral-50 text-black" : "text-[#6f6f6f] hover:bg-neutral-50",
            )}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center border-l border-[#efebe4] text-[#6f6f6f] hover:bg-neutral-50"
        >
          <ChevronLeft className="h-4 w-4 stroke-[2]" />
        </button>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-[#6f6f6f] hover:bg-neutral-50"
        >
          <ChevronRight className="h-4 w-4 stroke-[2]" />
        </button>
      </div>
    </div>
  );
}

export function ClientsPage() {
  const [addClientOpen, setAddClientOpen] = useState(false);

  return (
    <>
      <AppShell sidebar={<ClientSidebar />} topbar={<TopBar />} bottomBar={<ClientBottomNav />}>
        <div className="px-[26px] pt-[10px]">
          <LicenseBanner />

          <div className="mt-[14px] flex items-center justify-between gap-4 px-1">
            <div className="w-full max-w-[348px]">
              <Input
                placeholder="Looking for a client..."
                className={cn(
                  "h-[36px] rounded-[4px] border-[#efebe4] bg-white px-[12px] placeholder:text-[14px] placeholder:text-[#9c9c9c]",
                  typography.body,
                )}
                aria-label="Search for client"
              />
            </div>

            <div className="flex items-center gap-[7px]">
              <Button
                type="button"
                className={cn(
                  "h-[36px] min-w-[149px] rounded-[5px] bg-black px-[18px] font-medium text-white hover:bg-black/90",
                  typography.body,
                )}
                onClick={() => setAddClientOpen(true)}
              >
                + Add Client
              </Button>
              <FilterMenu />
            </div>
          </div>

          <ClientsTable />
          <Pagination />
        </div>
      </AppShell>

      <AddClientDialog open={addClientOpen} onOpenChange={setAddClientOpen} />
    </>
  );
}
