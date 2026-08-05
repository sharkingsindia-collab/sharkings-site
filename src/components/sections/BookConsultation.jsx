import { useState, useRef, useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { sendConsultationEmail } from '../../utils/emailService';

const SPATIAL_SCOPES = [
  {
    id: 'residence',
    title: 'Private Villa / House',
    subtitle: 'Complete Interior & Layout',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    )
  },
  {
    id: 'kitchen',
    title: 'Modular Kitchen',
    subtitle: 'Smart Storage & Hardware',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5A2.25 2.25 0 0 0 18 8.25H6A2.25 2.25 0 0 0 3.75 10.5V21h16.5Z" />
      </svg>
    )
  },
  {
    id: 'commercial',
    title: 'Commercial / Office',
    subtitle: 'Showrooms & Workspaces',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    )
  },
  {
    id: 'living',
    title: 'Living & Bedroom',
    subtitle: 'Custom Woodwork & Ceilings',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M3 17.25c0 .621.504 1.125 1.125 1.125h5.25c.621 0 1.125-.504 1.125-1.125V8.197" />
      </svg>
    )
  }
];

const VENUES = [
  { id: 'madurai', label: 'Madurai Studio', info: 'TNHB Colony, Villapuram' },
  { id: 'ramanathapuram', label: 'Ramanathapuram Studio', info: 'Kenikarai Main Road' },
  // { id: 'virtual', label: 'Virtual Online Call', info: 'Live Video Consultation' }
];

const TIME_SLOTS = ['10:30 AM', '02:00 PM', '05:00 PM', '07:30 PM'];

const BUDGET_TIERS = [
  { label: '₹15L - ₹25L', title: 'Standard Home' },
  { label: '₹25L - ₹45L', title: 'Premium Villa' },
  { label: '₹45L - ₹75L', title: 'Luxury Project' },
  { label: '₹75L+', title: 'Custom Estate' }
];

export default function BookConsultation({ consultationRef, scrollProgress = 0, isDesktop = true, onNavigate }) {
  useScrollReveal();
  const [selectedScope, setSelectedScope] = useState('residence');
  const [selectedVenue, setSelectedVenue] = useState('madurai');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('02:00 PM');
  const [selectedBudgetIdx, setSelectedBudgetIdx] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const portalRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!portalRef.current) return;
    const rect = portalRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 8, y: y * -8 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const randomCode = 'SHARKINGS-' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(randomCode);

    const bookingPayload = {
      ...formData,
      venue: selectedVenue,
      scope: SPATIAL_SCOPES.find(s => s.id === selectedScope)?.title || selectedScope,
      date: selectedDate,
      time: selectedTime,
      budget: `${BUDGET_TIERS[selectedBudgetIdx].label} (${BUDGET_TIERS[selectedBudgetIdx].title})`,
      bookingCode: randomCode
    };

    await sendConsultationEmail(bookingPayload);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section
      ref={consultationRef}
      id="book-consultation"
      className="relative w-full py-28 bg-luxury-charcoal text-luxury-cream overflow-hidden z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.6)]"
    >
      <div
        className="absolute font-display text-[16vw] text-white/[0.012] font-extralight select-none pointer-events-none z-0 left-0 top-1/4 whitespace-nowrap"
        style={{
          transform: `translateX(${(scrollProgress - 0.5) * -140}px)`,
          willChange: 'transform'
        }}
      >
        BOOK CONSULTATION
      </div>

      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-luxury-red/10 rounded-full blur-[160px] animate-ambient-glow pointer-events-none z-0" />
      <div className="absolute bottom-10 right-0 w-[550px] h-[550px] bg-luxury-sage/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-16 lg:px-24 relative z-10 space-y-16">

        {/* SECTION HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-white/10 pb-12 reveal-3d-popup">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-[1px] bg-luxury-sage" />
              <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-luxury-sage uppercase">
                SCHEDULE A VISIT
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-extralight text-luxury-cream leading-[1.06] tracking-wide uppercase">
              Let's Plan Your <span className="italic font-normal text-luxury-sage">Space</span>
            </h2>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <p className="font-sans text-xs md:text-sm text-luxury-cream/70 leading-relaxed font-light">
              Sit down with our design team at our studio to talk about your home, check out real material samples, and review custom 3D layouts together.
            </p>

            <div className="flex items-center gap-4 text-xs font-sans text-luxury-sage font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Studios Open Mon-Sat</span>
              </span>

              {/* <span>Free 45-Min Chat</span> */}
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 rounded-3xl bg-[#1a1b23] border border-white/10 space-y-5 relative overflow-hidden shadow-2xl group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-sage/10 rounded-full blur-2xl group-hover:bg-luxury-sage/20 transition-all pointer-events-none" />

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white/10 border border-white/20 flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
                    alt="Design Team"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div>
                  <span className="text-[9px] font-sans font-bold tracking-widest text-luxury-sage uppercase block">
                    MEET OUR DESIGNERS
                  </span>
                  <h3 className="font-display text-lg font-light text-luxury-cream mt-0.5">
                    One-on-One Consultation
                  </h3>
                  <p className="font-sans text-[10px] text-white/50">Madurai & Ramanathapuram Studios</p>
                </div>
              </div>

              <p className="font-sans text-xs text-luxury-cream/70 font-light leading-relaxed">
                "We keep things simple. Bring your floor plan or ideas, and we'll help you figure out layouts, wood finishes, and budgets with zero pressure."
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-sans text-luxury-cream/60">
                {/* <span>Avg Session: 45 Mins</span> */}
                <span className="text-luxury-sage font-medium">✓ Completely Free</span>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-white/40 uppercase block">
                WHAT HAPPENS DURING YOUR VISIT
              </span>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4 hover:border-white/15 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-luxury-sage/10 border border-luxury-sage/30 flex items-center justify-center text-luxury-sage font-bold text-xs flex-shrink-0 mt-0.5">
                    01
                  </div>
                  <div>
                    <h4 className="font-display text-base font-light text-luxury-cream">Touch & Feel Real Materials</h4>
                    <p className="font-sans text-xs text-white/50 font-light mt-0.5">Explore real wood veneers, handles, and kitchen pull-outs in person.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4 hover:border-white/15 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] font-bold text-xs flex-shrink-0 mt-0.5">
                    02
                  </div>
                  <div>
                    <h4 className="font-display text-base font-light text-luxury-cream">Live 3D Design Preview</h4>
                    <p className="font-sans text-xs text-white/50 font-light mt-0.5">See how your room layout looks on screen with custom lighting and colors.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4 hover:border-white/15 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-luxury-red/10 border border-luxury-red/30 flex items-center justify-center text-luxury-red font-bold text-xs flex-shrink-0 mt-0.5">
                    03
                  </div>
                  <div>
                    <h4 className="font-display text-base font-light text-luxury-cream">Honest Cost Estimate</h4>
                    <p className="font-sans text-xs text-white/50 font-light mt-0.5">Get a clear price breakdown with no hidden surprises or extra charges.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-sans font-bold tracking-widest text-luxury-sage uppercase block">PREFER TO TALK NOW?</span>
                <span className="font-sans text-xs text-white/70">Call our direct studio line</span>
              </div>
              <a
                href="tel:+918098090204"
                className="px-5 py-2.5 rounded-full bg-luxury-sage text-luxury-charcoal text-xs font-sans font-extrabold tracking-wider uppercase hover:bg-white transition-all shadow-md"
              >
                +91 80980 90204
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-7">
            <div
              ref={portalRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: isDesktop ? `perspective(1200px) rotateY(${mouseOffset.x}deg) rotateX(${mouseOffset.y}deg)` : 'none',
                transition: 'transform 0.15s ease-out'
              }}
              className="w-full rounded-[32px] bg-[#1a1b23]/90 border border-white/10 p-6 md:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.7)] relative overflow-hidden backdrop-blur-2xl"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />

              {submitted ? (
                <div className="py-12 px-4 text-center space-y-8">
                  <div className="w-20 h-20 rounded-full bg-[#c5a059]/20 border-2 border-[#c5a059] text-[#c5a059] flex items-center justify-center mx-auto text-3xl shadow-xl shadow-[#c5a059]/20 animate-bounce">
                    ✓
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-luxury-sage uppercase block">
                      BOOKING CONFIRMED
                    </span>
                    <h3 className="font-display text-3xl md:text-4xl font-light text-luxury-cream">
                      We'll See You Soon!
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-white/70 font-light leading-relaxed max-w-md mx-auto">
                      Thank you, <span className="text-white font-semibold">{formData.name || 'Valued Client'}</span>. Your appointment has been booked. We've sent the details to your phone.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 text-left font-sans text-xs shadow-inner">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-[10px] font-mono tracking-widest text-[#c5a059]">BOOKING ID</span>
                      <span className="font-mono text-sm font-bold text-white">{bookingCode}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] text-white/40 block uppercase">LOCATION</span>
                        <span className="font-medium text-white">{VENUES.find(v => v.id === selectedVenue)?.label}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-white/40 block uppercase">PROJECT TYPE</span>
                        <span className="font-medium text-white">{SPATIAL_SCOPES.find(s => s.id === selectedScope)?.title}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-white/40 block uppercase">DATE & TIME</span>
                        <span className="font-medium text-white">{selectedDate || 'Upcoming'} ({selectedTime})</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-white/40 block uppercase">ESTIMATED BUDGET</span>
                        <span className="font-medium text-[#c5a059]">{BUDGET_TIERS[selectedBudgetIdx].label}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-8 py-3.5 rounded-full border border-white/20 text-xs font-sans font-bold tracking-widest uppercase hover:bg-white/10 transition-all cursor-pointer"
                    >
                      BOOK ANOTHER VISIT
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">

                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-luxury-sage uppercase block">
                        QUICK APPOINTMENT FORM
                      </span>
                      <h3 className="font-display text-2xl md:text-3xl font-light text-luxury-cream mt-0.5">
                        Book Your Studio Visit
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-white/30 uppercase hidden sm:inline">
                      QUICK & EASY
                    </span>
                  </div>

                  {/* 1. PROJECT SCOPE */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-sans font-bold tracking-widest text-white/50 uppercase block">
                      1. What are you planning?
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SPATIAL_SCOPES.map((scope) => {
                        const isSelected = selectedScope === scope.id;
                        return (
                          <div
                            key={scope.id}
                            onClick={() => setSelectedScope(scope.id)}
                            className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-3 ${isSelected
                              ? 'bg-[#c5a059]/15 border-[#c5a059] shadow-lg shadow-[#c5a059]/10'
                              : 'bg-white/[0.02] border-white/10 hover:border-white/25'
                              }`}
                          >
                            <div className={`p-2 rounded-xl flex-shrink-0 ${isSelected ? 'bg-[#c5a059] text-luxury-charcoal' : 'bg-white/5 text-luxury-sage'}`}>
                              {scope.icon}
                            </div>
                            <div className="truncate">
                              <h4 className="font-display text-sm font-medium text-luxury-cream truncate">{scope.title}</h4>
                              <p className="font-sans text-[10px] text-white/40 truncate">{scope.subtitle}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. VENUE */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-sans font-bold tracking-widest text-white/50 uppercase block">
                      2. Choose a Studio or Call
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {VENUES.map((venue) => {
                        const isSelected = selectedVenue === venue.id;
                        return (
                          <button
                            key={venue.id}
                            type="button"
                            onClick={() => setSelectedVenue(venue.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${isSelected
                              ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#c5a059] font-bold'
                              : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                              }`}
                          >
                            <div className="text-xs truncate">{venue.label}</div>
                            <div className="text-[9px] text-white/40 truncate">{venue.info}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. DATE & TIME & BUDGET */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-[10px] font-sans font-bold tracking-widest text-white/50 uppercase block">
                        3. Pick Date & Time
                      </label>

                      <input
                        type="date"
                        required
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-[#c5a059]"
                      />

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {TIME_SLOTS.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 rounded-lg text-[11px] font-sans transition-all cursor-pointer ${selectedTime === time
                              ? 'bg-[#c5a059] text-luxury-charcoal font-bold'
                              : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
                              }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-sans font-bold tracking-widest text-white/50 uppercase block">
                        4. Estimated Budget Range
                      </label>

                      <div className="grid grid-cols-2 gap-2">
                        {BUDGET_TIERS.map((tier, idx) => {
                          const isSelected = selectedBudgetIdx === idx;
                          return (
                            <button
                              key={tier.label}
                              type="button"
                              onClick={() => setSelectedBudgetIdx(idx)}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${isSelected
                                ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#c5a059]'
                                : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                                }`}
                            >
                              <div className="text-[11px] font-bold">{tier.label}</div>
                              <div className="text-[9px] text-white/40 truncate">{tier.title}</div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-sans text-white/50 flex items-center justify-between mt-2">
                        <span>Selected Range:</span>
                        <span className="text-[#c5a059] font-semibold">{BUDGET_TIERS[selectedBudgetIdx].label} ({BUDGET_TIERS[selectedBudgetIdx].title})</span>
                      </div>
                    </div>
                  </div>

                  {/* 4. DETAILS */}
                  <div className="space-y-3 pt-2 border-t border-white/10">
                    <label className="text-[10px] font-sans font-bold tracking-widest text-white/50 uppercase block">
                      5. Your Contact Info
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-[#c5a059]"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Mobile Number *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>

                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-none bg-[#c5a059] text-luxury-charcoal text-xs font-sans font-extrabold tracking-widest uppercase hover:bg-white hover:text-luxury-charcoal transition-all duration-300 shadow-xl shadow-[#c5a059]/20 cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-luxury-charcoal border-t-transparent rounded-full animate-spin" />
                        <span>CONFIRMING APPOINTMENT & SENDING EMAIL...</span>
                      </>
                    ) : (
                      <>
                        <span>CONFIRM MY APPOINTMENT</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}