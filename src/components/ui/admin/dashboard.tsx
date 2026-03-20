import Panel from "../panel";
import { getStatusBadge } from "../../../lib/utils/status";

// --- Stat Card Data ---
interface StatCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  color: string; // badge/accent color class
}

interface DashboardProps {
  stats: {
    totalPendaftar: number;
    diverifikasi: number;
    draft: number;
    ditolak: number;
    menunggu: number;
  };
  monthly: Array<{
    month: string;
    pendaftar: number;
    diverifikasi: number;
  }>;
  recent: Array<{
    name: string;
    date: string;
    status: string;
  }>;
}

// --- Component ---
export default function Dashboard({ stats, monthly, recent }: DashboardProps) {
  const statCards: StatCard[] = [
    {
      title: "Total Pendaftar",
      value: stats.totalPendaftar,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
      ),
      description: "Total semua pendaftar",
      color: "text-primary",
    },
    {
      title: "Diverifikasi",
      value: stats.diverifikasi,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      ),
      description: "Pendaftar terverifikasi",
      color: "text-success",
    },
    {
      title: "Masih Draft",
      value: stats.draft,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      ),
      description: "Belum menyelesaikan formulir",
      color: "text-warning",
    },
    {
      title: "Ditolak",
      value: stats.ditolak,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
      description: "Pendaftaran ditolak",
      color: "text-error",
    },
  ];

  const maxStatValue = Math.max(...monthly.map((s) => s.pendaftar), 1); // fallback to 1 to avoid div by 0

  return (
    <Panel title="Dashboard">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.title} className="card bg-base-100 shadow-sm border border-base-300">
            <div className="card-body p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-base-content/60">{card.title}</p>
                  <h2 className="mt-1 text-3xl font-bold">{card.value.toLocaleString("id-ID")}</h2>
                </div>
                <div className={`rounded-xl bg-base-200 p-3 ${card.color}`}>
                  {card.icon}
                </div>
              </div>
              <p className="mt-2 text-xs text-base-content/50">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts + Stats Row */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Bar Chart - Statistik Pendaftaran */}
        <div className="card col-span-1 bg-base-100 shadow-sm border border-base-300 lg:col-span-2">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <h3 className="card-title text-base">Statistik Pendaftaran</h3>
              <span className="text-xs text-base-content/50">2026</span>
            </div>
            <div className="mt-4 flex items-end gap-2" style={{ height: 200 }}>
              {monthly.map((stat) => (
                <div key={stat.month} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex w-full gap-0.5" style={{ height: 180, alignItems: "flex-end" }}>
                    <div
                      className="flex-1 rounded-t bg-primary/80 transition-all hover:bg-primary"
                      style={{ height: `${(stat.pendaftar / maxStatValue) * 100}%` }}
                      title={`Pendaftar: ${stat.pendaftar}`}
                    />
                    <div
                      className="flex-1 rounded-t bg-success/70 transition-all hover:bg-success"
                      style={{ height: `${(stat.diverifikasi / maxStatValue) * 100}%` }}
                      title={`Diverifikasi: ${stat.diverifikasi}`}
                    />
                  </div>
                  <span className="text-xs text-base-content/60">{stat.month}</span>
                </div>
              ))}
            </div>
            {/* Legend */}
            <div className="mt-3 flex gap-4 justify-center">
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded-sm bg-primary/80" />
                <span className="text-xs text-base-content/60">Pendaftar</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded-sm bg-success/70" />
                <span className="text-xs text-base-content/60">Diverifikasi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Ring */}
        <div className="card bg-base-100 shadow-sm border border-base-300">
          <div className="card-body items-center text-center">
            <h3 className="card-title text-base">Ringkasan Status</h3>
            <div className="radial-progress text-primary mt-4" style={{ "--value": (stats.diverifikasi / (stats.totalPendaftar || 1)) * 100, "--size": "8rem", "--thickness": "0.8rem" } as React.CSSProperties} role="progressbar">
              <span className="text-2xl font-bold">{Math.round((stats.diverifikasi / (stats.totalPendaftar || 1)) * 100)}%</span>
            </div>
            <p className="mt-2 text-sm text-base-content/60">Tingkat Verifikasi</p>
            <div className="mt-4 w-full space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-base-content/60">Diverifikasi</span>
                <span className="font-semibold text-success">{stats.diverifikasi.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-base-content/60">Draft</span>
                <span className="font-semibold text-warning">{stats.draft.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-base-content/60">Ditolak</span>
                <span className="font-semibold text-error">{stats.ditolak.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Registrations Table */}
      <div className="mt-6 card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <h3 className="card-title text-base">Pendaftaran Terbaru</h3>
            <button className="btn btn-sm btn-ghost" onClick={() => window.location.href = "/admin/list"}>Lihat Semua</button>
          </div>
          <div className="overflow-x-auto mt-2">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((reg, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td className="font-medium">{reg.name}</td>
                    <td className="text-base-content/60">{reg.date}</td>
                    <td>
                      <span className={`badge badge-sm ${getStatusBadge(reg.status)}`}>
                        {reg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Panel>
  );
}