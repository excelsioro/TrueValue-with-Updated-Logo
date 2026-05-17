import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 48, suffix: '', label: 'States Covered' },
  { value: 2, suffix: 'K+', label: 'Carriers in Network' },
  { value: 99.2, suffix: '%', label: 'On-Time Delivery', isDecimal: true },
  { value: 24, suffix: '/7', label: 'Dispatch Support' },
]

export default function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null)
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      stats.forEach((stat, i) => {
        const el = numbersRef.current[i]
        if (!el) return

        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
          onUpdate: () => {
            if (stat.isDecimal) {
              el.textContent = obj.val.toFixed(1) + stat.suffix
            } else {
              el.textContent = Math.round(obj.val) + stat.suffix
            }
          },
        })
      })

      // Fade in labels
      const labels = sectionRef.current?.querySelectorAll('.stat-label')
      if (labels) {
        gsap.from(labels, {
          opacity: 0,
          y: 10,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full bg-brand-blue py-10 md:py-12"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-brand-orange flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {i === 0 && (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                  )}
                  {i === 1 && (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  )}
                  {i === 2 && (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                  {i === 3 && (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-13.5 0-3-9-3-9m-9 9c0-13.5 9-3 9-3m-6-9v18" />
                  )}
                </svg>
                <span
                  ref={(el) => { numbersRef.current[i] = el }}
                  className="font-display font-bold text-3xl md:text-4xl text-white"
                >
                  0{stat.suffix}
                </span>
              </div>
              <p className="stat-label font-body text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
