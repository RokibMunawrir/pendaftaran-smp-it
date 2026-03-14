import React from 'react';

interface AboutProps {
  title?: string;
  description?: string;
  image?: string;
}

export default function About({
  title = "",
  description = "",
  image = ""
}: AboutProps) {
  return (
    <section id="about" className="py-20 md:py-32 bg-base-100 overflow-hidden relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Content */}
          <div className="w-full lg:w-1/2 relative">
             {/* Decorative Background Element */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-secondary/10 rounded-full blur-2xl"></div>
            
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl shadow-base-content/10 border-4 border-base-100">
              {image ? (
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-auto object-cover aspect-[4/3] transform group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                />
              ) : (
                <div className="w-full h-auto aspect-[4/3] bg-base-200 flex items-center justify-center">
                  <span className="text-base-content/40 font-medium">Image Placeholder</span>
                </div>
              )}
              {/* Overlay Gradient on Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-8 -left-4 lg:-left-8 bg-base-100 p-4 md:p-6 rounded-2xl shadow-xl flex items-center gap-4 animate-float border border-base-200/50">
               <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
               </div>
               <div>
                 <p className="text-xl md:text-2xl font-bold text-base-content">Berkualitas</p>
                 <p className="text-xs md:text-sm text-base-content/60 font-medium">Berdasarkan Sunnah</p>
               </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center mt-8 lg:mt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-6 w-fit">
               <span className="w-2 h-2 rounded-full bg-secondary"></span>
               Mengenal Kami
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-6 leading-tight">
              {title}
            </h2>
            
            <div className="w-20 h-1.5 bg-primary rounded-full mb-8"></div>
            
            <div className="text-base md:text-lg text-base-content/70 leading-relaxed space-y-4">
               {description.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-justify">{paragraph}</p>
               ))}
            </div>

            <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {/* Decorative avatats representing alumni/students */}
                  <img className="w-12 h-12 rounded-full border-2 border-base-100 object-cover" src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Student 1" />
                  <img className="w-12 h-12 rounded-full border-2 border-base-100 object-cover" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Student 2" />
                  <img className="w-12 h-12 rounded-full border-2 border-base-100 object-cover" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Student 3" />
                  <div className="w-12 h-12 rounded-full border-2 border-base-100 bg-base-300 flex items-center justify-center text-xs font-bold text-base-content/70">
                    +1K
                  </div>
                </div>
                <div>
                   <p className="font-semibold text-base-content">Ribuan Santri</p>
                   <p className="text-sm text-base-content/60">Telah bergabung bersama kami</p>
                </div>
            </div>
            
          </div>

        </div>
      </div>
{/* --- Animation Keyframes (Add to global css or via tailwind config if preferred, but adding inline style for self-containment) --- */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
