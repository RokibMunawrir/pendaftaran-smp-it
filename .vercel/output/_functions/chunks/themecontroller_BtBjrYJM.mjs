import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { createAuthClient } from 'better-auth/client';
import { adminClient } from 'better-auth/client/plugins';

const variantStyles = {
  info: {
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "size-6 text-info", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" }) }),
    btnClass: "btn-info",
    alertClass: "alert-info"
  },
  success: {
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "size-6 text-success", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) }),
    btnClass: "btn-success",
    alertClass: "alert-success"
  },
  warning: {
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "size-6 text-warning", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" }) }),
    btnClass: "btn-warning",
    alertClass: "alert-warning"
  },
  error: {
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "size-6 text-error", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) }),
    btnClass: "btn-error",
    alertClass: "alert-error"
  }
};
const positionClasses = {
  "top-start": "toast toast-top toast-start",
  "top-center": "toast toast-top toast-center",
  "top-end": "toast toast-top toast-end",
  "bottom-start": "toast toast-bottom toast-start",
  "bottom-center": "toast toast-bottom toast-center",
  "bottom-end": "toast toast-bottom toast-end"
};
function Modal({
  open,
  onClose,
  title,
  children,
  variant = "info",
  mode = "modal",
  duration = 3e3,
  position = "top-end",
  confirmLabel = "Ya",
  cancelLabel = "Batal",
  onConfirm,
  loading = false,
  disabled = false,
  className = ""
}) {
  useEffect(() => {
    if (mode === "notification" && open && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [mode, open, duration, onClose]);
  if (!open) return null;
  const { icon, btnClass, alertClass } = variantStyles[variant];
  if (mode === "notification") {
    return /* @__PURE__ */ jsx("div", { className: `${positionClasses[position]} z-50`, children: /* @__PURE__ */ jsxs("div", { className: `alert ${alertClass} shadow-lg`, children: [
      icon,
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        title && /* @__PURE__ */ jsx("h3", { className: "font-bold", children: title }),
        children && /* @__PURE__ */ jsx("div", { className: "text-sm", children })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "btn btn-sm btn-circle btn-ghost", onClick: onClose, children: "✕" })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("dialog", { className: "modal modal-open", onClick: onClose, children: [
    /* @__PURE__ */ jsxs("div", { className: `modal-box ${className}`, onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsx("button", { className: "btn btn-sm btn-circle btn-ghost absolute right-2 top-2", onClick: onClose, children: "✕" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "mt-0.5", children: icon }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          title && /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg", children: title }),
          /* @__PURE__ */ jsx("div", { className: "py-2 text-sm text-base-content/70", children })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "modal-action", children: [
        /* @__PURE__ */ jsx("button", { className: "btn btn-ghost btn-sm", onClick: onClose, disabled: loading || disabled, children: cancelLabel }),
        onConfirm && /* @__PURE__ */ jsxs("button", { className: `btn btn-sm ${btnClass}`, onClick: onConfirm, disabled: loading || disabled, children: [
          loading && /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-xs" }),
          confirmLabel
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("form", { method: "dialog", className: "modal-backdrop", children: /* @__PURE__ */ jsx("button", { onClick: onClose, children: "close" }) })
  ] });
}

const auth = createAuthClient({
  plugins: [
    adminClient()
  ]
});

function Logout() {
  const [open, setOpen] = useState(false);
  const handleLogout = async () => {
    setOpen(false);
    await auth.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: "btn btn-ghost btn-sm gap-2 w-fit max-w-full",
        onClick: () => setOpen(true),
        children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "size-4", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" }) }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline text-nowrap", children: "Logout" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        open,
        onClose: () => setOpen(false),
        title: "Konfirmasi Logout",
        variant: "warning",
        confirmLabel: "Logout",
        onConfirm: handleLogout,
        children: /* @__PURE__ */ jsx("p", { children: "Apakah Anda yakin ingin keluar dari sistem?" })
      }
    )
  ] });
}

function ThemeController({ className = "" }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "cupcake";
    }
    return "cupcake";
  });
  const toggleTheme = () => {
    const newTheme = theme === "cupcake" ? "dark" : "cupcake";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "cupcake";
    if (currentTheme !== theme) {
      setTheme(currentTheme);
    }
  }, []);
  return /* @__PURE__ */ jsxs("label", { className: `swap swap-rotate ${className}`, children: [
    /* @__PURE__ */ jsx("input", { type: "checkbox", checked: theme === "dark", onChange: toggleTheme, className: "hidden" }),
    /* @__PURE__ */ jsx(
      "svg",
      {
        className: "swap-off size-5 fill-current",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        children: /* @__PURE__ */ jsx("path", { d: "M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" })
      }
    ),
    /* @__PURE__ */ jsx(
      "svg",
      {
        className: "swap-on size-5 fill-current",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        children: /* @__PURE__ */ jsx("path", { d: "M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" })
      }
    )
  ] });
}

export { Logout as L, Modal as M, ThemeController as T, auth as a };
