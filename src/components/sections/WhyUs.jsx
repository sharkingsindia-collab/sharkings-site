import { memo } from 'react';
import news1Img from '../../assets/news-1.webp';
import news2Img from '../../assets/news-2.webp';
import news3Img from '../../assets/news-3.webp';

const STEPS = [
  {
    num: '01',
    tag: 'OUR TEAM',
    title: 'Experienced Design & Build Team',
    description: 'Our team brings 15+ years of experience in residential, office, and commercial interior design. We work directly with you to plan every detail.',
    pill: 'HOMES, OFFICES & COMMERCIAL SPACES',
    image: news1Img,
    alt: 'Experienced interior design and build team by Sharkings Interiors & Exteriors'
  },
  {
    num: '02',
    tag: 'FACTORY & MATERIALS',
    title: 'Quality Materials & Factory Finish',
    description: 'We manufacture all modular furniture and cabinets in our own factory using water-resistant marine plywood and premium fittings built to last.',
    pill: 'WATER-RESISTANT MARINE PLYWOOD',
    image: news2Img,
    alt: 'Quality factory materials and modular furniture finish'
  },
  {
    num: '03',
    tag: 'PROJECT PLANNING',
    title: '3D Design Preview & Timely Delivery',
    description: 'See your exact space in 3D before production starts. We follow a clear timeline so your project gets completed on schedule without hassle.',
    pill: '3D PREVIEW & ON-TIME COMPLETION',
    image: news3Img,
    alt: 'Custom 3D interior design preview and project planning'
  }
];

function WhyUs({ whyUsRef }) {
  return (
    <section 
      ref={whyUsRef}
      id="why-us" 
      className="relative w-full min-h-screen flex flex-col justify-center py-12 lg:py-16 px-4 sm:px-8 lg:px-16 xl:px-24 bg-luxury-cream text-luxury-charcoal z-30 shadow-[0_-20px_50px_rgba(22,22,22,0.05)] overflow-hidden"
    >
      {/* Watermark Typography */}
      <div 
        className="absolute font-display text-[14vw] text-luxury-charcoal/[0.025] font-extralight select-none pointer-events-none z-0 right-4 top-1/2 -translate-y-1/2"
      >
        SHARKINGS
      </div>

      <div 
        className="max-w-7xl mx-auto w-full my-auto space-y-6 sm:space-y-8 relative z-10"
      >
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-[1px] bg-[#710014]" />
            <span className="font-sans text-xs font-extrabold tracking-[0.3em] text-[#710014] uppercase">
              WHY CHOOSE US
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-luxury-charcoal leading-tight tracking-wide">
            Why Work With Sharkings Interiors?
          </h2>

          <p className="font-sans text-sm sm:text-base text-luxury-charcoal/80 leading-relaxed font-medium max-w-2xl">
            We handle design, factory manufacturing, and installation for homes, offices, and commercial spaces in Madurai and Ramanathapuram.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
          {STEPS.map((step, idx) => {
            const isCenter = idx === 1;

            return (
              <div 
                key={step.num}
                className={`p-5 sm:p-6 rounded-2xl flex flex-col justify-between space-y-5 transition-[transform,box-shadow] duration-300 ease-out cursor-pointer group hover:-translate-y-1.5 transform-gpu touch-manipulation ${
                  isCenter
                    ? 'bg-[#710014] text-white border border-[#710014] shadow-[0_20px_40px_rgba(113,0,20,0.25)] hover:shadow-[0_25px_50px_rgba(113,0,20,0.35)]'
                    : 'bg-white text-luxury-charcoal border border-black/10 shadow-[0_10px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)]'
                }`}
              >
                <div className="space-y-4">
                  {/* Tag & Step Number */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-sans font-extrabold tracking-[0.2em] px-3 py-1 rounded-full uppercase ${
                      isCenter
                        ? 'bg-white/15 text-white border border-white/20'
                        : 'bg-[#710014]/10 text-[#710014] border border-[#710014]/20'
                    }`}>
                      {step.tag}
                    </span>
                    <span className={`font-display text-xl font-light transition-colors duration-200 ${
                      isCenter ? 'text-[#c5a059]' : 'text-[#710014]/40 group-hover:text-[#710014]'
                    }`}>
                      {step.num}
                    </span>
                  </div>

                  {/* Image Accent */}
                  <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden border border-black/5">
                    <img 
                      src={step.image} 
                      alt={step.alt}
                      width="400"
                      height="225"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transform transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t pointer-events-none ${
                      isCenter ? 'from-[#710014]/60 via-transparent to-transparent' : 'from-black/30 via-transparent to-transparent'
                    }`} />
                  </div>

                  {/* Card Title */}
                  <h3 className={`font-display text-2xl sm:text-3xl font-normal leading-snug ${
                    isCenter ? 'text-white' : 'text-[#710014]'
                  }`}>
                    {step.title}
                  </h3>

                  {/* Card Description */}
                  <p className={`font-sans text-sm leading-relaxed font-medium ${
                    isCenter ? 'text-white/85' : 'text-luxury-charcoal/80'
                  }`}>
                    {step.description}
                  </p>
                </div>

                {/* Card Footer Pill */}
                <div className={`pt-3.5 border-t font-sans text-xs font-bold tracking-wider uppercase ${
                  isCenter
                    ? 'border-white/20 text-[#c5a059]'
                    : 'border-black/10 text-[#710014]'
                }`}>
                  ✓ {step.pill}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default memo(WhyUs);

