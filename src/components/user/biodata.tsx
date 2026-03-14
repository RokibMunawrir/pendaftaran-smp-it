import { useState } from 'react';
import NavbarUser from '../ui/navbar-user';
import TimelineProgress, { type TimelineStep } from '../ui/timeline-progress';

export default function Biodata() {
  const [activeTab, setActiveTab] = useState('pribadi');

  // Simulated user data
  const user = {
    name: 'Ahmad Rafiqi',
    registrationNumber: 'PPDB-2026-08921',
  };

  const steps: TimelineStep[] = [
    { title: 'Daftar Akun', description: 'Akun berhasil dibuat', status: 'completed', href: '/user/dashboard' },
    { title: 'Lengkapi Biodata', description: 'Isi form data diri santri', status: 'current', href: '/user/biodata' },
    { title: 'Pembayaran', description: 'Bayar biaya pendaftaran', status: 'upcoming', href: '#' },
    { title: 'Upload Berkas', description: 'KK, Akta Kelahiran, dll', status: 'upcoming', href: '#' },
    { title: 'Tes & Wawancara', description: 'Tes masuk pondok', status: 'upcoming', href: '#' }
  ];

  // Form state
  const [formData, setFormData] = useState({
    // Data Pribadi
    namaLengkap: '',
    nik: '',
    nisn: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    agama: '',
    hobi: '',
    citaCita: '',
    
    // Data Orang Tua
    namaAyah: '',
    pekerjaanAyah: '',
    penghasilanAyah: '',
    namaIbu: '',
    pekerjaanIbu: '',
    penghasilanIbu: '',
    noTelpOrtu: '',

    // Alamat & Sekolah
    alamatLengkap: '',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    asalSekolah: '',
    npsnSekolahAsal: '',
    program: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting biodata:", formData);
    // TODO: Send data to API
    alert('Data Berhasil Disimpan!');
  };

  return (
    <div className="min-h-screen bg-base-200/50">
      <NavbarUser user={user} />
      
      <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-base-content mb-2 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            Lengkapi Biodata
          </h2>
          <p className="text-base-content/60 text-lg">
            Mohon isi data diri santri, orang tua, dan alamat dengan lengkap dan benar sesuai dokumen resmi (KK/KTP).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">

            <div className="bg-base-100 rounded-[2rem] shadow-xl border border-base-200 overflow-hidden">
        
        {/* Top Navigation Tabs */}
        <div className="bg-base-200/50 p-4 border-b border-base-200 flex flex-wrap gap-2">
          <button 
            className={`btn rounded-full px-6 flex-1 sm:flex-none ${activeTab === 'pribadi' ? 'btn-primary shadow-md' : 'btn-ghost bg-base-100 border border-base-200 text-base-content/70'}`}
            onClick={() => setActiveTab('pribadi')}
          >
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">1</span>
              Data Pribadi
            </span>
          </button>
          <button 
            className={`btn rounded-full px-6 flex-1 sm:flex-none ${activeTab === 'ortu' ? 'btn-primary shadow-md' : 'btn-ghost bg-base-100 border border-base-200 text-base-content/70'}`}
            onClick={() => setActiveTab('ortu')}
          >
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">2</span>
              Data Orang Tua
            </span>
          </button>
          <button 
            className={`btn rounded-full px-6 flex-1 sm:flex-none ${activeTab === 'alamat' ? 'btn-primary shadow-md' : 'btn-ghost bg-base-100 border border-base-200 text-base-content/70'}`}
            onClick={() => setActiveTab('alamat')}
          >
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">3</span>
              Alamat & Sekolah
            </span>
          </button>
          <button 
            className={`btn rounded-full px-6 flex-1 sm:flex-none ${activeTab === 'program' ? 'btn-primary shadow-md' : 'btn-ghost bg-base-100 border border-base-200 text-base-content/70'}`}
            onClick={() => setActiveTab('program')}
          >
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">4</span>
              Program
            </span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-10">
          
          {/* TAB: DATA PRIBADI */}
          <div className={activeTab === 'pribadi' ? 'block animate-fade-in' : 'hidden'}>
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-base-200 w-max pr-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
              </svg>
              <h3 className="text-xl font-bold text-base-content">Identitas Calon Santri</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control w-full">
                <label className="label pt-0"><span className="label-text font-semibold">Nama Lengkap</span></label>
                <input type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} placeholder="Sesuai Akta Kelahiran/KK" className="input input-bordered focus:border-primary w-full bg-base-200/30" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label pt-0"><span className="label-text font-semibold">NIK</span></label>
                  <input type="text" name="nik" value={formData.nik} onChange={handleChange} placeholder="16 Digit NIK" maxLength={16} className="input input-bordered focus:border-primary w-full bg-base-200/30" required />
                </div>
                <div className="form-control w-full">
                  <label className="label pt-0"><span className="label-text font-semibold">NISN</span></label>
                  <input type="text" name="nisn" value={formData.nisn} onChange={handleChange} placeholder="Nomor Induk Siswa" className="input input-bordered focus:border-primary w-full bg-base-200/30" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label pt-0"><span className="label-text font-semibold">Tempat Lahir</span></label>
                  <input type="text" name="tempatLahir" value={formData.tempatLahir} onChange={handleChange} placeholder="Kota/Kab" className="input input-bordered focus:border-primary w-full bg-base-200/30" required />
                </div>
                <div className="form-control w-full">
                  <label className="label pt-0"><span className="label-text font-semibold">Tanggal Lahir</span></label>
                  <input type="date" name="tanggalLahir" value={formData.tanggalLahir} onChange={handleChange} className="input input-bordered focus:border-primary w-full bg-base-200/30" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label pt-0"><span className="label-text font-semibold">Jenis Kelamin</span></label>
                  <select name="jenisKelamin" value={formData.jenisKelamin} onChange={handleChange} className="select select-bordered focus:border-primary w-full bg-base-200/30" required>
                    <option value="" disabled>Pilih</option>
                    <option value="L">Laki-Laki (Putra)</option>
                    <option value="P">Perempuan (Putri)</option>
                  </select>
                </div>
                <div className="form-control w-full">
                  <label className="label pt-0"><span className="label-text font-semibold">Agama</span></label>
                  <input type="text" name="agama" value="Islam" readOnly className="input input-bordered w-full bg-base-200/60 opacity-80 cursor-not-allowed" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label pt-0"><span className="label-text font-semibold">Hobi</span></label>
                  <input type="text" name="hobi" value={formData.hobi} onChange={handleChange} placeholder="Cth: Membaca" className="input input-bordered focus:border-primary w-full bg-base-200/30" />
                </div>
                <div className="form-control w-full">
                  <label className="label pt-0"><span className="label-text font-semibold">Cita-Cita</span></label>
                  <input type="text" name="citaCita" value={formData.citaCita} onChange={handleChange} placeholder="Cth: Guru" className="input input-bordered focus:border-primary w-full bg-base-200/30" />
                </div>
              </div>
            </div>
          </div>

          {/* TAB: DATA ORANG TUA */}
          <div className={activeTab === 'ortu' ? 'block animate-fade-in' : 'hidden'}>
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-base-200 w-max pr-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
              <h3 className="text-xl font-bold text-base-content">Profil Orang Tua / Wali</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Kolom Ayah */}
              <div className="space-y-4 p-5 bg-base-200/30 rounded-2xl border border-base-200">
                <h4 className="font-bold text-lg text-primary mb-2 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">A</div>
                  Data Ayah
                </h4>
                <div className="form-control w-full">
                  <label className="label pt-0"><span className="label-text font-semibold">Nama Lengkap Ayah</span></label>
                  <input type="text" name="namaAyah" value={formData.namaAyah} onChange={handleChange} placeholder="Sesuai KTP" className="input input-bordered focus:border-primary w-full bg-white dark:bg-base-100" />
                </div>
                <div className="form-control w-full">
                  <label className="label pt-0"><span className="label-text font-semibold">Pekerjaan Ayah</span></label>
                  <select name="pekerjaanAyah" value={formData.pekerjaanAyah} onChange={handleChange} className="select select-bordered focus:border-primary w-full bg-white dark:bg-base-100">
                    <option value="" disabled>Pilih Pekerjaan</option>
                    <option value="PNS">Pegawai Negeri Sipil (PNS)</option>
                    <option value="Swasta">Pegawai Swasta</option>
                    <option value="Wiraswasta">Wiraswasta / Pengusaha</option>
                    <option value="TNI/Polri">TNI / Polri</option>
                    <option value="Petani/Nelayan">Petani / Nelayan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div className="form-control w-full">
                  <label className="label pt-0"><span className="label-text font-semibold">Penghasilan Per Bulan</span></label>
                  <select name="penghasilanAyah" value={formData.penghasilanAyah} onChange={handleChange} className="select select-bordered focus:border-primary w-full bg-white dark:bg-base-100">
                    <option value="" disabled>Pilih Range Penghasilan</option>
                    <option value="< 1jt">Kurang dari Rp 1.000.000</option>
                    <option value="1-3jt">Rp 1.000.000 - Rp 3.000.000</option>
                    <option value="3-5jt">Rp 3.000.000 - Rp 5.000.000</option>
                    <option value="> 5jt">Lebih dari Rp 5.000.000</option>
                  </select>
                </div>
              </div>

              {/* Kolom Ibu */}
              <div className="space-y-4 p-5 bg-base-200/30 rounded-2xl border border-base-200">
                <h4 className="font-bold text-lg text-secondary mb-2 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">I</div>
                  Data Ibu
                </h4>
                <div className="form-control w-full">
                  <label className="label pt-0"><span className="label-text font-semibold">Nama Lengkap Ibu</span></label>
                  <input type="text" name="namaIbu" value={formData.namaIbu} onChange={handleChange} placeholder="Sesuai KTP" className="input input-bordered focus:border-secondary w-full bg-white dark:bg-base-100" />
                </div>
                <div className="form-control w-full">
                  <label className="label pt-0"><span className="label-text font-semibold">Pekerjaan Ibu</span></label>
                  <select name="pekerjaanIbu" value={formData.pekerjaanIbu} onChange={handleChange} className="select select-bordered focus:border-secondary w-full bg-white dark:bg-base-100">
                    <option value="" disabled>Pilih Pekerjaan</option>
                    <option value="IRT">Ibu Rumah Tangga (IRT)</option>
                    <option value="PNS">Pegawai Negeri Sipil (PNS)</option>
                    <option value="Swasta">Pegawai Swasta</option>
                    <option value="Wiraswasta">Wiraswasta / Pengusaha</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div className="form-control w-full">
                  <label className="label pt-0"><span className="label-text font-semibold">Penghasilan Per Bulan</span></label>
                  <select name="penghasilanIbu" value={formData.penghasilanIbu} onChange={handleChange} className="select select-bordered focus:border-secondary w-full bg-white dark:bg-base-100">
                    <option value="" disabled>Pilih Range Penghasilan</option>
                    <option value="-" >Tidak Berpenghasilan</option>
                    <option value="< 1jt">Kurang dari Rp 1.000.000</option>
                    <option value="1-3jt">Rp 1.000.000 - Rp 3.000.000</option>
                    <option value="> 3jt">Lebih dari Rp 3.000.000</option>
                  </select>
                </div>
              </div>

              <div className="form-control w-full md:col-span-2 pt-2 border-t border-base-200 mt-2">
                <label className="label pt-2"><span className="label-text font-semibold">Nomor WhatsApp / HP Orang Tua yang Aktif</span></label>
                <div className="relative max-w-md">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40 font-bold border-r border-base-300 pr-3">
                     +62
                   </div>
                   <input type="tel" name="noTelpOrtu" value={formData.noTelpOrtu} onChange={handleChange} placeholder="81234567890" className="input input-bordered focus:border-primary w-full bg-base-200/30 pl-[70px]" required />
                </div>
                <label className="label pb-0"><span className="label-text-alt text-base-content/60">Nomor ini akan digunakan untuk mengirimkan informasi kelulusan dan pembayaran.</span></label>
              </div>
            </div>
          </div>

          {/* TAB: ALAMAT & SEKOLAH */}
          <div className={activeTab === 'alamat' ? 'block animate-fade-in' : 'hidden'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              
              {/* Kolom Alamat */}
              <div>
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-base-200 w-max pr-8">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <h3 className="text-xl font-bold text-base-content">Alamat Rumah</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="form-control w-full">
                    <label className="label pt-0"><span className="label-text font-semibold">Alamat Lengkap</span></label>
                    <textarea name="alamatLengkap" value={formData.alamatLengkap} onChange={handleChange} className="textarea textarea-bordered h-24 focus:border-primary w-full bg-base-200/30" placeholder="Nama Jalan, Gg, RT/RW, No Rumah" required></textarea>
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label pt-0"><span className="label-text font-semibold">Provinsi</span></label>
                    <input type="text" name="provinsi" value={formData.provinsi} onChange={handleChange} placeholder="Cth: Jawa Tengah" className="input input-bordered focus:border-primary w-full bg-base-200/30" required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control w-full">
                      <label className="label pt-0"><span className="label-text font-semibold">Kabupaten/Kota</span></label>
                      <input type="text" name="kabupaten" value={formData.kabupaten} onChange={handleChange} placeholder="Kab. / Kota" className="input input-bordered focus:border-primary w-full bg-base-200/30" required />
                    </div>
                    <div className="form-control w-full">
                      <label className="label pt-0"><span className="label-text font-semibold">Kecamatan</span></label>
                      <input type="text" name="kecamatan" value={formData.kecamatan} onChange={handleChange} placeholder="Kecamatan" className="input input-bordered focus:border-primary w-full bg-base-200/30" required />
                    </div>
                  </div>
                </div>
              </div>

              {/* Kolom Riwayat Sekolah */}
              <div>
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-base-200 w-max pr-8">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                  <h3 className="text-xl font-bold text-base-content">Riwayat Sekolah</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="form-control w-full">
                    <label className="label pt-0"><span className="label-text font-semibold">Nama Sekolah Asal</span></label>
                    <input type="text" name="asalSekolah" value={formData.asalSekolah} onChange={handleChange} placeholder="Cth: SD Negeri 1 Jakarta / SMP IT Baitul Hikmah" className="input input-bordered focus:border-primary w-full bg-base-200/30" required />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label pt-0">
                      <span className="label-text font-semibold">NPSN Sekolah Asal</span>
                    </label>
                    <input type="text" name="npsnSekolahAsal" value={formData.npsnSekolahAsal} onChange={handleChange} placeholder="8 Digit Nomor Pokok Sekolah Nasional" maxLength={8} className="input input-bordered focus:border-primary w-full bg-base-200/30" />
                    <label className="label pb-0"><span className="label-text-alt text-base-content/60">Isi jika diketahui. Bisa bertanya ke sekolah asal.</span></label>
                  </div>

                  <div className="mt-8 p-4 bg-warning/10 border border-warning/20 rounded-xl">
                    <div className="flex gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-warning flex-shrink-0">
                        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
                      </svg>
                      <div className="text-sm">
                        <p className="font-bold text-base-content mb-1">Pernyataan Kebenaran Data</p>
                        <p className="text-base-content/70">Dengan menekan tombol simpan, Anda menyatakan bahwa seluruh data yang diisikan adalah benar dan dapat dipertanggungjawabkan keabsahannya.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          {/* TAB: PROGRAM */}
          <div className={activeTab === 'program' ? 'block animate-fade-in' : 'hidden'}>
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-base-200 w-max pr-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
              </svg>
              <h3 className="text-xl font-bold text-base-content">Program</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control w-full">
                <label className="label pt-0"><span className="label-text font-semibold">Program</span></label>
                <input type="text" name="program" value={formData.program} onChange={handleChange} placeholder="Program" className="input input-bordered focus:border-primary w-full bg-base-200/30" />
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-10 pt-6 border-t border-base-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex gap-2 w-full sm:w-auto">
              {activeTab !== 'pribadi' && (
                <button 
                  type="button" 
                  className="btn btn-outline border-base-300 hover:bg-base-200 flex-1 sm:flex-none"
                  onClick={() => {
                    if (activeTab === 'program') setActiveTab('alamat');
                    else if (activeTab === 'alamat') setActiveTab('ortu');
                    else setActiveTab('pribadi');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Kembali
                </button>
              )}
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto">
              {activeTab !== 'program' ? (
                <button 
                  type="button" 
                  className="btn btn-primary shadow-lg shadow-primary/30 flex-1 sm:flex-none"
                  onClick={() => {
                    if (activeTab === 'pribadi') setActiveTab('ortu');
                    else if (activeTab === 'ortu') setActiveTab('alamat');
                    else setActiveTab('program');
                  }}
                >
                  Lanjut ke Selanjutnya
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="btn btn-success text-success-content shadow-lg shadow-success/30 flex-1 sm:flex-none text-base"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Simpan Biodata
                </button>
              )}
            </div>
          </div>
          
        </form>
      </div>

          </div>

          {/* Right Sidebar - Timeline */}
          <div className="lg:col-span-1">
            <TimelineProgress steps={steps} contactUrl="https://wa.me/123456789" />
          </div>
        </div>
      
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
    </div>
  );
}
