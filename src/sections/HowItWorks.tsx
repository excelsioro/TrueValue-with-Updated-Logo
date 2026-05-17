import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Tell Us What You\'re Shipping',
    body: 'Share your freight details — origin, destination, weight, and timeline. We\'ll get you a competitive rate within minutes.',
    cta: 'GET STARTED',
  },
  {
    number: '02',
    title: 'We Find the Perfect Carrier',
    body: 'Our network of 10,000+ vetted carriers means we match your freight with the right truck, every time.',
    cta: 'OUR NETWORK',
  },
  {
    number: '03',
    title: 'Real-Time Tracking to Delivery',
    body: 'Follow your shipment from pickup to drop-off. Our team monitors every mile to ensure on-time delivery.',
    cta: 'TRACK A SHIPMENT',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const headerEls = sectionRef.current?.querySelectorAll('.hiw-header-anim')
      if (headerEls) {
        gsap.from(headerEls, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        })
      }

      const cards = sectionRef.current?.querySelectorAll('.hiw-card')
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="shippers"
      className="w-full bg-brand-light py-20 md:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="hiw-header-anim block font-body font-medium text-xs uppercase tracking-[0.1em] text-brand-orange mb-4">
            HOW IT WORKS
          </span>
          <h2 className="hiw-header-anim font-display font-bold text-[36px] md:text-[48px] text-[#111111] leading-[0.95] tracking-[-0.02em]">
            Three Steps to Smarter Shipping
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="hiw-card bg-white rounded-xl p-8 md:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-shadow"
            >
              <span className="font-display font-bold text-[48px] text-brand-orange/30 leading-none">
                {step.number}
              </span>
              <h3 className="font-display font-semibold text-[22px] text-[#111111] mt-4 mb-3">
                {step.title}
              </h3>
              <p className="font-body text-[15px] text-[#666666] leading-relaxed mb-6">
                {step.body}
              </p>
              <span className="inline-flex items-center font-body font-semibold text-[13px] uppercase tracking-[0.06em] text-brand-blue cursor-pointer group">
                {step.cta}
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
