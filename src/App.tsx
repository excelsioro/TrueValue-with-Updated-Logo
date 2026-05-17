import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import TrustBar from './sections/TrustBar'
import About from './sections/About'
import Services from './sections/Services'
import HowItWorks from './sections/HowItWorks'
import CTASection from './sections/CTASection'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as any)
    }
  }, [])

  return (
    <div className="relative">
      <Navigation />
      <Hero />
      <TrustBar />
      <About />
      <Services />
      <HowItWorks />
      <CTASection />
      <Contact />
      <Footer />
    </div>
  )
}
