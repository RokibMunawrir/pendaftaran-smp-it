import { c as createComponent } from './astro-component_BNzcyMhR.mjs';
import 'piccolore';
import { L as renderTemplate } from './sequence_q2GBgLGh.mjs';
import { r as renderComponent } from './entrypoint_CFef_-o-.mjs';
import { $ as $$Layout } from './Layout_D1AtF-Rk.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { N as NavbarUser, T as TimelineProgress } from './timeline-progress_gLgtSjZ8.mjs';
import { REGISTRATION_STATUS } from './status_Dwl0Qi7R.mjs';
import { a as auth } from './auth_BrZ9-7fq.mjs';
import { a as getProfileByUserId } from './profiles_DJkIwHAp.mjs';
import { g as getUser } from './user_Bn5kOyuo.mjs';
import { e as ensureRegistration } from './registrations_D6_46JUM.mjs';

function UserAnnouncement({
  userId,
  user = { name: "User", registrationNumber: null, status: "DRAFT" },
  steps = []
}) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("/api/user/announcement");
        if (res.ok) {
          const data = await res.json();
          setAnnouncements(data);
          if (data.length > 0) {
            const latest = data.reduce(
              (max, curr) => new Date(curr.createdAt) > new Date(max) ? curr.createdAt : max,
              data[0].createdAt
            );
            localStorage.setItem("announcement_last_seen", latest);
          }
        }
      } catch (err) {
        console.error("Gagal memuat pengumuman", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-base-200/50", children: [
      /* @__PURE__ */ jsx(NavbarUser, { user }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center py-20", children: /* @__PURE__ */ jsx("span", { className: "loading loading-spinner text-primary loading-lg" }) })
    ] });
  }
  const renderContent = () => {
    if (announcements.length === 0) {
      return /* @__PURE__ */ jsx("div", { className: "card bg-base-100 shadow-sm border border-base-200", children: /* @__PURE__ */ jsxs("div", { className: "card-body py-12 text-center text-base-content/50", children: [
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-12 h-12 mx-auto mb-3 opacity-30", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75v-.7V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Belum ada pengumuman saat ini." })
      ] }) });
    }
    return /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: announcements.map((item) => /* @__PURE__ */ jsx(
      "div",
      {
        className: `card bg-base-100 shadow-sm border ${item.isImportant ? "border-primary shadow-primary/10" : "border-base-200"} transition-all hover:shadow-md`,
        children: /* @__PURE__ */ jsxs("div", { className: "card-body p-5 md:p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsx("h3", { className: "card-title text-base font-bold md:text-lg", children: item.title }),
              item.isImportant && /* @__PURE__ */ jsx("span", { className: "badge badge-error badge-sm", children: "Penting" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-base-content/50 md:text-right mt-1 md:mt-0 whitespace-nowrap bg-base-200 px-2 py-1 rounded-md", children: new Date(item.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "prose prose-sm max-w-none text-base-content/70 mt-2", children: /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap leading-relaxed", children: item.content }) })
        ] })
      },
      item.id
    )) });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-base-200/50", children: [
    /* @__PURE__ */ jsx(NavbarUser, { user }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold text-base-content mb-2 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-8 h-8 text-primary", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75v-.7V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" }) }),
            "Pengumuman"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-base-content/60 text-lg", children: "Informasi resmi dan berita terbaru seputar pendaftaran santri baru." })
        ] }),
        (() => {
          let badgeBg = "bg-warning/10 border-warning/20";
          let badgeText = "text-warning-content";
          let dotColor = "bg-warning";
          let label = "Menunggu Pembayaran";
          const normalizedStatus = user.status?.toUpperCase();
          switch (normalizedStatus) {
            case REGISTRATION_STATUS.REGISTERED:
            case REGISTRATION_STATUS.DRAFT:
              badgeBg = "bg-primary/10 border-primary/20";
              badgeText = "text-primary";
              dotColor = "bg-primary";
              label = "Lengkapi Biodata";
              break;
            case REGISTRATION_STATUS.PENDING_PAYMENT:
              badgeBg = "bg-warning/10 border-warning/20";
              badgeText = "text-warning-content";
              dotColor = "bg-warning";
              label = "Menunggu Pembayaran";
              break;
            case REGISTRATION_STATUS.UPLOAD_DOCUMENT:
              badgeBg = "bg-info/10 border-info/20";
              badgeText = "text-info";
              dotColor = "bg-info";
              label = "Upload Berkas";
              break;
            case REGISTRATION_STATUS.VERIFYING:
            case REGISTRATION_STATUS.PENDING_VERIFICATION:
              badgeBg = "bg-info/10 border-info/20";
              badgeText = "text-info";
              dotColor = "bg-info";
              label = "Sedang Diverifikasi";
              break;
            case REGISTRATION_STATUS.TEST_INTERVIEW:
              badgeBg = "bg-secondary/10 border-secondary/20";
              badgeText = "text-secondary";
              dotColor = "bg-secondary";
              label = "Jadwal Tes & Wawancara";
              break;
            case REGISTRATION_STATUS.REVISION:
              badgeBg = "bg-error/10 border-error/20";
              badgeText = "text-error";
              dotColor = "bg-error";
              label = "Perbaikan Data";
              break;
            case REGISTRATION_STATUS.REJECTED:
              badgeBg = "bg-base-300 border-base-content/20";
              badgeText = "text-base-content";
              dotColor = "bg-base-content/50";
              label = "Ditolak";
              break;
            case REGISTRATION_STATUS.ACCEPTED:
              badgeBg = "bg-success/10 border-success/20";
              badgeText = "text-success";
              dotColor = "bg-success";
              label = "Diterima";
              break;
          }
          return /* @__PURE__ */ jsxs("div", { className: `inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium border ${badgeBg} ${badgeText}`, children: [
            /* @__PURE__ */ jsxs("span", { className: "relative flex h-3 w-3", children: [
              /* @__PURE__ */ jsx("span", { className: `animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}` }),
              /* @__PURE__ */ jsx("span", { className: `relative inline-flex rounded-full h-3 w-3 ${dotColor}` })
            ] }),
            label
          ] });
        })()
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-8", children: renderContent() }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsx(TimelineProgress, { steps, contactUrl: "https://wa.me/123456789" }) })
      ] })
    ] })
  ] });
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const session = await auth.api.getSession({
    headers: Astro2.request.headers
  });
  if (!session) {
    return Astro2.redirect("/login");
  }
  const userId = session.user.id;
  const registration = await ensureRegistration(userId);
  const [userData, profile] = await Promise.all([
    getUser(userId),
    getProfileByUserId(userId)
  ]);
  const user = userData[0];
  const normalizedRegStatus = registration?.status?.toUpperCase() || "";
  const steps = [
    { title: "Daftar Akun", description: "Akun berhasil dibuat", status: "completed", href: "/user/dashboard" },
    { title: "Lengkapi Biodata", description: "Isi form data diri santri", status: registration ? "completed" : "current", href: "/user/biodata" },
    { title: "Pembayaran", description: "Bayar biaya pendaftaran", status: normalizedRegStatus === REGISTRATION_STATUS.PENDING_PAYMENT ? "current" : [REGISTRATION_STATUS.REGISTERED, REGISTRATION_STATUS.DRAFT].includes(normalizedRegStatus) ? "upcoming" : "completed", href: "/user/payment" },
    { title: "Upload Berkas", description: "KK, Akta Kelahiran, dll", status: normalizedRegStatus === REGISTRATION_STATUS.UPLOAD_DOCUMENT ? "current" : [REGISTRATION_STATUS.VERIFYING, REGISTRATION_STATUS.TEST_INTERVIEW, REGISTRATION_STATUS.ACCEPTED, REGISTRATION_STATUS.REJECTED].includes(normalizedRegStatus) ? "completed" : "upcoming", href: "/user/document" },
    { title: "Tes & Wawancara", description: "Tes masuk pondok", status: normalizedRegStatus === REGISTRATION_STATUS.TEST_INTERVIEW ? "current" : normalizedRegStatus === REGISTRATION_STATUS.ACCEPTED || normalizedRegStatus === REGISTRATION_STATUS.REJECTED ? "completed" : "upcoming", href: "#" },
    { title: "Hasil Seleksi", description: "Pengumuman Kelulusan", status: normalizedRegStatus === REGISTRATION_STATUS.ACCEPTED || normalizedRegStatus === REGISTRATION_STATUS.REJECTED ? "current" : "upcoming", href: "/user/result" }
  ];
  const dashboardUser = {
    name: user?.name || "User",
    registrationNumber: registration?.registrationNumber || null,
    status: registration?.status || "DRAFT",
    pathway: registration?.program || "Reguler",
    program: registration?.program || "Tahfidz Al-Quran"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pengumuman", "description": "Pengumuman" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "UserAnnouncement", UserAnnouncement, { "client:load": true, "userId": userId, "user": dashboardUser, "steps": steps, "client:component-hydration": "load", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/user/announcement", "client:component-export": "default" })} ` })}`;
}, "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/user/announcement/index.astro", void 0);

const $$file = "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/user/announcement/index.astro";
const $$url = "/user/announcement";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
