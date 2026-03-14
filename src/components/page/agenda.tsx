interface AgendaItem {
  title: string;
  date: string;
  description: string;
}

interface AgendaProps {
  agenda?: AgendaItem[];
  sectionLabel?: string;
  title?: string;
  subtitle?: string;
}

export default function Agenda({
  agenda = [],
  sectionLabel = "Jadwal & Agenda",
  title = "Alur Pendaftaran Santri",
  subtitle = "Berikut adalah tahapan dan jadwal penting dalam proses penerimaan santri baru. Pastikan Anda tidak melewatkan tangga-tanggal di bawah ini."
}: AgendaProps) {
  return (
    <section id="agenda" className="py-20 md:py-32 bg-base-100 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
             <span className="w-2 h-2 rounded-full bg-secondary"></span>
             {sectionLabel}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-6">
            {title}
          </h2>
          <p className="text-base-content/70 text-lg">
            {subtitle}
          </p>
        </div>

        {/* Timeline Desktop & Tablet */}
        <div className="relative max-w-5xl mx-auto">
           {/* Vertical Line */}
           <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-base-300 transform -translate-x-1/2 rounded-full"></div>
           
           <div className="space-y-12 md:space-y-16 relative">
              {agenda.map((item, index) => {
                 const isEven = index % 2 === 0;
                 return (
                    <div key={index} className="relative flex flex-col md:flex-row items-center w-full">
                       
                       {/* Mobile Step Counter (Replaces Center Counter on small screens) */}
                       <div className="md:hidden absolute -top-5 left-4 w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center text-lg font-bold shadow-lg border-2 border-base-100 z-10">
                          {index + 1}
                       </div>

                       {/* Left specific block */}
                       <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right' : 'md:hidden'}`}>
                          {isEven && (
                            <div className="relative p-6 md:p-8 rounded-3xl bg-base-100 border border-base-200 shadow-xl group hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 mt-6 md:mt-0 ml-8 md:ml-0">
                               {/* Dot */}
                               <div className="hidden md:block absolute top-1/2 -right-6 w-4 h-4 bg-primary rounded-full transform -translate-y-1/2 translate-x-1/2"></div>
                               
                               <div className="inline-block mb-3 px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-sm font-bold border border-primary/20">
                                  {item.date}
                               </div>
                               <h3 className="text-xl md:text-2xl font-bold text-base-content mb-2">{item.title}</h3>
                               <p className="text-base-content/60 text-sm md:text-base">{item.description}</p>
                            </div>
                          )}
                       </div>
                       
                       {/* Center Counter (Desktop only) */}
                       <div className="hidden md:flex w-2/12 justify-center shrink-0">
                          <div className="w-14 h-14 rounded-full bg-primary text-primary-content flex items-center justify-center text-xl font-bold shadow-lg relative z-10 border-4 border-base-100">
                             {index + 1}
                          </div>
                       </div>

                       {/* Right specific block */}
                       <div className={`w-full md:w-5/12 ${!isEven ? 'md:text-left' : 'md:hidden'}`}>
                          {!isEven && (
                            <div className="relative p-6 md:p-8 rounded-3xl bg-base-100 border border-base-200 shadow-xl group hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 mt-6 md:mt-0 ml-8 md:ml-0">
                               {/* Dot */}
                               <div className="hidden md:block absolute top-1/2 -left-6 w-4 h-4 bg-primary rounded-full transform -translate-y-1/2 -translate-x-1/2"></div>
                               
                               <div className="inline-block mb-3 px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-sm font-bold border border-primary/20">
                                  {item.date}
                               </div>
                               <h3 className="text-xl md:text-2xl font-bold text-base-content mb-2">{item.title}</h3>
                               <p className="text-base-content/60 text-sm md:text-base">{item.description}</p>
                            </div>
                          )}
                          {/* Mobile display for even index - since left block is hidden on mobile for even */}
                          {isEven && (
                             <div className="md:hidden relative p-6 md:p-8 rounded-3xl bg-base-100 border border-base-200 shadow-xl group mt-6 ml-8">
                               <div className="inline-block mb-3 px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-sm font-bold border border-primary/20">
                                  {item.date}
                               </div>
                               <h3 className="text-xl md:text-2xl font-bold text-base-content mb-2">{item.title}</h3>
                               <p className="text-base-content/60 text-sm md:text-base">{item.description}</p>
                            </div>
                          )}
                       </div>
                       
                    </div>
                 );
              })}
           </div>
        </div>

      </div>
    </section>
  );
}
