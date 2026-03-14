import { useState, useEffect } from "react";
import Panel from "../panel";
import Modal from "../modal";

interface AnnouncementItem {
  id: string;
  title: string | null;
  content: string | null;
  authorId: string | null;
  isPublished: boolean | null;
  isImportant: boolean | null;
  target: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface Props {
  announcements: AnnouncementItem[];
}

export default function Announcement({ announcements: initialAnnouncements }: Props) {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(initialAnnouncements || []);
  const [isLoading, setIsLoading] = useState(!initialAnnouncements || initialAnnouncements.length === 0 ? true : false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<AnnouncementItem>>({
    title: "",
    content: "",
    isPublished: true,
    isImportant: false,
    target: "all",
  });

  const [notif, setNotif] = useState<{ open: boolean; message: string; variant: "success" | "error" | "info" | "warning" }>({
    open: false,
    message: "",
    variant: "success",
  });

  const fetchAnnouncements = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/announcement");
      const data = await res.json();
      setAnnouncements(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialAnnouncements || initialAnnouncements.length === 0) {
      fetchAnnouncements();
    } else {
      setIsLoading(false);
    }
  }, [initialAnnouncements]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (notif.open) {
      timeoutId = setTimeout(() => {
        setNotif((prev) => ({ ...prev, open: false }));
      }, 3000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [notif.open]);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      content: "",
      isPublished: true,
      isImportant: false,
      target: "all",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: AnnouncementItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      content: item.content,
      isPublished: item.isPublished,
      isImportant: item.isImportant,
      target: item.target,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) {
      try {
        const res = await fetch(`/api/admin/announcement?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          setAnnouncements(announcements.filter((a) => a.id !== id));
          setNotif({ open: true, message: "Pengumuman berhasil dihapus", variant: "success" });
        }
      } catch (e) {
        setNotif({ open: true, message: "Gagal menghapus pengumuman", variant: "error" });
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert("Judul dan isi pengumuman tidak boleh kosong!");
      return;
    }

    setIsSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...formData, id: editingId } : formData;
      const res = await fetch("/api/admin/announcement", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      
      if (res.ok) {
        setNotif({ open: true, message: `Pengumuman berhasil ${editingId ? "diperbarui" : "ditambahkan"}`, variant: "success" });
        fetchAnnouncements();
        setIsModalOpen(false);
      } else {
        throw new Error("Failed to save");
      }
    } catch (e) {
      setNotif({ open: true, message: "Gagal menyimpan pengumuman", variant: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const getTargetBadge = (target: string) => {
    switch (target) {
      case "all": return <span className="badge badge-sm badge-ghost">Semua</span>;
      case "prospective": return <span className="badge badge-sm badge-primary">Calon Santri</span>;
      case "parent": return <span className="badge badge-sm badge-secondary">Wali Santri</span>;
      default: return null;
    }
  };

  return (
    <Panel title="Manajemen Pengumuman">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-base-content">Pengumuman</h2>
          <p className="text-base-content/60 text-sm mt-1">Kelola informasi dan pengumuman untuk calon santri dan wali santri</p>
        </div>
        <button className="btn btn-primary gap-2" onClick={openAddModal}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Tambah Pengumuman
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-base-100 rounded-xl shadow-sm border border-base-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200/50">
              <tr>
                <th>No</th>
                <th>Judul & Konten</th>
                <th>Tanggal</th>
                <th>Target Pembaca</th>
                <th>Status</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8"><span className="loading loading-spinner"></span></td>
                </tr>
              ) : announcements.length > 0 ? (
                announcements.map((item, index) => (
                  <tr key={item.id} className="hover">
                    <td className="w-12 text-center text-base-content/60">{index + 1}</td>
                    <td className="max-w-[300px]">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-base-content truncate">{item.title}</div>
                        {item.isImportant && <span className="badge badge-error badge-xs">Penting</span>}
                      </div>
                      <div className="text-sm text-base-content/60 truncate mt-0.5">{item.content}</div>
                    </td>
                    <td className="whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-base-content/40">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        {new Date(item.createdAt ?? new Date()).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                    </td>
                    <td>{getTargetBadge(item.target ?? "all")}</td>
                    <td>
                      <span className={`badge badge-sm ${item.isPublished ? 'badge-success badge-outline' : 'badge-neutral bg-base-200'}`}>
                        {item.isPublished ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="btn btn-sm btn-ghost btn-circle text-primary" onClick={() => openEditModal(item)} title="Edit">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                        </button>
                        <button className="btn btn-sm btn-ghost btn-circle text-error" onClick={() => handleDelete(item.id)} title="Hapus">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-base-content/50">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 opacity-50">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <p>Belum ada pengumuman yang ditambahkan</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Tambah/Edit */}
      <Modal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingId ? "Edit Pengumuman" : "Tambah Pengumuman Baru"}
        className="w-11/12 max-w-3xl"
      >
        <form onSubmit={handleSave} className="space-y-4 pt-2">
          
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Judul Pengumuman</span>
            </label>
            <input 
              type="text" 
              placeholder="Masukkan judul pengumuman" 
              className="input input-bordered w-full focus:border-primary" 
              value={formData.title ?? ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Isi Pengumuman</span>
            </label>
            <textarea 
              className="textarea textarea-bordered h-32 focus:border-primary w-full" 
              placeholder="Tuliskan isi pengumuman secara detail..."
              value={formData.content ?? ""}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            ></textarea>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Upload File Surat Resmi (Opsional)</span>
            </label>
            <input 
              type="file" 
              className="file-input file-input-bordered w-full focus:border-primary" 
              accept=".pdf,.doc,.docx"
            />
            <label className="label">
              <span className="label-text-alt text-base-content/70">Format yang didukung: PDF, DOC, DOCX (Maks. 5MB)</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Target Pembaca</span>
              </label>
              <select 
                className="select select-bordered w-full focus:border-primary"
                value={formData.target ?? "all"}
                onChange={(e) => setFormData({ ...formData, target: e.target.value as "all" | "prospective" | "parent" })}
              >
                <option value="all">Semua Orang</option>
                <option value="prospective">Khusus Calon Santri</option>
                <option value="parent">Khusus Wali Santri</option>
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Tampilkan (Aktif)</span>
              </label>
              <div className="flex items-center gap-3 h-12 px-3 border border-base-300 rounded-lg">
                <span className="text-sm font-medium">{formData.isPublished ? 'Aktif' : 'Tidak Aktif'}</span>
                <input 
                  type="checkbox" 
                  className="toggle toggle-primary toggle-sm ml-auto" 
                  checked={formData.isPublished ?? false}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                />
              </div>
            </div>
            
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Tandai Penting</span>
              </label>
              <div className="flex items-center gap-3 h-12 px-3 border border-base-300 rounded-lg">
                <span className="text-sm font-medium">{formData.isImportant ? 'Ya' : 'Tidak'}</span>
                <input 
                  type="checkbox" 
                  className="toggle toggle-error toggle-sm ml-auto" 
                  checked={formData.isImportant ?? false}
                  onChange={(e) => setFormData({ ...formData, isImportant: e.target.checked })}
                />
              </div>
            </div>
          </div>

          <div className="modal-action mt-6">
            <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>Batal</button>
            <button type="submit" className="btn btn-primary">{editingId ? "Simpan Perubahan" : "Tambahkan"}</button>
          </div>
        </form>
      </Modal>

      {/* Toast Notification (Simple Implementation) */}
      {notif.open && (
        <div className="toast toast-top toast-end z-50">
          <div className={`alert alert-${notif.variant} flex flex-row shadow-lg`}>
            <span>{notif.message}</span>
            <button onClick={() => setNotif({ ...notif, open: false })} className="btn btn-ghost btn-xs btn-circle opacity-50 hover:opacity-100 ml-2">
               ✕
            </button>
          </div>
        </div>
      )}

    </Panel>
  );
}