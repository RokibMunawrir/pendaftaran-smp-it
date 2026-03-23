import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { T as ThemeController, L as Logout } from './themecontroller_BtBjrYJM.mjs';

function NavbarUser({ user }) {
  const [hasNew, setHasNew] = useState(false);
  useEffect(() => {
    if (window.location.pathname === "/user/announcement") {
      setHasNew(false);
      return;
    }
    const checkNewAnnouncements = async () => {
      try {
        const res = await fetch("/api/user/announcement/latest-timestamp");
        if (res.ok) {
          const { latestTimestamp } = await res.json();
          if (latestTimestamp) {
            const lastSeen = localStorage.getItem("announcement_last_seen");
            if (!lastSeen || new Date(latestTimestamp).getTime() > new Date(lastSeen).getTime()) {
              setHasNew(true);
            }
          }
        }
      } catch (err) {
        console.error("Gagal memeriksa pengumuman baru", err);
      }
    };
    checkNewAnnouncements();
  }, []);
  return /* @__PURE__ */ jsx("nav", { className: "bg-base-100 border-b border-base-300 sticky top-0 z-30 shadow-sm", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center h-16", children: [
    /* @__PURE__ */ jsxs("a", { href: "/user/dashboard", className: "flex items-center gap-3 group", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-6 h-6", children: [
        /* @__PURE__ */ jsx("path", { d: "M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" }),
        /* @__PURE__ */ jsx("path", { d: "m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13-1.065.573-6.506 3.504a3.75 3.75 0 0 1-3.556 0l-6.506-3.504-1.065-.572Z" })
      ] }) }),
      /* @__PURE__ */ jsx("span", { className: "font-bold text-lg hidden sm:block", children: "Portal Santri" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(ThemeController, {}),
      /* @__PURE__ */ jsx("a", { href: "/user/announcement", className: "btn btn-ghost btn-circle", title: "Pengumuman", children: /* @__PURE__ */ jsxs("div", { className: "indicator", children: [
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" }) }),
        hasNew && /* @__PURE__ */ jsx("span", { className: "badge badge-xs badge-primary indicator-item animate-pulse" })
      ] }) }),
      /* @__PURE__ */ jsx(Logout, {})
    ] })
  ] }) }) });
}

function TimelineProgress({
  steps,
  currentStepMessage = "Silakan selesaikan step saat ini agar Anda dapat melanjutkan ke tahapan berikutnya.",
  contactUrl = "https://wa.me/123456789",
  className = ""
}) {
  return /* @__PURE__ */ jsx("div", { className: `card bg-base-100 shadow-sm border border-base-200 sticky top-24 ${className}`, children: /* @__PURE__ */ jsxs("div", { className: "card-body p-6 md:p-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "card-title text-xl font-bold mb-6", children: "Progress Pendaftaran" }),
    /* @__PURE__ */ jsx("ul", { className: "steps steps-vertical -ml-2", children: steps.map((step, index) => {
      const isClickable = step.href && step.status !== "upcoming";
      const ContentWrapper = isClickable ? "a" : "div";
      return /* @__PURE__ */ jsx(
        "li",
        {
          "data-content": step.status === "completed" ? "✓" : step.status === "current" ? "●" : "",
          className: `step ${step.status === "completed" ? "step-primary" : step.status === "current" ? "step-primary font-bold" : "step-neutral text-base-content/40"}`,
          children: /* @__PURE__ */ jsxs(
            ContentWrapper,
            {
              ...isClickable ? { href: step.href } : {},
              className: `text-left ml-2 py-2 px-3 rounded-xl transition-colors block ${isClickable ? "hover:bg-base-200 cursor-pointer" : ""}`,
              children: [
                /* @__PURE__ */ jsx("div", { className: `text-base ${step.status === "current" ? "text-primary font-bold" : "text-base-content font-medium"}`, children: step.title }),
                /* @__PURE__ */ jsx("div", { className: `text-xs mt-1 ${step.status === "current" ? "text-base-content/70" : "text-base-content/50 font-normal"}`, children: step.description })
              ]
            }
          )
        },
        index
      );
    }) }),
    currentStepMessage && /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100 flex items-start gap-3", children: [
      /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-5 h-5 flex-shrink-0 mt-0.5 mt-0.5", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", children: currentStepMessage })
    ] }),
    contactUrl && /* @__PURE__ */ jsxs("a", { href: contactUrl, target: "_blank", rel: "noreferrer", className: "btn btn-outline btn-success w-full mt-4 flex gap-2", children: [
      /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-5 h-5", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z", clipRule: "evenodd" }) }),
      "Hubungi Bantuan"
    ] })
  ] }) });
}

export { NavbarUser as N, TimelineProgress as T };
