interface BiayaItem {
  name: string;
  amount: string;
  description: string;
}

interface CostProps {
  biaya?: BiayaItem[];
  sectionLabel?: string;
  title?: string;
  subtitle?: string;
  cardTitle?: string;
  cardSubtitle?: string;
  noteTitle?: string;
  noteDescription?: string;
}

export default function Cost({
  biaya = [],
  sectionLabel = "Informasi Biaya",
  title = "Rincian Biaya Pendidikan",
  subtitle = "Investasi terbaik untuk masa depan Ananda. Biaya yang transparan tanpa ada pungutan tersembunyi di kemudian hari.",
  cardTitle = "Komponen Biaya Pendaftaran Baru",
  cardSubtitle = "Tahun Ajaran 2026/2027",
  noteTitle = "Catatan Penting:",
  noteDescription = "Daftar biaya di atas adalah estimasi untuk tahun ajaran baru. Rincian SPP untuk masing-masing jenjang (SMP/SMA/Sederajat) mungkin berbeda. Hubungi panitia penerimaan santri baru untuk informasi program beasiswa dan keringanan biaya."
}: CostProps) {
  // Hitung total biaya (contoh sederhana ambil angka dari string untuk dijumlahkan jika bisa)
  const calculateTotal = () => {
    try {
       const total = biaya.reduce((acc, curr) => {
         // Hapus 'Rp', '.', dan spasi
         const numericStr = curr.amount.replace(/Rp\.?\s?/g, '').replace(/\./g, '');
         const num = parseInt(numericStr);
         return isNaN(num) ? acc : acc + num;
       }, 0);
       
       if (total > 0) {
         return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(total);
       }
    } catch(e) { /* ignore */ }
    
    return null;
  };
  
  const totalAmount = calculateTotal();

  return (
    <section id="biaya" className="py-20 md:py-32 bg-base-200 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/3"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4 animate-bounce">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
             </svg>
             Informasi Biaya
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-6">
            Rincian Biaya Pendidikan
          </h2>
          <p className="text-base-content/70 text-lg">
            Investasi terbaik untuk masa depan Ananda. Biaya yang transparan tanpa ada pungutan tersembunyi di kemudian hari.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-base-100 rounded-3xl shadow-xl shadow-base-content/5 border border-base-200 overflow-hidden">
            
            {/* Table Header / Title Area */}
            <div className="bg-primary/5 px-6 md:px-10 py-6 border-b border-base-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                 <h3 className="text-xl font-bold text-base-content">Komponen Biaya Pendaftaran Baru</h3>
                 <p className="text-sm text-base-content/60 mt-1">Tahun Ajaran 2026/2027</p>
              </div>
              <div className="flex items-center gap-2">
                 <span className="flex h-3 w-3 relative">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                 </span>
                 <span className="text-sm font-medium text-success">Berlaku Saat Ini</span>
              </div>
            </div>
            
            {/* List */}
            <div className="divide-y divide-base-200">
               {biaya.map((item, index) => (
                 <div key={index} className="p-6 md:px-10 md:py-8 flex flex-col hover:bg-base-200/30 transition-colors md:flex-row gap-4 md:items-center justify-between group">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                               <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                         </div>
                         <h4 className="text-lg font-bold text-base-content">{item.name}</h4>
                      </div>
                      <p className="text-base-content/60 ml-0 md:ml-13 text-sm">{item.description}</p>
                    </div>
                    
                    <div className="md:text-right shrink-0 mt-2 md:mt-0 pl-13 md:pl-0">
                       <span className="inline-block px-4 py-2 bg-base-200 rounded-xl font-bold text-lg text-base-content border border-base-300 shadow-sm">
                         {item.amount}
                       </span>
                    </div>
                 </div>
               ))}
            </div>
            
            {/* Summary / Total Footer */}
            {totalAmount && (
               <div className="bg-primary text-primary-content p-6 md:px-10 md:py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xl font-bold">Total Estimasi Biaya</h4>
                    <p className="text-primary-content/80 text-sm mt-1">Estimasi biaya yang disiapkan saat registrasi awal</p>
                  </div>
                  <div className="px-6 py-3 bg-base-100 text-primary rounded-2xl font-black text-2xl shadow-lg border border-primary/20">
                     {totalAmount}
                  </div>
               </div>
            )}
            
          </div>
          
          {/* Note / Disclaimer */}
          <div className="mt-8 flex items-start gap-4 p-6 bg-warning/10 border border-warning/20 rounded-2xl">
             <div className="text-warning shrink-0 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
             </div>
             <div>
               <h5 className="font-bold text-base-content mb-1">{noteTitle}</h5>
               <p className="text-sm text-base-content/70">
                 {noteDescription}
               </p>
             </div>
          </div>
          
        </div>

      </div>
    </section>
  );
}
