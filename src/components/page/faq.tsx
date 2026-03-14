import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  faq?: FaqItem[];
  sectionLabel?: string;
  title?: string;
  subtitle?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaLink?: string;
}

export default function FAQ({
  faq = [],
  sectionLabel = "FAQ",
  title = "Pertanyaan yang Sering Diajukan",
  subtitle = "Temukan jawaban dari pertanyaan yang sering ditanyakan oleh calon wali santri. Jika Anda tidak menemukan jawaban yang Anda cari, jangan ragu untuk menghubungi kami.",
  ctaTitle = "Punya pertanyaan lain?",
  ctaDescription = "Hubungi tim administrasi kami melalui WhatsApp untuk informasi lebih detail.",
  ctaButtonText = "Hubungi Admin",
  ctaLink = "#contact"
}: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Buka item pertama secara default

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-base-100 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
           {/* Section Header (Left Side on Desktop) */}
           <div className="w-full lg:w-5/12 lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-6">
                 <span className="w-2 h-2 rounded-full bg-secondary"></span>
                 {sectionLabel}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-6 leading-tight">
                {title}
              </h2>
              <p className="text-base-content/70 text-lg mb-8 leading-relaxed">
                {subtitle}
              </p>
              
              {/* Contact CTA */}
              <div className="bg-base-200 p-6 md:p-8 rounded-3xl border border-base-300">
                <h4 className="font-bold text-lg mb-2">{ctaTitle}</h4>
                <p className="text-base-content/60 text-sm mb-6">{ctaDescription}</p>
                <a 
                  href={ctaLink} 
                  className="btn btn-outline btn-block rounded-xl border-base-content/20 hover:bg-base-content hover:text-base-100 transition-colors"
                >
                  {ctaButtonText}
                </a>
              </div>
           </div>

           {/* Accordion Area (Right Side on Desktop) */}
           <div className="w-full lg:w-7/12">
             <div className="space-y-4">
               {faq.map((item, index) => (
                 <div 
                   key={index} 
                   className={`
                     bg-base-100 border rounded-2xl overflow-hidden transition-all duration-300
                     ${openIndex === index ? 'border-primary/50 shadow-md shadow-primary/5' : 'border-base-200 hover:border-base-300'}
                   `}
                 >
                   <button 
                     onClick={() => toggleAccordion(index)}
                     className="flex items-center justify-between w-full p-5 md:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                   >
                     <span className={`font-bold text-lg pr-8 ${openIndex === index ? 'text-primary' : 'text-base-content'}`}>
                       {item.question}
                     </span>
                     <div className={`
                       shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                       ${openIndex === index ? 'bg-primary text-primary-content rotate-180' : 'bg-base-200 text-base-content/50'}
                     `}>
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                       </svg>
                     </div>
                   </button>
                   
                   <div 
                     className={`
                       transition-all duration-300 ease-in-out overflow-hidden
                       ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                     `}
                   >
                     <div className="p-5 md:p-6 pt-0 text-base-content/70 leading-relaxed border-t border-base-200/50 mt-1">
                       {item.answer}
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>

        </div>

      </div>
    </section>
  );
}
