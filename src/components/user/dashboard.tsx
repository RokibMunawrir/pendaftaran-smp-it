import { useState, useEffect } from 'react';
import NavbarUser from '../ui/navbar-user';
import TimelineProgress, { type TimelineStep } from '../ui/timeline-progress';
import NextStepCard from './next-step-card';

export default function UserDashboard() {
  const [greeting, setGreeting] = useState('');
  
  // Simulated user data
  const user = {
    name: 'Ahmad Rafiqi',
    registrationNumber: 'PPDB-2026-08921',
    status: 'test_interview', // 'registered', 'pending_payment', 'verifying', 'accepted'
    pathway: 'Reguler',
    program: 'Tahfidz Al-Quran',
    registrationDate: '08 Maret 2026'
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 11) setGreeting('Selamat Pagi');
    else if (hour < 15) setGreeting('Selamat Siang');
    else if (hour < 18) setGreeting('Selamat Sore');
    else setGreeting('Selamat Malam');
  }, []);

  const getTimelineSteps = (currentStatus: string): TimelineStep[] => {
    const defaultSteps: TimelineStep[] = [
      { title: 'Daftar Akun', description: 'Akun berhasil dibuat', status: 'upcoming', href: '/user/dashboard' },
      { title: 'Lengkapi Biodata', description: 'Isi form data diri santri', status: 'upcoming', href: '/user/biodata' },
      { title: 'Pembayaran', description: 'Bayar biaya pendaftaran', status: 'upcoming', href: '/user/payment' },
      { title: 'Upload Berkas', description: 'KK, Akta Kelahiran, dll', status: 'upcoming', href: '/user/document' },
      { title: 'Verifikasi', description: 'Pengecekan data & berkas', status: 'upcoming' },
      { title: 'Tes & Wawancara', description: 'Tes masuk pondok', status: 'upcoming' }
    ];

    const statusIndexMap: Record<string, number> = {
      'registered': 1,
      'pending_payment': 2,
      'upload_document': 3,
      'revision': 3, 
      'verifying': 4,
      'test_interview': 5,
      'accepted': 6,
      'rejected': 6
    };

    const currentIndex = statusIndexMap[currentStatus] || 0;

    return defaultSteps.map((step, index) => {
      let stepStatus: 'completed' | 'current' | 'upcoming' = 'upcoming';
      if (index < currentIndex) {
        stepStatus = 'completed';
      } else if (index === currentIndex && currentStatus !== 'accepted' && currentStatus !== 'rejected') {
        stepStatus = 'current';
      }
      return { ...step, status: stepStatus };
    });
  };

  const steps = getTimelineSteps(user.status);

  return (
    <div className="min-h-screen bg-base-200/50 pb-12">
      
      {/* Top Navigation Bar / Header */}
      <NavbarUser user={user} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-base-content mb-1">
              {greeting}, <span className="text-primary">{user.name.split(' ')[0]}</span> 👋
            </h1>
            <p className="text-base-content/60 text-lg">Pendaftaran Anda sedang diproses. Silakan ikuti langkah selanjutnya.</p>
          </div>
          {(() => {
            let badgeBg = 'bg-warning/10 border-warning/20';
            let badgeText = 'text-warning-content';
            let dotColor = 'bg-warning';
            let label = 'Menunggu Pembayaran';

            switch (user.status) {
              case 'registered':
                badgeBg = 'bg-primary/10 border-primary/20';
                badgeText = 'text-primary';
                dotColor = 'bg-primary';
                label = 'Lengkapi Biodata';
                break;
              case 'pending_payment':
                badgeBg = 'bg-warning/10 border-warning/20';
                badgeText = 'text-warning-content';
                dotColor = 'bg-warning';
                label = 'Menunggu Pembayaran';
                break;
              case 'upload_document':
                badgeBg = 'bg-info/10 border-info/20';
                badgeText = 'text-info';
                dotColor = 'bg-info';
                label = 'Upload Berkas';
                break;
              case 'verifying':
                badgeBg = 'bg-info/10 border-info/20';
                badgeText = 'text-info';
                dotColor = 'bg-info';
                label = 'Sedang Diverifikasi';
                break;
              case 'test_interview':
                badgeBg = 'bg-secondary/10 border-secondary/20';
                badgeText = 'text-secondary';
                dotColor = 'bg-secondary';
                label = 'Jadwal Tes & Wawancara';
                break;
              case 'revision':
                badgeBg = 'bg-error/10 border-error/20';
                badgeText = 'text-error';
                dotColor = 'bg-error';
                label = 'Perbaikan Data';
                break;
              case 'rejected':
                badgeBg = 'bg-base-300 border-base-content/20';
                badgeText = 'text-base-content';
                dotColor = 'bg-base-content/50';
                label = 'Ditolak';
                break;
              case 'accepted':
                badgeBg = 'bg-success/10 border-success/20';
                badgeText = 'text-success';
                dotColor = 'bg-success';
                label = 'Diterima';
                break;
            }

            return (
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium border ${badgeBg} ${badgeText}`}>
                <span className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${dotColor}`}></span>
                </span>
                {label}
              </div>
            );
          })()}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Action Needed Card / Next Step */}
            <NextStepCard status={user.status} />

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="card bg-base-100 shadow-sm border border-base-200">
                <div className="card-body p-4 md:p-6 items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" /></svg>
                  </div>
                  <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-1">No. Registrasi</h3>
                  <p className="font-bold text-base-content">{user.registrationNumber}</p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-sm border border-base-200">
                <div className="card-body p-4 md:p-6 items-center text-center">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" /></svg>
                  </div>
                  <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-1">Program</h3>
                  <p className="font-bold text-base-content">{user.program}</p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-sm border border-base-200">
                <div className="card-body p-4 md:p-6 items-center text-center">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>
                  </div>
                  <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-1">Jalur</h3>
                  <p className="font-bold text-base-content">{user.pathway}</p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-sm border border-base-200">
                <div className="card-body p-4 md:p-6 items-center text-center">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                  </div>
                  <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-1">Tgl Daftar</h3>
                  <p className="font-bold text-base-content">{user.registrationDate}</p>
                </div>
              </div>
            </div>

            {/* Announcements */}
            <div className="card bg-base-100 shadow-sm border border-base-200">
              <div className="card-body p-6 md:p-8">
                <h2 className="card-title text-xl font-bold mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014-8.81c-2.208 2.503-4.145 5.253-5.751 8.163" /></svg>
                  Pengumuman Terbaru
                </h2>
                
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors cursor-pointer border border-transparent hover:border-base-300">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-lg font-bold text-primary">
                      10
                      <span className="text-[10px] block -mt-1 font-normal text-base-content/60">Mar</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-base-content">Jadwal Ujian Masuk Gelombang 1</h4>
                      <p className="text-sm text-base-content/70 mt-1 line-clamp-2">Pemberitahuan kepada seluruh calon santri untuk mempersiapkan diri mengikuti ujian masuk yang akan diselenggarakan secara online...</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 p-4 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors cursor-pointer border border-transparent hover:border-base-300">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-lg font-bold text-primary">
                      08
                      <span className="text-[10px] block -mt-1 font-normal text-base-content/60">Mar</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-base-content">Panduan Pembayaran Virtual Account</h4>
                      <p className="text-sm text-base-content/70 mt-1 line-clamp-2">Berikut adalah tata cara melakukan pembayaran infak pendaftaran menggunakan layanan Virtual Account dari BSI, BRI, maupun Mandiri...</p>
                    </div>
                  </div>
                </div>
                
                <button className="btn btn-block btn-outline border-base-300 mt-6 text-base-content/70 hover:bg-base-200 hover:text-base-content">
                  Lihat Semua Pengumuman
                </button>
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
