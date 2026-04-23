import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  borderGradient: string;
  visual: ReactNode;
}

export interface CardAction {
  icon: LucideIcon;
  label: string;
}

export interface ContactDetail {
  icon: LucideIcon;
  label: string;
  sublabel: string;
  isLtr: boolean;
}
