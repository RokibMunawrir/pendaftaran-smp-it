import { useState } from 'react';
import NavbarUser from '../ui/navbar-user';
import TimelineProgress, { type TimelineStep } from '../ui/timeline-progress';

export default function DocumentUpload() {
  // Simulated user data
  const user = {
    name: 'Ahmad Rafiqi',
    registrationNumber: 'PPDB-2026-08921',
  };

  const steps: TimelineStep[] = [
    { title: 'Daftar Akun', description: 'Akun berhasil dibuat', status: 'completed', href: '/user/dashboard' },
    { title: 'Lengkapi Biodata', description: 'Isi form data diri santri', status: 'completed', href: '/user/biodata' },
    { title: 'Pembayaran', description: 'Bayar biaya pendaftaran', status: 'completed', href: '/user/payment' },
    { title: 'Upload Berkas', description: 'KK, Akta Kelahiran, dll', status: 'current', href: '/user/document' },
    { title: 'Tes & Wawancara', description: 'Tes masuk pondok', status: 'upcoming', href: '#' }
  ];

  const [files, setFiles] = useState<{
    foto: File | null;
    kk: File | null;
    akta: File | null;
    skl: File | null;
  }>({
    foto: null,
    kk: null,
    akta: null,
    skl: null,
  });

  const handleFileChange = (type: keyof typeof files) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [type]: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.foto || !files.kk || !files.akta || !files.skl) {
      alert("Mohon lengkapi semua dokumen yang diwajibkan.");
      return;
    }
    console.log("Submitting documents:", files);
    alert('Berkas Berhasil Diunggah! Menunggu verifikasi admin.');
  };

  const FileInput = ({ label, type, accept, desc }: { label: string, type: keyof typeof files, accept: string, desc: string }) => {
    const file = files[type];
    return (
      <div className="form-control w-full">
        <label className="label pt-0"><span className="label-text font-semibold">{label}</span></label>
        <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${file ? 'border-success bg-success/5' : 'border-base-300 bg-base-200/20 hover:bg-base-200/50 hover:border-primary'}`}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            {file ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-success mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p className="mb-1 text-sm font-semibold text-base-content truncate max-w-[200px] sm:max-w-[200px]">{file.name}</p>
                <p className="text-xs text-base-content/50">{(file.size / 1024).toFixed(2)} KB • Klik untuk mengganti</p>
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
          <input type="file" className="hidden" accept={accept} onChange={handleFileChange(type)} />
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

                <div className="pt-6 mt-6 border-t border-base-200">
                  <button 
                    type="submit" 
                    className="btn btn-primary w-full sm:w-auto px-8 shadow-lg shadow-primary/30 text-base" 
                    disabled={!files.foto || !files.kk || !files.akta || !files.skl}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Simpan & Ajukan Verifikasi
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
    </div>
  );
}
