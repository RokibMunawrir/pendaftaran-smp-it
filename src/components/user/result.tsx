import TimelineProgress, { type TimelineStep } from "../ui/timeline-progress";
import NavbarUser from "../ui/navbar-user";

interface UserProp {
  name: string;
  registrationNumber: string | null;
}

interface RegistrationResultProps {
  user: UserProp;
  registration: any;
  steps: TimelineStep[];
}

export default function RegistrationResult({ user, registration, steps }: RegistrationResultProps) {
  const status = registration?.status?.toUpperCase() || "";
  const notes = registration?.notes || "";

  return (
    <div className="min-h-screen bg-base-200/50">
      <NavbarUser user={user}/>
      <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-base-content flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Hasil Seleksi
            </h1>
            <p className="text-base-content/60 text-lg mt-1">
              Pengumuman kelulusan calon santri baru.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="card bg-base-100 shadow-xl border border-base-200 rounded-[2rem]">
              <div className="card-body p-6 md:p-8">
                {status === "ACCEPTED" ? (
                  <div className="flex flex-col items-center text-center space-y-6 py-12 px-4 rounded-3xl bg-success/10 border border-success/30">
                    <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center text-success mb-2 shadow-lg shadow-success/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                    
                    <div className="max-w-md">
                      <h2 className="text-3xl font-bold text-success mb-3">Selamat! Anda Diterima</h2>
                      <p className="text-base-content/80 text-lg">
                        Alhamdulillah, Ananda <strong>{user.name}</strong> ({user.registrationNumber}) telah lulus seleksi dan tanggap dinyatakan resmi diterima sebagai Santri Baru. Selanjutnya, silakan cetak surat bukti penerimaan untuk dibawa saat kedatangan.
                      </p>
                    </div>
                    
                    <div className="pt-4">
                      <a 
                        href="/user/print/acceptance" 
                        target="_blank" 
                        className="btn btn-success text-white shadow-lg lg:btn-wide font-bold"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0v3.396c0 .59.48 1.069 1.069 1.069h8.362c.589 0 1.069-.479 1.069-1.069V9.389Z" />
                        </svg>
                        Cetak Bukti Diterima
                      </a>
                    </div>
                  </div>
                ) : status === "REJECTED" ? (
                   <div className="flex flex-col items-center text-center space-y-6 py-12 px-4 rounded-3xl bg-error/10 border border-error/30">
                     <div className="w-24 h-24 rounded-full bg-error/20 flex items-center justify-center text-error mb-2 shadow-lg shadow-error/20">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-12">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                       </svg>
                     </div>
                     
                     <div className="max-w-md">
                       <h2 className="text-3xl font-bold text-error mb-3">Mohon Maaf</h2>
                       <p className="text-base-content/80 text-lg">
                         Berdasarkan hasil pertimbangan panitia, Ananda <strong>{user.name}</strong> ({user.registrationNumber}) dinyatakan tidak lulus atau belum memenuhi kriteria penerimaan santri baru tahun ini.
                       </p>
                     </div>

                     {notes && (
                       <div className="mt-4 p-5 rounded-2xl bg-base-100 border border-error/50 w-full max-w-md text-left shadow-sm">
                          <h3 className="text-sm font-bold opacity-60 mb-2 uppercase flex items-center gap-2 text-error">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                            Catatan Keputusan:
                          </h3>
                          <p className="text-sm font-mono text-error/90 leading-relaxed bg-error/5 p-3 rounded-xl">{notes}</p>
                       </div>
                     )}
                   </div>
                ) : (
                  <div className="flex flex-col items-center text-center space-y-6 py-12 px-4 rounded-3xl bg-base-200 border border-base-300">
                     <div className="w-24 h-24 rounded-full bg-base-300 animate-pulse flex items-center justify-center text-base-content/40 mb-2">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-10">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                       </svg>
                     </div>
                     <div className="max-w-md">
                       <h2 className="text-2xl font-bold mb-3">Menunggu Pengumuman</h2>
                       <p className="text-base-content/70">
                         Hasil seleksi penerimaan santri baru belum diterbitkan atau status sedang dalam tahap proses penilaian. Silakan kembali mengecek berkala halaman ini.
                       </p>
                     </div>
                  </div>
                )}
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
