"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { openQuiz } from "./openQuiz"

// TODO (William): These are placeholders. Replace with 3 REAL Jenkins customer
// reviews (and matching avatar images at /public/images/v2/v2-avatar-*.jpg).
// Do not invent reviews. Pull them from the live Jenkins WordPress reviews
// page, Google Business, or a recent closings list. Until then this section
// will render the placeholder copy below — flag in PR body.
const REVIEWS = [
  {
    quote:
      "TODO: real Jenkins Home Buyers customer quote goes here. Replace with verified review from a Middle Tennessee homeowner who sold to the brothers.",
    name: "TODO Reviewer 1",
    city: "Middle Tennessee",
    avatar: "/images/v2/v2-avatar-1.jpg",
  },
  {
    quote:
      "TODO: real Jenkins Home Buyers customer quote goes here. Replace with verified review from a Middle Tennessee homeowner who sold to the brothers.",
    name: "TODO Reviewer 2",
    city: "Middle Tennessee",
    avatar: "/images/v2/v2-avatar-2.jpg",
  },
  {
    quote:
      "TODO: real Jenkins Home Buyers customer quote goes here. Replace with verified review from a Middle Tennessee homeowner who sold to the brothers.",
    name: "TODO Reviewer 3",
    city: "Middle Tennessee",
    avatar: "/images/v2/v2-avatar-3.jpg",
  },
]

export default function Reviews() {
  return (
    <section
      className="py-14 px-4"
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid var(--hpg-border)",
      }}
    >
      <div className="hpg-container">
        <div className="text-center mb-8">
          <p
            className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.25em] mb-2"
            style={{ color: "var(--hpg-gold-dark)" }}
          >
            Real Reviews
          </p>
          <h2
            className="font-display text-2xl sm:text-3xl font-black uppercase"
            style={{ color: "var(--hpg-black)" }}
          >
            What Middle Tennessee Homeowners Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {REVIEWS.map((r) => (
            <button
              key={r.name}
              type="button"
              onClick={openQuiz}
              aria-label={`Get my cash offer — review from ${r.name}`}
              className="text-left rounded-2xl p-6 sm:p-7 shadow-md hover:shadow-xl transition-all bg-white"
              style={{ border: "1px solid var(--hpg-border)" }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5"
                    style={{ color: "var(--hpg-gold)", fill: "var(--hpg-gold)" }}
                  />
                ))}
              </div>
              <p
                className="italic leading-relaxed mb-5 text-[15px] sm:text-[16px]"
                style={{ color: "var(--hpg-charcoal)" }}
              >
                "{r.quote}"
              </p>
              <div className="flex items-center gap-3 mt-1">
                <div
                  className="relative h-12 w-12 rounded-full overflow-hidden shrink-0"
                  style={{ border: "2px solid var(--hpg-gold)" }}
                >
                  <Image
                    src={r.avatar}
                    alt={r.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p
                    className="font-display font-black text-[13px] uppercase tracking-wide leading-tight"
                    style={{ color: "var(--hpg-black)" }}
                  >
                    {r.name}
                  </p>
                  <p className="text-[12px] leading-tight" style={{ color: "var(--hpg-muted)" }}>
                    {r.city}
                  </p>
                </div>
              </div>
              <p
                className="text-[11px] font-bold uppercase tracking-wider mt-3"
                style={{ color: "var(--hpg-gold-dark)" }}
              >
                Get my cash offer →
              </p>
            </button>
          ))}
        </div>

        <p
          className="text-center text-[12px] mt-7"
          style={{ color: "var(--hpg-muted)" }}
        >
          Verified reviews from Middle Tennessee homeowners.
        </p>
      </div>
    </section>
  )
}
