import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const freightIcons = [
  // Truck
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>',
  // Package
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>',
  // Route pin
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
  // Warehouse
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M5 21V7l8-4 8 4v14"/><path d="M9 21v-6h6v6"/><path d="M10 9h1v1h-1zM13 9h1v1h-1z"/></svg>',
  // Globe
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>',
  // Clock
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  // Shield
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
  // Container
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 6v12M10 6v12M14 6v12M18 6v12"/></svg>',
  // Checkmark
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>',
  // Barcode
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6h2v12H4zM8 6h1v12H8zM11 6h2v12h-2zM15 6h1v12h-1zM18 6h2v12h-2z"/></svg>',
  // Arrow right
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>',
  // Pallet
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="10" width="18" height="4" rx="1"/><path d="M6 14v4m4-4v4m4-4v4m4-4v4"/></svg>',
]

interface RingIcon {
  el: HTMLDivElement
  angle: number
  speed: number
  ringRadius: number
  ringTiltX: number
  ringTiltZ: number
  iconSize: number
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ringsRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const rotationRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll('.cta-anim')
      if (els) {
        gsap.from(els, { opacity: 0, y: 30, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !ringsRef.current) return

    const width = canvasRef.current.offsetWidth || 800
    const height = canvasRef.current.offsetHeight || 500

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000)
    camera.position.set(0, 0, 600)

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)

    // Icosahedron
    const geo = new THREE.IcosahedronGeometry(100, 1)
    const wire = new THREE.WireframeGeometry(geo)
    const mat = new THREE.LineBasicMaterial({ color: 0xF26522, transparent: true, opacity: 0.5 })
    const lines = new THREE.LineSegments(wire, mat)
    scene.add(lines)

    // One flat ring: [radius, speed, count, iconSize]
    const ringRadius = 230
    const speed = 0.3
    const count = 16
    const iconSize = 18

    const allIcons: RingIcon[] = []

    for (let i = 0; i < count; i++) {
      const div = document.createElement('div')
      div.innerHTML = freightIcons[i % freightIcons.length]
      div.style.color = '#F26522'
      div.style.position = 'absolute'
      div.style.width = `${iconSize}px`
      div.style.height = `${iconSize}px`
      div.style.left = '0'
      div.style.top = '0'
      ringsRef.current!.appendChild(div)

      allIcons.push({
        el: div,
        angle: (Math.PI * 2 * i) / count,
        speed,
        ringRadius,
        ringTiltX: 0,
        ringTiltZ: 0,
        iconSize,
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientY / window.innerHeight - 0.5) * Math.PI * 0.4
      mouseRef.current.targetY = (e.clientX / window.innerWidth - 0.5) * Math.PI * 0.4
    }
    document.addEventListener('mousemove', handleMouseMove)

    let time = 0
    const clock = new THREE.Clock()

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      const dt = clock.getDelta()
      time += dt

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04
      rotationRef.current.x = mouseRef.current.x
      rotationRef.current.y = mouseRef.current.y

      // Sphere rotation
      lines.rotation.x = rotationRef.current.x * 0.2 + Math.sin(time * 0.06) * 0.03
      lines.rotation.y = rotationRef.current.y * 0.2 + time * 0.04

      // Icon orbit — one flat horizontal ring
      allIcons.forEach((icon) => {
        icon.angle += dt * icon.speed

        // Position on flat ring (XZ plane, no tilt)
        const ox = icon.ringRadius * Math.cos(icon.angle)
        const oz = icon.ringRadius * Math.sin(icon.angle)
        const oy = 0

        // Apply global scene rotation
        const rotX = rotationRef.current.x * 0.2 + Math.sin(time * 0.06) * 0.03
        const rotY = rotationRef.current.y * 0.2 + time * 0.04
        const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
        const cosX = Math.cos(rotX), sinX = Math.sin(rotX)

        const rx = ox * cosY - oz * sinY
        const rz = ox * sinY + oz * cosY
        const ry = oy * cosX - rz * sinX
        const rz2 = oy * sinX + rz * cosX

        const scale = 600 / (600 + rz2)
        const sx = rx * scale + width / 2
        const sy = ry * scale + height / 2

        const depthFade = Math.max(0.15, Math.min(1, scale * 0.8))
        const isBehind = rz2 > 80

        icon.el.style.transform = `translate3d(${sx - icon.iconSize / 2}px, ${sy - icon.iconSize / 2}px, 0) scale(${scale})`
        icon.el.style.opacity = String(depthFade * (isBehind ? 0.2 : 1))
        icon.el.style.zIndex = isBehind ? '0' : '3'
        icon.el.style.filter = isBehind ? 'brightness(0.3)' : 'brightness(1.1) drop-shadow(0 0 6px rgba(242,101,34,0.4))'
      })

      renderer.render(scene, camera)
    }

    animate()

    const onResize = () => {
      const w = canvasRef.current?.offsetWidth || 800
      const h = canvasRef.current?.offsetHeight || 500
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geo.dispose()
      wire.dispose()
      mat.dispose()
      allIcons.forEach((ic) => ic.el.remove())
    }
  }, [])

  return (
    <section ref={sectionRef} id="carriers" className="relative w-full min-h-[500px] overflow-hidden bg-brand-dark py-20 md:py-[120px]">
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full" />
        <div ref={ringsRef} className="absolute inset-0 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <h2 className="cta-anim font-display font-bold text-[40px] md:text-[56px] text-white leading-[0.95] tracking-[-0.02em]">
          Ready to Ship Smarter?
        </h2>
        <p className="cta-anim mt-4 font-body text-lg text-white/70 max-w-[520px]">
          Get a free quote in minutes. No obligations, no hidden fees — just competitive rates and reliable service.
        </p>
        <div className="cta-anim mt-10 flex flex-col sm:flex-row gap-4">
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }} className="inline-block font-body font-semibold text-sm uppercase tracking-[0.06em] text-white bg-brand-orange hover:bg-[#FF7A3D] px-9 py-4 rounded-full transition-colors">
            GET A FREE QUOTE
          </a>
          <a href="tel:917-803-3898" className="inline-block font-body font-semibold text-sm uppercase tracking-[0.06em] text-white border border-white/30 hover:border-white/60 px-9 py-4 rounded-full transition-colors">
            CALL US NOW
          </a>
        </div>
      </div>
    </section>
  )
}
