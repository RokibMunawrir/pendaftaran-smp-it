import ThemeController from "./themecontroller";

export interface UserData {
  name: string;
  registrationNumber: string;
  avatar?: string;
}

interface NavbarUserProps {
  user: UserData;
}

export default function NavbarUser({ user }: NavbarUserProps) {
  return (
    <nav className="bg-base-100 border-b border-base-300 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/user/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
                <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13-1.065.573-6.506 3.504a3.75 3.75 0 0 1-3.556 0l-6.506-3.504-1.065-.572Z" />
              </svg>
            </div>
            <span className="font-bold text-lg hidden sm:block">Portal Santri</span>
          </a>
          
          <div className="flex items-center gap-4">
            <ThemeController />
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-base-300">
                <div className="w-9 rounded-full">
                  <img alt="User avatar" src={user?.avatar || "https://i.pravatar.cc/150?img=11"} />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200">
                <li className="menu-title px-4 py-2">
                  <span className="font-semibold text-base-content">{user?.name || "User"}</span>
                  <span className="text-xs text-base-content/60">{user?.registrationNumber || "-"}</span>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <a href="/login" className="text-error mt-2 hover:bg-error/10 hover:text-error active:bg-error/20 flex items-center gap-3 p-3 font-semibold transition-all rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Keluar
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
