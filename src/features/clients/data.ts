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
  Users,
  UsersRound,
} from "lucide-react";

export const breadcrumbText = "Legal Project Management";
export const pageTitle = "Employees";

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
  { label: "Employees", icon: Users },
];

export const serviceTypes = [
  "Negotiations",
  "Contracts",
  "Meetings",
  "Invoices",
  "Power of Attorney",
  "Contract Review",
];

export const nationalities = [
  "Saudi",
  "Egyptian",
  "Emirati",
  "Jordanian",
  "Kuwaiti",
  "Bahraini",
  "Omani",
];

export const brandIcon = Scale;
export const currentUserName = "Ahmed";

export const statusMessages = {
  success: "The client was successfully added",
  error: "Failed to add customer",
} as const;
