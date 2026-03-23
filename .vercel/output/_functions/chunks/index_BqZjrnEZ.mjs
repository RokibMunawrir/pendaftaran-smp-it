import { c as createComponent } from './astro-component_BNzcyMhR.mjs';
import 'piccolore';
import { L as renderTemplate } from './sequence_q2GBgLGh.mjs';
import { r as renderComponent } from './entrypoint_CFef_-o-.mjs';
import { $ as $$Layout } from './Layout_D1AtF-Rk.mjs';
import { a as getRegistrations } from './registrations_D6_46JUM.mjs';
import { a as auth } from './auth_BrZ9-7fq.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const session = await auth.api.getSession({
    headers: Astro2.request.headers
  });
  if (!session) {
    return Astro2.redirect("/login");
  }
  const registrations = await getRegistrations();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "List Pendaftar", "description": "List Pendaftar" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ListContent", null, { "client:only": "react", "data": registrations, "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/ui/admin/list", "client:component-export": "default" })} ` })}`;
}, "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/admin/list/index.astro", void 0);

const $$file = "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/admin/list/index.astro";
const $$url = "/admin/list";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
