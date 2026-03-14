import React from 'react';

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

interface SocialMedia {
  facebook: string;
  instagram: string;
  youtube: string;
  whatsapp: string;
}

interface FooterProps {
  siteName?: string;
  logo?: string;
  footerText?: string;
  contact?: ContactInfo;
  social?: SocialMedia;
}

export default function Footer({
  siteName = "",
  logo = "",
  footerText = "",
  contact = {
    address: "",
    phone: "",
    email: "",
  },
  social = {
    facebook: "",
    instagram: "",
    youtube: "",
    whatsapp: "",
  }
}: FooterProps) {
  return (
    <footer className="bg-neutral text-neutral-content pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & About */}
          <div className="lg:col-span-1">
            <a href="/" className="inline-block mb-6">
              {logo ? (
                <img src={logo} alt={siteName} className="h-12 w-auto brightness-0 invert" />
              ) : (
                <span className="text-2xl font-extrabold tracking-tight text-white">
                  {siteName}
                </span>
              )}
            </a>
            <p className="text-neutral-content/70 text-sm leading-relaxed mb-6">
              Mendidik generasi Qurani yang berilmu, berakhlak mulia, dan mandiri untuk masa depan umat yang lebih baik.
            </p>
            
            {/* Social Icons Mini */}
            <div className="flex gap-3">
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-focus hover:bg-primary flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-focus hover:bg-primary flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              )}
              {social.youtube && (
                <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-focus hover:bg-primary flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Navigasi Alur</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-neutral-content/70 hover:text-white hover:underline transition-colors text-sm">Tentang Pondok</a></li>
              <li><a href="#features" className="text-neutral-content/70 hover:text-white hover:underline transition-colors text-sm">Keunggulan & Kurikulum</a></li>
              <li><a href="#agenda" className="text-neutral-content/70 hover:text-white hover:underline transition-colors text-sm">Agenda Pendaftaran</a></li>
              <li><a href="#biaya" className="text-neutral-content/70 hover:text-white hover:underline transition-colors text-sm">Rincian Biaya</a></li>
              <li><a href="#faq" className="text-neutral-content/70 hover:text-white hover:underline transition-colors text-sm">Pertanyaan Umum (FAQ)</a></li>
            </ul>
          </div>
          
          {/* Quick Support */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Bantuan Web</h4>
            <ul className="space-y-3">
              <li><a href="/login" className="text-neutral-content/70 hover:text-white hover:underline transition-colors text-sm">Login Wali Santri</a></li>
              <li><a href="/register" className="text-neutral-content/70 hover:text-white hover:underline transition-colors text-sm">Panduan Mendaftar</a></li>
              <li><a href="#" className="text-neutral-content/70 hover:text-white hover:underline transition-colors text-sm">Syarat & Ketentuan</a></li>
              <li><a href="#" className="text-neutral-content/70 hover:text-white hover:underline transition-colors text-sm">Kebijakan Privasi</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Kontak Administratif</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-neutral-content/70">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 shrink-0 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-neutral-content/70">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 shrink-0 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.273-3.974-6.869-6.87l1.292-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">{contact.phone}</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-neutral-content/70">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 shrink-0 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Separator String */}
        <div className="border-t border-neutral-content/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-content/50">
            {footerText}
          </p>
          <div className="flex gap-4 text-sm text-neutral-content/50">
            <span>Dibuat dengan ❤️</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
