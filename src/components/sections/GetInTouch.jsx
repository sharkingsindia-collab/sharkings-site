import { useState, useCallback, memo } from 'react';
import ScrollReveal from '../ScrollReveal';
import { sendContactEmail } from '../../utils/emailService';

const FAQ_ITEMS = [
  {
    num: '01',
    question: 'How do we get started with a project?',
    answer: 'We start with a consultation at our Madurai office or Ramanathapuram showroom (or online) to understand what you need, your floorplan, and your budget.'
  },
  {
    num: '02',
    question: 'How long does design and installation take?',
    answer: 'Initial 3D designs take about 7-10 days. Factory manufacturing and on-site installation take around 30-45 business days depending on the project scope.'
  },
  {
    num: '03',
    question: 'Do you offer a warranty on your woodwork?',
    answer: 'Yes! All our modular kitchens and cabinets come with a 10-Year Structural Warranty using reliable hardware brands like Hettich and Blum.'
  },
  {
    num: '04',
    question: 'Can I check material and wood samples in person?',
    answer: 'Definitely. We have over 100+ wood veneers, laminates, quartz, and hardware samples available to inspect in person at both of our branches.'
  }
];

function GetInTouch({ getInTouchRef }) {
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Modular Kitchen',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSubmitError('');

    const phoneDigits = formState.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setSubmitError('Please enter a valid 10-digit phone or WhatsApp number so our team can contact you.');
      return;
    }

    setIsSubmitting(true);
    const res = await sendContactEmail(formState);
    setIsSubmitting(false);

    if (res?.success) {
      setSubmittedName(formState.name);
      setSubmitted(true);
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: 'Modular Kitchen',
        message: ''
      });
    } else {
      setSubmitError(
        res?.message || 'Unable to send your message right now. Please call +91 80980 90204 or message us on WhatsApp.'
      );
    }
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
      className="relative w-full bg-[#fbf9f6] text-luxury-charcoal py-16 sm:py-24 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden z-20 border-t border-black/5"
    >
      {/* Subtle Ambient Glow Orbs */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-[#710014]/[0.03] rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-0 w-[550px] h-[550px] bg-[#838f6f]/[0.04] rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Background Watermark */}
      <div className="absolute font-display text-[16vw] text-[#710014]/[0.025] font-normal select-none pointer-events-none z-0 left-0 top-1/3 whitespace-nowrap">
        GET IN TOUCH
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12 sm:space-y-16">

        {/* Section Header */}
        <ScrollReveal variant="up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-3">
              <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#710014] uppercase">
                CONTACT US
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-medium text-[#1a1a1a] tracking-tight leading-tight">
              Let&apos;s Talk About Your <span className="italic font-medium text-[#710014]">Project</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#333333] leading-relaxed font-normal max-w-2xl mx-auto">
              Planning a new home interior, modular kitchen, or commercial storefront? Drop us a message or give us a call, and our design team will get back to you within 24 hours.
            </p>
          </div>
        </ScrollReveal>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* LEFT COLUMN: Form (7 Cols) */}
          <ScrollReveal variant="left" className="lg:col-span-7">
            <div className="w-full bg-white border border-black/10 rounded-xl p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.05)] relative overflow-hidden space-y-6">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#710014] to-transparent" />

              <div className="border-b border-black/10 pb-4">
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1a1a1a] tracking-tight">
                  Send Us a Message
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#4a4a4a] font-normal mt-1">
                  Fill out the form below and we&apos;ll get in touch with you within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#710014]/10 border border-[#710014]/30 text-[#710014] flex items-center justify-center mx-auto text-2xl">
                    ✓
                  </div>
                  <h4 className="font-display text-2xl sm:text-3xl font-medium text-[#1a1a1a]">
                    Message Sent Successfully
                  </h4>
                  <p className="font-sans text-sm sm:text-base text-[#333333] max-w-md mx-auto font-normal leading-relaxed">
                    Thank you, <span className="text-[#710014] font-semibold">{submittedName}</span>. We have received your inquiry and will call you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 rounded-md bg-[#f6f5f1] border border-black/15 text-[#1a1a1a] text-xs font-sans font-bold tracking-[0.14em] uppercase hover:bg-[#710014] hover:text-white transition-colors touch-manipulation cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  {submitError && (
                    <div
                      role="alert"
                      className="p-4 rounded-lg bg-[#710014]/8 border border-[#710014]/30 text-[#710014] font-sans text-xs sm:text-sm space-y-2"
                    >
                      <p className="font-semibold">{submitError}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                        <a href="tel:+918098090204" className="underline hover:text-[#580010]">
                          Call +91 80980 90204
                        </a>
                        <span>•</span>
                        <a
                          href="https://wa.me/918098094101"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-[#0f7569] hover:text-[#094e46]"
                        >
                          WhatsApp +91 80980 94101
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-xs font-sans font-bold tracking-wider text-[#710014] uppercase block">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="E.g., Rajesh Kumar"
                        value={formState.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-md bg-[#f6f5f1] border border-black/15 text-sm font-sans font-normal text-[#1a1a1a] placeholder:text-black/55 focus:outline-none focus:border-[#710014] transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-xs font-sans font-bold tracking-wider text-[#710014] uppercase block">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formState.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-md bg-[#f6f5f1] border border-black/15 text-sm font-sans font-normal text-[#1a1a1a] placeholder:text-black/55 focus:outline-none focus:border-[#710014] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & Scope */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="contact-phone" className="text-xs font-sans font-bold tracking-wider text-[#710014] uppercase block">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="+91 80980 XXXXX"
                        value={formState.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-md bg-[#f6f5f1] border border-black/15 text-sm font-sans font-normal text-[#1a1a1a] placeholder:text-black/55 focus:outline-none focus:border-[#710014] transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-subject" className="text-xs font-sans font-bold tracking-wider text-[#710014] uppercase block">
                        What do you need? *
                      </label>
                      <select
                        id="contact-subject"
                        value={formState.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-md bg-[#f6f5f1] border border-black/15 text-sm font-sans font-normal text-[#1a1a1a] focus:outline-none focus:border-[#710014] transition-colors cursor-pointer"
                      >
                        <option value="Modular Kitchen">Modular Kitchen</option>
                        <option value="Full Villa Interior">Full Villa / House Interior</option>
                        <option value="Commercial Showroom">Commercial / Office Space</option>
                        <option value="Renovation">General Renovation</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-xs font-sans font-bold tracking-wider text-[#710014] uppercase block">
                      Tell us about your project *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={3}
                      placeholder="Share a bit about your rooms, ideas, or questions..."
                      value={formState.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full px-4 py-3.5 rounded-md bg-[#f6f5f1] border border-black/15 text-sm font-sans font-normal text-[#1a1a1a] placeholder:text-black/55 focus:outline-none focus:border-[#710014] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button & Privacy */}
                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/10">
                    <span className="text-xs font-sans font-medium text-[#4a4a4a]">
                      We respect your privacy. No spam guaranteed.
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#710014] text-white text-xs sm:text-sm font-sans font-bold tracking-[0.14em] uppercase hover:bg-[#580010] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-60 touch-manipulation"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending...</span>
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
          </ScrollReveal>

          {/* RIGHT COLUMN: Contact Info, FAQs, Socials (5 Cols) */}
          <ScrollReveal variant="right" delay={100} className="lg:col-span-5 space-y-6">

            {/* Direct Contacts */}
            <div className="p-6 sm:p-8 rounded-xl bg-white border border-black/10 space-y-5 shadow-[0_15px_45px_rgba(0,0,0,0.04)]">
              <h3 className="font-display text-2xl font-medium text-[#1a1a1a] border-b border-black/10 pb-3">
                Direct Contact
              </h3>

              <div className="space-y-5 font-sans text-xs">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-md bg-[#710014]/8 border border-[#710014]/20 text-[#710014] flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.496-5.263-3.863-6.759-6.759l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-sans font-bold tracking-[0.14em] text-[#710014] uppercase block mb-0.5">CALL US DIRECTLY</span>
                    <a href="tel:+918098090204" className="text-base font-sans font-bold text-[#710014] hover:underline touch-manipulation">
                      +91 80980 90204
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-md bg-[#0f7569]/10 border border-[#0f7569]/25 text-[#0f7569] flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 448 512" className="w-5 h-5 fill-current">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-sans font-bold tracking-[0.14em] text-[#0f7569] uppercase block mb-0.5">WHATSAPP CONSULTATION</span>
                    <a
                      href={`https://wa.me/918098094101?text=${encodeURIComponent(`Hi Sharkings Interiors, I'd like to inquire about ${formState.subject}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-sans font-bold text-[#0f7569] hover:underline touch-manipulation flex flex-wrap items-center gap-2"
                    >
                      <span>+91 80980 94101</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#0f7569]/12 text-[#0f7569] rounded-md">
                        Chat Now
                      </span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-md bg-[#710014]/8 border border-[#710014]/20 text-[#710014] flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-sans font-bold tracking-[0.14em] text-[#710014] uppercase block mb-0.5">EMAIL INQUIRIES</span>
                    <a href="mailto:sharkingsindia@gmail.com" className="text-sm font-sans font-semibold text-[#262626] hover:text-[#710014] transition-colors touch-manipulation">
                      sharkingsindia@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="p-6 sm:p-8 rounded-xl bg-white border border-black/10 space-y-4 shadow-[0_15px_45px_rgba(0,0,0,0.04)]">
              <h3 className="font-display text-2xl font-medium text-[#1a1a1a] border-b border-black/10 pb-3">
                Frequently Asked Questions
              </h3>

              <div className="space-y-3">
                {FAQ_ITEMS.map((item, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div key={item.num} className="border-b border-black/8 pb-3 last:border-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between text-left font-sans text-sm font-semibold text-[#1a1a1a] hover:text-[#710014] transition-colors py-1 cursor-pointer touch-manipulation"
                      >
                        <div className="flex items-center gap-2.5 pr-2">
                          <span className="text-xs font-sans font-bold text-[#710014] bg-[#710014]/10 border border-[#710014]/20 rounded-md px-2 py-0.5">
                            {item.num}
                          </span>
                          <span>{item.question}</span>
                        </div>
                        <span className={`text-[#710014] font-bold text-sm transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                          ▾
                        </span>
                      </button>

                      {isOpen && (
                        <p className="font-sans text-xs sm:text-sm text-[#333333] font-normal leading-relaxed pt-2 pl-9">
                          {item.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="p-6 rounded-xl bg-white border border-black/10 flex items-center justify-between shadow-[0_15px_45px_rgba(0,0,0,0.04)]">
              <span className="font-sans text-xs font-bold tracking-[0.14em] text-[#710014] uppercase">
                Follow Us Online
              </span>

              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.instagram.com/sharkings.interiors/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Sharkings Interiors on Instagram"
                  className="w-10 h-10 rounded-md bg-[#f6f5f1] border border-black/15 text-[#1a1a1a] hover:border-[#710014] hover:bg-[#710014] hover:text-white transition-all flex items-center justify-center touch-manipulation"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}

export default memo(GetInTouch);