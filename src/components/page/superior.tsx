interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface SuperiorProps {
  features?: FeatureItem[];
  sectionLabel?: string;
  title?: string;
  subtitle?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function Superior({
  features = [],
  sectionLabel = "Keunggulan Kami",
  title = "Mengapa Memilih Kami?",
  subtitle = "Kami menawarkan lingkungan pendidikan yang komprehensif, menggabungkan kurikulum modern dengan nilai-nilai pesantren yang otentik untuk mencetak generasi berprestasi.",
  ctaTitle = "Siap bergabung bersama kami?",
  ctaSubtitle = "Pendaftaran gelombang pertama segera ditutup.",
  ctaText = "Daftar Sekarang",
  ctaLink = "/register"
}: SuperiorProps) {
  return (
    <section id="features" className="py-20 md:py-32 bg-base-200 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
             <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
             {sectionLabel}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-6">
            {title}
          </h2>
          <p className="text-base-content/70 text-lg">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-base-100 rounded-3xl p-8 shadow-xl shadow-base-content/5 border border-base-100 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden flex flex-col items-center text-center"
            >
              {/* Subtle hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon Container */}
              <div className="w-20 h-20 rounded-2xl bg-base-200 group-hover:bg-primary group-hover:text-primary-content transition-colors duration-300 flex items-center justify-center text-4xl mb-6 shadow-sm relative z-10">
                {feature.icon || "✨"}
              </div>
              
              {/* Feature Text */}
              <h3 className="text-xl font-bold text-base-content mb-3 relative z-10">
                {feature.title}
              </h3>
              
              <p className="text-base-content/60 leading-relaxed text-sm relative z-10">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action Bar */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-between bg-primary text-primary-content rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
           {/* Decorative circles in CTA */}
           <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
           <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>
           
           <div className="relative z-10 mb-6 sm:mb-0 text-center sm:text-left">
             <h3 className="text-2xl md:text-3xl font-bold mb-2">{ctaTitle}</h3>
             <p className="text-primary-content/80 text-lg">{ctaSubtitle}</p>
           </div>
           
           <a 
             href={ctaLink} 
             className="relative z-10 btn btn-base-100 text-primary border-none hover:scale-105 transition-transform shadow-lg rounded-full px-8 whitespace-nowrap"
           >
             {ctaText}
           </a>
        </div>
        
      </div>
    </section>
  );
}
