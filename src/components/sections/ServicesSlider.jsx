import { memo } from 'react';
import modularKitchenImg from '../../assets/modular-kitchen.webp';
import acpelvationImg from '../../assets/ACP-elevation.webp';
import falseCeilingImg from '../../assets/false-ceiling-work.webp';

function ServicesSlider({ 
  servicesRef, 
  scrollProgress, 
  onNavigate 
}) {
  return (
    <div 
      ref={servicesRef} 
      id="services" 
      className="relative w-full h-[400vh] bg-luxury-charcoal z-30 shadow-[0_-20px_50px_rgba(22,22,22,0.15)]"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-luxury-charcoal">
        
        {/* Subtle Branding glows behind content */}
        <div className="absolute w-[450px] h-[450px] bg-luxury-red/5 rounded-full blur-[130px] -left-20 top-20 pointer-events-none" />
        <div className="absolute w-[450px] h-[450px] bg-luxury-sage/4 rounded-full blur-[130px] -right-20 bottom-20 pointer-events-none" />

        {/* Horizontal Slide Row - instant 1:1 scroll translation */}
        <div 
          className="flex h-full will-change-transform"
          style={{ 
            transform: `translate3d(-${scrollProgress * 300}vw, 0, 0)`,
            width: '400vw'
          }}
        >
          
          {/* Slide 1: Modular Kitchen */}
          <div className="w-screen h-full flex items-center px-6 md:px-16 lg:px-24">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Text Description */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-luxury-sage" />
                  <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-luxury-sage uppercase">
                    SERVICE 01
                  </span>
                </div>
                
                <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-luxury-cream leading-tight">
                  Modular Kitchen
                </h2>
                <div className="w-16 h-[1px] bg-luxury-cream/15" />
                
                <p className="font-sans text-xs md:text-sm text-luxury-cream/75 leading-relaxed font-light">
                  We design and install modern modular kitchens that are both stylish and functional. Our layouts maximize space and provide smart storage solutions. We use high-quality materials and durable fittings for long-lasting performance. Each kitchen is customized to match the client's taste and lifestyle.
                </p>
                
                <div className="pt-2">
                  <button 
                    onClick={() => onNavigate('services')}
                    className="inline-flex items-center gap-2 font-sans text-[10px] tracking-wider text-luxury-sage font-medium uppercase hover:text-luxury-cream transition-colors group cursor-pointer"
                  >
                    <span>Explore Kitchen Designs</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Framed Visual Showcase */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="relative group w-full lg:w-auto rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-luxury-red/10 rounded-2xl blur-xl pointer-events-none z-10" />
                  <div className="relative overflow-hidden w-full lg:w-[45vw] h-[35vh] lg:h-[60vh] rounded-2xl border border-luxury-cream/10">
                    <img 
                      src={modularKitchenImg} 
                      alt="Modern Modular Kitchen Design" 
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover scale-[1.05]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2: ACP Elevation */}
          <div className="w-screen h-full flex items-center px-6 md:px-16 lg:px-24 bg-[#141414]">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Text Description */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-luxury-sage" />
                  <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-luxury-sage uppercase">
                    SERVICE 02
                  </span>
                </div>
                
                <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-luxury-cream leading-tight">
                  ACP Elevation
                </h2>
                <div className="w-16 h-[1px] bg-luxury-cream/15" />
                
                <p className="font-sans text-xs md:text-sm text-luxury-cream/60 leading-relaxed font-light">
                  We design modern ACP (Aluminium Composite Panel) elevations to enhance the exterior of buildings. Our panels are durable, weather-resistant, and visually appealing. Customized colors, textures, and patterns are available to match the client's style. We focus on quality installation and precise finishing. ACP elevation works add a premium look to any property.
                </p>
                
                <div className="pt-2">
                  <button 
                    onClick={() => onNavigate('services')}
                    className="inline-flex items-center gap-2 font-sans text-[10px] tracking-wider text-luxury-sage font-medium uppercase hover:text-luxury-cream transition-colors group cursor-pointer"
                  >
                    <span>Explore Service</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Framed Visual Showcase */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="relative group w-full lg:w-auto rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-luxury-red/10 rounded-2xl blur-xl pointer-events-none z-10" />
                  <div className="relative overflow-hidden w-full lg:w-[45vw] h-[35vh] lg:h-[60vh] rounded-2xl border border-luxury-cream/10">
                    <img 
                      src={acpelvationImg} 
                      alt="ACP Elevation Design" 
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover scale-[1.05]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3: False Ceiling */}
          <div className="w-screen h-full flex items-center px-6 md:px-16 lg:px-24">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Text Description */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-luxury-sage" />
                  <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-luxury-sage uppercase">
                    SERVICE 03
                  </span>
                </div>
                
                <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-luxury-cream leading-tight">
                    False Ceiling Work
                </h2>
                <div className="w-16 h-[1px] bg-luxury-cream/15" />
                
                <p className="font-sans text-xs md:text-sm text-luxury-cream/60 leading-relaxed font-light">
                  We provide elegant false ceiling solutions that enhance the look and feel of interiors. Our services include gypsum and POP ceiling designs with integrated lighting. False ceilings conceal wiring and improve insulation. We offer modern patterns and durable finishes to suit any décor. Professional installation ensures lasting quality and aesthetics.
                </p>
                
                <div className="pt-2">
                  <button 
                    onClick={() => onNavigate('services')}
                    className="inline-flex items-center gap-2 font-sans text-[10px] tracking-wider text-luxury-sage font-medium uppercase hover:text-luxury-cream transition-colors group cursor-pointer"
                  >
                    <span>Explore Service</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Framed Visual Showcase */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="relative group w-full lg:w-auto rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-luxury-red/10 rounded-2xl blur-xl pointer-events-none z-10" />
                  <div className="relative overflow-hidden w-full lg:w-[45vw] h-[35vh] lg:h-[60vh] rounded-2xl border border-luxury-cream/10">
                    <img 
                      src={falseCeilingImg} 
                      alt="False Ceiling Design" 
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover scale-[1.05]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 4: View Catalog */}
          <div className="w-screen h-full flex items-center px-6 md:px-16 lg:px-24 bg-[#0e0e0e]">
            <div className="max-w-4xl mx-auto w-full text-center space-y-8">
              <div className="flex justify-center items-center gap-3">
                <span className="w-8 h-[1px] bg-luxury-sage" />
                <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-luxury-sage uppercase">
                  OUR SERVICES
                </span>
                <span className="w-8 h-[1px] bg-luxury-sage" />
              </div>
              
              <h2 className="font-display text-3xl md:text-5xl lg:text-7xl font-extralight text-luxury-cream leading-tight tracking-wide">
                Custom Interior Design & Full Catalogs
              </h2>
              
              <p className="font-sans text-xs md:text-sm text-luxury-cream/60 max-w-xl mx-auto leading-relaxed font-light">
                Browse our complete project catalog to see custom layouts, material options, finishes, and timelines for your home or office.
              </p>

              <div className="pt-4">
                <button 
                  onClick={() => onNavigate('services')}
                  className="relative px-8 py-3.5 bg-luxury-cream text-luxury-charcoal font-sans text-xs uppercase tracking-widest font-semibold overflow-hidden group transition-all duration-300 shadow-[0_10px_30px_rgba(131,143,111,0.1)] hover:shadow-[0_10px_35px_rgba(131,143,111,0.2)] cursor-pointer"
                >
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-luxury-cream">
                    Browse Services Catalog
                  </span>
                  <span className="absolute inset-0 bg-luxury-red -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Timeline Bar showing horizontal progress */}
        <div className="absolute bottom-8 left-6 md:left-16 right-6 md:right-16 h-[1px] bg-luxury-cream/10 z-30">
          <div 
            className="h-full bg-luxury-sage will-change-transform"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

      </div>
    </div>
  );
}

export default memo(ServicesSlider);
