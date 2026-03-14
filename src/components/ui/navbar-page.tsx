import { useState, useEffect } from "react";

interface NavbarProps {
  siteName?: string;
  logo?: string;
  announcementBanner?: string;
  navLinks?: { label: string; href: string }[];
}

export default function NavbarPage({
  siteName = "",
  logo = "",
  announcementBanner = "",
  navLinks = [
    { label: "Beranda", href: "#home" },
    { label: "Tentang", href: "#about" },
    { label: "Keunggulan", href: "#features" },
    { label: "Agenda", href: "#agenda" },
    { label: "Biaya", href: "#biaya" },
    { label: "Info", href: "#info" },
    { label: "FAQ", href: "#faq" },
  ]
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      {/* Top banner */}
      {announcementBanner && (
        <div className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'}`}>
          <div className="bg-primary text-primary-content text-center py-2 h-10 flex items-center justify-center text-sm">
            <div className="container mx-auto px-4 flex items-center justify-center gap-2 h-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 animate-pulse shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
              </svg>
              <span className="font-medium truncate">{announcementBanner}</span>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className={`navbar transition-all duration-300 w-full ${isScrolled ? 'bg-base-100/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4 text-white'}`}>
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between w-full">
          {/* Brand */}
          <div className="navbar-start w-auto flex-1 lg:flex-none">
            <a href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
              {logo ? (
                <img src={logo} alt={siteName} className="h-10 w-auto object-contain" />
              ) : (
                <span className={`text-xl font-extrabold tracking-tight ${isScrolled ? 'text-base-content' : 'text-white drop-shadow-md'}`}>
                  {siteName}
                </span>
              )}
            </a>
          </div>

          {/* Center links — hidden on mobile */}
          <div className="navbar-center hidden lg:flex flex-1 justify-center">
            <ul className="menu menu-horizontal gap-2 px-1 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className={`rounded-full px-4 py-2 transition-all ${isScrolled ? 'text-base-content/80 hover:text-primary hover:bg-primary/10' : 'text-white/90 hover:text-white hover:bg-white/20'}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side CTAs */}
          <div className="navbar-end w-auto flex gap-2 md:gap-3 items-center">
            {/* Theme Controller */}
            <label className={`swap swap-rotate btn btn-ghost btn-circle btn-sm ${isScrolled ? 'text-base-content hover:text-primary hover:bg-base-200' : 'text-white hover:text-white/80 hover:bg-white/20'}`}>
              <input type="checkbox" className="theme-controller" value="dark" />
              {/* Sun icon */}
              <svg className="swap-off fill-current w-5 h-5 md:w-5 md:h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
              {/* Moon icon */}
              <svg className="swap-on fill-current w-5 h-5 md:w-5 md:h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
            </label>

            <a 
              href="/login" 
              className={`text-sm font-semibold hidden sm:inline-block transition-colors ${isScrolled ? 'text-base-content/80 hover:text-primary' : 'text-white/90 hover:text-white'}`}
            >
              Masuk
            </a>
            <a 
              href="/register" 
              className="btn btn-primary btn-sm md:btn-md rounded-full px-6 shadow-lg shadow-primary/30 border-none hover:scale-105 transition-transform"
            >
              Daftar
            </a>

            {/* Mobile menu toggle */}
            <div className="lg:hidden ml-1">
              <button 
                className={`btn btn-ghost btn-circle btn-sm ${isScrolled ? 'text-base-content hover:bg-base-200' : 'text-white hover:bg-white/20'}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-base-100 z-40 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ top: '0', paddingTop: '5rem' }}
      >
        <div className="flex flex-col h-full overflow-y-auto px-6 pb-6">
          <ul className="menu menu-lg w-full flex-1 gap-2 text-base-content">
            {navLinks.map((link) => (
              <li key={link.label} onClick={() => setIsMobileMenuOpen(false)}>
                <a href={link.href} className="font-semibold text-lg py-3 rounded-xl hover:bg-base-200">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="border-t border-base-200 pt-6 mt-4 flex flex-col gap-4">
            <a href="/login" className="btn btn-outline btn-block rounded-full">
              Masuk ke Dashboard
            </a>
            <a href="/register" className="btn btn-primary btn-block rounded-full">
              Daftar Sekarang
            </a>
            <div className="text-center mt-6">
              <p className="text-sm text-base-content/50">&copy; {new Date().getFullYear()} {siteName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
