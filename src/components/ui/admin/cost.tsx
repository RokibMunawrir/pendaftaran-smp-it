import { useState } from "react";
import Panel from "../panel";
import Modal from "../modal";

export default function CostManagement() {
  const [feeAmount, setFeeAmount] = useState("250000");
  const [bankName, setBankName] = useState("Bank Syariah Indonesia (BSI)");
  const [accountNumber, setAccountNumber] = useState("1234567890");
  const [accountName, setAccountName] = useState("Pondok Pesantren Al-Hikmah");
  const [instruction, setInstruction] = useState("Silakan transfer sesuai nominal di atas. Simpan bukti transfer untuk diunggah pada tahap selanjutnya.");

  const [openSave, setOpenSave] = useState(false);
  const [notif, setNotif] = useState<{ open: boolean; message: string; variant: "success" | "error" | "info" | "warning" }>({
    open: false,
    message: "",
    variant: "success",
  });

  const handleSave = () => {
    setOpenSave(false);
    // Simulate save
    setNotif({ open: true, message: "Pengaturan biaya pendaftaran berhasil disimpan!", variant: "success" });
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
        {/* Nominal Biaya */}
        <div className="card outline outline-1 outline-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-base border-b border-base-200 pb-2 mb-2">Nominal Pendaftaran</h3>
            
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium">Biaya (Rp)</span>
              </div>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="250000"
                value={feeAmount}
                onChange={(e) => setFeeAmount(e.target.value)}
              />
              <div className="label">
                <span className="label-text-alt text-base-content/60">Nominal biaya yang ditagihkan per pendaftar. Hanya angka, tanpa titik.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Informasi Rekening */}
        <div className="card outline outline-1 outline-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-base border-b border-base-200 pb-2 mb-2">Informasi Rekening Pembayaran</h3>
            
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
                  placeholder="Misal: Pondok Pesantren Al-Hikmah"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                />
              </label>
            </div>
            
            <label className="form-control w-full mt-4">
              <div className="label">
                <span className="label-text font-medium">Instruksi Pembayaran</span>
              </div>
              <textarea
                className="textarea textarea-bordered w-full"
                rows={3}
                placeholder="Tuliskan instruksi transfer..."
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
              />
              <div className="label">
                <span className="label-text-alt text-base-content/60">Instruksi ini akan tertampil pada halaman pembayaran calon santri.</span>
              </div>
            </label>
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
      >
        <p>Apakah Anda yakin ingin menyimpan pengaturan biaya pendaftaran ini?</p>
      </Modal>

      <Modal open={notif.open} onClose={() => setNotif({ ...notif, open: false })} mode="notification" variant={notif.variant} duration={3000} position="top-end">
        <p>{notif.message}</p>
      </Modal>
    </Panel>
  );
}
