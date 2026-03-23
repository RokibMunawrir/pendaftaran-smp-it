import { useState, useEffect } from "react";
import NavbarUser from "../ui/navbar-user";
import TimelineProgress, { type TimelineStep } from "../ui/timeline-progress";
import { REGISTRATION_STATUS } from "../../lib/utils/status";

interface Announcement {
  id: string;
  title: string;
  content: string;
  isImportant: boolean;
  createdAt: string;
}

export default function UserAnnouncement({ 
  userId,
  user = { name: 'User', registrationNumber: null, status: 'DRAFT' },
  steps = []
}: { 
  userId?: string;
  user?: { name: string; registrationNumber: string | null; status: string };
  steps?: TimelineStep[];
}) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("/api/user/announcement");
        if (res.ok) {
          const data = await res.json();
          setAnnouncements(data);
          
          // Mark as seen
          if (data.length > 0) {
            const latest = data.reduce((max: string, curr: Announcement) => 
              new Date(curr.createdAt) > new Date(max) ? curr.createdAt : max, 
              data[0].createdAt
            );
            localStorage.setItem("announcement_last_seen", latest);
          }
        }
      } catch (err) {
        console.error("Gagal memuat pengumuman", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200/50">
        <NavbarUser user={user} />
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (announcements.length === 0) {
      return (
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body py-12 text-center text-base-content/50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-3 opacity-30">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75v-.7V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            <p className="text-lg">Belum ada pengumuman saat ini.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid gap-4">
        {announcements.map((item) => (
          <div 
            key={item.id} 
            className={`card bg-base-100 shadow-sm border ${item.isImportant ? 'border-primary shadow-primary/10' : 'border-base-200'} transition-all hover:shadow-md`}
          >
            <div className="card-body p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="card-title text-base font-bold md:text-lg">{item.title}</h3>
                  {item.isImportant && (
                    <span className="badge badge-error badge-sm">Penting</span>
                  )}
                </div>
                <span className="text-xs font-semibold text-base-content/50 md:text-right mt-1 md:mt-0 whitespace-nowrap bg-base-200 px-2 py-1 rounded-md">
                  {new Date(item.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="prose prose-sm max-w-none text-base-content/70 mt-2">
                <p className="whitespace-pre-wrap leading-relaxed">{item.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-base-200/50">
      <NavbarUser user={user} />
      
      <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-base-content mb-2 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75v-.7V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
              Pengumuman
            </h2>
            <p className="text-base-content/60 text-lg">
              Informasi resmi dan berita terbaru seputar pendaftaran santri baru.
            </p>
          </div>
          
          {(() => {
            let badgeBg = 'bg-warning/10 border-warning/20';
            let badgeText = 'text-warning-content';
            let dotColor = 'bg-warning';
            let label = 'Menunggu Pembayaran';

            const normalizedStatus = user.status?.toUpperCase();
            switch (normalizedStatus) {
              case REGISTRATION_STATUS.REGISTERED:
              case REGISTRATION_STATUS.DRAFT:
                badgeBg = 'bg-primary/10 border-primary/20';
                badgeText = 'text-primary';
                dotColor = 'bg-primary';
                label = 'Lengkapi Biodata';
                break;
              case REGISTRATION_STATUS.PENDING_PAYMENT:
                badgeBg = 'bg-warning/10 border-warning/20';
                badgeText = 'text-warning-content';
                dotColor = 'bg-warning';
                label = 'Menunggu Pembayaran';
                break;
              case REGISTRATION_STATUS.UPLOAD_DOCUMENT:
                badgeBg = 'bg-info/10 border-info/20';
                badgeText = 'text-info';
                dotColor = 'bg-info';
                label = 'Upload Berkas';
                break;
              case REGISTRATION_STATUS.VERIFYING:
              case REGISTRATION_STATUS.PENDING_VERIFICATION:
                badgeBg = 'bg-info/10 border-info/20';
                badgeText = 'text-info';
                dotColor = 'bg-info';
                label = 'Sedang Diverifikasi';
                break;
              case REGISTRATION_STATUS.TEST_INTERVIEW:
                badgeBg = 'bg-secondary/10 border-secondary/20';
                badgeText = 'text-secondary';
                dotColor = 'bg-secondary';
                label = 'Jadwal Tes & Wawancara';
                break;
              case REGISTRATION_STATUS.REVISION:
                badgeBg = 'bg-error/10 border-error/20';
                badgeText = 'text-error';
                dotColor = 'bg-error';
                label = 'Perbaikan Data';
                break;
              case REGISTRATION_STATUS.REJECTED:
                badgeBg = 'bg-base-300 border-base-content/20';
                badgeText = 'text-base-content';
                dotColor = 'bg-base-content/50';
                label = 'Ditolak';
                break;
              case REGISTRATION_STATUS.ACCEPTED:
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
            {renderContent()}
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
