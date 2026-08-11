import { useState, useCallback, memo } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { sendContactEmail } from '../../utils/emailService';

const FAQ_ITEMS = [
  {
    num: '01',
    question: 'How do we get started with a project?',
    answer: 'We start with a friendly chat at our Madurai or Ramanathapuram studios (or online) to understand what you need, your space, and your budget.'
  },
  {
    num: '02',
    question: 'How long does design and installation take?',
    answer: 'Initial 3D designs take about 7-10 days. Factory manufacturing and on-site setup take around 30-45 business days depending on the project size.'
  },
  {
    num: '03',
    question: 'Do you offer a warranty on your woodwork?',
    answer: 'Yes! All our modular kitchens and cabinets come with a 10-Year Structural Warranty using reliable hardware brands like Hettich and Blum.'
  },
  {
    num: '04',
    question: 'Can I check material and wood samples in person?',
    answer: 'Definitely. We have over 100+ wood veneers, laminates, quartz, and hardware samples available to touch and check out at both of our studios.'
  }
];

function GetInTouch({ getInTouchRef }) {
  useScrollReveal();
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Modular Kitchen',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await sendContactEmail(formState);
    setIsSubmitting(false);
    setSubmitted(true);
  }, [formState]);

  const handleInputChange = useCallback((field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  }, []);

  const toggleFaq = useCallback((idx) => {
    setOpenFaqIdx((prev) => (prev === idx ? -1 : idx));
  }, []);

  return (
    <section
      ref={getInTouchRef}
      id="get-in-touch"
      className="relative w-full bg-[#fbf9f6] text-luxury-charcoal py-28 px-6 md:px-16 lg:px-24 overflow-hidden z-20 border-t border-black/5"
    >
      {/* Subtle Ambient Glow Orbs */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-[#710014]/[0.03] rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-0 w-[550px] h-[550px] bg-[#838f6f]/[0.04] rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Background Parallax Watermark */}
      <div className="absolute font-display text-[16vw] text-[#710014]/[0.02] font-extralight select-none pointer-events-none z-0 left-0 top-1/3 whitespace-nowrap">
        GET IN TOUCH
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 reveal-3d-popup">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#710014]/30" />
            <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-[#710014] uppercase">
              CONTACT US
            </span>
            <span className="w-8 h-[1px] bg-[#710014]/30" />
          </div>

          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] tracking-tight">
            Let's Talk About Your <span className="italic font-normal text-[#710014]">Project</span>
          </h2>

          <p className="font-sans text-xs md:text-sm text-luxury-charcoal/70 leading-relaxed font-light max-w-2xl mx-auto">
            Planning a new home interior, modular kitchen, or commercial storefront? Drop us a message or give us a call, and our team will get back to you quickly.
          </p>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* LEFT COLUMN: Form (7 Cols) */}
          <div className="lg:col-span-7 reveal-3d-popup delay-100">
            <div
              className="w-full bg-white border border-black/10 p-6 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.05)] relative overflow-hidden space-y-6"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#710014] to-transparent" />

              <div className="border-b border-black/10 pb-4">
                <h3 className="font-display text-2xl font-light text-[#1a1a1a]">
                  Send Us a Message
                </h3>
                <p className="font-sans text-xs text-luxury-charcoal/60 font-light mt-1">
                  Fill out the form below and we’ll get in touch with you within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#710014]/10 border border-[#710014]/30 text-[#710014] flex items-center justify-center mx-auto text-2xl animate-bounce">
                    ✓
                  </div>
                  <h4 className="font-display text-2xl font-light text-[#1a1a1a]">Message Sent Successfully</h4>
                  <p className="font-sans text-xs md:text-sm text-luxury-charcoal/70 max-w-md mx-auto font-light leading-relaxed">
                    Thank you, <span className="text-[#710014] font-semibold">{formState.name}</span>. We have received your details and will call you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#f6f5f1] border border-black/10 text-luxury-charcoal text-xs font-sans font-bold tracking-widest uppercase hover:bg-[#710014] hover:text-white transition-colors touch-manipulation"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-sans font-bold tracking-wider text-[#710014] uppercase block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="E.g., Rajesh Kumar"
                        value={formState.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 bg-[#f6f5f1] border border-black/10 text-xs md:text-sm font-sans text-[#1a1a1a] placeholder:text-black/30 focus:outline-none focus:border-[#710014] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-sans font-bold tracking-wider text-[#710014] uppercase block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formState.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 bg-[#f6f5f1] border border-black/10 text-xs md:text-sm font-sans text-[#1a1a1a] placeholder:text-black/30 focus:outline-none focus:border-[#710014] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & Scope */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-sans font-bold tracking-wider text-[#710014] uppercase block">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 80980 XXXXX"
                        value={formState.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 bg-[#f6f5f1] border border-black/10 text-xs md:text-sm font-sans text-[#1a1a1a] placeholder:text-black/30 focus:outline-none focus:border-[#710014] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-sans font-bold tracking-wider text-[#710014] uppercase block">
                        What do you need? *
                      </label>
                      <select
                        value={formState.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="w-full px-4 py-3 bg-[#f6f5f1] border border-black/10 text-xs md:text-sm font-sans text-[#1a1a1a] focus:outline-none focus:border-[#710014] transition-colors cursor-pointer"
                      >
                        <option value="Modular Kitchen">Modular Kitchen</option>
                        <option value="Full Villa Interior">Full Villa / House Interior</option>
                        <option value="Commercial Showroom">Commercial / Office Space</option>
                        <option value="Renovation">General Renovation</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-sans font-bold tracking-wider text-[#710014] uppercase block">
                      Tell us about your project *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share a bit about your rooms, ideas, or questions..."
                      value={formState.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full px-4 py-3 bg-[#f6f5f1] border border-black/10 text-xs md:text-sm font-sans text-[#1a1a1a] placeholder:text-black/30 focus:outline-none focus:border-[#710014] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button & Privacy */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/10">
                    <span className="text-xs font-sans text-black/50 font-light">
                      We respect your privacy. No spam guaranteed.
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-4 bg-[#710014] text-white text-xs font-sans font-extrabold tracking-widest uppercase hover:bg-[#580010] transition-all shadow-lg shadow-[#710014]/20 cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-60 touch-manipulation"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>SENDING EMAIL...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

          {/* RIGHT COLUMN: Contact Info, FAQs, Socials (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 reveal-3d-popup delay-200">

            {/* Direct Contacts */}
            <div className="p-6 bg-white border border-black/10 space-y-6 shadow-[0_15px_45px_rgba(0,0,0,0.04)]">
              <h3 className="font-display text-xl font-light text-[#1a1a1a] border-b border-black/10 pb-3">
                Direct Contact
              </h3>

              <div className="space-y-4 font-sans text-xs">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#710014]/5 border border-[#710014]/20 text-[#710014] flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.496-5.263-3.863-6.759-6.759l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-[#710014] uppercase block mb-0.5">CALL US</span>
                    <a href="tel:+918098090204" className="text-sm font-bold text-[#710014] hover:underline touch-manipulation">
                      +91 80980 90204
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#710014]/5 border border-[#710014]/20 text-[#710014] flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-[#710014] uppercase block mb-0.5">EMAIL US</span>
                    <a href="mailto:sharkingsindia@gmail.com" className="text-xs font-medium text-luxury-charcoal/80 hover:text-[#710014] transition-colors touch-manipulation">
                      sharkingsindia@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="p-6 bg-white border border-black/10 space-y-4 shadow-[0_15px_45px_rgba(0,0,0,0.04)]">
              <h3 className="font-display text-xl font-light text-[#1a1a1a] border-b border-black/10 pb-3">
                Frequently Asked Questions
              </h3>

              <div className="space-y-3">
                {FAQ_ITEMS.map((item, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div key={idx} className="border-b border-black/5 pb-3 last:border-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between text-left font-sans text-xs md:text-sm font-semibold text-[#1a1a1a] hover:text-[#710014] transition-colors py-1 cursor-pointer touch-manipulation"
                      >
                        <div className="flex items-center gap-2.5 pr-2">
                          <span className="text-[10px] font-bold text-[#710014] bg-[#710014]/10 border border-[#710014]/20 px-2 py-0.5">
                            {item.num}
                          </span>
                          <span>{item.question}</span>
                        </div>
                        <span className={`text-[#710014] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                          ▾
                        </span>
                      </button>

                      {isOpen && (
                        <p className="font-sans text-xs text-luxury-charcoal/70 font-light leading-relaxed pt-2 pl-8">
                          {item.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="p-6 bg-white border border-black/10 flex items-center justify-between shadow-[0_15px_45px_rgba(0,0,0,0.04)]">
              <span className="font-sans text-xs font-bold tracking-wider text-[#710014] uppercase">
                Follow Us Online
              </span>

              <div className="flex items-center gap-2.5">
                <a href="https://www.instagram.com/sharkings.interiors?igsh=MWwybHhjdWEybDh1MQ==" target="_blank" rel="noreferrer" className="w-9 h-9 bg-[#f6f5f1] border border-black/10 text-luxury-charcoal hover:border-[#710014] hover:bg-[#710014] hover:text-white transition-all flex items-center justify-center touch-manipulation">
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 bg-[#f6f5f1] border border-black/10 text-luxury-charcoal hover:border-[#710014] hover:bg-[#710014] hover:text-white transition-all flex items-center justify-center touch-manipulation">
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" /></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 bg-[#f6f5f1] border border-black/10 text-luxury-charcoal hover:border-[#710014] hover:bg-[#710014] hover:text-white transition-all flex items-center justify-center touch-manipulation">
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default memo(GetInTouch);