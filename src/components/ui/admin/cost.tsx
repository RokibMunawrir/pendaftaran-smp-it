import { useState } from "react";
import Panel from "../panel";
import Modal from "../modal";

interface BiayaItem {
  name: string;
  amount: string;
  description: string;
}

export default function CostManagement({ settings }: { settings?: any }) {
  // Read from dedicated DB fields
  const [bankName, setBankName] = useState(settings?.biayaBankName || "");
  const [accountNumber, setAccountNumber] = useState(settings?.biayaAccountNumber || "");
  const [accountName, setAccountName] = useState(settings?.biayaAccountName || "");
  const [instruction, setInstruction] = useState(settings?.biayaInstruction || "");

  // Biaya items from JSON field
  const [biayaItems, setBiayaItems] = useState<BiayaItem[]>(() => {
    if (!settings?.biaya) return [];
    if (Array.isArray(settings.biaya)) return settings.biaya;
    if (typeof settings.biaya === 'string') {
      try {
        const parsed = JSON.parse(settings.biaya);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Biaya form modal
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [biayaForm, setBiayaForm] = useState<BiayaItem>({ name: "", amount: "", description: "" });
  const [openBiayaModal, setOpenBiayaModal] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [openSave, setOpenSave] = useState(false);
  const [notif, setNotif] = useState<{ open: boolean; message: string; variant: "success" | "error" | "info" | "warning" }>({
    open: false,
    message: "",
    variant: "success",
  });

  // Biaya CRUD
  const openAddBiaya = () => {
    setEditingIdx(null);
    setBiayaForm({ name: "", amount: "", description: "" });
    setOpenBiayaModal(true);
  };
  const openEditBiaya = (idx: number) => {
    setEditingIdx(idx);
    setBiayaForm(biayaItems[idx]);
    setOpenBiayaModal(true);
  };
  const saveBiaya = () => {
    const updated = [...biayaItems];
    if (editingIdx !== null) {
      updated[editingIdx] = biayaForm;
    } else {
      updated.push(biayaForm);
    }
    setBiayaItems(updated);
    setOpenBiayaModal(false);
  };
  const deleteBiaya = (idx: number) => {
    setBiayaItems(biayaItems.filter((_, i) => i !== idx));
  };

  // Calculate total
  const total = biayaItems.reduce((sum, item) => {
    if (!item?.amount) return sum;
    const amountStr = String(item.amount);
    const num = parseInt(amountStr.replace(/[^0-9]/g, ''), 10);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save directly to the dedicated DB fields via a dedicated API call
      const response = await fetch('/api/admin/setting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          biaya: biayaItems,
          biayaBankName: bankName,
          biayaAccountNumber: accountNumber,
          biayaAccountName: accountName,
          biayaInstruction: instruction,
        })
      });

      if (!response.ok) throw new Error("Failed to save");

      setOpenSave(false);
      setNotif({ open: true, message: "Pengaturan biaya pendaftaran berhasil disimpan!", variant: "success" });
    } catch (error) {
      console.error(error);
      setNotif({ open: true, message: "Gagal menyimpan pengaturan", variant: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Panel title="Biaya Pendaftaran">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg font-bold">Pengaturan Biaya Pendaftaran</h2>
          <p className="text-sm text-base-content/50">Atur nominal biaya dan informasi rekening untuk pembayaran santri baru</p>
        </div>
        <button className="btn btn-primary btn-sm gap-2" onClick={() => setOpenSave(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
          </svg>
          Simpan Perubahan
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Informasi Rekening */}
        <div className="card outline outline-1 outline-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-base border-b border-base-200 pb-2 mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
              </svg>
              Informasi Rekening Pembayaran
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium">Nama Bank</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Misal: Bank Syariah Indonesia (BSI)"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium">Nomor Rekening</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="1234567890"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </label>

              <label className="form-control w-full md:col-span-2">
                <div className="label">
                  <span className="label-text font-medium">Atas Nama Rekening</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Misal: Yayasan Pondok Pesantren"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                />
              </label>
            </div>
            
            <label className="form-control w-full mt-4">
              <div className="label">
                <span className="label-text font-medium">Tata Cara Pembayaran</span>
              </div>
              <textarea
                className="textarea textarea-bordered w-full"
                rows={3}
                placeholder="Tuliskan instruksi transfer..."
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
              />
              <div className="label">
                <span className="label-text-alt text-base-content/60">Instruksi ini akan ditampilkan pada halaman pembayaran calon santri.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Rincian Komponen Biaya */}
        <div className="card outline outline-1 outline-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between border-b border-base-200 pb-2 mb-2">
              <h3 className="card-title text-base flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
                Rincian Komponen Biaya
              </h3>
              <button className="btn btn-primary btn-sm gap-1" onClick={openAddBiaya}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Tambah
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead className="bg-base-200/50">
                  <tr>
                    <th>Komponen Biaya</th>
                    <th>Jumlah</th>
                    <th>Keterangan</th>
                    <th className="w-24">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {biayaItems.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-base-content/50">
                        <div className="flex flex-col items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 opacity-40">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                          </svg>
                          <span>Belum ada komponen biaya. Klik "Tambah" untuk menambahkan.</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    biayaItems.map((b, i) => (
                      <tr key={i} className="hover:bg-base-200/50">
                        <td className="font-medium">{b.name}</td>
                        <td><span className="badge badge-ghost badge-sm">{b.amount}</span></td>
                        <td className="text-sm text-base-content/60">{b.description || "-"}</td>
                        <td>
                          <div className="flex gap-1">
                            <button className="btn btn-ghost btn-sm" onClick={() => openEditBiaya(i)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                              </svg>
                            </button>
                            <button className="btn btn-ghost btn-sm text-error" onClick={() => deleteBiaya(i)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                {biayaItems.length > 0 && (
                  <tfoot>
                    <tr className="bg-primary/5 font-bold">
                      <td className="text-primary">Total</td>
                      <td colSpan={3} className="text-primary">
                        Rp {total.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        open={openSave}
        onClose={() => setOpenSave(false)}
        title="Simpan Perubahan"
        onConfirm={handleSave}
        variant="success"
        confirmLabel="Simpan"
        loading={isSaving}
      >
        <p>Apakah Anda yakin ingin menyimpan pengaturan biaya pendaftaran ini?</p>
      </Modal>

      <Modal
        open={openBiayaModal}
        onClose={() => setOpenBiayaModal(false)}
        title={editingIdx !== null ? "Edit Komponen Biaya" : "Tambah Komponen Biaya"}
        onConfirm={saveBiaya}
        variant="info"
        confirmLabel="Simpan"
        disabled={biayaForm.name.trim() === "" || biayaForm.amount.trim() === ""}
      >
        <div className="flex flex-col gap-3">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium">Komponen Biaya</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Contoh: Biaya Pendaftaran"
              value={biayaForm.name}
              onChange={(e) => setBiayaForm({ ...biayaForm, name: e.target.value })}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium">Jumlah</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Contoh: Rp 350.000"
              value={biayaForm.amount}
              onChange={(e) => setBiayaForm({ ...biayaForm, amount: e.target.value })}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium">Keterangan</span>
            </div>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={2}
              placeholder="Keterangan tambahan (opsional)"
              value={biayaForm.description}
              onChange={(e) => setBiayaForm({ ...biayaForm, description: e.target.value })}
            />
          </label>
        </div>
      </Modal>

      <Modal open={notif.open} onClose={() => setNotif({ ...notif, open: false })} mode="notification" variant={notif.variant} duration={3000} position="top-end">
        <p>{notif.message}</p>
      </Modal>
    </Panel>
  );
}
