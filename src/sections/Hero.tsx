import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const badge = contentRef.current.querySelector('.hero-badge')
    const headline1 = contentRef.current.querySelector('.hero-headline-1')
    const headline2 = contentRef.current.querySelector('.hero-headline-2')
    const sub = contentRef.current.querySelector('.hero-sub')
    const ctas = contentRef.current.querySelector('.hero-ctas')

    const tl = gsap.timeline({ delay: 0.4 })

    tl.from(badge, { opacity: 0, y: 30, duration: 1, ease: 'power3.out' })
      .from(headline1, { opacity: 0, y: 30, duration: 1, ease: 'power3.out' }, '-=0.88')
      .from(headline2, { opacity: 0, y: 30, duration: 1, ease: 'power3.out' }, '-=0.88')
      .from(sub, { opacity: 0, y: 30, duration: 1, ease: 'power3.out' }, '-=0.88')
      .from(ctas, { opacity: 0, y: 30, duration: 1, ease: 'power3.out' }, '-=0.88')

    // Parallax fade on scroll
    gsap.to(contentRef.current, {
      y: -80,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      tl.kill()
    }
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/vid-hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Content Panel */}
      <div
        ref={contentRef}
        className="relative z-[2] w-full max-w-[1280px] mx-auto px-6 md:px-12 pt-20"
      >
        <div
          className="inline-block p-8 md:p-12 rounded-lg max-w-[600px]"
          style={{
            background: 'rgba(0, 59, 92, 0.75)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Badge */}
          <div className="hero-badge inline-block mb-6">
            <span className="inline-block px-3 py-1 text-[11px] font-body font-medium uppercase tracking-[0.1em] text-white border border-white/30 rounded-full">
              LICENSED PROPERTY BROKER
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-white leading-[0.95] tracking-[-0.02em]">
            <span className="hero-headline-1 block text-[42px] md:text-[72px]">
              Freight That
            </span>
            <span className="hero-headline-2 block text-[42px] md:text-[72px] text-brand-orange">
              Moves Business
            </span>
          </h1>

          {/* Subheadline */}
          <p className="hero-sub mt-5 text-base md:text-lg font-body text-white/85 max-w-[480px] leading-relaxed">
            TrueValue Logistics connects shippers with vetted carriers across all 48 states. Licensed, insured, and always on time.
          </p>

          {/* CTAs */}
          <div className="hero-ctas mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
              className="inline-block text-center font-body font-semibold text-sm uppercase tracking-[0.06em] text-white bg-brand-orange hover:bg-brand-blue px-8 py-4 rounded-full transition-colors"
            >
              GET A QUOTE
            </a>
            <a
              href="#carriers"
              onClick={(e) => { e.preventDefault(); scrollTo('#carriers') }}
              className="inline-block text-center font-body font-semibold text-sm uppercase tracking-[0.06em] text-white border border-white/40 hover:border-white/80 px-8 py-4 rounded-full transition-colors"
            >
              BECOME A CARRIER
            </a>
          </div>
          <p className="hero-ctas mt-6 font-body font-semibold text-xs uppercase tracking-[0.15em] text-brand-orange">
            Powered by Loadvest
          </p>
        </div>
      </div>
    </section>
  )
}
