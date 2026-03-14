import { useState } from "react";
import Panel from "../panel";
import Modal from "../modal";

interface Pendaftar {
  id: string;
  name: string;
  nickname: string | null;
  birthPlace: string | null;
  birthDate: Date | null;
  gender: string | null;
  address: string | null;
  phone: string | null;
  email: string;
  photo: string | null;
  parentName: string | null;
  parentPhone: string | null;
  parentJob: string | null;
  parentAddress: string | null;
  motherName: string | null;
  motherPhone: string | null;
  motherJob: string | null;
  previousSchool: string | null;
  previousSchoolAddress: string | null;
  program: string;
  registrationDate: Date | null;
  status: string | null;
  rejectionNote?: string;
}

const statusBadge: Record<string, string> = {
  Diverifikasi: "badge-success",
  VERIFIED: "badge-success",
  Draft: "badge-warning",
  DRAFT: "badge-warning",
  Ditolak: "badge-error",
  REJECTED: "badge-error",
  Menunggu: "badge-info",
  PENDING: "badge-info",
};

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 py-2 border-b border-base-200 last:border-b-0">
      <span className="text-sm text-base-content/50 sm:w-44 shrink-0">{label}</span>
      <span className="text-sm font-medium">{value || "-"}</span>
    </div>
  );
}

function DocCard({ title, src, onClick }: { title: string; src: string; onClick: () => void }) {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-300 cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <figure className="px-4 pt-4">
        <img src={src} alt={title} className="rounded-lg object-cover h-48 w-full" />
      </figure>
      <div className="card-body p-4">
        <h4 className="card-title text-sm">{title}</h4>
        <p className="text-xs text-base-content/50">Klik untuk melihat ukuran penuh</p>
      </div>
    </div>
  );
}

export default function DetailPendaftar({ data }: { data: Pendaftar | null }) {
  if (!data) {
    return (
      <Panel title="Detail Pendaftar">
        <div className="alert alert-warning">Data pendaftar tidak ditemukan.</div>
      </Panel>
    );
  }
  const p = data;
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string } | null>(null);
  const [openVerifikasi, setOpenVerifikasi] = useState(false);
  const [openTolak, setOpenTolak] = useState(false);
  const [catatanTolak, setCatatanTolak] = useState("");

  return (
    <Panel title="Detail Pendaftar">
      {/* Header card */}
      <div className="card bg-base-100 shadow-sm border border-base-300 mb-4">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="avatar">
              <div className="w-20 rounded-xl">
                <img src={p.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=random&size=200`} alt={p.name} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold">{p.name}</h2>
              <p className="text-sm text-base-content/50">{p.birthPlace}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className={`badge badge-sm ${p.status ? statusBadge[p.status] : "badge-ghost"}`}>{p.status || "Unknown"}</span>
                <span className="badge badge-ghost badge-sm">{p.program}</span>
                <span className="text-xs text-base-content/40">Terdaftar: {p.registrationDate?.toLocaleDateString() || "-"}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="/admin/list" className="btn btn-ghost btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Kembali
              </a>
              <button className="btn btn-success btn-sm" onClick={() => setOpenVerifikasi(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Verifikasi
              </button>
              <button className="btn btn-error btn-sm" onClick={() => setOpenTolak(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Tolak
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert catatan penolakan */}
      {p.status === "Ditolak" && p.rejectionNote && (
        <div className="alert alert-error shadow-sm mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <div>
            <h4 className="font-bold text-sm">Catatan Penolakan</h4>
            <p className="text-sm">{p.rejectionNote}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="tabs tabs-lift">
        {/* Tab 1: Bio Data */}
        <input type="radio" name="detail_tabs" className="tab" aria-label="Bio Data" defaultChecked />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <h3 className="font-semibold mb-3">Data Pribadi Santri</h3>
          <div className="max-w-lg">
            <InfoRow label="Nama Lengkap" value={p.name} />
            <InfoRow label="Nama Panggilan" value={p.nickname} />
            <InfoRow label="Tempat Lahir" value={p.birthPlace} />
            <InfoRow label="Tanggal Lahir" value={p.birthDate?.toLocaleDateString()} />
            <InfoRow label="Jenis Kelamin" value={p.gender} />
            <InfoRow label="Alamat" value={p.address} />
            <InfoRow label="No. Telepon" value={p.phone} />
            <InfoRow label="Email" value={p.email} />
          </div>
        </div>

        {/* Tab 2: Data Orang Tua */}
        <input type="radio" name="detail_tabs" className="tab" aria-label="Data Orang Tua" />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <h3 className="font-semibold mb-3">Data Ayah</h3>
          <div className="max-w-lg">
            <InfoRow label="Nama Ayah" value={p.parentName} />
            <InfoRow label="No. Telepon" value={p.parentPhone} />
            <InfoRow label="Pekerjaan" value={p.parentJob} />
            <InfoRow label="Alamat" value={p.parentAddress} />
          </div>

          <div className="divider"></div>

          <h3 className="font-semibold mb-3">Data Ibu</h3>
          <div className="max-w-lg">
            <InfoRow label="Nama Ibu" value={p.motherName} />
            <InfoRow label="No. Telepon" value={p.motherPhone} />
            <InfoRow label="Pekerjaan" value={p.motherJob} />
          </div>
        </div>

        {/* Tab 3: Riwayat Pendidikan */}
        <input type="radio" name="detail_tabs" className="tab" aria-label="Pendidikan" />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <h3 className="font-semibold mb-3">Riwayat Pendidikan</h3>
          <div className="max-w-lg">
            <InfoRow label="Sekolah Asal" value={p.previousSchool} />
            <InfoRow label="Alamat Sekolah" value={p.previousSchoolAddress} />
          </div>

          <div className="divider"></div>

          <h3 className="font-semibold mb-3">Program Pendaftaran</h3>
          <div className="max-w-lg">
            <InfoRow label="Program" value={p.program} />
            <InfoRow label="Tanggal Daftar" value={p.registrationDate?.toLocaleDateString()} />
            <InfoRow label="Status" value={p.status} />
          </div>
        </div>

        {/* Tab 4: Dokumen */}
        <input type="radio" name="detail_tabs" className="tab" aria-label="Dokumen" />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <h3 className="font-semibold mb-4">Dokumen Pendaftaran</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="alert alert-info">Fitur verifikasi dokumen segera hadir.</div>
          </div>
        </div>
      </div>

      {/* Modal preview dokumen */}
      {previewImage && (
        <dialog className="modal modal-open" onClick={() => setPreviewImage(null)}>
          <div className="modal-box max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{previewImage.title}</h3>
              <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setPreviewImage(null)}>✕</button>
            </div>
            <img src={previewImage.src} alt={previewImage.title} className="w-full rounded-lg" />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setPreviewImage(null)}>close</button>
          </form>
        </dialog>
      )}

      {/* Modal verifikasi */}
      <Modal open={openVerifikasi} onClose={() => setOpenVerifikasi(false)} title="Verifikasi Pendaftar" onConfirm={() => setOpenVerifikasi(false)} variant="success" confirmLabel="Verifikasi">
        <p>Apakah Anda yakin ingin memverifikasi pendaftar ini?</p>
      </Modal>

      {/* Modal tolak */}
      <Modal
        open={openTolak}
        onClose={() => { setOpenTolak(false); setCatatanTolak(""); }}
        title="Tolak Pendaftar"
        onConfirm={() => { setOpenTolak(false); setCatatanTolak(""); }}
        variant="error"
        confirmLabel="Tolak"
        loading={catatanTolak.trim() === ""}
      >
        <div className="flex flex-col gap-3">
          <p>Apakah Anda yakin ingin menolak pendaftar ini?</p>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium">Catatan Penolakan <span className="text-error">*</span></span>
            </div>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={4}
              placeholder="Contoh: Foto tidak jelas, data orang tua belum lengkap..."
              value={catatanTolak}
              onChange={(e) => setCatatanTolak(e.target.value)}
            />
            <div className="label">
              <span className="label-text-alt text-base-content/50">Tulis bagian mana yang perlu direvisi oleh pendaftar</span>
            </div>
          </label>
        </div>
      </Modal>
    </Panel>
  );    
}