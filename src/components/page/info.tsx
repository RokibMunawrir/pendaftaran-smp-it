import { useState, useEffect } from "react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  isImportant?: boolean;
}

export default function Info({ announcements = [] }: { announcements?: Announcement[] }) {

  return (
    <section id="info" className="py-24 bg-base-200/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-info/10 text-info font-medium text-sm mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Pusat Informasi
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pengumuman Terbaru</h2>
          <p className="text-base-content/60 text-lg">
            Pantau terus informasi terkini seputar proses penerimaan santri baru Pondok Pesantren Al-Hikmah.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {announcements.map((item) => (
            <div 
              key={item.id} 
              className={`card bg-base-100 shadow-sm border transition-all hover:shadow-md ${item.isImportant ? 'border-info/30 ring-1 ring-info/10' : 'border-base-300'}`}
            >
              <div className="card-body p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-2">
                        <h3 className="card-title text-xl">{item.title}</h3>
                        {item.isImportant && (
                          <span className="badge badge-error badge-sm">Penting</span>
                        )}
                     </div>
                  </div>
                  <div className="shrink-0 text-sm text-base-content/50 bg-base-200 px-3 py-1 rounded-full w-fit">
                    {item.date}
                  </div>
                </div>
                <p className="text-base-content/80">{item.content}</p>
              </div>
            </div>
          ))}

          {announcements.length === 0 && (
            <div className="text-center py-12 bg-base-100 rounded-2xl border border-base-300">
              <div className="inline-flex w-16 h-16 rounded-full bg-base-200 items-center justify-center text-base-content/30 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-base-content/70">Belum Ada Pengumuman</h3>
              <p className="text-base-content/50 mt-1">Pengumuman terbaru akan muncul di sini.</p>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <a href="/pengumuman" className="btn btn-outline btn-primary gap-2">
            Lihat Semua Pengumuman
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
