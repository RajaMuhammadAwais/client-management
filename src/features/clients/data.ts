import type { LucideIcon } from "lucide-react";
import {
  Bell,
  BookOpenText,
  BriefcaseBusiness,
  FolderOpen,
  Grid2x2,
  Headset,
  House,
  LayoutPanelLeft,
  ListTodo,
  ReceiptText,
  Scale,
  Settings,
  UsersRound,
} from "lucide-react";

export const breadcrumbText = "Legal Project Managamnst";
export const pageTitle = "Clients";

export const sidebarItems: LucideIcon[] = [
  LayoutPanelLeft,
  House,
  BriefcaseBusiness,
  Grid2x2,
  BookOpenText,
  FolderOpen,
  Bell,
  Headset,
  Settings,
];

export const footerTabs: Array<{ label: string; icon: LucideIcon; active?: boolean }> = [
  { label: "Tasks", icon: ListTodo },
  { label: "Documents", icon: FolderOpen },
  { label: "Clients", icon: UsersRound, active: true },
  { label: "Billing", icon: ReceiptText },
];

export const brandIcon = Scale;
export const currentUserName = "Ahmed";

export const licenseBanner = {
  message: "Your license as a lawyer expires on 12-05-2025. Please renew it.",
  cta: "Renew Now",
};
