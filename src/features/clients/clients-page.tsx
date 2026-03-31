import { useState } from "react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Plus,
  UserRound,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddClientDialog } from "@/features/clients/add-client-dialog";
import { ClientBottomNav } from "@/features/clients/client-bottom-nav";
import { ClientSidebar } from "@/features/clients/client-sidebar";
import { ClientsTable } from "@/features/clients/clients-table";
import { FilterMenu } from "@/features/clients/filter-menu";
import { breadcrumbText, currentUserName, pageTitle, statusMessages } from "@/features/clients/data";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

function TopBar() {
  return (
    <div className="flex h-full w-full min-w-0 items-center justify-between gap-4 py-2">
      <div
        className={cn(
          "flex min-w-0 items-center gap-[16px] overflow-hidden text-[#838383]",
          typography.secondary,
        )}
      >
        <span className="truncate">{breadcrumbText}</span>
        <ChevronRight className="h-[14px] w-[14px] shrink-0 stroke-[2] text-[#838383]" />
        <span className="truncate font-semibold text-[#1a1a1a]">{pageTitle}</span>
      </div>

      <div className="flex shrink-0 items-center justify-end gap-[32px] text-[#1a1a1a]">
        <button
          type="button"
          className="flex items-center justify-center transition-colors hover:text-black/70"
          aria-label="Notifications"
        >
          <Bell className="h-[22px] w-[22px] stroke-[1.8]" />
        </button>
        <div className="flex items-center gap-[12px]">
          <UserRound className="h-[22px] w-[22px] stroke-[1.8]" />
          <span className={cn("whitespace-nowrap font-semibold text-[#1a1a1a]", typography.body)}>
            {currentUserName}
          </span>
        </div>
      </div>
    </div>
  );
}

function Pagination() {
  return (
    <div className="mt-6 flex justify-center md:mt-8 md:justify-end">
      <div className="flex max-w-full items-center overflow-x-auto rounded-[8px] border border-[#efebe4] bg-white">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center border-r border-[#efebe4] text-[#6f6f6f] hover:bg-neutral-50"
        >
          <ChevronLeft className="h-4 w-4 stroke-[2]" />
        </button>
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            type="button"
            aria-current={page === 3 ? "page" : undefined}
            className={cn(
              "flex h-9 w-9 items-center justify-center border-r border-[#efebe4] font-medium transition-colors",
              typography.body,
              page === 3 ? "bg-neutral-50 text-black" : "text-[#6f6f6f] hover:bg-neutral-50",
            )}
          >
            {page}
          </button>
        ))}
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

type BannerState = { type: "success" | "error"; message: string } | null;

function StatusBanner({ banner }: { banner: BannerState }) {
  if (!banner) {
    return null;
  }

  const isError = banner.type === "error";

  return (
    <div
      className={cn(
        "flex min-h-[36px] items-center gap-2 rounded-[8px] border bg-white px-3 py-2",
        isError ? "border-[#f4d5d5] text-[#ee4a4a]" : "border-[#efebe4] text-[#343434]",
      )}
    >
      {isError ? (
        <CircleAlert className="h-4 w-4 shrink-0 stroke-[1.9]" />
      ) : (
        <CircleCheck className="h-4 w-4 shrink-0 stroke-[1.9]" />
      )}
      <p className={cn("font-medium", typography.body)} aria-live="polite">
        {banner.message}
      </p>
    </div>
  );
}

export function ClientsPage() {
  const [addClientOpen, setAddClientOpen] = useState(false);
  const [banner, setBanner] = useState<BannerState>(null);

  function handleDialogSubmit(status: "success" | "error") {
    setBanner({
      type: status,
      message: status === "success" ? statusMessages.success : statusMessages.error,
    });
  }

  return (
    <>
      <AppShell sidebar={<ClientSidebar />} topbar={<TopBar />} bottomBar={<ClientBottomNav />}>
        <div className="px-3 pt-3 sm:px-4 md:px-[26px]">
          <div className="space-y-3">
            <StatusBanner banner={banner} />

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="w-full lg:max-w-[348px]">
                <Input
                  type="search"
                  placeholder="Looking for a client..."
                  className={cn(
                    "h-[36px] rounded-[8px] border-[#efebe4] bg-white px-[12px] text-[13px] placeholder:text-[13px] placeholder:text-[#9c9c9c]",
                    typography.body,
                  )}
                  aria-label="Search for client"
                />
              </div>

              <div className="flex flex-col gap-[8px] sm:flex-row sm:items-center sm:justify-end">
                <Button
                  type="button"
                  className={cn(
                    "h-[36px] w-full min-w-[149px] gap-1.5 rounded-[8px] bg-black px-[16px] font-medium text-white hover:bg-black/90 sm:w-auto",
                    typography.body,
                  )}
                  onClick={() => setAddClientOpen(true)}
                >
                  <Plus className="h-3.5 w-3.5 stroke-[2.2]" />
                  <span>Add Client</span>
                </Button>
                <div className="w-full sm:w-auto">
                  <FilterMenu />
                </div>
              </div>
            </div>
          </div>

          <ClientsTable />
          <Pagination />
        </div>
      </AppShell>

      <AddClientDialog
        open={addClientOpen}
        onOpenChange={setAddClientOpen}
        onSubmit={handleDialogSubmit}
      />
    </>
  );
}
