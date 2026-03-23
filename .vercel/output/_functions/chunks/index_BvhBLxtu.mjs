import { c as createComponent } from './astro-component_BNzcyMhR.mjs';
import 'piccolore';
import { L as renderTemplate } from './sequence_q2GBgLGh.mjs';
import { r as renderComponent } from './entrypoint_CFef_-o-.mjs';
import { $ as $$Layout } from './Layout_D1AtF-Rk.mjs';
import { g as getRegistrationByUserId } from './registrations_D6_46JUM.mjs';
import { getPaymentByRegistrationId } from './payment_B_0QZpN7.mjs';
import { g as getUser } from './user_Bn5kOyuo.mjs';
import { g as getSettings } from './settings_B91pbR9f.mjs';
import { a as auth } from './auth_BrZ9-7fq.mjs';
import { REGISTRATION_STATUS } from './status_Dwl0Qi7R.mjs';

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
  const userData = await getUser(userId);
  const userObj = userData[0];
  const registration = await getRegistrationByUserId(userId);
  const payment = registration ? await getPaymentByRegistrationId(registration.id) : null;
  const settingsResult = await getSettings();
  const settings = settingsResult?.[0] || null;
  const userProps = {
    name: userObj?.name || "User",
    registrationNumber: registration?.registrationNumber || null
  };
  const normalizedRegStatus = registration?.status?.toUpperCase() || "";
  const steps = [
    { title: "Daftar Akun", description: "Akun berhasil dibuat", status: "completed", href: "/user/dashboard" },
    { title: "Lengkapi Biodata", description: "Isi form data diri santri", status: registration ? "completed" : "current", href: "/user/biodata" },
    { title: "Pembayaran", description: "Bayar biaya pendaftaran", status: normalizedRegStatus === REGISTRATION_STATUS.PENDING_PAYMENT ? "current" : [REGISTRATION_STATUS.REGISTERED, REGISTRATION_STATUS.DRAFT].includes(normalizedRegStatus) ? "upcoming" : "completed", href: "/user/payment" },
    { title: "Upload Berkas", description: "KK, Akta Kelahiran, dll", status: normalizedRegStatus === REGISTRATION_STATUS.UPLOAD_DOCUMENT ? "current" : [REGISTRATION_STATUS.VERIFYING, REGISTRATION_STATUS.TEST_INTERVIEW, REGISTRATION_STATUS.ACCEPTED, REGISTRATION_STATUS.REJECTED].includes(normalizedRegStatus) ? "completed" : "upcoming", href: "/user/document" },
    { title: "Tes & Wawancara", description: "Tes masuk pondok", status: normalizedRegStatus === REGISTRATION_STATUS.TEST_INTERVIEW ? "current" : normalizedRegStatus === REGISTRATION_STATUS.ACCEPTED || normalizedRegStatus === REGISTRATION_STATUS.REJECTED ? "completed" : "upcoming", href: "#" },
    { title: "Hasil Seleksi", description: "Pengumuman Kelulusan", status: normalizedRegStatus === REGISTRATION_STATUS.ACCEPTED || normalizedRegStatus === REGISTRATION_STATUS.REJECTED ? "current" : "upcoming", href: "/user/result" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pembayaran", "description": "Pembayaran Pendaftaran Santri Baru" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Payment", null, { "client:only": "react", "userId": userId, "registrationId": registration?.id, "user": userProps, "initialPayment": payment, "settings": settings, "steps": steps, "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/user/payment", "client:component-export": "default" })} ` })}`;
}, "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/user/payment/index.astro", void 0);

const $$file = "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/user/payment/index.astro";
const $$url = "/user/payment";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
