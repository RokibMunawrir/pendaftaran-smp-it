import NavbarUser from '../ui/navbar-user';
import TimelineProgress, { type TimelineStep } from '../ui/timeline-progress';

export default function TestSchedule() {
  // Simulated user data
  const user = {
    name: 'Ahmad Rafiqi',
    registrationNumber: 'PPDB-2026-08921',
  };

  const steps: TimelineStep[] = [
    { title: 'Daftar Akun', description: 'Akun berhasil dibuat', status: 'completed', href: '/user/dashboard' },
    { title: 'Lengkapi Biodata', description: 'Isi form data diri santri', status: 'completed', href: '/user/biodata' },
    { title: 'Pembayaran', description: 'Bayar biaya pendaftaran', status: 'completed', href: '/user/payment' },
    { title: 'Upload Berkas', description: 'KK, Akta Kelahiran, dll', status: 'completed', href: '/user/document' },
    { title: 'Tes & Wawancara', description: 'Tes masuk pondok', status: 'current', href: '/user/test' }
  ];

  return (
    <div className="min-h-screen bg-base-200/50">
      <NavbarUser user={user} />
      
      <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 sm:p-10 relative">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl rounded-full pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold text-base-content mb-3 flex items-center gap-3">
              <span className="p-3 bg-primary text-primary-content rounded-xl shadow-lg shadow-primary/30">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </span>
              Jadwal Tes & Wawancara
            </h2>
            <p className="text-base-content/70 text-lg">
              Persiapkan diri Anda sebaik mungkin. Berikut adalah informasi lengkap jadwal dan lokasi pelaksanaan seleksi penerimaan santri baru.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">

            {/* Status Card */}
            <div className="bg-base-100 rounded-[2rem] shadow-xl border border-base-200 overflow-hidden">
              <div className="bg-warning/10 border-b border-warning/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-warning/20 flex items-center justify-center text-warning shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-base-content">Status Tes: Menunggu Jadwal Dilaksanakan</h3>
                    <p className="text-sm text-base-content/70 mt-1">Harap hadir 30 menit sebelum jadwal dimulai untuk registrasi ulang.</p>
                  </div>
                </div>
                <div className="badge badge-warning badge-lg p-4 font-bold shrink-0">Belum Mulai</div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-base-200 w-max pr-8">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  <h3 className="text-xl font-bold text-base-content">Detail Pelaksanaan</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-semibold text-base-content/60 uppercase tracking-wider mb-1">Tanggal</p>
                      <p className="text-lg font-bold text-base-content">Sabtu, 14 Maret 2026</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-base-content/60 uppercase tracking-wider mb-1">Waktu</p>
                      <p className="text-lg font-bold text-base-content">08:00 WIB - Selesai</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-base-content/60 uppercase tracking-wider mb-1">Metode</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-lg font-bold">
                        <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                        Tatap Muka (Offline)
                      </div>
                    </div>
                  </div>

                  <div>
                     <p className="text-sm font-semibold text-base-content/60 uppercase tracking-wider mb-1">Lokasi</p>
                     <div className="bg-base-200/50 p-4 rounded-2xl border border-base-200 h-full">
                       <h4 className="font-bold text-base-content mb-1">Aula Utama Pondok Pesantren</h4>
                       <p className="text-sm text-base-content/70 leading-relaxed mb-4">
                         Jl. KH. Hasyim Asyari No. 123, Desa Sejahtera, Kec. Mandiri, Kab. Berkah, Jawa Tengah 54321
                       </p>
                       <a href="#" className="btn btn-sm btn-outline text-primary border-primary/30 hover:bg-primary hover:border-primary w-full shadow-sm">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                           <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                         </svg>
                         Buka di Google Maps
                       </a>
                     </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Info Materi & Persiapan */}
            <div className="bg-base-100 rounded-[2rem] shadow-xl border border-base-200 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-base-200 w-max pr-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                <h3 className="text-xl font-bold text-base-content">Materi Ujian & Persiapan</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg text-base-content mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
                    Tes Tulis (Akademik & Agama)
                  </h4>
                  <ul className="list-disc list-outside ml-10 text-base-content/70 space-y-1">
                    <li>Pendidikan Agama Islam (PAI) Dasar</li>
                    <li>Matematika Dasar & Logika</li>
                    <li>Bahasa Indonesia</li>
                    <li><span className="font-semibold text-base-content">Alat tulis bawa sendiri</span> (Pensil 2B, Penghapus, Papan Dada).</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-base-content mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-sm">2</span>
                    Tes Lisan (Baca Qur'an & Wawancara)
                  </h4>
                  <ul className="list-disc list-outside ml-10 text-base-content/70 space-y-1">
                    <li>Kemampuan membaca Al-Qur'an (Tajwid & Kelancaran)</li>
                    <li>Hafalan surat-surat pendek (Juz Amma)</li>
                    <li>Wawancara motivasi dan kesiapan mental mondok</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-base-content mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm">3</span>
                    Wawancara Orang Tua/Wali
                  </h4>
                  <ul className="list-disc list-outside ml-10 text-base-content/70 space-y-1">
                    <li>Orang tua diwajibkan hadir mendampingi.</li>
                    <li>Wawancara seputar komitmen orang tua terhadap program pondok.</li>
                    <li>Penjelasan aturan dan tata tertib santri.</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-base-200">
                <a href="#" className="btn btn-primary w-full sm:w-auto shadow-lg shadow-primary/30">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Cetak Kartu Ujian (PDF)
                </a>
              </div>
            </div>

          </div>

          {/* Right Sidebar - Timeline */}
          <div className="lg:col-span-1">
            <TimelineProgress steps={steps} contactUrl="https://wa.me/123456789" />
          </div>
        </div>
        
      </div>
    </div>
  );
}
