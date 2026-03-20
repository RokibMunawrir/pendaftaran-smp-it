import NavbarUser from '../ui/navbar-user';
import TimelineProgress, { type TimelineStep } from '../ui/timeline-progress';
import { REGISTRATION_STATUS } from '../../lib/utils/status';

interface AgendaItem {
  title: string;
  date: string;
  description: string;
}

interface MaterialItem {
  title: string;
  items: string[];
}

interface TesScheduleData {
  date?: string;
  time?: string;
  endTime?: string;
  location?: string;
  address?: string;
  mapsUrl?: string;
  method?: string;
  materials?: MaterialItem[];
  preparations?: string[];
  notes?: string;
}

interface TestScheduleProps {
  user: {
    name: string;
    registrationNumber: string | null;
  };
  registration: any;
  agenda: any;
  tesSchedule?: any;
  steps: TimelineStep[];
}

export default function TestSchedule({ user, registration, agenda, tesSchedule: rawTesSchedule, steps }: TestScheduleProps) {
  // Parse tesSchedule from admin settings
  const tesSchedule: TesScheduleData | null = rawTesSchedule
    ? (typeof rawTesSchedule === 'string' ? (() => { try { return JSON.parse(rawTesSchedule); } catch { return null; } })() : rawTesSchedule)
    : null;

  // Convert agenda to array if it's JSON string or something else
  const agendaItems: AgendaItem[] = Array.isArray(agenda) ? agenda : [];
  
  // Find test schedule from agenda (fallback)
  const testAgenda = agendaItems.find(a => 
    a.title.toLowerCase().includes('tes') || 
    a.title.toLowerCase().includes('wawancara') ||
    a.title.toLowerCase().includes('seleksi')
  );

  // Derive display values from tesSchedule (admin) or fallback to agenda
  const displayDate = tesSchedule?.date
    ? new Date(tesSchedule.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : (testAgenda ? testAgenda.date : "Akan Segera Diumumkan");
  const displayTime = tesSchedule?.time && tesSchedule?.endTime
    ? `${tesSchedule.time} - ${tesSchedule.endTime} WIB`
    : (tesSchedule?.time ? `${tesSchedule.time} WIB` : "");
  const displayLocation = tesSchedule?.location || "Aula Utama Pondok Pesantren";
  const displayAddress = tesSchedule?.address || "";
  const displayMapsUrl = tesSchedule?.mapsUrl || "https://maps.google.com";
  const displayMethod = tesSchedule?.method || "Tatap Muka (Offline)";
  const displayMaterials = tesSchedule?.materials && tesSchedule.materials.length > 0 ? tesSchedule.materials : null;
  const displayPreparations = tesSchedule?.preparations && tesSchedule.preparations.length > 0 ? tesSchedule.preparations : null;
  const displayNotes = tesSchedule?.notes || "";

  const isAccepted = registration?.status?.toUpperCase() === REGISTRATION_STATUS.ACCEPTED;
  const isTestStage = registration?.status?.toUpperCase() === REGISTRATION_STATUS.TEST_INTERVIEW || registration?.status?.toUpperCase() === REGISTRATION_STATUS.VERIFYING;

  const handlePrintSchedule = () => {
    window.open('/user/print/schedule', '_blank');
  };

  const handlePrintAcceptance = () => {
    window.open('/user/print/acceptance', '_blank');
  };

  return (
    <div className="min-h-screen bg-base-200/50">
      <NavbarUser user={user} />
      
      <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 sm:p-10 relative">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold text-base-content mb-3 flex items-center gap-3">
              <span className="p-3 bg-primary text-primary-content rounded-xl shadow-lg shadow-primary/30">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </span>
              {isAccepted ? "Selamat! Anda Diterima" : "Jadwal Tes & Wawancara"}
            </h2>
            <p className="text-base-content/70 text-lg">
              {isAccepted 
                ? "Selamat bergabung di keluarga besar Pondok Pesantren kami. Silakan unduh bukti penerimaan Anda di bawah ini."
                : "Persiapkan diri Anda sebaik mungkin. Berikut adalah informasi lengkap jadwal dan lokasi pelaksanaan seleksi penerimaan santri baru."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">

            {/* Status Card */}
            <div className="bg-base-100 rounded-[2rem] shadow-xl border border-base-200 overflow-hidden">
              <div className={`${isAccepted ? 'bg-success/10 border-success/20' : 'bg-warning/10 border-warning/20'} border-b p-6 flex flex-col sm:flex-row items-center justify-between gap-4`}>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full ${isAccepted ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'} flex items-center justify-center shrink-0`}>
                    {isAccepted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-base-content">
                      {isAccepted ? "Status: Diterima" : "Status Tes: Menunggu Jadwal Dilaksanakan"}
                    </h3>
                    <p className="text-sm text-base-content/70 mt-1">
                      {isAccepted 
                        ? "Anda telah resmi dinyatakan sebagai santri baru. Silakan ikuti petunjuk selanjutnya."
                        : "Harap hadir 30 menit sebelum jadwal dimulai untuk registrasi ulang."}
                    </p>
                  </div>
                </div>
                <div className={`badge ${isAccepted ? 'badge-success' : 'badge-warning'} badge-lg p-4 font-bold shrink-0`}>
                  {isAccepted ? "Diterima" : "Belum Mulai"}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-base-200 w-max pr-8">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  <h3 className="text-xl font-bold text-base-content">
                    {isAccepted ? "Informasi Kelulusan" : "Detail Pelaksanaan"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {isAccepted ? (
                    <div className="col-span-2 space-y-6">
                      <div className="p-6 bg-success/5 rounded-2xl border border-success/10 space-y-4">
                        <div className="flex items-center justify-between border-b border-success/10 pb-4">
                          <span className="text-base-content/60">Nomor Pendaftaran</span>
                          <span className="font-bold">{user.registrationNumber}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-success/10 pb-4">
                          <span className="text-base-content/60">Nama Lengkap</span>
                          <span className="font-bold uppercase">{user.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-base-content/60">Status Akhir</span>
                          <span className="badge badge-success text-white font-bold">LULUS / DITERIMA</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={handlePrintAcceptance} className="btn btn-primary flex-1 shadow-lg shadow-primary/30">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.821 21 7.5l-14.28 6.321ZM19.7 5.3a2.25 2.25 0 0 1 0 3.182L15 13.182l-2.5-2.5.821-3.679ZM15 13.182l-6.321 6.321-2.5-2.5L7.5 12.5l7.5.682Z" />
                          </svg>
                          Download Bukti Diterima
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-6">
                        <div>
                          <p className="text-sm font-semibold text-base-content/60 uppercase tracking-wider mb-1">Tanggal</p>
                          <p className="text-lg font-bold text-base-content">{displayDate}</p>
                          {displayTime && <p className="text-sm text-base-content/70 mt-1">{displayTime}</p>}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-base-content/60 uppercase tracking-wider mb-1">Materi</p>
                          <p className="text-lg font-bold text-base-content">
                            {testAgenda ? testAgenda.title : "Tes & Wawancara"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-base-content/60 uppercase tracking-wider mb-1">Metode</p>
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-lg font-bold">
                            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                            {displayMethod}
                          </div>
                        </div>
                      </div>

                      <div>
                         <p className="text-sm font-semibold text-base-content/60 uppercase tracking-wider mb-1">Lokasi</p>
                         <div className="bg-base-200/50 p-4 rounded-2xl border border-base-200 h-full">
                           <h4 className="font-bold text-base-content mb-1">{displayLocation}</h4>
                           {displayAddress && <p className="text-sm text-base-content/70 leading-relaxed mb-4">{displayAddress}</p>}
                           <a href={displayMapsUrl} target="_blank" className="btn btn-sm btn-outline text-primary border-primary/30 hover:bg-primary hover:border-primary w-full shadow-sm">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                               <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                               <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                             </svg>
                             Buka di Google Maps
                           </a>
                         </div>
                      </div>
                    </>
                  )}
                </div>

              </div>
            </div>

            {/* Info Materi & Persiapan */}
            {!isAccepted && (
              <div className="bg-base-100 rounded-[2rem] shadow-xl border border-base-200 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-base-200 w-max pr-8">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                  <h3 className="text-xl font-bold text-base-content">Materi Ujian & Persiapan</h3>
                </div>

                <div className="space-y-6">
                  {displayMaterials ? (
                    displayMaterials.map((mat, idx) => {
                      const colors = ['primary', 'secondary', 'accent', 'info', 'warning'];
                      const color = colors[idx % colors.length];
                      return (
                        <div key={idx}>
                          <h4 className="font-bold text-lg text-base-content mb-3 flex items-center gap-2">
                            <span className={`w-8 h-8 rounded-full bg-${color}/10 text-${color} flex items-center justify-center text-sm`}>{idx + 1}</span>
                            {mat.title}
                          </h4>
                          <ul className="list-disc list-outside ml-10 text-base-content/70 space-y-1">
                            {mat.items.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        </div>
                      );
                    })
                  ) : (
                    <>
                      <div>
                        <h4 className="font-bold text-lg text-base-content mb-3 flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
                          Tes Tulis (Akademik & Agama)
                        </h4>
                        <ul className="list-disc list-outside ml-10 text-base-content/70 space-y-1">
                          <li>Pendidikan Agama Islam (PAI) Dasar</li>
                          <li>Matematika Dasar & Logika</li>
                          <li>Bahasa Indonesia</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-base-content mb-3 flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-sm">2</span>
                          Tes Lisan (Baca Qur&apos;an & Wawancara)
                        </h4>
                        <ul className="list-disc list-outside ml-10 text-base-content/70 space-y-1">
                          <li>Kemampuan membaca Al-Qur&apos;an (Tajwid & Kelancaran)</li>
                          <li>Hafalan surat-surat pendek (Juz Amma)</li>
                          <li>Wawancara motivasi dan kesiapan mental mondok</li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>

                {/* Persiapan from admin */}
                {displayPreparations && (
                  <div className="mt-6 pt-6 border-t border-base-200">
                    <h4 className="font-bold text-lg text-base-content mb-3">Persiapan Peserta</h4>
                    <ul className="space-y-2">
                      {displayPreparations.map((prep, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-base-content/70">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-success shrink-0 mt-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                          <span>{prep}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Notes from admin */}
                {displayNotes && (
                  <div className="mt-6 p-4 bg-info/5 rounded-2xl border border-info/10">
                    <div className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-info shrink-0 mt-0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                      </svg>
                      <p className="text-sm text-base-content/70">{displayNotes}</p>
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-base-200">
                  <button onClick={handlePrintSchedule} className="btn btn-primary w-full sm:w-auto shadow-lg shadow-primary/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Cetak Jadwal Tes (PDF)
                  </button>
                </div>
              </div>
            )}

            {isAccepted && (
              <div className="bg-base-100 rounded-[2rem] shadow-xl border border-base-200 p-8">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Langkah Selanjutnya</h3>
                    <p className="text-base-content/60 mt-2">Segera lakukan daftar ulang dan melengkapi administrasi yang diperlukan.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    <div className="p-4 bg-base-200 rounded-2xl text-left">
                      <h4 className="font-bold">1. Daftar Ulang</h4>
                      <p className="text-sm text-base-content/60 mt-1">Datang ke kantor sekretariat pondok.</p>
                    </div>
                    <div className="p-4 bg-base-200 rounded-2xl text-left">
                      <h4 className="font-bold">2. Melunasi Biaya</h4>
                      <p className="text-sm text-base-content/60 mt-1">Lakukan pembayaran biaya masuk santri.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
