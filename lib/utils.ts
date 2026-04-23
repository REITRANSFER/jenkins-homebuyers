import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Build a safe tel: href from a PHONE_HREF env var value.
 * Strips any leading "tel:" prefix, whitespace, and formatting characters
 * so that misconfigured env vars (e.g. "tel:(615)499-8249") still produce
 * a working click-to-call link.
 */
export function telHref(phoneHref: string): string {
  const digits = phoneHref
    .replace(/^tel:/i, "")
    .replace(/[^\d+]/g, "")
  return `tel:${digits}`
}
