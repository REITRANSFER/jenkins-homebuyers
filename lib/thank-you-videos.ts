/**
 * lib/thank-you-videos.ts — Static manifest for the /thank-you video gallery.
 *
 * Source of truth: the "jenkins-homebuyers-blob" Vercel Blob store, folder
 * `new-thank-you/`. Pathnames below were read ONCE via @vercel/blob list() and
 * hardcoded here on purpose — there is intentionally NO list() call at runtime
 * or build time. If videos are added/removed/renamed in the blob, update this
 * file by hand.
 *
 * `file` holds the RAW (un-encoded) blob pathname. The gallery component encodes
 * it per-segment when building the final URL, so it must stay raw here.
 *
 * Category = leading number of the filename; order within a category = the
 * second number. Titles are derived from the filename (number prefix dropped,
 * "_" → ":" / "'" / quotes / "?" as the original punctuation required, trailing
 * " (1)" and ".mp4" stripped).
 */

export const CATEGORIES = [
  "Foreclosure & Financial Hardship",
  "Taxes & Code Violations",
  "Divorce, Probate & Inherited Homes",
  "Rental & Tenant-Occupied Properties",
  "Downsizing, Empty Nesters & Seniors",
  "Difficult Property Situations",
  "Cash Buyers & Selling Smart",
] as const

export type Category = (typeof CATEGORIES)[number]

export interface VideoEntry {
  title: string
  category: Category
  /** Raw blob pathname (includes the "new-thank-you/" prefix). */
  file: string
}

export const VIDEOS: VideoEntry[] = [
  // 1 — Foreclosure & Financial Hardship
  {
    title: "Facing Foreclosure: Unlock Equity Before It's Too Late!",
    category: "Foreclosure & Financial Hardship",
    file: "new-thank-you/1.1Facing Foreclosure_ Unlock Equity Before It's Too Late!.mp4",
  },
  {
    title: "Mortgage Behind: Unlock Equity & Options Now!",
    category: "Foreclosure & Financial Hardship",
    file: "new-thank-you/1.2 Mortgage Behind_ Unlock Equity & Options Now! (1).mp4",
  },
  {
    title: "Mortgage Worries After Job Loss: Your Equity Options Explained",
    category: "Foreclosure & Financial Hardship",
    file: "new-thank-you/1.3Mortgage Worries After Job Loss_ Your Equity Options Explained (1).mp4",
  },
  {
    title: "Bankruptcy & Your House: What Homeowners Need to Know",
    category: "Foreclosure & Financial Hardship",
    file: "new-thank-you/1.4Bankruptcy & Your House_ What Homeowners Need to Know (1).mp4",
  },
  {
    title: "Loan Modification vs. Selling Your House Fast",
    category: "Foreclosure & Financial Hardship",
    file: "new-thank-you/1.5Loan Modification vs. Selling Your House Fast (1).mp4",
  },
  {
    title: "Drowning in Medical Bills: Sell Your House FAST!",
    category: "Foreclosure & Financial Hardship",
    file: "new-thank-you/1.6 Drowning in Medical Bills_ Sell Your House FAST!.mp4",
  },

  // 2 — Taxes & Code Violations
  {
    title: "Selling Houses with Back Taxes: Avoid Foreclosure Now!",
    category: "Taxes & Code Violations",
    file: "new-thank-you/2.1 Selling Houses with Back Taxes_ Avoid Foreclosure Now!.mp4",
  },
  {
    title: "City Code Violations: We Buy Houses As Is!",
    category: "Taxes & Code Violations",
    file: "new-thank-you/2.2 City Code Violations_ We Buy Houses As Is!.mp4",
  },
  {
    title: "Don't Lose Your Home! Property Tax Escape Plan Revealed",
    category: "Taxes & Code Violations",
    file: "new-thank-you/2.3 Don_t Lose Your Home! Property Tax Escape Plan Revealed.mp4",
  },

  // 3 — Divorce, Probate & Inherited Homes
  {
    title: "Divorce House Sale Nightmare: Sell FAST, Stress-Free!",
    category: "Divorce, Probate & Inherited Homes",
    file: "new-thank-you/3.1 Divorce House Sale Nightmare_ Sell FAST, Stress-Free!.mp4",
  },
  {
    title: "Probate House Sale: Sell Before Court is Final!",
    category: "Divorce, Probate & Inherited Homes",
    file: "new-thank-you/3.2 Probate House Sale_ Sell Before Court is Final! (1).mp4",
  },
  {
    title: "Inherited House With Siblings: Solve Disputes FAST!",
    category: "Divorce, Probate & Inherited Homes",
    file: "new-thank-you/3.3 Inherited House With Siblings_ Solve Disputes FAST! (1).mp4",
  },
  {
    title: "Inherited House You Don't Want: We Buy As-Is!",
    category: "Divorce, Probate & Inherited Homes",
    file: "new-thank-you/3.4Inherited House You Don_t Want_ We Buy As-Is! (1).mp4",
  },
  {
    title: "Selling Your Family Home: A Simpler Solution",
    category: "Divorce, Probate & Inherited Homes",
    file: "new-thank-you/3.5 Selling Your Family Home_ A Simpler Solution (1).mp4",
  },

  // 4 — Rental & Tenant-Occupied Properties
  {
    title: "We Buy Occupied Houses: Fast Cash Offer!",
    category: "Rental & Tenant-Occupied Properties",
    file: "new-thank-you/4.1We Buy Occupied Houses_ Fast Cash Offer! (1).mp4",
  },
  {
    title: "Selling Rented Property: Easy Cash Offer Solution",
    category: "Rental & Tenant-Occupied Properties",
    file: "new-thank-you/4.2 Selling Rented Property_ Easy Cash Offer Solution.mp4",
  },
  {
    title: "Losing Money on Rentals: Sell Them FAST to Jenkins Homebuyers!",
    category: "Rental & Tenant-Occupied Properties",
    file: "new-thank-you/4.3Losing Money on Rentals_ Sell Them FAST to Jenkins Homebuyers!.mp4",
  },

  // 5 — Downsizing, Empty Nesters & Seniors
  {
    title: "Stop Losing Money: Sell Your Empty House Fast!",
    category: "Downsizing, Empty Nesters & Seniors",
    file: "new-thank-you/5.1 Stop Losing Money_ Sell Your Empty House Fast! (1).mp4",
  },
  {
    title: "Empty Nester: Downsize Your House NOW!",
    category: "Downsizing, Empty Nesters & Seniors",
    file: "new-thank-you/5.2 Empty Nester_ Downsize Your House NOW! (1).mp4",
  },
  {
    title: "Empty Nester Downsizing: Save Time, Energy & Money",
    category: "Downsizing, Empty Nesters & Seniors",
    file: "new-thank-you/5.3Empty Nester Downsizing_ Save Time, Energy & Money (1).mp4",
  },
  {
    title: "Sell Your House FAST: No Repairs, Get Cash Offer!",
    category: "Downsizing, Empty Nesters & Seniors",
    file: "new-thank-you/5.4 Sell Your House FAST_ No Repairs, Get Cash Offer! (1).mp4",
  },
  {
    title: "Parent Moving: Sell Their House FAST, Stress-Free!",
    category: "Downsizing, Empty Nesters & Seniors",
    file: "new-thank-you/5.5 Parent Moving_ Sell Their House FAST, Stress-Free!.mp4",
  },
  {
    title: "Seniors Selling Home: Skip Repairs & Sell Fast!",
    category: "Downsizing, Empty Nesters & Seniors",
    file: "new-thank-you/5.6 Seniors Selling Home_ Skip Repairs & Sell Fast! (1).mp4",
  },

  // 6 — Difficult Property Situations
  {
    title: "Overwhelmed by Clutter: Sell Your House FAST, No Cleaning Needed!",
    category: "Difficult Property Situations",
    file: "new-thank-you/6.1 Overwhelmed by Clutter_ Sell Your House FAST, No Cleaning Needed! (1).mp4",
  },
  {
    title: "Stuck on a Flip: We Buy Half-Finished Projects!",
    category: "Difficult Property Situations",
    file: "new-thank-you/6.2 Stuck on a Flip_ We Buy Half-Finished Projects! (1).mp4",
  },
  {
    title: "House Buyers Backing Out: Get a Cash Offer FAST!",
    category: "Difficult Property Situations",
    file: "new-thank-you/6.3 House Buyers Backing Out_ Get a Cash Offer FAST!.mp4",
  },

  // 7 — Cash Buyers & Selling Smart
  {
    title: "Cash Buyers: The Truth They DON'T Want You To Know!",
    category: "Cash Buyers & Selling Smart",
    file: "new-thank-you/7.1 Cash Buyers_ The Truth They DON_T Want You To Know!.mp4",
  },
  {
    title: "Sell Your House FAST: Cash Offer in 24 Hours!",
    category: "Cash Buyers & Selling Smart",
    file: "new-thank-you/7.2Sell Your House FAST_ Cash Offer in 24 Hours!.mp4",
  },
  {
    title: "Sell Your House FAST: Avoid These Buyer Scams!",
    category: "Cash Buyers & Selling Smart",
    file: "new-thank-you/7.3 Sell Your House FAST_ Avoid These Buyer Scams! (1).mp4",
  },
  {
    title: 'Sell Your House "As Is" to Cash Buyers: Honest Truth',
    category: "Cash Buyers & Selling Smart",
    file: "new-thank-you/7.4 Sell Your House _As Is_ to Cash Buyers_ Honest Truth.mp4",
  },
  {
    title: "Don't Make These 3 Inherited House Mistakes! Sell Smarter.",
    category: "Cash Buyers & Selling Smart",
    file: "new-thank-you/7.5Don_t Make These 3 Inherited House Mistakes! Sell Smarter..mp4",
  },
  {
    title: "Local Cash Buyer vs. National: Which Is Best?",
    category: "Cash Buyers & Selling Smart",
    file: "new-thank-you/7.6 Local Cash Buyer vs. National_ Which Is Best_.mp4",
  },
]
