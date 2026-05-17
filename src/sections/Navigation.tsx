import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'SHIPPERS', href: '#shippers' },
  { label: 'CARRIERS', href: '#carriers' },
  { label: 'SERVICES', href: '#services' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    gsap.from(navRef.current, {
      opacity: 0,
      duration: 0.6,
      delay: 0.1,
    })
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(10,10,10,0.95)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
      style={{ paddingTop: scrolled ? '12px' : '20px', paddingBottom: scrolled ? '12px' : '20px' }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-12">
        {/* Top row: Logo + Quote button */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="flex items-center gap-0 group">
            {/* Logo Badge */}
            <div
              className="relative flex items-center justify-center px-3 py-2 md:px-4 md:py-2.5 rounded-lg overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #003B5C 0%, #002940 100%)' }}
            >
              {/* Orange left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-orange" />
              {/* Subtle border */}
              <div className="absolute inset-0 rounded-lg border border-white/10" />
              <div className="flex flex-col items-start pl-2">
                <span className="font-display font-bold text-sm md:text-base text-white leading-none tracking-tight">
                  TRUEVALUE
                </span>
                <span className="font-body font-medium text-[8px] md:text-[9px] text-brand-orange uppercase tracking-[0.25em] mt-0.5">
                  LOGISTICS
                </span>
              </div>
            </div>
            {/* Powered by Loadvest */}
            <div className="flex flex-col items-start ml-2.5 border-l border-white/20 pl-2.5">
              <span className="font-body font-semibold text-[9px] md:text-[10px] uppercase tracking-[0.12em] text-brand-orange leading-none">
                Powered by
              </span>
              <span className="font-display font-bold text-xs md:text-sm text-white/90 leading-none mt-0.5 tracking-tight">
                Loadvest
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                className="group relative font-body font-medium text-xs uppercase tracking-[0.08em] text-white/80 hover:text-white transition-colors"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-orange scale-0 group-hover:scale-100 transition-transform" />
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
              className="font-body font-semibold text-xs uppercase tracking-[0.06em] text-white bg-brand-orange hover:bg-brand-blue px-6 py-2.5 rounded-full transition-colors"
            >
              GET A QUOTE
            </a>
          </div>

          {/* Mobile: Get a Quote button only */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
            className="md:hidden font-body font-semibold text-[10px] uppercase tracking-[0.06em] text-white bg-brand-orange hover:bg-brand-blue px-4 py-2 rounded-full transition-colors"
          >
            GET A QUOTE
          </a>
        </div>

        {/* Mobile Nav Links — always visible */}
        <div className="md:hidden flex items-center gap-3 mt-3 overflow-x-auto scrollbar-hide pb-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
              className="flex-shrink-0 font-body font-medium text-[10px] uppercase tracking-[0.08em] text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
