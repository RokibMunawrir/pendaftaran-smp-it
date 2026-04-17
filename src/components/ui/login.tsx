import { useState } from 'react';
import { z } from 'zod';
import { auth } from "../../lib/client-auth";

const loginSchema = z.object({
  email: z.email('Format email tidak valid').min(1, 'Email wajib diisi'),
  password: z.string().min(1, 'Kata sandi wajib diisi'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsEmailLoading(true);
    setFieldErrors({});

    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      const formattedErrors: Partial<Record<keyof LoginFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          formattedErrors[issue.path[0] as keyof LoginFormData] = issue.message;
        }
      });
      setFieldErrors(formattedErrors);
      setIsEmailLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await auth.signIn.email({
        email: result.data.email,
        password: result.data.password,
      });

      if (authError) {
        setError(authError.message || "Gagal masuk. Silakan periksa kredensial Anda.");
        setIsEmailLoading(false);
        return;
      }

      // Successful login - Check role for redirection
      const userRole = (data?.user as any)?.role;
      if (userRole === 'admin' || userRole === 'operator') {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/user/dashboard";
      }
    } catch (err: any) {
      setError("Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.");
      setIsEmailLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsGoogleLoading(true);
    try {
      await auth.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (err: any) {
      setError("Terjadi kesalahan saat masuk dengan Google.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-6xl relative z-10">
        
        {/* Card Container - Split Layout on Desktop */}
        <div className="bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden border border-base-200 flex flex-col lg:flex-row">
          
          {/* Left Side: Visual/Branding (Hidden on mobile/tablet, shows on desktop) */}
          <div className="hidden lg:flex w-1/2 relative p-14 flex-col justify-between overflow-hidden text-white bg-primary">
            {/* Background Image & Effects */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1772752021241-2d922cadbab1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent"></div>
            
            {/* Decorative Glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] bg-white/20 rounded-full blur-[80px]"></div>
            
            {/* Header/Logo */}
            <div className="relative z-10 flex items-center justify-between">
               <a href="/" className="inline-flex items-center gap-3 group">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 shadow-xl group-hover:scale-105 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                        <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
                        <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13-1.065.573-6.506 3.504a3.75 3.75 0 0 1-3.556 0l-6.506-3.504-1.065-.572Z" />
                        <path d="m3.265 13.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13-1.065.573-6.506 3.504a3.75 3.75 0 0 1-3.556 0l-6.506-3.504-1.065-.572Z" />
                      </svg>
                  </div>
                  <span className="text-2xl font-bold tracking-wider">PPDB</span>
               </a>
               <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-widest uppercase shadow-sm">
                 Portal Edukasi
               </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 mt-auto mb-16 ml-4 md:ml-8 lg:ml-12 border-l-4 border-yellow-300/80 pl-6">
               <h1 className="text-4xl xl:text-5xl font-extrabold leading-[1.15] mb-6 drop-shadow-md">
                 Satu Portal untuk <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-white">
                   Semua Layanan
                 </span>
               </h1>
               <p className="text-white/80 text-lg lg:text-xl max-w-md leading-relaxed font-medium">
                 Akses terpadu ke sistem akademik santri, info pendaftaran, administrasi, dan jadwal kegiatan.
               </p>
               
               <div className="mt-8 flex gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-sm font-medium bg-white/10 px-4 py-2.5 rounded-xl backdrop-blur-sm border border-white/10 shadow-sm">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-yellow-300"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     Aman & Terenkripsi
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium bg-white/10 px-4 py-2.5 rounded-xl backdrop-blur-sm border border-white/10 shadow-sm">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-yellow-300"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                     Akses Cepat
                  </div>
               </div>
            </div>
            
            {/* Footer / Social Proof */}
            <div className="relative z-10 flex items-center justify-between mt-auto pt-8 border-t border-white/20">
               <div className="flex items-center gap-4">
                  <div className="avatar-group -space-x-3">
                     <div className="avatar border-primary border-2 shadow-sm">
                       <div className="w-10">
                         <img src="https://i.pravatar.cc/100?img=33" alt="User" />
                       </div>
                     </div>
                     <div className="avatar border-primary border-2 shadow-sm">
                       <div className="w-10">
                         <img src="https://i.pravatar.cc/100?img=47" alt="User" />
                       </div>
                     </div>
                     <div className="avatar border-primary border-2 shadow-sm">
                       <div className="w-10">
                         <img src="https://i.pravatar.cc/100?img=12" alt="User" />
                       </div>
                     </div>
                     <div className="avatar placeholder border-primary border-2 bg-white/20 backdrop-blur-md text-white shadow-sm">
                       <div className="w-10 font-bold text-xs">
                         +5K
                       </div>
                     </div>
                  </div>
                  <div className="text-sm font-medium leading-tight text-white/90">
                     Telah dipercaya oleh<br/><span className="font-bold text-white text-base">5,000+ Wali Santri</span>
                  </div>
               </div>
               
               <div className="hidden xl:flex text-white/30 hover:text-white/80 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                 </svg>
               </div>
            </div>
          </div>

          {/* Right Side: Form Area */}
          <div className="w-full lg:w-1/2 p-8 md:p-14 lg:p-16 flex flex-col justify-center">
            
            {/* Mobile Header (Hidden on Desktop) */}
            <div className="lg:hidden text-center mb-10 relative">
              <div className="absolute top-0 right-0">
                <label className="swap swap-rotate text-base-content/60 hover:text-primary transition-colors cursor-pointer">
                  {/* this hidden checkbox controls the state */}
                  <input type="checkbox" className="theme-controller" value="dark" />
                  {/* sun icon */}
                  <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                  {/* moon icon */}
                  <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                </label>
              </div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-2">Selamat Datang</h2>
              <p className="text-base-content/60 text-sm">Masuk ke akun Anda untuk melanjutkan</p>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex items-start justify-between mb-10">
              <div>
                <h2 className="text-3xl xl:text-4xl font-bold text-base-content mb-3">Selamat Datang Kembali 👋</h2>
                <p className="text-base-content/60 text-lg">Silakan masukkan kredensial akun Anda.</p>
              </div>
              <label className="swap swap-rotate text-base-content/60 hover:text-primary transition-colors cursor-pointer p-2 bg-base-200 rounded-lg">
                <input type="checkbox" className="theme-controller" value="dark" />
                <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
              </label>
            </div>
            {error && (
              <div className="alert alert-error mb-4 rounded-xl shadow-sm border-none bg-error/10 text-error flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm font-semibold">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Username / Email Field */}
              <fieldset className="fieldset w-full mb-0">
                <legend className="fieldset-legend font-semibold text-base-content/80 pt-0">Email</legend>
                <label className="input input-bordered validator w-full bg-base-200/50 focus-within:bg-base-100 transition-colors rounded-xl flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 opacity-40 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <input 
                    type="email" 
                    placeholder="Masukkan email Anda" 
                    className="grow"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <p className="validator-hint text-xs mt-1">Email wajib diisi dengan format yang benar</p>
                {fieldErrors.email && (
                  <p className="text-error text-xs font-medium mt-1">{fieldErrors.email}</p>
                )}
              </fieldset>

              {/* Password Field */}
              <fieldset className="fieldset w-full">
                <div className="flex justify-between items-center mb-1 w-full">
                  <legend className="fieldset-legend font-semibold text-base-content/80 py-0">Konfirmasi Sandi</legend>
                  <a href="/forgot-password" className="text-xs font-semibold text-primary hover:underline">Lupa Sandi?</a>
                </div>
                <label className="input input-bordered validator w-full bg-base-200/50 focus-within:bg-base-100 transition-colors rounded-xl flex items-center gap-3 pr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 opacity-40 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Masukkan kata sandi" 
                    className="grow"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button"
                    className="text-base-content/40 hover:text-base-content focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                       </svg>
                    ) : (
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                         <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                       </svg>
                    )}
                  </button>
                </label>
                <p className="validator-hint text-xs mt-1">Kata sandi wajib diisi</p>
                {fieldErrors.password && (
                  <p className="text-error text-xs font-medium mt-1">{fieldErrors.password}</p>
                )}
              </fieldset>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isEmailLoading || isGoogleLoading}
                className="btn btn-primary w-full rounded-xl text-primary-content hover:shadow-lg hover:shadow-primary/30 transition-all font-bold text-base mt-2"
              >
                {isEmailLoading ? (
                  <span className="loading loading-spinner loading-sm text-primary"></span>
                ) : (
                  "Masuk Sekarang"
                )}
              </button>
              
            </form>
            
            {/* Divider */}
            <div className="divider text-base-content/40 text-sm mt-8 mb-6">atau masuk dengan</div>
            
            {/* Social Login Buttons (Optional) */}
            <div className="grid grid-cols-1 gap-4 mb-6">
               <button 
                 onClick={handleGoogleLogin}
                 disabled={isEmailLoading || isGoogleLoading}
                 className="btn btn-outline border-base-300 hover:bg-base-200 hover:border-base-300 text-base-content rounded-xl flex items-center justify-center gap-2"
               >
                 {isGoogleLoading ? (
                   <span className="loading loading-spinner loading-sm"></span>
                 ) : (
                   <>
                     <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                     Masuk dengan Google
                   </>
                 )}
               </button>
            </div>

            {/* Register Link */}
            <p className="text-center text-sm font-medium text-base-content/70">
              Belum punya akun? <a href="/register" className="text-primary hover:underline font-bold transition-colors">Daftar sekarang</a>
            </p>
          </div>
          
        </div>

        {/* Home Redirect (Moved outside the card) */}
        <div className="text-center mt-8">
           <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-base-content/60 hover:text-base-content transition-colors bg-base-100/50 backdrop-blur-md px-4 py-2 rounded-full border border-base-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Kembali ke Beranda
           </a>
        </div>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
}
