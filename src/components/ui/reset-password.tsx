import { useState, useEffect } from 'react';
import { z } from 'zod';
import { auth } from "../../lib/client-auth";

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Kata sandi minimal 8 karakter'),
  confirmPassword: z.string().min(1, 'Konfirmasi kata sandi wajib diisi'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Kata sandi tidak cocok',
  path: ['confirmPassword'],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ResetPasswordFormData, string>>>({});
  const [token, setToken] = useState('');
  const [isTokenMissing, setIsTokenMissing] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('token');
    if (!t) {
      setIsTokenMissing(true);
    } else {
      setToken(t);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setFieldErrors({});

    const result = resetPasswordSchema.safeParse({ password, confirmPassword });

    if (!result.success) {
      const formattedErrors: Partial<Record<keyof ResetPasswordFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          formattedErrors[issue.path[0] as keyof ResetPasswordFormData] = issue.message;
        }
      });
      setFieldErrors(formattedErrors);
      setIsLoading(false);
      return;
    }

    try {
      const { error: authError } = await auth.resetPassword({
        newPassword: result.data.password,
        token,
      });

      if (authError) {
        setError(authError.message || 'Gagal mereset kata sandi. Tautan mungkin sudah kadaluarsa.');
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError('Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = (pwd: string) => {
    if (!pwd) return { level: 0, label: '', color: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 1) return { level: 1, label: 'Lemah', color: '#ef4444' };
    if (score <= 2) return { level: 2, label: 'Cukup', color: '#f59e0b' };
    if (score <= 3) return { level: 3, label: 'Kuat', color: '#3b82f6' };
    return { level: 4, label: 'Sangat Kuat', color: '#10b981' };
  };

  const strength = passwordStrength(password);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-6xl relative z-10">
        
        {/* Card Container - Split Layout on Desktop */}
        <div className="bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden border border-base-200 flex flex-col lg:flex-row">
          
          {/* Left Side: Visual/Branding */}
          <div className="hidden lg:flex w-1/2 relative p-14 flex-col justify-between overflow-hidden text-white bg-primary">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1772752021241-2d922cadbab1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent"></div>
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
            <div className="relative z-10 mt-auto mb-32 ml-4 md:ml-8 lg:ml-12 border-l-4 border-yellow-300/80 pl-6">
               <h1 className="text-4xl xl:text-5xl font-extrabold leading-[1.15] mb-6 drop-shadow-md">
                 Buat Kata Sandi <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-white">
                   Yang Kuat
                 </span>
               </h1>
               <p className="text-white/80 text-lg lg:text-xl max-w-md leading-relaxed font-medium">
                 Pilih kata sandi yang unik dan aman untuk melindungi akun PPDB Anda.
               </p>
               
               <div className="mt-8 flex gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-sm font-medium bg-white/10 px-4 py-2.5 rounded-xl backdrop-blur-sm border border-white/10 shadow-sm">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-yellow-300"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     Min. 8 Karakter
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium bg-white/10 px-4 py-2.5 rounded-xl backdrop-blur-sm border border-white/10 shadow-sm">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-yellow-300"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                     Terenkripsi
                  </div>
               </div>
            </div>
          </div>

          {/* Right Side: Form Area */}
          <div className="w-full lg:w-1/2 p-8 md:p-14 lg:p-16 flex flex-col justify-center min-h-[500px]">
            
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8 relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-2">Buat Sandi Baru</h2>
              <p className="text-base-content/60 text-sm">Masukkan kata sandi baru untuk akun Anda</p>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex items-start justify-between mb-10">
              <div>
                <h2 className="text-3xl xl:text-4xl font-bold text-base-content mb-3">Buat Sandi Baru 🔑</h2>
                <p className="text-base-content/60 text-lg">Masukkan kata sandi baru yang kuat untuk akun Anda.</p>
              </div>
            </div>

            {/* Token Missing State */}
            {isTokenMissing ? (
              <div className="flex flex-col items-center justify-center text-center py-6">
                <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center text-error mb-6 shadow-sm ring-4 ring-error/5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Tautan Tidak Valid</h3>
                <p className="text-base-content/70 mb-8 max-w-sm">
                  Tautan reset kata sandi yang Anda gunakan tidak valid atau sudah kadaluarsa. Silakan minta tautan baru.
                </p>
                <a href="/forgot-password" className="btn btn-primary w-full rounded-xl font-bold">
                  Minta Tautan Baru
                </a>
              </div>
            ) : isSuccess ? (
              /* Success State */
              <div className="flex flex-col items-center justify-center text-center py-6">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center text-success mb-6 shadow-sm ring-4 ring-success/5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Sandi Berhasil Diubah!</h3>
                <p className="text-base-content/70 mb-8 max-w-sm">
                  Kata sandi Anda telah berhasil diperbarui. Anda sekarang dapat masuk menggunakan kata sandi baru.
                </p>
                <a href="/login" className="btn btn-primary w-full rounded-xl font-bold">
                  Masuk Sekarang
                </a>
              </div>
            ) : (
              <>
                {error && (
                  <div className="alert alert-error mb-6 rounded-xl shadow-sm border-none bg-error/10 text-error flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-sm font-semibold">{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Password Field */}
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend font-semibold text-base-content/80 pt-0">Kata Sandi Baru</legend>
                    <label className="input input-bordered w-full bg-base-200/50 focus-within:bg-base-100 transition-colors rounded-xl flex items-center gap-3 pr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 opacity-40 shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimal 8 karakter"
                        className="grow"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        className="text-base-content/40 hover:text-base-content focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        )}
                      </button>
                    </label>

                    {/* Password Strength Meter */}
                    {password && (
                      <div className="mt-2">
                        <div className="flex gap-1.5 mb-1">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className="h-1.5 flex-1 rounded-full transition-all duration-300"
                              style={{
                                backgroundColor: level <= strength.level ? strength.color : '#e5e7eb',
                              }}
                            />
                          ))}
                        </div>
                        <p className="text-xs font-medium" style={{ color: strength.color }}>
                          Kekuatan: {strength.label}
                        </p>
                      </div>
                    )}

                    {fieldErrors.password && (
                      <p className="text-error text-xs font-medium mt-1">{fieldErrors.password}</p>
                    )}
                  </fieldset>

                  {/* Confirm Password Field */}
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend font-semibold text-base-content/80 pt-0">Konfirmasi Kata Sandi</legend>
                    <label className="input input-bordered w-full bg-base-200/50 focus-within:bg-base-100 transition-colors rounded-xl flex items-center gap-3 pr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 opacity-40 shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Ulangi kata sandi baru"
                        className="grow"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="text-base-content/40 hover:text-base-content focus:outline-none"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        )}
                      </button>
                    </label>
                    {fieldErrors.confirmPassword && (
                      <p className="text-error text-xs font-medium mt-1">{fieldErrors.confirmPassword}</p>
                    )}
                    {/* Match indicator */}
                    {confirmPassword && password && (
                      <p className={`text-xs font-medium mt-1 ${password === confirmPassword ? 'text-success' : 'text-error'}`}>
                        {password === confirmPassword ? '✓ Kata sandi cocok' : '✗ Kata sandi tidak cocok'}
                      </p>
                    )}
                  </fieldset>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-full rounded-xl text-primary-content hover:shadow-lg hover:shadow-primary/30 transition-all font-bold text-base mt-2"
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-sm text-primary"></span>
                    ) : (
                      'Simpan Kata Sandi Baru'
                    )}
                  </button>

                </form>
              </>
            )}

            {/* Divider */}
            <div className="divider text-base-content/40 text-sm mt-8 mb-6"></div>
            
            {/* Back to Login */}
            <p className="text-center text-sm font-medium text-base-content/70">
              Ingat kata sandi Anda? <a href="/login" className="text-primary hover:underline font-bold transition-colors">Kembali ke halaman masuk</a>
            </p>
          </div>
          
        </div>

        {/* Home Redirect */}
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
