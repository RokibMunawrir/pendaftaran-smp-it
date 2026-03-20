import { useState, useEffect } from "react";
import ThemeController from "./themecontroller";

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
    { label: "Beranda", href: "/" },
    { label: "Tentang", href: "/#about" },
    { label: "Keunggulan", href: "/#features" },
    { label: "Agenda", href: "/#agenda" },
    { label: "Biaya", href: "/#biaya" },
    { label: "Info", href: "/#info" },
    { label: "FAQ", href: "/#faq" },
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
            <ThemeController className={`btn btn-ghost btn-circle btn-sm ${isScrolled ? 'text-base-content hover:text-primary hover:bg-base-200' : 'text-white hover:text-white/80 hover:bg-white/20'}`} />

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
