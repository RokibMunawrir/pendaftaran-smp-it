import { c as createComponent } from './astro-component_BNzcyMhR.mjs';
import 'piccolore';
import { L as renderTemplate } from './sequence_q2GBgLGh.mjs';
import { r as renderComponent } from './entrypoint_CFef_-o-.mjs';
import { $ as $$Layout } from './Layout_D1AtF-Rk.mjs';

const $$ForgotPassword = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Lupa Kata Sandi", "description": "Pulihkan akun pendaftaran Pondok Pesantren Anda" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ForgotPasswordContent", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/ui/forgot-password.tsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/forgot-password.astro", void 0);

const $$file = "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/forgot-password.astro";
const $$url = "/forgot-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ForgotPassword,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
