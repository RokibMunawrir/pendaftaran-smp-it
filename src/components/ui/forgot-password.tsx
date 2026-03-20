import { useState } from 'react';
import { z } from 'zod';
import { auth } from "../../lib/client-auth";

const forgotPasswordSchema = z.object({
  email: z.string().email('Format email tidak valid'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ForgotPasswordFormData, string>>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setFieldErrors({});

    const result = forgotPasswordSchema.safeParse({
      email,
    });

    if (!result.success) {
      const formattedErrors: Partial<Record<keyof ForgotPasswordFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          formattedErrors[issue.path[0] as keyof ForgotPasswordFormData] = issue.message;
        }
      });
      setFieldErrors(formattedErrors);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await auth.requestPasswordReset({
        email: result.data.email,
        redirectTo: "/reset-password",
      });

      if (authError) {
        setError(authError.message || "Gagal mengirim permintaan reset. Silakan coba lagi.");
        setIsLoading(false);
        return;
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError("Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.");
    } finally {
      setIsLoading(false);
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
                  <span className="text-2xl font-bold tracking-wider">Al-Hikmah</span>
               </a>
               <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-widest uppercase shadow-sm">
                 Portal Edukasi
               </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 mt-auto mb-32 ml-4 md:ml-8 lg:ml-12 border-l-4 border-yellow-300/80 pl-6">
               <h1 className="text-4xl xl:text-5xl font-extrabold leading-[1.15] mb-6 drop-shadow-md">
                 Keamanan <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-white">
                   Data Terjamin
                 </span>
               </h1>
               <p className="text-white/80 text-lg lg:text-xl max-w-md leading-relaxed font-medium">
                 Kami menggunakan sistem enkripsi terkini untuk memastikan data akun Anda selalu aman.
               </p>
            </div>
            
          </div>

          {/* Right Side: Form Area */}
          <div className="w-full lg:w-1/2 p-8 md:p-14 lg:p-16 flex flex-col justify-center min-h-[500px]">
            
            {/* Mobile Header (Hidden on Desktop) */}
            <div className="lg:hidden text-center mb-8 relative">
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
              <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-2">Lupa Sandi</h2>
              <p className="text-base-content/60 text-sm">Masukkan email Anda untuk menerima tautan reset</p>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex items-start justify-between mb-10">
              <div>
                <h2 className="text-3xl xl:text-4xl font-bold text-base-content mb-3">Lupa Kata Sandi 🔒</h2>
                <p className="text-base-content/60 text-lg">Jangan khawatir, kami akan membantu memulihkan akun Anda.</p>
              </div>
              <label className="swap swap-rotate text-base-content/60 hover:text-primary transition-colors cursor-pointer p-2 bg-base-200 rounded-lg">
                <input type="checkbox" className="theme-controller" value="dark" />
                <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
              </label>
            </div>

            {isSubmitted ? (
               <div className="flex flex-col items-center justify-center text-center py-6">
                 <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center text-success mb-6 shadow-sm ring-4 ring-success/5">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                   </svg>
                 </div>
                 <h3 className="text-2xl font-bold mb-3">Tautan Terkirim!</h3>
                 <p className="text-base-content/70 mb-8 max-w-sm">
                   Kami telah mengirimkan instruksi pemulihan kata sandi ke email <span className="font-semibold text-base-content">{email}</span>. Silakan periksa kotak masuk atau folder spam Anda.
                 </p>
                 <button 
                  onClick={() => setIsSubmitted(false)}
                  className="btn btn-outline btn-block rounded-xl border-base-300 mb-4 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all"
                 >
                   Gunakan email lain
                 </button>
               </div>
            ) : (
                <>
                  {error && (
                    <div className="alert alert-error mb-4 rounded-xl shadow-sm border-none bg-error/10 text-error flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-sm font-semibold">{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Email Field */}
                  <div className="form-control w-full">
                      <label className="label pt-0">
                      <span className="label-text font-semibold text-base-content/80">Alamat Email</span>
                      </label>
                      <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                      </div>
                      <input 
                          type="email" 
                          placeholder="Contoh: santri@email.com" 
                          className="input input-bordered w-full pl-11 bg-base-200/50 focus:bg-base-100 focus:border-primary transition-colors focus:ring-1 focus:ring-primary/50 rounded-xl"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                      />
                      </div>
                      {fieldErrors.email && (
                        <label className="label py-1">
                          <span className="label-text-alt text-error font-medium">{fieldErrors.email}</span>
                        </label>
                      )}
                  </div>

                  {/* Submit Button */}
                  <button 
                      type="submit" 
                      disabled={isLoading}
                      className="btn btn-primary w-full rounded-xl text-primary-content hover:shadow-lg hover:shadow-primary/30 transition-all font-bold text-base mt-2"
                  >
                      {isLoading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        "Kirim Tautan Reset"
                      )}
                  </button>
                  
                  </form>
                </>
            )}

            
            {/* Divider */}
            <div className="divider text-base-content/40 text-sm mt-8 mb-6"></div>
            
            {/* Register Link */}
            <p className="text-center text-sm font-medium text-base-content/70">
              Ingat kata sandi Anda? <a href="/login" className="text-primary hover:underline font-bold transition-colors">Kembali ke halaman masuk</a>
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
