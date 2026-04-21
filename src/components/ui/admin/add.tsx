import { useState, useEffect } from "react";
import Panel from "../panel";

export default function AddStudentForm({ programs = [] }: { programs?: { id: string; name: string }[] }) {
  const [data, setData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  
  // Profile / Biodata - Matching user biodata fields
  const [profile, setProfile] = useState({
    nisn: "", nik: "", placeOfBirth: "", dateOfBirth: "", gender: "", religion: "Islam", hobby: "", ambition: "",
    fatherName: "", fatherJob: "", fatherIncome: "", motherName: "", motherJob: "", motherIncome: "", parentPhone: "",
    address: "", province: "", city: "", district: "", previousSchool: "", originSchoolNpsn: "",
    // Program
    program: programs.length > 0 ? programs[0].name : ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (data.password !== data.confirmPassword) {
      setError("Kata sandi dan konfirmasi tidak cocok");
      return;
    }

    if (data.password.length < 8) {
      setError("Kata sandi minimal 8 karakter");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/registration/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          profile // Send profile data
        }),
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        setError(result.error || "Gagal menambahkan siswa");
        setLoading(false);
      } else {
        setSuccess("Siswa berhasil ditambahkan beserta data dirinya! Mengalihkan...");
        setTimeout(() => {
          window.location.href = "/admin/list";
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan sistem");
      setLoading(false);
    }
  };

  return (
    <Panel title="Tambah Siswa Manual">
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-6 border-b border-base-200">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-base-content">Input Siswa Baru</h2>
              <p className="text-base text-base-content/60 mt-1">Lengkapi data akun dan biodata untuk mendaftarkan siswa secara manual ke dalam sistem.</p>
            </div>
          </div>

          {/* Notifications */}
          {error && (
            <div className="alert alert-error mb-8 rounded-xl shadow-sm text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert alert-success mb-8 rounded-xl shadow-sm text-sm font-medium text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. INFORMASI AKUN LOGIN */}
            <div className="bg-base-200/40 border border-base-200 rounded-2xl p-6 lg:p-8">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">1</div>
                 <h3 className="font-extrabold text-xl text-primary">Informasi Akun Login</h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                  <div className="form-control w-full">
                    <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Nama Lengkap Siswa <span className="text-error">*</span></span></label>
                    <input type="text" placeholder="Sesuai Ijazah/KK" className="input input-bordered w-full rounded-xl focus:border-primary shadow-sm bg-base-100" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} required />
                  </div>

                  <div className="form-control w-full">
                    <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Alamat Email Aktif <span className="text-error">*</span></span></label>
                    <input type="email" placeholder="siswa@contoh.com" className="input input-bordered w-full rounded-xl focus:border-primary shadow-sm bg-base-100" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />
                  </div>

                  <div className="form-control w-full border-t border-base-200 md:col-span-2 pt-4 mt-1"></div>

                  <div className="form-control w-full">
                    <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Kata Sandi (Password) <span className="text-error">*</span></span></label>
                    <input type="password" placeholder="Minimal 8 karakter" minLength={8} className="input input-bordered w-full rounded-xl focus:border-primary shadow-sm bg-base-100" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} required />
                  </div>

                  <div className="form-control w-full">
                    <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Ulangi Kata Sandi <span className="text-error">*</span></span></label>
                    <input type="password" placeholder="Ketik ulang password" minLength={8} className="input input-bordered w-full rounded-xl focus:border-primary shadow-sm bg-base-100" value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} required />
                  </div>
               </div>
            </div>

            {/* 2. DATA DIRI SISWA */}
            <div className="bg-base-200/40 border border-base-200 rounded-2xl p-6 lg:p-8">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm shadow-md">2</div>
                 <h3 className="font-extrabold text-xl text-secondary">Data Diri Siswa</h3>
                 <span className="badge badge-ghost text-xs ml-auto">Opsional</span>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                  <div className="form-control w-full">
                    <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Nomor Induk Kependudukan (NIK)</span></label>
                    <input type="text" placeholder="16 Digit NIK" maxLength={16} className="input input-bordered w-full rounded-xl focus:border-secondary shadow-sm bg-base-100" value={profile.nik} onChange={(e) => setProfile({ ...profile, nik: e.target.value })} />
                  </div>

                  <div className="form-control w-full">
                    <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Nomor Induk Siswa Nasional (NISN)</span></label>
                    <input type="text" placeholder="Sesuai Ijazah" className="input input-bordered w-full rounded-xl focus:border-secondary shadow-sm bg-base-100" value={profile.nisn} onChange={(e) => setProfile({ ...profile, nisn: e.target.value })} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:col-span-2">
                     <div className="form-control w-full">
                        <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Tempat Lahir</span></label>
                        <input type="text" placeholder="Kota/Kab" className="input input-bordered w-full rounded-xl focus:border-secondary shadow-sm bg-base-100" value={profile.placeOfBirth} onChange={(e) => setProfile({ ...profile, placeOfBirth: e.target.value })} />
                     </div>
                     <div className="form-control w-full">
                        <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Tanggal Lahir</span></label>
                        <input type="date" className="input input-bordered w-full rounded-xl focus:border-secondary shadow-sm bg-base-100" value={profile.dateOfBirth} onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })} />
                     </div>
                  </div>

                  <div className="form-control w-full">
                    <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Jenis Kelamin</span></label>
                    <select className="select select-bordered w-full rounded-xl focus:border-secondary shadow-sm bg-base-100" value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })}>
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="L">Laki-Laki (Putra)</option>
                      <option value="P">Perempuan (Putri)</option>
                    </select>
                  </div>

                  <div className="form-control w-full">
                    <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Agama</span></label>
                    <input type="text" value={profile.religion} readOnly className="input input-bordered w-full rounded-xl bg-base-200/80 opacity-70 cursor-not-allowed shadow-none" />
                  </div>

                  <div className="form-control w-full">
                    <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Hobi</span></label>
                    <input type="text" placeholder="Contoh: Membaca, Olahraga" className="input input-bordered w-full rounded-xl focus:border-secondary shadow-sm bg-base-100" value={profile.hobby} onChange={(e) => setProfile({ ...profile, hobby: e.target.value })} />
                  </div>

                  <div className="form-control w-full">
                    <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Cita-Cita</span></label>
                    <input type="text" placeholder="Contoh: Guru, Dokter" className="input input-bordered w-full rounded-xl focus:border-secondary shadow-sm bg-base-100" value={profile.ambition} onChange={(e) => setProfile({ ...profile, ambition: e.target.value })} />
                  </div>
               </div>
            </div>

            {/* 3. DATA ORANG TUA */}
            <div className="bg-base-200/40 border border-base-200 rounded-2xl p-6 lg:p-8">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm shadow-md">3</div>
                 <h3 className="font-extrabold text-xl text-accent">Data Orang Tua</h3>
                 <span className="badge badge-ghost text-xs ml-auto">Opsional</span>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  {/* Blok Ayah */}
                  <div className="space-y-4">
                      <h4 className="font-bold text-base border-b border-base-200 pb-2 mb-4">Informasi Ayah</h4>
                      <div className="form-control w-full">
                        <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Nama Lengkap Ayah</span></label>
                        <input type="text" placeholder="Sesuai KTP" className="input input-bordered w-full rounded-xl focus:border-accent shadow-sm bg-base-100" value={profile.fatherName} onChange={(e) => setProfile({ ...profile, fatherName: e.target.value })} />
                      </div>
                      <div className="form-control w-full">
                        <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Pekerjaan Ayah</span></label>
                        <select className="select select-bordered w-full rounded-xl focus:border-accent shadow-sm bg-base-100" value={profile.fatherJob} onChange={(e) => setProfile({ ...profile, fatherJob: e.target.value })}>
                          <option value="">Pilih Pekerjaan</option>
                          <option value="PNS">Pegawai Negeri Sipil (PNS)</option>
                          <option value="Swasta">Pegawai Swasta</option>
                          <option value="Wiraswasta">Wiraswasta / Pengusaha</option>
                          <option value="TNI/Polri">TNI / Polri</option>
                          <option value="Petani/Nelayan">Petani / Nelayan</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>
                      <div className="form-control w-full">
                        <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Penghasilan Per Bulan</span></label>
                        <select className="select select-bordered w-full rounded-xl focus:border-accent shadow-sm bg-base-100" value={profile.fatherIncome} onChange={(e) => setProfile({ ...profile, fatherIncome: e.target.value })}>
                          <option value="">Pilih Range Penghasilan</option>
                          <option value="< 1jt">Kurang dari Rp 1.000.000</option>
                          <option value="1-3jt">Rp 1.000.000 - Rp 3.000.000</option>
                          <option value="3-5jt">Rp 3.000.000 - Rp 5.000.000</option>
                          <option value="> 5jt">Lebih dari Rp 5.000.000</option>
                        </select>
                      </div>
                  </div>

                  {/* Blok Ibu */}
                  <div className="space-y-4">
                      <h4 className="font-bold text-base border-b border-base-200 pb-2 mb-4">Informasi Ibu</h4>
                      <div className="form-control w-full">
                        <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Nama Lengkap Ibu</span></label>
                        <input type="text" placeholder="Sesuai KTP" className="input input-bordered w-full rounded-xl focus:border-accent shadow-sm bg-base-100" value={profile.motherName} onChange={(e) => setProfile({ ...profile, motherName: e.target.value })} />
                      </div>
                      <div className="form-control w-full">
                        <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Pekerjaan Ibu</span></label>
                        <select className="select select-bordered w-full rounded-xl focus:border-accent shadow-sm bg-base-100" value={profile.motherJob} onChange={(e) => setProfile({ ...profile, motherJob: e.target.value })}>
                          <option value="">Pilih Pekerjaan</option>
                          <option value="IRT">Ibu Rumah Tangga (IRT)</option>
                          <option value="PNS">Pegawai Negeri Sipil (PNS)</option>
                          <option value="Swasta">Pegawai Swasta</option>
                          <option value="Wiraswasta">Wiraswasta / Pengusaha</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>
                      <div className="form-control w-full">
                        <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Penghasilan Per Bulan</span></label>
                        <select className="select select-bordered w-full rounded-xl focus:border-accent shadow-sm bg-base-100" value={profile.motherIncome} onChange={(e) => setProfile({ ...profile, motherIncome: e.target.value })}>
                          <option value="">Pilih Range Penghasilan</option>
                          <option value="-" >Tidak Berpenghasilan</option>
                          <option value="< 1jt">Kurang dari Rp 1.000.000</option>
                          <option value="1-3jt">Rp 1.000.000 - Rp 3.000.000</option>
                          <option value="> 3jt">Lebih dari Rp 3.000.000</option>
                        </select>
                      </div>
                  </div>

                  {/* WhatsApp Orang Tua */}
                  <div className="form-control w-full md:col-span-2 pt-6 mt-2 border-t border-base-200">
                    <label className="label pt-0 pb-1.5">
                      <span className="label-text font-bold text-base-content/90">Nomor WhatsApp / HP Orang Tua yang Aktif</span>
                    </label>
                    <div className="relative max-w-sm">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-base-content/50 font-bold border-r border-base-200 pr-4">
                        +62
                      </div>
                      <input type="tel" placeholder="81234567890" className="input input-bordered w-full rounded-xl focus:border-accent pl-[75px] shadow-sm bg-base-100" value={profile.parentPhone} onChange={(e) => setProfile({ ...profile, parentPhone: e.target.value })} />
                    </div>
                  </div>
               </div>
            </div>

            {/* 4. ALAMAT, SEKOLAH & PROGRAM */}
            <div className="bg-base-200/40 border border-base-200 rounded-2xl p-6 lg:p-8">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-full bg-info text-white flex items-center justify-center font-bold text-sm shadow-md">4</div>
                 <h3 className="font-extrabold text-xl text-info">Alamat, Sekolah & Program</h3>
                 <span className="badge badge-ghost text-xs ml-auto">Opsional</span>
               </div>
               
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                 
                 {/* Alamat */}
                 <div className="space-y-4">
                    <h4 className="font-bold text-base border-b border-base-200 pb-2 mb-4">Informasi Alamat</h4>
                    <div className="form-control w-full">
                      <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Alamat Lengkap</span></label>
                      <textarea className="textarea textarea-bordered w-full rounded-xl focus:border-info h-28 shadow-sm bg-base-100 placeholder:text-sm" placeholder="Nama Jalan, Gg, RT/RW, Dusun/Desa, No Rumah" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} ></textarea>
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Provinsi</span></label>
                      <input type="text" placeholder="Contoh: Sulawesi Tengah" className="input input-bordered w-full rounded-xl focus:border-info shadow-sm bg-base-100" value={profile.province} onChange={(e) => setProfile({ ...profile, province: e.target.value })} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-control w-full">
                        <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Kabupaten/Kota</span></label>
                        <input type="text" placeholder="Banggai" className="input input-bordered w-full rounded-xl focus:border-info shadow-sm bg-base-100" value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} />
                      </div>
                      <div className="form-control w-full">
                        <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Kecamatan</span></label>
                        <input type="text" placeholder="Luwuk" className="input input-bordered w-full rounded-xl focus:border-info shadow-sm bg-base-100" value={profile.district} onChange={(e) => setProfile({ ...profile, district: e.target.value })} />
                      </div>
                    </div>
                 </div>

                 {/* Sekolah & Program */}
                 <div className="space-y-4">
                    <h4 className="font-bold text-base border-b border-base-200 pb-2 mb-4">Pendidikan & Pendaftaran</h4>
                    
                    <div className="form-control w-full">
                      <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">Nama Sekolah Asal (SD/MI)</span></label>
                      <input type="text" placeholder="Contoh: SD Negeri 1 Luwuk" className="input input-bordered w-full rounded-xl focus:border-info shadow-sm bg-base-100" value={profile.previousSchool} onChange={(e) => setProfile({ ...profile, previousSchool: e.target.value })} />
                    </div>

                    <div className="form-control w-full">
                      <label className="label pt-0 pb-1.5"><span className="label-text font-bold text-base-content/90">NPSN Sekolah Asal</span></label>
                      <input type="text" placeholder="8 Digit NPSN (Bila ada)" maxLength={8} className="input input-bordered w-full rounded-xl focus:border-info shadow-sm bg-base-100" value={profile.originSchoolNpsn} onChange={(e) => setProfile({ ...profile, originSchoolNpsn: e.target.value })} />
                    </div>

                    <div className="form-control w-full pt-6">
                      <label className="label pt-0 pb-1.5">
                        <span className="label-text font-bold text-info">Jalur / Program Pilihan</span>
                      </label>
                      <select className="select select-bordered w-full rounded-xl border-info focus:ring focus:ring-info/20 bg-info/5 text-info-content font-semibold" value={profile.program} onChange={(e) => setProfile({ ...profile, program: e.target.value })} required>
                        <option value="" disabled>Pilih Program</option>
                        {programs.map((prog) => (
                          <option key={prog.id} value={prog.name}>{prog.name}</option>
                        ))}
                        {programs.length === 0 && <option value="" disabled>Tidak ada program aktif</option>}
                      </select>
                    </div>
                 </div>

               </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-4 justify-between items-center pt-6 mt-4 border-t border-base-200">
              <a href="/admin/list" className="btn btn-ghost hover:bg-base-200 rounded-xl px-6 w-full sm:w-auto">Batal & Kembali</a>
              <button type="submit" className="btn btn-primary rounded-xl px-10 shadow-lg shadow-primary/30 w-full sm:w-auto font-bold text-white text-base h-12" disabled={loading}>
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span> Menyimpan...
                  </>
                ) : (
                  <>Simpan Data Siswa</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Panel>
  );
}
