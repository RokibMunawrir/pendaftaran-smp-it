import { useState, useEffect } from "react";
import Panel from "../panel";
import Modal from "../modal";

interface AcademicYear {
    id: string;
    year: string;
    isActive: boolean;
    startDate: string | null;
    endDate: string | null;
}

interface RegistrationPath {
    id: string;
    name: string;
    description: string | null;
    quota: number | null;
    isActive: boolean;
}

export default function SettingPendaftaran() {
    const [years, setYears] = useState<AcademicYear[]>([]);
    const [paths, setPaths] = useState<RegistrationPath[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"years" | "paths">("years");

    const [yearForm, setYearForm] = useState({ id: "", year: "", start: "", end: "" });
    const [pathForm, setPathForm] = useState({ id: "", name: "", desc: "", quota: 0, isActive: true });
    
    // Modal states
    const [isYearModalOpen, setIsYearModalOpen] = useState(false);
    const [isPathModalOpen, setIsPathModalOpen] = useState(false);

    const [saving, setSaving] = useState(false);
    const [notif, setNotif] = useState<{ msg: string; type: "success" | "error" } | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/setting/pendaftaran");
            const data = await res.json();
            if (res.ok) {
                setYears(data.years);
                setPaths(data.paths);
            } else if (res.status === 401) {
                showNotif("Unauthorized: Please login as admin", "error");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const showNotif = (msg: string, type: "success" | "error" = "success") => {
        setNotif({ msg, type });
        setTimeout(() => setNotif(null), 3000);
    };

    const handleYearSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/admin/setting/pendaftaran", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "year",
                    action: yearForm.id ? "update" : "create",
                    data: {
                        id: yearForm.id,
                        year: yearForm.year,
                        startDate: yearForm.start,
                        endDate: yearForm.end,
                    }
                })
            });
            if (res.ok) {
                showNotif(`Tahun ajaran berhasil ${yearForm.id ? "diupdate" : "dibuat"}`);
                setYearForm({ id: "", year: "", start: "", end: "" });
                setIsYearModalOpen(false);
                fetchData();
            } else {
                const err = await res.json();
                showNotif(err.error || "Gagal menyimpan", "error");
            }
        } catch (e: any) {
            showNotif(e.message, "error");
        } finally {
            setSaving(false);
        }
    };

    const handlePathSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/admin/setting/pendaftaran", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "path",
                    action: pathForm.id ? "update" : "create",
                    data: {
                        id: pathForm.id,
                        name: pathForm.name,
                        description: pathForm.desc,
                        quota: pathForm.quota,
                        isActive: pathForm.isActive
                    }
                })
            });
            if (res.ok) {
                showNotif(`Jalur pendaftaran berhasil ${pathForm.id ? "diupdate" : "dibuat"}`);
                setPathForm({ id: "", name: "", desc: "", quota: 0, isActive: true });
                setIsPathModalOpen(false);
                fetchData();
            } else {
                const err = await res.json();
                showNotif(err.error || "Gagal menyimpan", "error");
            }
        } catch (e: any) {
            showNotif(e.message, "error");
        } finally {
            setSaving(false);
        }
    };

    const setActiveYear = async (id: string) => {
        try {
            const res = await fetch("/api/admin/setting/pendaftaran", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "year", action: "setActive", data: { id } })
            });
            if (res.ok) {
                showNotif("Tahun ajaran aktif berhasil diubah");
                fetchData();
            }
        } catch (e: any) {
            showNotif(e.message, "error");
        }
    };

    const formatDate = (date: string | null) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("id-ID");
    };

    const truncate = (text: string | null, len: number) => {
        if (!text) return "-";
        return text.length > len ? text.substring(0, len) + "..." : text;
    };

    return (
        <Panel title="Pengaturan Pendaftaran">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-base-content">Pengaturan Pendaftaran</h2>
                        <p className="text-base-content/60">Kelola tahun ajaran dan jalur pendaftaran santri baru.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {notif && (
                            <div className={`alert ${notif.type === "success" ? "alert-success" : "alert-error"} w-auto shadow-lg text-white font-medium`}>
                                <span>{notif.msg}</span>
                            </div>
                        )}
                        <button 
                            className="btn btn-primary rounded-xl shadow-lg"
                            onClick={() => {
                                if (activeTab === "years") {
                                    setYearForm({ id: "", year: "", start: "", end: "" });
                                    setIsYearModalOpen(true);
                                } else {
                                    setPathForm({ id: "", name: "", desc: "", quota: 0, isActive: true });
                                    setIsPathModalOpen(true);
                                }
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            {activeTab === "years" ? "Tambah Tahun" : "Tambah Jalur"}
                        </button>
                    </div>
                </div>

                <div className="tabs tabs-boxed bg-base-200 p-1 w-fit">
                    <button 
                        className={`tab ${activeTab === "years" ? "tab-active bg-primary text-primary-content" : ""}`}
                        onClick={() => setActiveTab("years")}
                    >
                        Tahun Ajaran
                    </button>
                    <button 
                        className={`tab ${activeTab === "paths" ? "tab-active bg-primary text-primary-content" : ""}`}
                        onClick={() => setActiveTab("paths")}
                    >
                        Jalur Pendaftaran
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center p-12">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead className="bg-base-200/50">
                                        {activeTab === "years" ? (
                                            <tr>
                                                <th>Tahun</th>
                                                <th>Mulai - Selesai</th>
                                                <th>Status</th>
                                                <th className="text-right">Aksi</th>
                                            </tr>
                                        ) : (
                                            <tr>
                                                <th>Nama Jalur</th>
                                                <th>Kuota</th>
                                                <th>Status</th>
                                                <th className="text-right">Aksi</th>
                                            </tr>
                                        )}
                                    </thead>
                                    <tbody>
                                        {activeTab === "years" ? (
                                            years.map(y => (
                                                <tr key={y.id} className="hover:bg-base-200/30 transition-colors">
                                                    <td className="font-bold">{y.year}</td>
                                                    <td className="text-sm opacity-70">
                                                        {formatDate(y.startDate)} - {formatDate(y.endDate)}
                                                    </td>
                                                    <td>
                                                        {y.isActive ? (
                                                            <span className="badge badge-success text-white">Aktif</span>
                                                        ) : (
                                                            <span className="badge badge-ghost opacity-50">Tidak Aktif</span>
                                                        )}
                                                    </td>
                                                    <td className="text-right space-x-2">
                                                        {!y.isActive && (
                                                            <button 
                                                                className="btn btn-ghost btn-xs text-success"
                                                                onClick={() => setActiveYear(y.id)}
                                                            >
                                                                Set Aktif
                                                            </button>
                                                        )}
                                                        <button 
                                                            className="btn btn-ghost btn-xs text-primary"
                                                            onClick={() => {
                                                                setYearForm({
                                                                    id: y.id, 
                                                                    year: y.year, 
                                                                    start: y.startDate ? y.startDate.substring(0, 10) : "", 
                                                                    end: y.endDate ? y.endDate.substring(0, 10) : ""
                                                                });
                                                                setIsYearModalOpen(true);
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            paths.map(p => (
                                                <tr key={p.id} className="hover:bg-base-200/30 transition-colors">
                                                    <td>
                                                        <div className="font-bold">{p.name}</div>
                                                        <div className="text-xs opacity-50">{truncate(p.description, 60)}</div>
                                                    </td>
                                                    <td>{p.quota || "∞"}</td>
                                                    <td>
                                                        {p.isActive ? (
                                                            <span className="badge badge-info text-white">Dibuka</span>
                                                        ) : (
                                                            <span className="badge badge-ghost opacity-50">Ditutup</span>
                                                        )}
                                                    </td>
                                                    <td className="text-right">
                                                        <button 
                                                            className="btn btn-ghost btn-xs text-primary"
                                                            onClick={() => {
                                                                setPathForm({
                                                                    id: p.id,
                                                                    name: p.name,
                                                                    desc: p.description || "",
                                                                    quota: p.quota || 0,
                                                                    isActive: p.isActive
                                                                });
                                                                setIsPathModalOpen(true);
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                        {(activeTab === "years" ? years : paths).length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="text-center p-12 opacity-50">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                                        </svg>
                                                        <span>Belum ada data {activeTab === "years" ? "tahun ajaran" : "jalur pendaftaran"}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- Modals --- */}
                
                <Modal 
                    open={isYearModalOpen} 
                    onClose={() => setIsYearModalOpen(false)}
                    title={yearForm.id ? "Edit Tahun Ajaran" : "Tambah Tahun Ajaran"}
                    confirmLabel="Simpan"
                    onConfirm={handleYearSubmit}
                    loading={saving}
                    variant="info"
                >
                    <div className="space-y-4 pt-2">
                        <div className="form-control w-full flex flex-col items-start">
                            <label className="label py-1">
                                <span className="label-text font-semibold">Tahun Ajaran</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Contoh: 2026/2027" 
                                className="input input-bordered w-full rounded-xl"
                                value={yearForm.year}
                                onChange={e => setYearForm({...yearForm, year: e.target.value})}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control flex flex-col items-start">
                                <label className="label py-1">
                                    <span className="label-text font-semibold">Tgl Mulai</span>
                                </label>
                                <input 
                                    type="date" 
                                    className="input input-bordered w-full rounded-xl"
                                    value={yearForm.start}
                                    onChange={e => setYearForm({...yearForm, start: e.target.value})}
                                />
                            </div>
                            <div className="form-control flex flex-col items-start">
                                <label className="label py-1">
                                    <span className="label-text font-semibold">Tgl Selesai</span>
                                </label>
                                <input 
                                    type="date" 
                                    className="input input-bordered w-full rounded-xl"
                                    value={yearForm.end}
                                    onChange={e => setYearForm({...yearForm, end: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal
                    open={isPathModalOpen}
                    onClose={() => setIsPathModalOpen(false)}
                    title={pathForm.id ? "Edit Jalur Pendaftaran" : "Tambah Jalur Pendaftaran"}
                    confirmLabel="Simpan"
                    onConfirm={handlePathSubmit}
                    loading={saving}
                    variant="info"
                >
                    <div className="space-y-4 pt-2">
                        <div className="form-control w-full flex flex-col items-start">
                            <label className="label py-1">
                                <span className="label-text font-semibold">Nama Jalur</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Contoh: Reguler" 
                                className="input input-bordered w-full rounded-xl"
                                value={pathForm.name}
                                onChange={e => setPathForm({...pathForm, name: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-control w-full flex flex-col items-start">
                            <label className="label py-1">
                                <span className="label-text font-semibold">Kuota (0 = Tak Terbatas)</span>
                            </label>
                            <input 
                                type="number" 
                                className="input input-bordered w-full rounded-xl"
                                value={pathForm.quota}
                                onChange={e => setPathForm({...pathForm, quota: parseInt(e.target.value)})}
                            />
                        </div>
                        <div className="form-control w-full flex flex-col items-start">
                            <label className="label py-1">
                                <span className="label-text font-semibold flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 opacity-70">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3h9m-9 3h3m-12-3a9 9 0 1 1 18 0 9 9 0 0 1-18 0Z" />
                                    </svg>
                                    Keterangan
                                </span>
                            </label>
                            <textarea 
                                className="textarea textarea-bordered rounded-xl h-28 w-full focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none bg-base-200/30"
                                placeholder="Tuliskan deskripsi atau syarat jalur pendaftaran di sini..."
                                value={pathForm.desc}
                                onChange={e => setPathForm({...pathForm, desc: e.target.value})}
                            ></textarea>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-4">
                                <span className="label-text font-semibold">Status Dibuka</span>
                                <input 
                                    type="checkbox" 
                                    className="toggle toggle-primary" 
                                    checked={pathForm.isActive}
                                    onChange={e => setPathForm({...pathForm, isActive: e.target.checked})}
                                />
                            </label>
                        </div>
                    </div>
                </Modal>

                <style>{`
                    .animate-fade-in {
                        animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    @keyframes fadeIn {
                        0% { opacity: 0; transform: translateY(10px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>
        </Panel>
    );
}
