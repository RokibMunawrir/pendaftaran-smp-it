import { useEffect, type ReactNode } from "react";

type ModalVariant = "info" | "success" | "warning" | "error";
type ModalMode = "modal" | "notification";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  variant?: ModalVariant;
  /** Mode: "modal" = popup dialog (default), "notification" = toast notification */
  mode?: ModalMode;
  /** Auto-dismiss duration in ms for notification mode (default: 3000). Set 0 to disable. */
  duration?: number;
  /** Position for notification mode */
  position?: "top-start" | "top-center" | "top-end" | "bottom-start" | "bottom-center" | "bottom-end";
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  loading?: boolean;
  className?: string;
}

const variantStyles: Record<ModalVariant, { icon: ReactNode; btnClass: string; alertClass: string }> = {
  info: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-info">
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
      </svg>
    ),
    btnClass: "btn-info",
    alertClass: "alert-info",
  },
  success: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-success">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    btnClass: "btn-success",
    alertClass: "alert-success",
  },
  warning: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-warning">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
    btnClass: "btn-warning",
    alertClass: "alert-warning",
  },
  error: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-error">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    btnClass: "btn-error",
    alertClass: "alert-error",
  },
};

const positionClasses: Record<NonNullable<ModalProps["position"]>, string> = {
  "top-start": "toast toast-top toast-start",
  "top-center": "toast toast-top toast-center",
  "top-end": "toast toast-top toast-end",
  "bottom-start": "toast toast-bottom toast-start",
  "bottom-center": "toast toast-bottom toast-center",
  "bottom-end": "toast toast-bottom toast-end",
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  variant = "info",
  mode = "modal",
  duration = 3000,
  position = "top-end",
  confirmLabel = "Ya",
  cancelLabel = "Batal",
  onConfirm,
  loading = false,
  className = "",
}: ModalProps) {
  // Auto-dismiss for notification mode
  useEffect(() => {
    if (mode === "notification" && open && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [mode, open, duration, onClose]);

  if (!open) return null;

  const { icon, btnClass, alertClass } = variantStyles[variant];

  // ── Notification / Toast mode ──
  if (mode === "notification") {
    return (
      <div className={`${positionClasses[position]} z-50`}>
        <div className={`alert ${alertClass} shadow-lg`}>
          {icon}
          <div className="flex-1">
            {title && <h3 className="font-bold">{title}</h3>}
            {children && <div className="text-sm">{children}</div>}
          </div>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
            ✕
          </button>
        </div>
      </div>
    );
  }

  // ── Modal / Dialog mode (default) ──
  return (
    <dialog className="modal modal-open" onClick={onClose}>
      <div className={`modal-box ${className}`} onClick={(e) => e.stopPropagation()}>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
          ✕
        </button>

        <div className="flex items-start gap-3">
          <div className="mt-0.5">{icon}</div>
          <div className="flex-1">
            {title && <h3 className="font-bold text-lg">{title}</h3>}
            <div className="py-2 text-sm text-base-content/70">{children}</div>
          </div>
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost btn-sm" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </button>
          {onConfirm && (
            <button className={`btn btn-sm ${btnClass}`} onClick={onConfirm} disabled={loading}>
              {loading && <span className="loading loading-spinner loading-xs"></span>}
              {confirmLabel}
            </button>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
