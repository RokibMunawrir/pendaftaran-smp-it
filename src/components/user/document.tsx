import { useState } from 'react';
import NavbarUser from '../ui/navbar-user';
import TimelineProgress, { type TimelineStep } from '../ui/timeline-progress';

interface DocumentUploadProps {
  userId?: string;
  registrationId?: string;
  initialDocuments?: any[];
  user: { name: string; registrationNumber: string | null };
  steps?: TimelineStep[];
}

export default function DocumentUpload({
  userId = "",
  registrationId = "",
  initialDocuments = [],
  user,
  steps = []
}: DocumentUploadProps) {
  
  const [notif, setNotif] = useState<{ open: boolean; message: string; variant: "success" | "error" }>({
    open: false,
    message: "",
    variant: "success",
  });

  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  
  // Find initial document URLs if they exist
  const getInitialUrl = (type: string) => {
    return initialDocuments.find(d => d.type === type)?.fileUrl || null;
  };

  const [files, setFiles] = useState<{
    foto: string | null;
    kk: string | null;
    akta: string | null;
    skl: string | null;
  }>({
    foto: getInitialUrl('foto'),
    kk: getInitialUrl('kk'),
    akta: getInitialUrl('akta'),
    skl: getInitialUrl('skl'),
  });

  const handleFileChange = (type: keyof typeof files) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (!registrationId) {
        setNotif({ open: true, message: "Registration ID tidak ditemukan. Harap selesaikan biodata terlebih dahulu.", variant: "error" });
        return;
      }

      setUploading(prev => ({ ...prev, [type]: true }));
      
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("type", type);
      formData.append("registrationId", registrationId);

      try {
        const response = await fetch("/api/user/document", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setFiles(prev => ({ ...prev, [type]: data.fileUrl }));
          setNotif({ open: true, message: `${type.toUpperCase()} Berhasil diunggah!`, variant: "success" });
        } else {
          const err = await response.json();
          throw new Error(err.error || "Gagal mengunggah file");
        }
      } catch (error: any) {
        setNotif({ open: true, message: error.message, variant: "error" });
      } finally {
        setUploading(prev => ({ ...prev, [type]: false }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.foto || !files.kk || !files.akta || !files.skl) {
      setNotif({ open: true, message: "Mohon lengkapi semua dokumen yang diwajibkan.", variant: "error" });
      return;
    }
    setNotif({ open: true, message: 'Berkas Berhasil Diunggah! Menunggu verifikasi admin.', variant: 'success' });
  };

  const FileInput = ({ label, type, accept, desc }: { label: string, type: keyof typeof files, accept: string, desc: string }) => {
    const fileUrl = files[type];
    const isUploading = uploading[type];

    return (
      <div className="form-control w-full">
        <label className="label pt-0"><span className="label-text font-semibold">{label}</span></label>
        <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${fileUrl ? 'border-success bg-success/5' : 'border-base-300 bg-base-200/20 hover:bg-base-200/50 hover:border-primary'}`}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            {isUploading ? (
              <div className="flex flex-col items-center">
                <span className="loading loading-spinner loading-md text-primary mb-2"></span>
                <p className="text-sm font-medium">Mengunggah...</p>
              </div>
            ) : fileUrl ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-success mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p className="mb-1 text-sm font-semibold text-base-content truncate max-w-[200px]">Sudah Terunggah</p>
                <p className="text-xs text-base-content/50">Klik untuk mengganti</p>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-base-content/40 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                <p className="mb-1 text-sm font-semibold text-base-content/70">
                  <span className="text-primary hover:underline">Upload file</span>
                </p>
                <p className="text-xs text-base-content/50 text-center">{desc}</p>
              </>
            )}
          </div>
          <input type="file" className="hidden" accept={accept} onChange={handleFileChange(type)} disabled={isUploading} />
        </label>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-base-200/50">
      <NavbarUser user={user} />
      
      <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-base-content mb-2 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            Upload Berkas
          </h2>
          <p className="text-base-content/60 text-lg">
            Unggah dokumen persyaratan untuk keperluan pendaftaran. Pastikan file terlihat jelas dan bisa dibaca.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">

            <div className="bg-base-100 rounded-[2rem] shadow-xl border border-base-200 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-base-200 w-max pr-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                </svg>
                <h3 className="text-xl font-bold text-base-content">Dokumen Wajib</h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FileInput 
                    type="foto" 
                    label="Pas Foto (3x4)" 
                    accept=".jpg,.jpeg,.png" 
                    desc="Format JPG/PNG, Maks. 2MB. Background Merah/Biru." 
                  />
                  <FileInput 
                    type="kk" 
                    label="Kartu Keluarga (KK)" 
                    accept=".jpg,.jpeg,.png,.pdf" 
                    desc="Format JPG/PNG/PDF, Maks. 5MB. Tulisan perlu terbaca jelas." 
                  />
                  <FileInput 
                    type="akta" 
                    label="Akta Kelahiran" 
                    accept=".jpg,.jpeg,.png,.pdf" 
                    desc="Format JPG/PNG/PDF, Maks. 5MB. Asli atau fotokopi legalisir." 
                  />
                  <FileInput 
                    type="skl" 
                    label="Surat Keterangan Lulus (SKL) / Ijazah" 
                    accept=".jpg,.jpeg,.png,.pdf" 
                    desc="Format JPG/PNG/PDF, Maks. 5MB. Jika belum lulus bisa menyusul." 
                  />
                </div>

                <div className="mt-8 p-4 bg-info/10 border border-info/20 rounded-xl">
                  <div className="flex gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-info flex-shrink-0 mt-0.5">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm">
                      <p className="font-bold text-base-content mb-1">Panduan Upload File</p>
                      <ul className="list-disc list-inside text-base-content/70 space-y-1">
                        <li>Pastikan menggunakan format file yang diizinkan (.jpg, .png, .pdf).</li>
                        <li>Ukuran file tidak melebihi batas maksimal yang tertera pada masing-masing dokumen.</li>
                        <li>Pastikan gambar/dokumen yang diunggah tidak buram (blur) agar mudah diverifikasi panitia.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-base-200 text-right">
                  <button 
                    type="submit" 
                    className="btn btn-primary w-full sm:w-auto px-8 shadow-lg shadow-primary/30 text-base" 
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Ajukan Verifikasi
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
  );
}
