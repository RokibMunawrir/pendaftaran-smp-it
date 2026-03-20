import { useState, useEffect } from "react";
import Panel from "../panel";
import Modal from "../modal";

interface MaterialItem {
  title: string;
  items: string[];
}

interface TesScheduleData {
  date: string;
  time: string;
  endTime: string;
  location: string;
  address: string;
  mapsUrl: string;
  method: string;
  materials: MaterialItem[];
  preparations: string[];
  notes: string;
}

const emptySchedule: TesScheduleData = {
  date: "",
  time: "",
  endTime: "",
  location: "",
  address: "",
  mapsUrl: "",
  method: "Tatap Muka (Offline)",
  materials: [],
  preparations: [],
  notes: "",
};

export default function TestScheduleAdmin() {
  const [data, setData] = useState<TesScheduleData>(emptySchedule);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [openSave, setOpenSave] = useState(false);

  // Material modal
  const [openMatModal, setOpenMatModal] = useState(false);
  const [editMatIdx, setEditMatIdx] = useState<number | null>(null);
  const [matForm, setMatForm] = useState<MaterialItem>({ title: "", items: [""] });

  // Preparation modal
  const [openPrepModal, setOpenPrepModal] = useState(false);
  const [editPrepIdx, setEditPrepIdx] = useState<number | null>(null);
  const [prepForm, setPrepForm] = useState("");

  // Notification
  const [notif, setNotif] = useState<{ open: boolean; message: string; variant: "success" | "error" }>({
    open: false, message: "", variant: "success",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/setting/tes-wawancara");
      if (res.ok) {
        const json = await res.json();
        if (json) {
          setData({ ...emptySchedule, ...json });
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/setting/tes-wawancara", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal menyimpan");
      setOpenSave(false);
      setNotif({ open: true, message: "Pengaturan tes & wawancara berhasil disimpan!", variant: "success" });
    } catch {
      setNotif({ open: true, message: "Gagal menyimpan pengaturan", variant: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  // --- Material CRUD ---
  const openAddMaterial = () => {
    setEditMatIdx(null);
    setMatForm({ title: "", items: [""] });
    setOpenMatModal(true);
  };
  const openEditMaterial = (idx: number) => {
    setEditMatIdx(idx);
    setMatForm({ ...data.materials[idx], items: [...data.materials[idx].items] });
    setOpenMatModal(true);
  };
  const saveMaterial = () => {
    const cleaned = { ...matForm, items: matForm.items.filter(i => i.trim()) };
    const updated = [...data.materials];
    if (editMatIdx !== null) {
      updated[editMatIdx] = cleaned;
    } else {
      updated.push(cleaned);
    }
    setData({ ...data, materials: updated });
    setOpenMatModal(false);
  };
  const deleteMaterial = (idx: number) => {
    setData({ ...data, materials: data.materials.filter((_, i) => i !== idx) });
  };

  // --- Preparation CRUD ---
  const openAddPrep = () => {
    setEditPrepIdx(null);
    setPrepForm("");
    setOpenPrepModal(true);
  };
  const openEditPrep = (idx: number) => {
    setEditPrepIdx(idx);
    setPrepForm(data.preparations[idx]);
    setOpenPrepModal(true);
  };
  const savePrep = () => {
    const updated = [...data.preparations];
    if (editPrepIdx !== null) {
      updated[editPrepIdx] = prepForm;
    } else {
      updated.push(prepForm);
    }
    setData({ ...data, preparations: updated });
    setOpenPrepModal(false);
  };
  const deletePrep = (idx: number) => {
    setData({ ...data, preparations: data.preparations.filter((_, i) => i !== idx) });
  };

  if (loading) {
    return (
      <Panel title="Tes & Wawancara">
        <div className="flex justify-center p-16">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </Panel>
    );
  }

  return (
    <Panel title="Tes & Wawancara">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg font-bold">Pengaturan Jadwal Tes & Wawancara</h2>
          <p className="text-sm text-base-content/50">Atur detail pelaksanaan, materi ujian, dan persiapan calon santri</p>
        </div>
        <button className="btn btn-primary btn-sm gap-2" onClick={() => setOpenSave(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
          </svg>
          Simpan Perubahan
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Detail Pelaksanaan */}
        <div className="card outline outline-1 outline-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-base border-b border-base-200 pb-2 mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              Detail Pelaksanaan
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="form-control w-full">
                <div className="label"><span className="label-text font-medium">Tanggal</span></div>
                <input type="date" className="input input-bordered w-full" value={data.date} onChange={e => setData({ ...data, date: e.target.value })} />
              </label>
              <label className="form-control w-full">
                <div className="label"><span className="label-text font-medium">Waktu Mulai</span></div>
                <input type="time" className="input input-bordered w-full" value={data.time} onChange={e => setData({ ...data, time: e.target.value })} />
              </label>
              <label className="form-control w-full">
                <div className="label"><span className="label-text font-medium">Waktu Selesai</span></div>
                <input type="time" className="input input-bordered w-full" value={data.endTime} onChange={e => setData({ ...data, endTime: e.target.value })} />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <label className="form-control w-full">
                <div className="label"><span className="label-text font-medium">Nama Lokasi</span></div>
                <input type="text" className="input input-bordered w-full" placeholder="Misal: Aula Utama Pondok Pesantren" value={data.location} onChange={e => setData({ ...data, location: e.target.value })} />
              </label>
              <label className="form-control w-full">
                <div className="label"><span className="label-text font-medium">Metode</span></div>
                <select className="select select-bordered w-full" value={data.method} onChange={e => setData({ ...data, method: e.target.value })}>
                  <option>Tatap Muka (Offline)</option>
                  <option>Daring (Online)</option>
                  <option>Hybrid (Online & Offline)</option>
                </select>
              </label>
            </div>

            <label className="form-control w-full mt-2">
              <div className="label"><span className="label-text font-medium">Alamat Lengkap</span></div>
              <textarea className="textarea textarea-bordered w-full" rows={2} placeholder="Alamat lengkap lokasi tes..." value={data.address} onChange={e => setData({ ...data, address: e.target.value })} />
            </label>

            <label className="form-control w-full mt-2">
              <div className="label"><span className="label-text font-medium">Link Google Maps</span></div>
              <input type="url" className="input input-bordered w-full" placeholder="https://maps.google.com/..." value={data.mapsUrl} onChange={e => setData({ ...data, mapsUrl: e.target.value })} />
            </label>
          </div>
        </div>

        {/* Materi Ujian */}
        <div className="card outline outline-1 outline-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between border-b border-base-200 pb-2 mb-2">
              <h3 className="card-title text-base flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                Materi Ujian
              </h3>
              <button className="btn btn-primary btn-sm gap-1" onClick={openAddMaterial}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Tambah Materi
              </button>
            </div>

            {data.materials.length === 0 ? (
              <div className="text-center py-8 text-base-content/50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 opacity-40 mx-auto mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                <span>Belum ada materi ujian. Klik "Tambah Materi" untuk menambahkan.</span>
              </div>
            ) : (
              <div className="space-y-4">
                {data.materials.map((mat, idx) => (
                  <div key={idx} className="p-4 bg-base-200/30 rounded-xl border border-base-200">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">{idx + 1}</span>
                        <h4 className="font-bold text-base-content">{mat.title}</h4>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button className="btn btn-ghost btn-sm" onClick={() => openEditMaterial(idx)} title="Edit">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </button>
                        <button className="btn btn-ghost btn-sm text-error" onClick={() => deleteMaterial(idx)} title="Hapus">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <ul className="list-disc list-inside ml-10 mt-2 text-base-content/70 space-y-1 text-sm">
                      {mat.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Persiapan */}
        <div className="card outline outline-1 outline-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between border-b border-base-200 pb-2 mb-2">
              <h3 className="card-title text-base flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
                Persiapan Peserta
              </h3>
              <button className="btn btn-primary btn-sm gap-1" onClick={openAddPrep}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Tambah
              </button>
            </div>

            {data.preparations.length === 0 ? (
              <div className="text-center py-8 text-base-content/50">
                <span>Belum ada item persiapan. Klik "Tambah" untuk menambahkan.</span>
              </div>
            ) : (
              <ul className="space-y-2">
                {data.preparations.map((prep, idx) => (
                  <li key={idx} className="flex items-center justify-between p-3 bg-base-200/30 rounded-xl border border-base-200">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-success shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span className="text-sm">{prep}</span>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button className="btn btn-ghost btn-xs" onClick={() => openEditPrep(idx)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </button>
                      <button className="btn btn-ghost btn-xs text-error" onClick={() => deletePrep(idx)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Catatan Tambahan */}
        <div className="card outline outline-1 outline-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-base border-b border-base-200 pb-2 mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
              Catatan Tambahan
            </h3>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={3}
              placeholder="Catatan atau informasi tambahan untuk peserta tes..."
              value={data.notes}
              onChange={e => setData({ ...data, notes: e.target.value })}
            />
            <div className="label">
              <span className="label-text-alt text-base-content/60">Catatan ini akan ditampilkan di halaman tes calon santri.</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Modals --- */}

      {/* Simpan */}
      <Modal open={openSave} onClose={() => setOpenSave(false)} title="Simpan Perubahan" onConfirm={handleSave} variant="success" confirmLabel="Simpan" loading={isSaving}>
        <p>Apakah Anda yakin ingin menyimpan pengaturan jadwal tes & wawancara?</p>
      </Modal>

      {/* Material Modal */}
      <Modal
        open={openMatModal}
        onClose={() => setOpenMatModal(false)}
        title={editMatIdx !== null ? "Edit Materi Ujian" : "Tambah Materi Ujian"}
        onConfirm={saveMaterial}
        variant="info"
        confirmLabel="Simpan"
        disabled={matForm.title.trim() === "" || matForm.items.every(i => i.trim() === "")}
        className="max-w-lg"
      >
        <div className="flex flex-col gap-3">
          <label className="form-control w-full">
            <div className="label"><span className="label-text font-medium">Judul Materi</span></div>
            <input type="text" className="input input-bordered w-full" placeholder="Contoh: Tes Tulis (Akademik & Agama)" value={matForm.title} onChange={e => setMatForm({ ...matForm, title: e.target.value })} />
          </label>
          <div className="form-control w-full">
            <div className="label"><span className="label-text font-medium">Butir-Butir Materi</span></div>
            {matForm.items.map((item, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  className="input input-bordered input-sm w-full"
                  placeholder={`Butir ${idx + 1}`}
                  value={item}
                  onChange={e => {
                    const updated = [...matForm.items];
                    updated[idx] = e.target.value;
                    setMatForm({ ...matForm, items: updated });
                  }}
                />
                {matForm.items.length > 1 && (
                  <button className="btn btn-ghost btn-sm text-error" onClick={() => setMatForm({ ...matForm, items: matForm.items.filter((_, i) => i !== idx) })}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
            ))}
            <button className="btn btn-ghost btn-sm self-start gap-1 mt-1" onClick={() => setMatForm({ ...matForm, items: [...matForm.items, ""] })}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              Tambah Butir
            </button>
          </div>
        </div>
      </Modal>

      {/* Preparation Modal */}
      <Modal
        open={openPrepModal}
        onClose={() => setOpenPrepModal(false)}
        title={editPrepIdx !== null ? "Edit Persiapan" : "Tambah Persiapan"}
        onConfirm={savePrep}
        variant="info"
        confirmLabel="Simpan"
        disabled={prepForm.trim() === ""}
      >
        <div className="flex flex-col gap-3">
          <label className="form-control w-full">
            <div className="label"><span className="label-text font-medium">Item Persiapan</span></div>
            <input type="text" className="input input-bordered w-full" placeholder="Contoh: Bawa alat tulis sendiri (Pensil 2B, Penghapus)" value={prepForm} onChange={e => setPrepForm(e.target.value)} />
          </label>
        </div>
      </Modal>

      {/* Notification */}
      <Modal open={notif.open} onClose={() => setNotif({ ...notif, open: false })} mode="notification" variant={notif.variant} duration={3000} position="top-end">
        <p>{notif.message}</p>
      </Modal>
    </Panel>
  );
}
