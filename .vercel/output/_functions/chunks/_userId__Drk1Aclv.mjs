import { c as createComponent } from './astro-component_BNzcyMhR.mjs';
import 'piccolore';
import { L as renderTemplate } from './sequence_q2GBgLGh.mjs';
import { r as renderComponent } from './entrypoint_CFef_-o-.mjs';
import { $ as $$Layout } from './Layout_D1AtF-Rk.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { T as ThemeController, L as Logout, a as auth, M as Modal } from './themecontroller_BtBjrYJM.mjs';
import { getStatusBadge, REGISTRATION_STATUS } from './status_Dwl0Qi7R.mjs';
import { t as toTitleCase } from './string_DxHjmCCS.mjs';
import { g as getRegistrationByUserId } from './registrations_D6_46JUM.mjs';
import { g as getDocumentsByRegistrationId } from './documents_BLNw_htN.mjs';
import { getPaymentByRegistrationId } from './payment_B_0QZpN7.mjs';
import { a as auth$1 } from './auth_BrZ9-7fq.mjs';

function Navbar({ title = "Navbar Title" }) {
  return /* @__PURE__ */ jsxs("nav", { className: "navbar w-full bg-base-300", children: [
    /* @__PURE__ */ jsx(
      "label",
      {
        htmlFor: "my-drawer-4",
        "aria-label": "open sidebar",
        className: "btn btn-square btn-ghost",
        children: /* @__PURE__ */ jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            strokeLinejoin: "round",
            strokeLinecap: "round",
            strokeWidth: "2",
            fill: "none",
            stroke: "currentColor",
            className: "my-1.5 inline-block size-4",
            children: [
              /* @__PURE__ */ jsx("path", { d: "M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" }),
              /* @__PURE__ */ jsx("path", { d: "M9 4v16" }),
              /* @__PURE__ */ jsx("path", { d: "M14 10l2 2l-2 2" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "px-4", children: title }),
    /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(ThemeController, { className: "btn btn-ghost btn-circle btn-sm" }),
      /* @__PURE__ */ jsx(Logout, {})
    ] })
  ] });
}

const DRAWER_STORAGE_KEY = "drawer-open";
const menuItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", strokeLinejoin: "round", strokeLinecap: "round", strokeWidth: "2", fill: "none", stroke: "currentColor", className: "my-1.5 inline-block size-4", children: [
      /* @__PURE__ */ jsx("path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }),
      /* @__PURE__ */ jsx("path", { d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" })
    ] })
  },
  {
    label: "List Pendaftar",
    href: "/admin/list",
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "my-1.5 inline-block size-4", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" }) })
  },
  {
    label: "Setting Website",
    href: "/admin/setting",
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "my-1.5 inline-block size-4", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" }) })
  },
  {
    label: "Setting Pendaftaran",
    href: "/admin/setting/pendaftaran",
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "my-1.5 inline-block size-4", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" }) })
  },
  {
    label: "Pengumuman",
    href: "/admin/pengumuman",
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "my-1.5 inline-block size-4", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" }) })
  },
  {
    label: "Biaya Pendaftaran",
    href: "/admin/cost",
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "my-1.5 inline-block size-4", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" }) })
  },
  {
    label: "Tes & Wawancara",
    href: "/admin/test-schedule",
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "my-1.5 inline-block size-4", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) })
  },
  {
    label: "Users",
    href: "/admin/users",
    adminOnly: true,
    icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", strokeLinejoin: "round", strokeLinecap: "round", strokeWidth: "2", fill: "none", stroke: "currentColor", className: "my-1.5 inline-block size-4", children: [
      /* @__PURE__ */ jsx("path", { d: "M20 7h-9" }),
      /* @__PURE__ */ jsx("path", { d: "M14 17H5" }),
      /* @__PURE__ */ jsx("circle", { cx: "17", cy: "17", r: "3" }),
      /* @__PURE__ */ jsx("circle", { cx: "7", cy: "7", r: "3" })
    ] })
  }
];
function Panel({ title, children }) {
  const [userRole, setUserRole] = useState(void 0);
  useEffect(() => {
    auth.getSession().then(({ data }) => {
      setUserRole(data?.user?.role);
    });
  }, []);
  const visibleMenuItems = menuItems.filter(
    (item) => !item.adminOnly || userRole === "admin"
  );
  const [drawerOpen, setDrawerOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(DRAWER_STORAGE_KEY);
      return saved !== null ? saved === "true" : true;
    }
    return true;
  });
  useEffect(() => {
    localStorage.setItem(DRAWER_STORAGE_KEY, String(drawerOpen));
  }, [drawerOpen]);
  return /* @__PURE__ */ jsxs("div", { className: "drawer lg:drawer-open", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        id: "my-drawer-4",
        type: "checkbox",
        className: "drawer-toggle",
        checked: drawerOpen,
        onChange: (e) => setDrawerOpen(e.target.checked)
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "drawer-content", children: [
      /* @__PURE__ */ jsx(Navbar, { title }),
      /* @__PURE__ */ jsx("div", { className: "p-4", children })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "drawer-side is-drawer-close:overflow-visible", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "my-drawer-4", "aria-label": "close sidebar", className: "drawer-overlay" }),
      /* @__PURE__ */ jsx("div", { className: "flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-40", children: /* @__PURE__ */ jsx("ul", { className: "menu w-full grow", children: visibleMenuItems.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "a",
        {
          href: item.href,
          className: "is-drawer-close:tooltip is-drawer-close:tooltip-right",
          "data-tip": item.label,
          children: [
            item.icon,
            /* @__PURE__ */ jsx("span", { className: "is-drawer-close:hidden", children: item.label })
          ]
        }
      ) }, item.label)) }) })
    ] })
  ] });
}

function InfoRow({ label, value }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-1 py-2 border-b border-base-200 last:border-b-0", children: [
    /* @__PURE__ */ jsx("span", { className: "text-sm text-base-content/50 sm:w-44 shrink-0", children: label }),
    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: value || "-" })
  ] });
}
function DetailPendaftar({ data, documents: initialDocuments = [], payment: initialPayment = null, adminName }) {
  if (!data) {
    return /* @__PURE__ */ jsx(Panel, { title: "Detail Pendaftar", children: /* @__PURE__ */ jsx("div", { className: "alert alert-warning", children: "Data pendaftar tidak ditemukan." }) });
  }
  const [p, setP] = useState(data);
  const [docs, setDocs] = useState(initialDocuments);
  const [pay, setPay] = useState(initialPayment);
  const [loadingDoc, setLoadingDoc] = useState(null);
  const [loadingPay, setLoadingPay] = useState(false);
  const [loadingReg, setLoadingReg] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [openVerifikasi, setOpenVerifikasi] = useState(false);
  const [openTolak, setOpenTolak] = useState(false);
  const [openVerifikasiPay, setOpenVerifikasiPay] = useState(false);
  const [openTolakPay, setOpenTolakPay] = useState(false);
  const [openTerima, setOpenTerima] = useState(false);
  const [catatanTolak, setCatatanTolak] = useState("");
  const [notif, setNotif] = useState(null);
  const showNotif = (msg, type = "success") => {
    setNotif({ msg, type });
    setTimeout(() => setNotif(null), 3e3);
  };
  const handleUpdateDocStatus = async (docId, status) => {
    setLoadingDoc(docId);
    try {
      const response = await fetch("/api/admin/documents", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: docId, status })
      });
      if (response.ok) {
        setDocs((prev) => prev.map((d) => d.id === docId ? { ...d, status } : d));
        showNotif(`Dokumen berhasil ${status === "VERIFIED" ? "diverifikasi" : "ditolak"}`);
      } else {
        const err = await response.json();
        showNotif(err.error || "Gagal mengupdate status dokumen", "error");
      }
    } catch (error) {
      console.error(error);
      showNotif("Terjadi kesalahan koneksi", "error");
    } finally {
      setLoadingDoc(null);
    }
  };
  const handleUpdatePaymentStatus = async (status) => {
    if (!pay) return;
    setLoadingPay(true);
    try {
      const response = await fetch("/api/admin/payment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: pay.id, status })
      });
      if (response.ok) {
        setPay({ ...pay, status, verifiedByName: status === "VERIFIED" ? adminName : null });
        showNotif(`Pembayaran berhasil ${status === "VERIFIED" ? "diverifikasi" : "ditolak"}`);
      } else {
        const err = await response.json();
        showNotif(err.error || "Gagal mengupdate status pembayaran", "error");
      }
    } catch (error) {
      console.error(error);
      showNotif("Terjadi kesalahan koneksi", "error");
    } finally {
      setLoadingPay(false);
    }
  };
  const handleUpdateRegistrationStatus = async (status) => {
    if (!p.id) return;
    setLoadingReg(true);
    try {
      const response = await fetch("/api/admin/registration", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: p.id, status, notes: catatanTolak })
      });
      if (response.ok) {
        setP({ ...p, status });
        showNotif(`Status pendaftaran berhasil diperbarui: ${status}`);
      } else {
        const err = await response.json();
        showNotif(err.error || "Gagal mengupdate status pendaftaran", "error");
      }
    } catch (error) {
      console.error(error);
      showNotif("Terjadi kesalahan koneksi", "error");
    } finally {
      setLoadingReg(false);
    }
  };
  const docLabels = {
    foto: "Pas Foto (3x4)",
    kk: "Kartu Keluarga",
    akta: "Akta Kelahiran",
    skl: "Ijazah / SKL"
  };
  return /* @__PURE__ */ jsxs(Panel, { title: "Detail Pendaftar", children: [
    /* @__PURE__ */ jsx("div", { className: "card bg-base-100 shadow-sm border border-base-300 mb-4", children: /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "avatar", children: /* @__PURE__ */ jsx("div", { className: "w-20 rounded-xl", children: /* @__PURE__ */ jsx("img", { src: docs.find((d) => d.type === "foto")?.fileUrl || p.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=random&size=200`, alt: p.name, className: "object-cover w-full h-full" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold", children: toTitleCase(p.name) }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-base-content/50", children: p.placeOfBirth }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-2", children: [
          /* @__PURE__ */ jsx("span", { className: `badge badge-sm ${getStatusBadge(p.status)}`, children: p.status || "Unknown" }),
          /* @__PURE__ */ jsx("span", { className: "badge badge-ghost badge-sm", children: p.program }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-base-content/40", children: [
            "Terdaftar: ",
            p.registrationNumber && p.registrationNumber
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        notif && /* @__PURE__ */ jsx("div", { className: `alert ${notif.type === "success" ? "alert-success" : "alert-error"} w-auto shadow-lg text-white font-medium py-2 px-4 h-10 min-h-0`, children: /* @__PURE__ */ jsx("span", { className: "text-sm", children: notif.msg }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxs("a", { href: "/admin/list", className: "btn btn-ghost btn-sm", children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "size-4", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" }) }),
            "Kembali"
          ] }),
          p.status === REGISTRATION_STATUS.TEST_INTERVIEW ? /* @__PURE__ */ jsxs("button", { className: "btn btn-success btn-sm", onClick: () => setOpenTerima(true), children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "size-4", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) }),
            "Terima Menjadi Siswa"
          ] }) : p.status !== REGISTRATION_STATUS.ACCEPTED && p.status !== REGISTRATION_STATUS.REJECTED ? /* @__PURE__ */ jsxs("button", { className: "btn btn-success btn-sm", onClick: () => setOpenVerifikasi(true), children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "size-4", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) }),
            "Verifikasi"
          ] }) : null,
          p.status !== REGISTRATION_STATUS.ACCEPTED && p.status !== REGISTRATION_STATUS.REJECTED && /* @__PURE__ */ jsxs("button", { className: "btn btn-error btn-sm", onClick: () => setOpenTolak(true), children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "size-4", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) }),
            "Tolak"
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "tabs tabs-lift", children: [
      /* @__PURE__ */ jsx("input", { type: "radio", name: "detail_tabs", className: "tab", "aria-label": "Bio Data", defaultChecked: true }),
      /* @__PURE__ */ jsxs("div", { className: "tab-content bg-base-100 border-base-300 p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-3", children: "Data Pribadi Santri" }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-lg", children: [
          /* @__PURE__ */ jsx(InfoRow, { label: "Nama Lengkap", value: toTitleCase(p.name) }),
          /* @__PURE__ */ jsx(InfoRow, { label: "NIK", value: p.nik }),
          /* @__PURE__ */ jsx(InfoRow, { label: "NISN", value: p.nisn }),
          /* @__PURE__ */ jsx(InfoRow, { label: "Tempat Lahir", value: p.placeOfBirth }),
          /* @__PURE__ */ jsx(InfoRow, { label: "Tanggal Lahir", value: p.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString() : null }),
          /* @__PURE__ */ jsx(InfoRow, { label: "Jenis Kelamin", value: p.gender }),
          /* @__PURE__ */ jsx(InfoRow, { label: "Agama", value: p.religion }),
          /* @__PURE__ */ jsx(InfoRow, { label: "Alamat", value: p.address }),
          /* @__PURE__ */ jsx(InfoRow, { label: "No. Telepon", value: p.phone }),
          /* @__PURE__ */ jsx(InfoRow, { label: "Email", value: p.email })
        ] })
      ] }),
      /* @__PURE__ */ jsx("input", { type: "radio", name: "detail_tabs", className: "tab", "aria-label": "Data Orang Tua" }),
      /* @__PURE__ */ jsxs("div", { className: "tab-content bg-base-100 border-base-300 p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-3", children: "Data Ayah" }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-lg", children: [
          /* @__PURE__ */ jsx(InfoRow, { label: "Nama Ayah", value: p.fatherName }),
          /* @__PURE__ */ jsx(InfoRow, { label: "No. Telepon", value: p.fatherPhone }),
          /* @__PURE__ */ jsx(InfoRow, { label: "Pekerjaan", value: p.fatherJob }),
          /* @__PURE__ */ jsx(InfoRow, { label: "Penghasilan", value: p.fatherIncome })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "divider" }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-3", children: "Data Ibu" }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-lg", children: [
          /* @__PURE__ */ jsx(InfoRow, { label: "Nama Ibu", value: p.motherName }),
          /* @__PURE__ */ jsx(InfoRow, { label: "No. Telepon", value: p.motherPhone }),
          /* @__PURE__ */ jsx(InfoRow, { label: "Pekerjaan", value: p.motherJob }),
          /* @__PURE__ */ jsx(InfoRow, { label: "Penghasilan", value: p.motherIncome })
        ] })
      ] }),
      /* @__PURE__ */ jsx("input", { type: "radio", name: "detail_tabs", className: "tab", "aria-label": "Pendidikan" }),
      /* @__PURE__ */ jsxs("div", { className: "tab-content bg-base-100 border-base-300 p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-3", children: "Riwayat Pendidikan" }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-lg", children: [
          /* @__PURE__ */ jsx(InfoRow, { label: "Sekolah Asal", value: p.previousSchool }),
          /* @__PURE__ */ jsx(InfoRow, { label: "NPSN", value: p.originSchoolNpsn })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "divider" }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-3", children: "Program Pendaftaran" }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-lg", children: [
          /* @__PURE__ */ jsx(InfoRow, { label: "Program", value: p.program }),
          /* @__PURE__ */ jsx(InfoRow, { label: "Status", value: p.status })
        ] })
      ] }),
      /* @__PURE__ */ jsx("input", { type: "radio", name: "detail_tabs", className: "tab", "aria-label": "Pembayaran" }),
      /* @__PURE__ */ jsxs("div", { className: "tab-content bg-base-100 border-base-300 p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-4", children: "Bukti Pembayaran" }),
        !pay ? /* @__PURE__ */ jsx("div", { className: "alert alert-info", children: "Belum ada bukti pembayaran yang diunggah." }) : /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-1 space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-base-200/50 p-4 rounded-2xl border border-base-300", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold opacity-50 uppercase mb-3", children: "Informasi Transfer" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase font-bold text-base-content/40 tracking-wider", children: "Nama Pengirim" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: pay.senderName })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase font-bold text-base-content/40 tracking-wider", children: "Bank Tujuan" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: pay.bankTujuan })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase font-bold text-base-content/40 tracking-wider", children: "Tanggal Upload" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: new Date(pay.paymentDate).toLocaleString() })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-2 border-t border-base-300 flex flex-col gap-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase font-bold text-base-content/40 tracking-wider", children: "Status Verifikasi" }),
                    /* @__PURE__ */ jsx("span", { className: `badge badge-sm ${getStatusBadge(pay.status)}`, children: pay.status })
                  ] }),
                  pay.status === "VERIFIED" && pay.verifiedByName && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-base-100/50 pt-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase font-bold text-base-content/40 tracking-wider", children: "Diverifikasi Oleh" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-success", children: pay.verifiedByName })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "btn btn-success btn-sm w-full",
                  onClick: () => setOpenVerifikasiPay(true),
                  disabled: loadingPay || pay.status === "VERIFIED",
                  children: loadingPay ? /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-xs" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "size-4 mr-1", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) }),
                    " Verifikasi Pembayaran"
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "btn btn-error btn-sm w-full",
                  onClick: () => setOpenTolakPay(true),
                  disabled: loadingPay || pay.status === "REJECTED",
                  children: "Tolak Pembayaran"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsx("div", { className: "card bg-base-100 shadow-sm border border-base-300 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-auto min-h-[400px] bg-base-200 group", children: [
            /* @__PURE__ */ jsx("img", { src: pay.proofUrl, alt: "Bukti Pembayaran", className: "w-full h-full object-contain" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsx("button", { className: "btn btn-sm btn-circle btn-primary", onClick: () => setPreviewImage({ src: pay.proofUrl, title: "Bukti Pembayaran" }), children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "size-4", children: [
                /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" }),
                /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" })
              ] }) }),
              /* @__PURE__ */ jsx("a", { href: pay.proofUrl, target: "_blank", className: "btn btn-sm btn-circle btn-ghost bg-white/20 text-white", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "size-4", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" }) }) })
            ] })
          ] }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("input", { type: "radio", name: "detail_tabs", className: "tab", "aria-label": "Dokumen" }),
      /* @__PURE__ */ jsxs("div", { className: "tab-content bg-base-100 border-base-300 p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-4", children: "Dokumen Pendaftaran" }),
        docs.length === 0 ? /* @__PURE__ */ jsx("div", { className: "alert alert-info", children: "Belum ada dokumen yang diunggah." }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: docs.map((doc) => /* @__PURE__ */ jsxs("div", { className: "card bg-base-100 shadow-sm border border-base-300 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-[3/4] bg-base-200 group", children: [
            doc.fileUrl.toLowerCase().endsWith(".pdf") ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full", children: [
              /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "size-12 text-error mb-2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "PDF Document" })
            ] }) : /* @__PURE__ */ jsx("img", { src: doc.fileUrl, alt: doc.type, className: "w-full h-full object-cover" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsx("button", { className: "btn btn-sm btn-circle btn-primary", onClick: () => setPreviewImage({ src: doc.fileUrl, title: docLabels[doc.type] || doc.type }), children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "size-4", children: [
                /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" }),
                /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" })
              ] }) }),
              /* @__PURE__ */ jsx("a", { href: doc.fileUrl, target: "_blank", className: "btn btn-sm btn-circle btn-ghost bg-white/20 text-white", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "size-4", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" }) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm uppercase", children: docLabels[doc.type] || doc.type }),
              /* @__PURE__ */ jsx("span", { className: `badge badge-xs ${getStatusBadge(doc.status)}`, children: doc.status })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-base-content/50 mb-4 font-mono", children: [
              "Uploaded: ",
              new Date(doc.uploadDate).toLocaleString()
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "btn btn-xs btn-success flex-1",
                  onClick: () => handleUpdateDocStatus(doc.id, "VERIFIED"),
                  disabled: loadingDoc === doc.id || doc.status === "VERIFIED",
                  children: loadingDoc === doc.id ? /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-xs" }) : "Verifikasi"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "btn btn-xs btn-error flex-1",
                  onClick: () => handleUpdateDocStatus(doc.id, "REJECTED"),
                  disabled: loadingDoc === doc.id || doc.status === "REJECTED",
                  children: "Tolak"
                }
              )
            ] })
          ] })
        ] }, doc.id)) })
      ] })
    ] }),
    previewImage && /* @__PURE__ */ jsxs("dialog", { className: "modal modal-open", onClick: () => setPreviewImage(null), children: [
      /* @__PURE__ */ jsxs("div", { className: "modal-box max-w-3xl", onClick: (e) => e.stopPropagation(), children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg", children: previewImage.title }),
          /* @__PURE__ */ jsx("button", { className: "btn btn-sm btn-circle btn-ghost", onClick: () => setPreviewImage(null), children: "✕" })
        ] }),
        /* @__PURE__ */ jsx("img", { src: previewImage.src, alt: previewImage.title, className: "w-full rounded-lg" })
      ] }),
      /* @__PURE__ */ jsx("form", { method: "dialog", className: "modal-backdrop", children: /* @__PURE__ */ jsx("button", { onClick: () => setPreviewImage(null), children: "close" }) })
    ] }),
    /* @__PURE__ */ jsx(
      Modal,
      {
        open: openVerifikasiPay,
        onClose: () => setOpenVerifikasiPay(false),
        title: "Verifikasi Pembayaran",
        onConfirm: () => {
          handleUpdatePaymentStatus("VERIFIED");
          setOpenVerifikasiPay(false);
        },
        variant: "success",
        confirmLabel: "Verifikasi",
        loading: loadingPay,
        children: /* @__PURE__ */ jsx("p", { children: "Apakah Anda yakin ingin memverifikasi pembayaran ini?" })
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        open: openTolakPay,
        onClose: () => setOpenTolakPay(false),
        title: "Tolak Pembayaran",
        onConfirm: () => {
          handleUpdatePaymentStatus("REJECTED");
          setOpenTolakPay(false);
        },
        variant: "error",
        confirmLabel: "Tolak",
        loading: loadingPay,
        children: /* @__PURE__ */ jsx("p", { children: "Apakah Anda yakin ingin menolak pembayaran ini?" })
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        open: openVerifikasi,
        onClose: () => setOpenVerifikasi(false),
        title: "Verifikasi Pendaftar",
        onConfirm: () => {
          handleUpdateRegistrationStatus(REGISTRATION_STATUS.TEST_INTERVIEW);
          setOpenVerifikasi(false);
        },
        variant: "success",
        confirmLabel: "Verifikasi",
        loading: loadingReg,
        children: /* @__PURE__ */ jsxs("p", { children: [
          "Apakah Anda yakin ingin memverifikasi pendaftar ini? Status akan berlanjut ke tahap ",
          /* @__PURE__ */ jsx("b", { children: "Tes & Wawancara" }),
          "."
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        open: openTerima,
        onClose: () => setOpenTerima(false),
        title: "Terima Siswa",
        onConfirm: () => {
          handleUpdateRegistrationStatus(REGISTRATION_STATUS.ACCEPTED);
          setOpenTerima(false);
        },
        variant: "success",
        confirmLabel: "Terima Siswa",
        loading: loadingReg,
        children: /* @__PURE__ */ jsx("p", { children: "Apakah Anda yakin ingin menerima pendaftar ini menjadi siswa? Pendaftar akan dapat mengunduh surat keterangan lulus." })
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        open: openTolak,
        onClose: () => {
          setOpenTolak(false);
          setCatatanTolak("");
        },
        title: "Tolak Pendaftar",
        onConfirm: () => {
          handleUpdateRegistrationStatus(REGISTRATION_STATUS.REJECTED);
          setOpenTolak(false);
        },
        variant: "error",
        confirmLabel: "Tolak",
        loading: loadingReg || catatanTolak.trim() === "",
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx("p", { children: "Apakah Anda yakin ingin menolak pendaftar ini?" }),
          /* @__PURE__ */ jsxs("label", { className: "form-control w-full", children: [
            /* @__PURE__ */ jsx("div", { className: "label", children: /* @__PURE__ */ jsxs("span", { className: "label-text font-medium", children: [
              "Catatan Penolakan ",
              /* @__PURE__ */ jsx("span", { className: "text-error", children: "*" })
            ] }) }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                className: "textarea textarea-bordered w-full",
                rows: 4,
                placeholder: "Contoh: Foto tidak jelas, data orang tua belum lengkap...",
                value: catatanTolak,
                onChange: (e) => setCatatanTolak(e.target.value)
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "label", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-base-content/50", children: "Tulis bagian mana yang perlu direvisi oleh pendaftar" }) })
          ] })
        ] })
      }
    )
  ] });
}

const $$userId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$userId;
  const session = await auth$1.api.getSession({
    headers: Astro2.request.headers
  });
  if (!session || session.user.role !== "admin") {
    return Astro2.redirect("/login");
  }
  const { userId } = Astro2.params;
  const registration = userId ? await getRegistrationByUserId(userId) : null;
  const documents = registration ? await getDocumentsByRegistrationId(registration.id) : [];
  const payment = registration ? await getPaymentByRegistrationId(registration.id) : null;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Detail Pendaftar", "description": "Detail Pendaftar" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "DetailPendaftar", DetailPendaftar, { "client:load": true, "data": registration, "documents": documents, "payment": payment, "client:component-hydration": "load", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/ui/admin/bio-data", "client:component-export": "default" })} ` })}`;
}, "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/admin/list/detail/[userId].astro", void 0);

const $$file = "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/admin/list/detail/[userId].astro";
const $$url = "/admin/list/detail/[userId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$userId,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
