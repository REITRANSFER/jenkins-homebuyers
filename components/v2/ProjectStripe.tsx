"use client"

import Image from "next/image"
import { openQuiz } from "./openQuiz"

// Middle Tennessee market cities. These are city names in a list — not a
// description of the company. (William's rule: never DESCRIBE Jenkins as
// "Nashville," but city-name in a service-area list is fine.)
const ITEMS = [
  { img: "/images/v2/v2-nashville.jpg", caption: "Cash Close — Nashville, TN" },
  { img: "/images/v2/v2-murfreesboro.jpg", caption: "As-Is Sale — Murfreesboro, TN" },
  { img: "/images/v2/v2-franklin.jpg", caption: "Out-of-State Owner — Franklin, TN" },
]

export default function ProjectStripe() {
  return (
    <section
      className="bg-white py-12 px-4"
      style={{ borderBottom: "1px solid var(--hpg-border)" }}
    >
      <div className="hpg-container">
        <div className="text-center mb-6">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.25em] mb-2"
            style={{ color: "var(--hpg-gold-dark)" }}
          >
            Recent Closings
          </p>
          <h2
            className="font-display text-2xl sm:text-3xl font-black uppercase"
            style={{ color: "var(--hpg-black)" }}
          >
            See the work, not just the words
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ITEMS.map((v) => (
            <button
              key={v.img}
              type="button"
              onClick={openQuiz}
              aria-label={`Get my cash offer — ${v.caption}`}
              className="group rounded-2xl overflow-hidden shadow-md aspect-[9/16] relative bg-black text-left hover:shadow-xl transition-all w-full"
              style={{ border: "1px solid var(--hpg-border)" }}
            >
              <Image
                src={v.img}
                alt={v.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 768px) 33vw, 100vw"
                unoptimized
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4">
                <p className="text-white font-display font-black text-[13px] uppercase tracking-wide">
                  {v.caption}
                </p>
                <p
                  className="text-[11px] font-bold uppercase tracking-wider mt-1"
                  style={{ color: "var(--hpg-gold)" }}
                >
                  Get my cash offer →
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
