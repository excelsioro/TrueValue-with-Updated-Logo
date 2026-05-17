import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'Full Truckload (FTL)',
    description: 'Dedicated trucks for your largest shipments. From single loads to ongoing contracts, we match you with the right equipment.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 30h24v-8H6v8zm24 0h6l4-6v-2h-6v8zm-20 4a3 3 0 110 6 3 3 0 010-6zm24 0a3 3 0 110 6 3 3 0 010-6zM2 18h32v4H2z" />
      </svg>
    ),
  },
  {
    title: 'Less-Than-Truckload (LTL)',
    description: 'Cost-effective shipping for smaller loads. We consolidate freight to maximize efficiency and minimize your costs.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 34h8v-6H8v6zm12 0h8v-6h-8v6zm12 0h8v-6h-8v6zM4 20h40v6H4z" />
      </svg>
    ),
  },
  {
    title: 'Expedited Shipping',
    description: 'Time-critical deliveries that cannot wait. Hot shot teams and dedicated express routes for your urgent freight.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M24 4l-4 16h10L20 44l4-18H14L24 4z" />
      </svg>
    ),
  },
  {
    title: 'Flatbed & Heavy Haul',
    description: 'Oversized and overweight loads require expertise. We handle permits, routing, and specialized equipment.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 30h32v-6H4v6zm32 0h4l4-4v-2h-6v6zM8 34a3 3 0 110 6 3 3 0 010-6zm28 0a3 3 0 110 6 3 3 0 010-6z" />
      </svg>
    ),
  },
  {
    title: 'Temperature-Controlled',
    description: 'Reefer trucks for perishable goods, pharmaceuticals, and temperature-sensitive cargo. Monitored from pickup to delivery.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M24 4v8m0 8v8m0 8v8m-8-16h16M8 20h32v20H8z" />
      </svg>
    ),
  },
  {
    title: 'Cross-Border Freight',
    description: 'Seamless shipping between the US and Canada. We handle customs documentation and compliance so you do not have to.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 24h40M24 4v40M8 12l32 24M40 12L8 36" />
      </svg>
    ),
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Text entrance
      const textEls = sectionRef.current?.querySelectorAll('.services-text-anim')
      if (textEls) {
        gsap.from(textEls, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // 3D Carousel Animation
  useEffect(() => {
    if (!carouselRef.current || !sceneRef.current) return

    const cards = sceneRef.current.querySelectorAll('.service-card')
    if (cards.length === 0) return

    const numberOfItems = cards.length
    const degree = 360 / numberOfItems
    const radians = 2 * Math.PI * (1 / numberOfItems)
    const radius = Math.round((250 / 2) / Math.tan(radians / 2)) + 15

    cards.forEach((item, index) => {
      gsap.set(item, {
        transformOrigin: `50% 50% -${radius}px`,
        rotationY: index * degree,
        z: radius,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '280px',
        height: '340px',
        backfaceVisibility: 'hidden',
      } as gsap.TweenVars)
    })

    const tween = gsap.to(sceneRef.current, {
      rotationY: '-=360',
      duration: 24,
      ease: 'none',
      repeat: -1,
      transformOrigin: '50% 50% 0',
    })

    // Pause when not in viewport
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => tween.play(),
      onLeave: () => tween.pause(),
      onEnterBack: () => tween.play(),
      onLeaveBack: () => tween.pause(),
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="w-full bg-brand-dark py-20 md:py-[120px] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="services-text-anim block font-body font-medium text-xs uppercase tracking-[0.1em] text-brand-orange mb-4">
            WHAT WE DO
          </span>
          <h2 className="services-text-anim font-display font-bold text-[36px] md:text-[48px] text-white leading-[0.95] tracking-[-0.02em]">
            Full-Service Freight Solutions
          </h2>
          <p className="services-text-anim mt-4 font-body text-[17px] text-[#999999] max-w-[560px] mx-auto">
            From a single pallet to a full truckload, we handle every shipment with precision and care.
          </p>
        </div>

        {/* 3D Card Carousel */}
        <div
          ref={carouselRef}
          className="relative mx-auto"
          style={{
            perspective: '2000px',
            transformStyle: 'preserve-3d',
            width: '280px',
            height: '380px',
          }}
        >
          <div
            ref={sceneRef}
            className="relative w-full"
            style={{
              transformStyle: 'preserve-3d',
              width: '280px',
              height: '340px',
            }}
          >
            {services.map((service, i) => (
              <div
                key={i}
                className="service-card flex flex-col items-start p-8 rounded-xl border border-white/10"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                }}
              >
                <div className="text-brand-orange mb-4">{service.icon}</div>
                <h3 className="font-display font-semibold text-[22px] text-white mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-[#999999] leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
