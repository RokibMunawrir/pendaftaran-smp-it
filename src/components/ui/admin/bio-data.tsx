import { useState } from "react";
import Panel from "../panel";
import Modal from "../modal";

interface Pendaftar {
  id: string;
  name: string;
  email: string;
  nik: string | null;
  nisn: string | null;
  placeOfBirth: string | null;
  dateOfBirth: Date | null;
  gender: string | null;
  religion: string | null;
  hobby: string | null;
  ambition: string | null;
  address: string | null;
  province: string | null;
  city: string | null;
  district: string | null;
  phone: string | null;
  photo: string | null;
  fatherName: string | null;
  fatherPhone: string | null;
  fatherJob: string | null;
  fatherIncome: string | null;
  motherName: string | null;
  motherPhone: string | null;
  motherJob: string | null;
  motherIncome: string | null;
  parentPhone: string | null;
  previousSchool: string | null;
  originSchoolNpsn: string | null;
  program: string | null;
  registrationDate: Date | null;
  registrationNumber: string | null;
  status: string | null;
}

import { getStatusBadge, REGISTRATION_STATUS } from "../../../lib/utils/status";
import { toTitleCase } from "../../../lib/utils/string";

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 py-2 border-b border-base-200 last:border-b-0">
      <span className="text-sm text-base-content/50 sm:w-44 shrink-0">{label}</span>
      <span className="text-sm font-medium">{value || "-"}</span>
    </div>
  );
}


export default function DetailPendaftar({ data, documents: initialDocuments = [], payment: initialPayment = null, adminName }: { data: Pendaftar | null; documents?: any[]; payment?: any; adminName?: string }) {
  if (!data) {
    return (
      <Panel title="Detail Pendaftar">
        <div className="alert alert-warning">Data pendaftar tidak ditemukan.</div>
      </Panel>
    );
  }
  const [p, setP] = useState(data);
  const [docs, setDocs] = useState(initialDocuments);
  const [pay, setPay] = useState(initialPayment);
  const [loadingDoc, setLoadingDoc] = useState<string | null>(null);
  const [loadingPay, setLoadingPay] = useState(false);
  const [loadingReg, setLoadingReg] = useState(false);
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string } | null>(null);
  const [openVerifikasi, setOpenVerifikasi] = useState(false);
  const [openTolak, setOpenTolak] = useState(false);
  const [openVerifikasiPay, setOpenVerifikasiPay] = useState(false);
  const [openTolakPay, setOpenTolakPay] = useState(false);
  const [catatanTolak, setCatatanTolak] = useState("");
  const [notif, setNotif] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showNotif = (msg: string, type: "success" | "error" = "success") => {
    setNotif({ msg, type });
    setTimeout(() => setNotif(null), 3000);
  };

  const handleUpdateDocStatus = async (docId: string, status: string) => {
    setLoadingDoc(docId);
    try {
      const response = await fetch("/api/admin/documents", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: docId, status }),
      });

      if (response.ok) {
        setDocs((prev) => prev.map((d) => (d.id === docId ? { ...d, status } : d)));
        showNotif(`Dokumen berhasil ${status === "VERIFIED" ? "diverifikasi" : "ditolak"}`);
      } else {
        const err = await response.json();
        showNotif(err.error || "Gagal mengupdate status dokumen", "error");
      }
    } catch (error) {
      console.error(error);
      showNotif("Terjadi kesalahan koneksi", "error");
    } finally {
      setLoadingDoc(null);
    }
  };

  const handleUpdatePaymentStatus = async (status: string) => {
    if (!pay) return;
    setLoadingPay(true);
    try {
      const response = await fetch("/api/admin/payment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: pay.id, status }),
      });

      if (response.ok) {
        setPay({ ...pay, status, verifiedByName: status === "VERIFIED" ? adminName : null });
        showNotif(`Pembayaran berhasil ${status === "VERIFIED" ? "diverifikasi" : "ditolak"}`);
      } else {
        const err = await response.json();
        showNotif(err.error || "Gagal mengupdate status pembayaran", "error");
      }
    } catch (error) {
      console.error(error);
      showNotif("Terjadi kesalahan koneksi", "error");
    } finally {
      setLoadingPay(false);
    }
  };

  const handleUpdateRegistrationStatus = async (status: string) => {
    if (!p.id) return;
    setLoadingReg(true);
    try {
      const response = await fetch("/api/admin/registration", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: p.id, status, notes: catatanTolak }),
      });

      if (response.ok) {
        setP({ ...p, status });
        showNotif(`Status pendaftaran berhasil diperbarui: ${status}`);
      } else {
        const err = await response.json();
        showNotif(err.error || "Gagal mengupdate status pendaftaran", "error");
      }
    } catch (error) {
      console.error(error);
      showNotif("Terjadi kesalahan koneksi", "error");
    } finally {
      setLoadingReg(false);
    }
  };

  const docLabels: Record<string, string> = {
    foto: "Pas Foto (3x4)",
    kk: "Kartu Keluarga",
    akta: "Akta Kelahiran",
    skl: "Ijazah / SKL",
  };

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
              <h2 className="text-lg font-bold">{toTitleCase(p.name)}</h2>
              <p className="text-sm text-base-content/50">{p.placeOfBirth}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className={`badge badge-sm ${getStatusBadge(p.status)}`}>{p.status || "Unknown"}</span>
                <span className="badge badge-ghost badge-sm">{p.program}</span>
                <span className="text-xs text-base-content/40">Terdaftar: {p.registrationNumber && p.registrationNumber}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {notif && (
                <div className={`alert ${notif.type === "success" ? "alert-success" : "alert-error"} w-auto shadow-lg text-white font-medium py-2 px-4 h-10 min-h-0`}>
                  <span className="text-sm">{notif.msg}</span>
                </div>
              )}
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
      </div>

      {/* Tabs */}
      <div className="tabs tabs-lift">
        {/* Tab 1: Bio Data */}
        <input type="radio" name="detail_tabs" className="tab" aria-label="Bio Data" defaultChecked />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <h3 className="font-semibold mb-3">Data Pribadi Santri</h3>
          <div className="max-w-lg">
            <InfoRow label="Nama Lengkap" value={toTitleCase(p.name)} />
            <InfoRow label="NIK" value={p.nik} />
            <InfoRow label="NISN" value={p.nisn} />
            <InfoRow label="Tempat Lahir" value={p.placeOfBirth} />
            <InfoRow label="Tanggal Lahir" value={p.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString() : null} />
            <InfoRow label="Jenis Kelamin" value={p.gender} />
            <InfoRow label="Agama" value={p.religion} />
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
            <InfoRow label="Nama Ayah" value={p.fatherName} />
            <InfoRow label="No. Telepon" value={p.fatherPhone} />
            <InfoRow label="Pekerjaan" value={p.fatherJob} />
            <InfoRow label="Penghasilan" value={p.fatherIncome} />
          </div>

          <div className="divider"></div>

          <h3 className="font-semibold mb-3">Data Ibu</h3>
          <div className="max-w-lg">
            <InfoRow label="Nama Ibu" value={p.motherName} />
            <InfoRow label="No. Telepon" value={p.motherPhone} />
            <InfoRow label="Pekerjaan" value={p.motherJob} />
            <InfoRow label="Penghasilan" value={p.motherIncome} />
          </div>
        </div>

        {/* Tab 3: Riwayat Pendidikan */}
        <input type="radio" name="detail_tabs" className="tab" aria-label="Pendidikan" />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <h3 className="font-semibold mb-3">Riwayat Pendidikan</h3>
          <div className="max-w-lg">
            <InfoRow label="Sekolah Asal" value={p.previousSchool} />
            <InfoRow label="NPSN" value={p.originSchoolNpsn} />
          </div>

          <div className="divider"></div>

          <h3 className="font-semibold mb-3">Program Pendaftaran</h3>
          <div className="max-w-lg">
            <InfoRow label="Program" value={p.program} />
            <InfoRow label="Status" value={p.status} />
          </div>
        </div>

        {/* Tab 4: Dokumen */}
        <input type="radio" name="detail_tabs" className="tab" aria-label="Dokumen" />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <h3 className="font-semibold mb-4">Dokumen Pendaftaran</h3>
          {docs.length === 0 ? (
            <div className="alert alert-info">Belum ada dokumen yang diunggah.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {docs.map((doc) => (
                <div key={doc.id} className="card bg-base-100 shadow-sm border border-base-300 overflow-hidden">
                  <div className="relative aspect-[3/4] bg-base-200 group">
                    {doc.fileUrl.toLowerCase().endsWith(".pdf") ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12 text-error mb-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        <span className="text-sm font-medium">PDF Document</span>
                      </div>
                    ) : (
                      <img src={doc.fileUrl} alt={doc.type} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button className="btn btn-sm btn-circle btn-primary" onClick={() => setPreviewImage({ src: doc.fileUrl, title: docLabels[doc.type] || doc.type })}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      </button>
                      <a href={doc.fileUrl} target="_blank" className="btn btn-sm btn-circle btn-ghost bg-white/20 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-sm uppercase">{docLabels[doc.type] || doc.type}</h4>
                      <span className={`badge badge-xs ${getStatusBadge(doc.status)}`}>{doc.status}</span>
                    </div>
                    <p className="text-xs text-base-content/50 mb-4 font-mono">Uploaded: {new Date(doc.uploadDate).toLocaleString()}</p>
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-xs btn-success flex-1" 
                        onClick={() => handleUpdateDocStatus(doc.id, "VERIFIED")}
                        disabled={loadingDoc === doc.id || doc.status === "VERIFIED"}
                      >
                        {loadingDoc === doc.id ? <span className="loading loading-spinner loading-xs"></span> : "Verifikasi"}
                      </button>
                      <button 
                        className="btn btn-xs btn-error flex-1" 
                        onClick={() => handleUpdateDocStatus(doc.id, "REJECTED")}
                        disabled={loadingDoc === doc.id || doc.status === "REJECTED"}
                      >
                        Tolak
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tab 5: Pembayaran */}
        <input type="radio" name="detail_tabs" className="tab" aria-label="Pembayaran" />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <h3 className="font-semibold mb-4">Bukti Pembayaran</h3>
          {!pay ? (
            <div className="alert alert-info">Belum ada bukti pembayaran yang diunggah.</div>
          ) : (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Details */}
                <div className="lg:col-span-1 space-y-4">
                   <div className="bg-base-200/50 p-4 rounded-2xl border border-base-300">
                      <h4 className="text-xs font-bold opacity-50 uppercase mb-3">Informasi Transfer</h4>
                      <div className="space-y-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] uppercase font-bold text-base-content/40 tracking-wider">Nama Pengirim</span>
                          <span className="text-sm font-semibold">{pay.senderName}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] uppercase font-bold text-base-content/40 tracking-wider">Bank Tujuan</span>
                          <span className="text-sm font-semibold">{pay.bankTujuan}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] uppercase font-bold text-base-content/40 tracking-wider">Tanggal Upload</span>
                          <span className="text-sm font-semibold">{new Date(pay.paymentDate).toLocaleString()}</span>
                        </div>
                        <div className="pt-2 border-t border-base-300 flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold text-base-content/40 tracking-wider">Status Verifikasi</span>
                            <span className={`badge badge-sm ${getStatusBadge(pay.status)}`}>{pay.status}</span>
                          </div>
                          {pay.status === "VERIFIED" && pay.verifiedByName && (
                            <div className="flex items-center justify-between border-t border-base-100/50 pt-2">
                              <span className="text-[10px] uppercase font-bold text-base-content/40 tracking-wider">Diverifikasi Oleh</span>
                              <span className="text-xs font-semibold text-success">{pay.verifiedByName}</span>
                            </div>
                          )}
                        </div>
                      </div>
                   </div>

                   <div className="flex flex-col gap-2">
                      <button 
                         className="btn btn-success btn-sm w-full" 
                         onClick={() => setOpenVerifikasiPay(true)}
                         disabled={loadingPay || pay.status === "VERIFIED"}
                      >
                         {loadingPay ? <span className="loading loading-spinner loading-xs"></span> : (
                           <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> Verifikasi Pembayaran</>
                         )}
                      </button>
                      <button 
                         className="btn btn-error btn-sm w-full" 
                         onClick={() => setOpenTolakPay(true)}
                         disabled={loadingPay || pay.status === "REJECTED"}
                      >
                         Tolak Pembayaran
                      </button>
                   </div>
                </div>

                {/* Proof Image */}
                <div className="lg:col-span-2">
                  <div className="card bg-base-100 shadow-sm border border-base-300 overflow-hidden">
                    <div className="relative aspect-auto min-h-[400px] bg-base-200 group">
                        <img src={pay.proofUrl} alt="Bukti Pembayaran" className="w-full h-full object-contain" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button className="btn btn-sm btn-circle btn-primary" onClick={() => setPreviewImage({ src: pay.proofUrl, title: "Bukti Pembayaran" })}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              </svg>
                          </button>
                          <a href={pay.proofUrl} target="_blank" className="btn btn-sm btn-circle btn-ghost bg-white/20 text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                              </svg>
                          </a>
                        </div>
                    </div>
                  </div>
                </div>
             </div>
          )}
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

      {/* Modal verifikasi pembayaran */}
      <Modal 
        open={openVerifikasiPay} 
        onClose={() => setOpenVerifikasiPay(false)} 
        title="Verifikasi Pembayaran" 
        onConfirm={() => { handleUpdatePaymentStatus("VERIFIED"); setOpenVerifikasiPay(false); }} 
        variant="success" 
        confirmLabel="Verifikasi"
        loading={loadingPay}
      >
        <p>Apakah Anda yakin ingin memverifikasi pembayaran ini?</p>
      </Modal>

      {/* Modal tolak pembayaran */}
      <Modal 
        open={openTolakPay} 
        onClose={() => setOpenTolakPay(false)} 
        title="Tolak Pembayaran" 
        onConfirm={() => { handleUpdatePaymentStatus("REJECTED"); setOpenTolakPay(false); }} 
        variant="error" 
        confirmLabel="Tolak"
        loading={loadingPay}
      >
        <p>Apakah Anda yakin ingin menolak pembayaran ini?</p>
      </Modal>

      {/* Modal verifikasi pendaftar */}
      <Modal 
        open={openVerifikasi} 
        onClose={() => setOpenVerifikasi(false)} 
        title="Verifikasi Pendaftar" 
        onConfirm={() => { handleUpdateRegistrationStatus(REGISTRATION_STATUS.TEST_INTERVIEW); setOpenVerifikasi(false); }} 
        variant="success" 
        confirmLabel="Verifikasi"
        loading={loadingReg}
      >
        <p>Apakah Anda yakin ingin memverifikasi pendaftar ini? Status akan berlanjut ke tahap <b>Tes & Wawancara</b>.</p>
      </Modal>

      {/* Modal tolak pendaftar */}
      <Modal
        open={openTolak}
        onClose={() => { setOpenTolak(false); setCatatanTolak(""); }}
        title="Tolak Pendaftar"
        onConfirm={() => { handleUpdateRegistrationStatus(REGISTRATION_STATUS.REJECTED); setOpenTolak(false); }}
        variant="error"
        confirmLabel="Tolak"
        loading={loadingReg || catatanTolak.trim() === ""}
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
