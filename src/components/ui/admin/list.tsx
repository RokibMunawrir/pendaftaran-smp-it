import { useState } from "react";
import Panel from "../panel";
import Pagination from "../pagination";

interface Pendaftar {
  id: string;
  userId: string;
  name: string;
  email: string;
  origin: string | null;
  parentName: string | null;
  program: string;
  status: string | null;
  registeredAt: Date | null;
}

import { getStatusBadge } from "../../../lib/utils/status";

const entriesOptions = [5, 10, 25, 50];

export default function ListContent({ data }: { data: Pendaftar[] }) {
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data berdasarkan search
  const filtered = data.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.origin?.toLowerCase().includes(q) ?? false) ||
      (p.parentName?.toLowerCase().includes(q) ?? false) ||
      p.program.toLowerCase().includes(q) ||
      (p.status?.toLowerCase().includes(q) ?? false)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(currentPage, totalPages);

  // Slice data untuk halaman saat ini
  const startIndex = (safePage - 1) * perPage;
  const paginatedData = filtered.slice(startIndex, startIndex + perPage);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePerPageChange = (value: number) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  return (
    <Panel title="List Pendaftar">
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <h3 className="card-title text-base">Daftar Pendaftar Santri</h3>
            <span className="text-sm text-base-content/50">{data.length} pendaftar</span>
          </div>

          {/* Search & Entries per page */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">Tampilkan</span>
              <select
                className="select select-bordered select-sm w-20"
                value={perPage}
                onChange={(e) => handlePerPageChange(Number(e.target.value))}
              >
                {entriesOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span className="text-sm">data</span>
            </div>
            <label className="input input-bordered input-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Cari pendaftar..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Nama Wali</th>
                  <th>Program</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-base-content/50">
                      Data tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((p, i) => (
                    <tr key={startIndex + i} className="hover:bg-base-200/50">
                      <td>{startIndex + i + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar rounded">
                            <div className="mask mask-squircle h-10 w-10">
                              <img className="rounded-full" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=random&size=80`} alt={p.name} />
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">{p.name}</div>
                            <div className="text-sm text-base-content/50">{p.origin}</div>
                          </div>
                        </div>
                      </td>
                      <td>{p.parentName}</td>
                      <td>
                        <span className="badge badge-ghost badge-sm">{p.program}</span>
                      </td>
                      <td>
                        <span className={`badge badge-sm ${getStatusBadge(p.status)}`}>{p.status || "Unknown"}</span>
                      </td>
                      <td>
                        <a href={`/admin/list/detail/${p.userId}`} className="btn btn-ghost btn-xs">detail</a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Info & Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-2">
            <span className="text-sm text-base-content/50">
              Menampilkan {filtered.length === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + perPage, filtered.length)} dari {filtered.length} data
              {search && ` (difilter dari ${data.length} total)`}
            </span>
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </Panel>
  );
}
