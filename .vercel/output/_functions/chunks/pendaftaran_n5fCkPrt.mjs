import { c as createComponent } from './astro-component_BNzcyMhR.mjs';
import 'piccolore';
import { L as renderTemplate } from './sequence_q2GBgLGh.mjs';
import { r as renderComponent } from './entrypoint_CFef_-o-.mjs';
import { $ as $$Layout } from './Layout_D1AtF-Rk.mjs';
import { a as auth } from './auth_BrZ9-7fq.mjs';

const prerender = false;
const $$Pendaftaran = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Pendaftaran;
  const session = await auth.api.getSession({
    headers: Astro2.request.headers
  });
  if (!session) {
    return Astro2.redirect("/login");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Setting Pendaftaran", "description": "Setting Pendaftaran" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "SettingPendaftaranContent", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/ui/admin/setting-pendaftaran", "client:component-export": "default" })} ` })}`;
}, "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/admin/setting/pendaftaran.astro", void 0);

const $$file = "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/admin/setting/pendaftaran.astro";
const $$url = "/admin/setting/pendaftaran";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pendaftaran,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
