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
    <div className="flex h-full items-center justify-between gap-4">
      <div className={cn("flex flex-wrap items-center gap-[8px] text-[#6f6f6f]", typography.secondary)}>
        <span>{breadcrumbText}</span>
        <ChevronRight className="h-[12px] w-[12px] stroke-[1.8]" />
        <span className="font-semibold text-[#1a1a1a]">{pageTitle}</span>
      </div>

      <div className="flex items-center gap-4 text-[#1a1a1a]">
        <button type="button" className="p-1">
          <Bell className="h-[19px] w-[19px] stroke-[1.8]" />
        </button>
        <div className="flex items-center gap-2">
          <UserRound className="h-[19px] w-[19px] stroke-[1.8]" />
          <span className={cn("font-semibold", typography.body)}>{currentUserName}</span>
        </div>
      </div>
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
      <p className={cn("font-medium", typography.body)}>{banner.message}</p>
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
        <div className="px-[18px] pt-[12px] md:px-[26px]">
          <div className="space-y-3">
            <StatusBanner banner={banner} />

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="w-full md:max-w-[348px]">
                <Input
                  placeholder="Looking for a client..."
                  className={cn(
                    "h-[36px] rounded-[8px] border-[#efebe4] bg-white px-[12px] text-[13px] placeholder:text-[13px] placeholder:text-[#9c9c9c]",
                    typography.body,
                  )}
                  aria-label="Search for client"
                />
              </div>

              <div className="flex items-center justify-end gap-[8px]">
                <Button
                  type="button"
                  className={cn(
                    "h-[36px] min-w-[149px] gap-1.5 rounded-[8px] bg-black px-[16px] font-medium text-white hover:bg-black/90",
                    typography.body,
                  )}
                  onClick={() => setAddClientOpen(true)}
                >
                  <Plus className="h-3.5 w-3.5 stroke-[2.2]" />
                  <span>Add Client</span>
                </Button>
                <FilterMenu />
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
