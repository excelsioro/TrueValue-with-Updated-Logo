import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const leftEls = sectionRef.current?.querySelectorAll('.about-left-anim')
      if (leftEls) {
        gsap.from(leftEls, {
          opacity: 0,
          x: -40,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        })
      }

      const img = sectionRef.current?.querySelector('.about-img')
      if (img) {
        gsap.from(img, {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
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
      id="about"
      className="w-full bg-brand-light py-20 md:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Text Column - 60% */}
          <div className="lg:col-span-3">
            <span className="about-left-anim block font-body font-medium text-xs uppercase tracking-[0.1em] text-brand-orange mb-4">
              ABOUT US
            </span>
            <h2 className="about-left-anim font-display font-bold text-[36px] md:text-[48px] text-[#111111] leading-[0.95] tracking-[-0.02em]">
              We Don't Just Move Freight. We Move Business Forward.
            </h2>
            <p className="about-left-anim mt-6 font-body text-[17px] text-[#666666] leading-[1.7]">
              Founded on the principle that every shipment matters, TrueValue Logistics is a licensed property broker (USDOT: 4427689) built for shippers who demand reliability and carriers who deserve respect. We combine old-school work ethic with modern technology to deliver seamless logistics solutions across North America.
            </p>
            <p className="about-left-anim mt-4 font-body text-[17px] text-[#666666] leading-[1.7]">
              Our team of experienced brokers negotiates competitive rates, tracks every load in real-time, and ensures your freight arrives on time — every single time.
            </p>
            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="about-left-anim inline-flex items-center gap-2 mt-8 font-body font-semibold text-[13px] uppercase tracking-[0.06em] text-brand-blue group"
            >
              LEARN MORE ABOUT US
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span className="block h-0.5 w-0 group-hover:w-full bg-brand-blue transition-all duration-300 absolute bottom-0 left-0" />
            </a>
          </div>

          {/* Image Column - 40% */}
          <div className="lg:col-span-2">
            <img
              src="/images/img-about.jpg"
              alt="Modern logistics warehouse interior"
              className="about-img w-full aspect-[4/3] object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
