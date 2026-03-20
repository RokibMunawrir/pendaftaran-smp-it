import { useState } from 'react';
import NavbarUser from '../ui/navbar-user';
import TimelineProgress, { type TimelineStep } from '../ui/timeline-progress';
import { getStatusBadge } from '../../lib/utils/status';

interface PaymentProps {
  userId?: string;
  registrationId?: string;
  user: { name: string; registrationNumber: string | null };
  initialPayment?: any;
  settings?: any;
  steps?: TimelineStep[];
}

export default function Payment({
  userId = "",
  registrationId = "",
  user,
  initialPayment = null,
  settings = null,
  steps = []
}: PaymentProps) {
  // Parse Settings - use dedicated payment setting fields
  const parseBiaya = (val: any): { name: string; amount: string; description: string }[] => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') {
      try { return JSON.parse(val); } catch { return []; }
    }
    return [];
  };
  const biayaItems = parseBiaya(settings?.biaya);
  
  // Calculate total from all biaya items
  const totalAmount = biayaItems.reduce((sum: number, item: { amount: string }) => {
    const num = parseInt(String(item.amount).replace(/[^0-9]/g, ''), 10);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);
  const formattedTotal = totalAmount > 0
    ? `Rp ${totalAmount.toLocaleString('id-ID')}`
    : (biayaItems.length > 0 ? biayaItems[0].amount : "Rp 0");

  const dynamicBankName = settings?.biayaBankName || "Bank Syariah Indonesia (BSI)";
  const dynamicAccountNumber = settings?.biayaAccountNumber || "7123 4567 89";
  const dynamicAccountName = settings?.biayaAccountName || "Yayasan Pondok Pesantren";
  const dynamicInstruction = settings?.biayaInstruction || "Silakan transfer sesuai nominal di atas. Simpan bukti transfer untuk diunggah pada tahap selanjutnya.";

  const [notif, setNotif] = useState<{ open: boolean; message: string; variant: "success" | "error" }>({
    open: false,
    message: "",
    variant: "success",
  });

  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [senderName, setSenderName] = useState(initialPayment?.senderName || '');
  const [bankTujuan, setBankTujuan] = useState(initialPayment?.bankTujuan || dynamicBankName || '');
  const [copiedRekening, setCopiedRekening] = useState<string | null>(null);
  
  // Existing proof URL if it exists
  const existingProofUrl = initialPayment?.proofUrl || null;

  const handleCopy = (rekening: string) => {
    navigator.clipboard.writeText(rekening.replace(/\s/g, ''));
    setCopiedRekening(rekening);
    setTimeout(() => setCopiedRekening(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationId) {
      setNotif({ open: true, message: "Registration ID tidak ditemukan.", variant: "error" });
      return;
    }

    if (!file && !existingProofUrl) {
      setNotif({ open: true, message: "Mohon lampirkan bukti pembayaran.", variant: "error" });
      return;
    }

    if (!bankTujuan || !senderName) {
      setNotif({ open: true, message: "Mohon lengkapi semua data.", variant: "error" });
      return;
    }

    setUploading(true);
    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("senderName", senderName);
    formData.append("bankTujuan", bankTujuan);
    formData.append("registrationId", registrationId);

    try {
      const response = await fetch("/api/user/payment", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setNotif({ open: true, message: 'Bukti Pembayaran Berhasil Diunggah! Menunggu konfirmasi admin.', variant: 'success' });
      } else {
        const err = await response.json();
        throw new Error(err.error || "Gagal mengunggah bukti pembayaran");
      }
    } catch (error: any) {
      setNotif({ open: true, message: error.message, variant: "error" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200/50">
      <NavbarUser user={user} />
      
      <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-base-content mb-2 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>
            Pembayaran Pendaftaran
          </h2>
          <p className="text-base-content/60 text-lg">
            Selesaikan pembayaran biaya pendaftaran untuk melanjutkan proses seleksi calon santri.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">

            {/* Informasi Tagihan */}
            <div className="bg-base-100 rounded-[2rem] shadow-xl border border-base-200 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-base-200 w-max pr-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <h3 className="text-xl font-bold text-base-content">Informasi Tagihan</h3>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-primary/5 rounded-2xl p-6 border border-primary/10">
                <div>
                  <p className="text-base-content/60 font-medium mb-1">Rincian Pembayaran</p>
                  <h4 className="text-lg font-bold text-base-content">Biaya Pendaftaran Santri Baru</h4>
                  <p className="text-sm text-base-content/70 mt-1">No. Pendaftaran: <span className="font-semibold">{user.registrationNumber}</span></p>
                  <div className="mt-2 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                       <span className="text-xs font-medium text-base-content/50">Status:</span>
                       <span className={`badge badge-sm font-bold ${getStatusBadge(initialPayment?.status)}`}>
                         {initialPayment?.status || 'BELUM BAYAR'}
                       </span>
                    </div>
                    {initialPayment?.status === 'VERIFIED' && initialPayment?.verifiedByName && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-success bg-success/10 w-fit px-2 py-1 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Diverifikasi oleh: {initialPayment.verifiedByName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-left md:text-right">
                  <p className="text-base-content/60 font-medium mb-1">Total Tagihan</p>
                  <p className="text-3xl font-extrabold text-primary">{formattedTotal}</p>
                </div>
              </div>

              {/* Rincian Biaya Table */}
              {biayaItems.length > 0 && (
                <div className="mt-4 overflow-x-auto">
                  <table className="table table-sm w-full">
                    <thead>
                      <tr className="bg-base-200/50">
                        <th className="text-base-content/70">Komponen Biaya</th>
                        <th className="text-base-content/70 text-right">Jumlah</th>
                      </tr>
                    </thead>
                    <tbody>
                      {biayaItems.map((item, idx) => (
                        <tr key={idx} className="border-b border-base-200">
                          <td>
                            <span className="font-medium">{item.name}</span>
                            {item.description && (
                              <p className="text-xs text-base-content/50 mt-0.5">{item.description}</p>
                            )}
                          </td>
                          <td className="text-right font-semibold">{item.amount}</td>
                        </tr>
                      ))}
                      {biayaItems.length > 1 && (
                        <tr className="bg-primary/5 font-bold">
                          <td className="text-primary">Total</td>
                          <td className="text-right text-primary">{formattedTotal}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-base-200/50 p-5 rounded-2xl border border-base-200 relative group transition-colors hover:border-primary/30">
                  <p className="text-sm font-semibold text-base-content/60 mb-2">Rekening {dynamicBankName}</p>
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <p className="text-xl font-bold tracking-wider">{dynamicAccountNumber}</p>
                    <button 
                      onClick={() => handleCopy(dynamicAccountNumber)}
                      className={`btn btn-sm btn-circle btn-ghost ${copiedRekening === dynamicAccountNumber ? 'text-success bg-success/10' : 'text-base-content/50 hover:text-primary hover:bg-primary/10'}`}
                      title={copiedRekening === dynamicAccountNumber ? 'Tersalin!' : 'Salin Rekening'}
                    >
                      {copiedRekening === dynamicAccountNumber ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-base-content/70">a.n. {dynamicAccountName}</p>
                </div>
              </div>
              
              {dynamicInstruction && (
                <div className="mt-4 p-4 bg-info/5 rounded-xl border border-info/20 text-sm text-info-content/80 flex gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                  </svg>
                  <p>{dynamicInstruction}</p>
                </div>
              )}
            </div>

            {/* Form Konfirmasi Pembayaran */}
            <div className="bg-base-100 rounded-[2rem] shadow-xl border border-base-200 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-base-200 w-max pr-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>
                <h3 className="text-xl font-bold text-base-content">Konfirmasi & Upload Bukti</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control w-full">
                    <label className="label pt-0"><span className="label-text font-semibold">Bank Tujuan Transfer</span></label>
                    <select 
                      name="bankTujuan" 
                      value={bankTujuan} 
                      onChange={(e) => setBankTujuan(e.target.value)} 
                      className="select select-bordered focus:border-primary w-full bg-white dark:bg-base-100"
                      required
                    >
                      <option value="" disabled>Pilih Bank Tujuan</option>
                      <option value={dynamicBankName}>{dynamicBankName}</option>
                    </select>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label pt-0"><span className="label-text font-semibold">Atas Nama Pengirim</span></label>
                    <input 
                      type="text" 
                      name="senderName" 
                      value={senderName} 
                      onChange={(e) => setSenderName(e.target.value)} 
                      placeholder="Nama di rekening pengirim" 
                      className="input input-bordered focus:border-primary w-full bg-base-200/30" 
                      required 
                    />
                  </div>
                </div>

                <div className="form-control w-full">
                  <label className="label pt-0"><span className="label-text font-semibold">Upload Bukti Transfer</span></label>
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-base-300 rounded-2xl cursor-pointer bg-base-200/20 hover:bg-base-200/50 hover:border-primary transition-colors">
                      {file ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-success mb-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                          <p className="mb-1 font-semibold text-base-content">{file.name}</p>
                          <p className="text-xs text-base-content/50">{(file.size / 1024).toFixed(2)} KB • Klik untuk mengganti</p>
                        </>
                      ) : uploading ? (
                        <div className="flex flex-col items-center">
                          <span className="loading loading-spinner loading-md text-primary mb-2"></span>
                          <p className="text-sm font-medium">Mengunggah...</p>
                        </div>
                      ) : existingProofUrl ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-success mb-2">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                          <p className="mb-1 font-semibold text-base-content">Sudah Terupload</p>
                          <p className="text-xs text-base-content/50">Klik untuk mengganti</p>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-base-content/40 mb-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                          </svg>
                          <p className="mb-1 text-sm font-semibold text-base-content/70">
                            <span className="text-primary hover:underline">Klik untuk upload</span> atau drag & drop
                          </p>
                          <p className="text-xs text-base-content/50">PNG, JPG atau PDF (Maks. 5MB)</p>
                        </>
                      )}
                    <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileChange} />
                  </label>
                </div>

                <div className="pt-6 mt-6 border-t border-base-200">
                  <button 
                    type="submit" 
                    className="btn btn-primary w-full shadow-lg shadow-primary/30 text-base" 
                    disabled={uploading || (!file && !existingProofUrl) || !bankTujuan || !senderName}
                  >
                    {uploading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                      </svg>
                    )}
                    {uploading ? 'Mengunggah...' : 'Kirim Bukti Pembayaran'}
                  </button>
                </div>
              </form>
            </div>

          </div>

          {/* Right Sidebar - Timeline */}
          <div className="lg:col-span-1">
            <TimelineProgress steps={steps} contactUrl="https://wa.me/123456789" />
          </div>
        </div>
        
      </div>

      {/* Notification Toast */}
      {notif.open && (
        <div className="toast toast-top toast-center z-50">
          <div className={`alert ${notif.variant === 'success' ? 'alert-success' : 'alert-error'} shadow-lg text-white font-medium`}>
            <span>{notif.message}</span>
            <button className="btn btn-ghost btn-xs" onClick={() => setNotif({ ...notif, open: false })}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}
