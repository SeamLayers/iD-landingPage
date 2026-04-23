import { NavItem } from "../types";

export const getNavItems = (t: (key: string) => string): NavItem[] => [
  { label: t('nav.features'), href: '#features' },
  { label: t('nav.pricing'), href: '#pricing' },
  { label: t('nav.about'), href: '#about' },
];
