import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeTextInput(value: string) {
  return value.replace(/[<>\u0000-\u001F\u007F]/g, "");
}

export function sanitizePhoneInput(value: string) {
  return value.replace(/[^0-9+\-() ]/g, "").slice(0, 20);
}
