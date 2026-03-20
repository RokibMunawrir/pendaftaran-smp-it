import { useState } from "react";
import Modal from "./modal";
import { auth } from "../../lib/client-auth";

export default function Logout() {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    setOpen(false);
    await auth.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };

  return (
    <>
      <button
        className="btn btn-ghost btn-sm gap-2 w-fit max-w-full"
        onClick={() => setOpen(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
        <span className="hidden sm:inline text-nowrap">Logout</span>
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Konfirmasi Logout"
        variant="warning"
        confirmLabel="Logout"
        onConfirm={handleLogout}
      >
        <p>Apakah Anda yakin ingin keluar dari sistem?</p>
      </Modal>
    </>
  );
}
