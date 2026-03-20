interface Announcement {
  id: string;
  title: string | null;
  content: string | null;
  isImportant: boolean | null;
  createdAt: Date | string;
}

interface Props {
  announcements: Announcement[];
}

export default function AnnouncementList({ announcements }: Props) {
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section id="announcements" className="py-20 bg-base-100">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-extrabold tracking-tight text-base-content">
              Pusat <span className="text-primary">Pengumuman</span>
            </h2>
            <p className="text-lg text-base-content/60 max-w-2xl">
              Informasi resmi dan berita terbaru seputar pendaftaran santri baru.
            </p>
          </div>
          <div className="hidden md:block">
             <div className="badge badge-outline badge-primary p-4 gap-2 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                </svg>
                {announcements.length} Pengumuman
             </div>
          </div>
        </div>

        {announcements.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {announcements.map((item) => (
              <div
                key={item.id}
                className={`group card bg-base-200/50 hover:bg-base-200 transition-all duration-300 border border-base-300/50 hover:border-primary/30 shadow-sm hover:shadow-xl overflow-hidden ${
                  item.isImportant ? "ring-2 ring-primary/20" : ""
                }`}
              >
                <div className="card-body p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        {item.isImportant && (
                          <div className="badge badge-primary gap-1.5 font-bold uppercase text-[10px] tracking-widest px-2 py-0.5 animate-pulse">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            Penting
                          </div>
                        )}
                        <h3 className="text-2xl font-bold text-base-content group-hover:text-primary transition-colors leading-tight">
                          {item.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-base-content/40">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                         </svg>
                         {formatDate(item.createdAt)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="divider opacity-50 my-2"></div>
                  
                  <div className="prose prose-sm md:prose-base max-w-none text-base-content/70 leading-relaxed">
                    {item.content}
                  </div>
                  
                  <div className="card-actions justify-end mt-6">
                    <button className="btn btn-ghost btn-sm gap-2 text-primary group-hover:translate-x-1 transition-transform">
                      Selengkapnya
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-6 bg-base-200/30 rounded-3xl border-2 border-dashed border-base-300">
            <div className="w-24 h-24 mb-6 text-base-content/10">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-full h-full">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
               </svg>
            </div>
            <h3 className="text-2xl font-bold text-base-content/70">Belum Ada Pengumuman</h3>
            <p className="text-base-content/40 mt-2 text-center max-w-sm">
              Saat ini belum tersedia pengumuman resmi. Silakan cek kembali beberapa saat lagi.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
