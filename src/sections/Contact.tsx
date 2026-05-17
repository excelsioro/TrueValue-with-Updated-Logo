import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const leftEls = sectionRef.current?.querySelectorAll('.contact-left-anim')
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

      const rightEl = sectionRef.current?.querySelector('.contact-right-anim')
      if (rightEl) {
        gsap.from(rightEl, {
          opacity: 0,
          x: 40,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', company: '', message: '' })
    }, 3000)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full bg-brand-blue py-20 md:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column */}
          <div>
            <span className="contact-left-anim block font-body font-medium text-xs uppercase tracking-[0.1em] text-brand-orange mb-4">
              GET IN TOUCH
            </span>
            <h2 className="contact-left-anim font-display font-bold text-[36px] md:text-[48px] text-white leading-[0.95] tracking-[-0.02em]">
              Let's Talk Logistics
            </h2>
            <p className="contact-left-anim mt-5 font-body text-[17px] text-white/80 leading-relaxed">
              Whether you're a shipper looking for reliable transport or a carrier seeking quality loads, our team is ready to help.
            </p>

            {/* Contact Details */}
            <div className="contact-left-anim mt-10 flex flex-col gap-6">
              <a href="tel:917-803-3898" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <span className="block font-body font-semibold text-lg md:text-xl text-white">917-803-3898</span>
                  <span className="block font-body text-sm text-white/60">Call anytime, 24/7</span>
                </div>
              </a>

              <a href="mailto:TrueValueLogistics.US@gmail.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <span className="block font-body text-base md:text-lg text-white/80">TrueValueLogistics.US@gmail.com</span>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="block font-body text-sm text-white/60 uppercase tracking-wider">Head Office</span>
                  <span className="block font-body text-base text-white/80">201 Portage Ave Suite 1800<br />Winnipeg, MB R38 3K6 Canada</span>
                  <span className="block font-body text-sm text-white/60 uppercase tracking-wider mt-2">New York Office</span>
                  <span className="block font-body text-base text-white/80">117-15 149th Road<br />Jamaica, NY 11434</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="contact-right-anim">
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-10"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-orange/20 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-white mb-2">Message Sent!</h3>
                  <p className="font-body text-white/70">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-body text-xs uppercase tracking-wider text-white/60 mb-2">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/[0.08] border border-white/15 rounded-lg text-white placeholder-white/40 px-4 py-3.5 font-body text-[15px] focus:outline-none focus:border-brand-orange transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs uppercase tracking-wider text-white/60 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/[0.08] border border-white/15 rounded-lg text-white placeholder-white/40 px-4 py-3.5 font-body text-[15px] focus:outline-none focus:border-brand-orange transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-body text-xs uppercase tracking-wider text-white/60 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/[0.08] border border-white/15 rounded-lg text-white placeholder-white/40 px-4 py-3.5 font-body text-[15px] focus:outline-none focus:border-brand-orange transition-colors"
                        placeholder="(555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs uppercase tracking-wider text-white/60 mb-2">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-white/[0.08] border border-white/15 rounded-lg text-white placeholder-white/40 px-4 py-3.5 font-body text-[15px] focus:outline-none focus:border-brand-orange transition-colors"
                        placeholder="Your company"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block font-body text-xs uppercase tracking-wider text-white/60 mb-2">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/[0.08] border border-white/15 rounded-lg text-white placeholder-white/40 px-4 py-3.5 font-body text-[15px] focus:outline-none focus:border-brand-orange transition-colors resize-none"
                      placeholder="Tell us about your freight needs..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-orange hover:bg-[#FF7A3D] text-white font-body font-semibold text-sm uppercase tracking-[0.06em] py-4 rounded-lg transition-colors"
                  >
                    SEND MESSAGE
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
