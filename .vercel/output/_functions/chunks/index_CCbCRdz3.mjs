import { c as createComponent } from './astro-component_BNzcyMhR.mjs';
import 'piccolore';
import { L as renderTemplate } from './sequence_q2GBgLGh.mjs';
import { r as renderComponent } from './entrypoint_CFef_-o-.mjs';
import { $ as $$Layout } from './Layout_D1AtF-Rk.mjs';
import { a as getPublishedAnnouncements } from './announcement_P7PWMKGR.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const announcements = await getPublishedAnnouncements();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pengumuman", "description": "Pengumuman" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "NavbarPage", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/ui/navbar-page", "client:component-export": "default" })} ${renderComponent($$result2, "AnnouncementList", null, { "client:only": "react", "announcements": announcements, "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/page/announcement", "client:component-export": "default" })} ${renderComponent($$result2, "Footer", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/page/footer", "client:component-export": "default" })} ` })}`;
}, "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/pengumuman/index.astro", void 0);

const $$file = "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/pengumuman/index.astro";
const $$url = "/pengumuman";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
