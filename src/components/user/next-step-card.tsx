import React from 'react';

export type RegistrationStatus = 
  | 'registered' 
  | 'pending_payment' 
  | 'upload_document' 
  | 'verifying' 
  | 'test_interview' 
  | 'accepted'
  | 'revision'
  | 'rejected'
  | string;

interface NextStepCardProps {
  status: RegistrationStatus;
}

export default function NextStepCard({ status }: NextStepCardProps) {
  let title = '';
  let description = '';
  let bgGradient = 'from-primary to-primary/80';
  let textClass = 'text-primary-content';
  let buttons = null;
  let icon = null;

  switch(status) {
    case 'registered':
      title = 'Lengkapi Biodata';
      description = 'Langkah Anda selanjutnya adalah melengkapi form data diri, data orang tua, dan asal sekolah.';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
        </svg>
      );
      buttons = (
        <div className="mt-6 flex flex-wrap gap-4 items-center">
          <button className="btn bg-white text-primary border-none hover:bg-base-200">
            Isi Biodata
          </button>
        </div>
      );
      break;
    case 'pending_payment':
      title = 'Selesaikan Pembayaran';
      description = 'Langkah Anda selanjutnya adalah melunasi biaya pendaftaran untuk memverifikasi akun Anda dan melanjutkan ke tahap upload berkas.';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
        </svg>
      );
      buttons = (
        <div className="mt-6 flex flex-wrap gap-4 items-center">
          <button className="btn bg-white text-primary border-none hover:bg-base-200">
            Bayar Sekarang
          </button>
          <button className="btn btn-ghost text-primary-content hover:bg-primary-focus/50">
            Cara Pembayaran
          </button>
        </div>
      );
      break;
    case 'upload_document':
      title = 'Upload Berkas Persyaratan';
      description = 'Pembayaran Anda telah diverifikasi. Silakan upload berkas persyaratan seperti KK, Akta Kelahiran, dan Ijazah.';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
        </svg>
      );
      buttons = (
        <div className="mt-6 flex flex-wrap gap-4 items-center">
          <button className="btn bg-white text-primary border-none hover:bg-base-200">
            Upload Berkas
          </button>
        </div>
      );
      break;
    case 'verifying':
      title = 'Pendaftaran Sedang Diverifikasi';
      description = 'Terima kasih, data dan berkas Anda sedang dalam proses verifikasi oleh panitia. Silakan cek secara berkala.';
      bgGradient = 'from-info to-info/80';
      textClass = 'text-info-content';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      );
      buttons = (
         <div className="mt-6 flex flex-wrap gap-4 items-center">
          <button className="btn bg-white text-info border-none hover:bg-base-200">
            Cek Status
          </button>
        </div>
      );
      break;
    case 'test_interview':
      title = 'Jadwal Tes & Wawancara';
      description = 'Berkas Anda telah terverifikasi. Langkah selanjutnya adalah mengikuti tes masuk dan wawancara sesuai jadwal.';
      bgGradient = 'from-secondary to-secondary/80';
      textClass = 'text-secondary-content';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      );
      buttons = (
        <div className="mt-6 flex flex-wrap gap-4 items-center">
          <button className="btn bg-white text-secondary border-none hover:bg-base-200">
            Lihat Jadwal
          </button>
        </div>
      );
      break;
    case 'revision':
      title = 'Perbaikan Data/Berkas';
      description = 'Mohon maaf, ada data atau berkas yang belum sesuai. Silakan cek catatan panitia dan lakukan perbaikan.';
      bgGradient = 'from-error to-error/80';
      textClass = 'text-error-content';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
      buttons = (
        <div className="mt-6 flex flex-wrap gap-4 items-center">
          <button className="btn bg-white text-error border-none hover:bg-base-200">
            Perbaiki Data
          </button>
        </div>
      );
      break;
    case 'rejected':
      title = 'Pendaftaran Ditolak';
      description = 'Mohon maaf, pendaftaran Anda tidak dapat dilanjutkan. Silakan hubungi panitia untuk informasi lebih lanjut.';
      bgGradient = 'from-base-300 to-base-300/80';
      textClass = 'text-base-content';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      );
      buttons = (
        <div className="mt-6 flex flex-wrap gap-4 items-center">
          <button className="btn bg-white text-base-content border-none hover:bg-base-200">
            Hubungi Panitia
          </button>
        </div>
      );
      break;
    case 'accepted':
      title = 'Selamat, Anda Diterima!';
      description = 'Alhamdulillah, Anda telah dinyatakan lulus dan diterima sebagai santri baru. Silakan lakukan daftar ulang.';
      bgGradient = 'from-success to-success/80';
      textClass = 'text-success-content';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
      );
      buttons = (
        <div className="mt-6 flex flex-wrap gap-4 items-center">
          <button className="btn bg-white text-success border-none hover:bg-base-200">
            Informasi Daftar Ulang
          </button>
        </div>
      );
      break;
    default:
      title = 'Selamat Datang';
      description = 'Silakan ikuti petunjuk pendaftaran yang ada.';
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      );
      break;
  }

  return (
    <div className={`card bg-gradient-to-br ${bgGradient} ${textClass} shadow-xl shadow-current/20 overflow-hidden relative`}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 p-8 transform translate-x-1/4 -translate-y-1/4 opacity-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-64 h-64 fill-current">
          <path d="M43.3,-72.1C55.4,-61.8,63.9,-46.5,71.2,-30.9C78.4,-15.3,84.4,0.6,81.1,14.6C77.8,28.5,65.3,40.4,52.4,49.8C39.5,59.3,26.2,66.1,11.5,70.6C-3.2,75.2,-19.2,77.5,-32.8,71.4C-46.4,65.4,-57.6,51.1,-66.1,36.2C-74.5,21.3,-80.1,5.8,-79.1,-9.4C-78.1,-24.5,-70.5,-39.3,-59.4,-50.2C-48.3,-61.1,-33.7,-68.2,-18.8,-73.2C-3.8,-78.2,11.5,-81.1,26.5,-80.5C41.5,-79.9,31.2,-82.4,43.3,-72.1Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="card-body relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="card-title text-2xl font-bold mb-2">{title}</h2>
            <p className="opacity-90 max-w-md">{description}</p>
          </div>
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
            {icon}
          </div>
        </div>
        
        {buttons}
      </div>
    </div>
  );
}
