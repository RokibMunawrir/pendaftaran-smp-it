import { c as createComponent } from './astro-component_BNzcyMhR.mjs';
import 'piccolore';
import { L as renderTemplate } from './sequence_q2GBgLGh.mjs';
import { r as renderComponent } from './entrypoint_CFef_-o-.mjs';
import { $ as $$Layout } from './Layout_D1AtF-Rk.mjs';
import { d as db } from './index_0YfntIbu.mjs';
import { s as settings } from './settings_YrV0kQ3T.mjs';
import { a as auth } from './auth_BrZ9-7fq.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const session = await auth.api.getSession({
    headers: Astro2.request.headers
  });
  if (!session) {
    return Astro2.redirect("/login");
  }
  let initialData = null;
  try {
    const setting = await db.select().from(settings).limit(1);
    if (setting && setting.length > 0) {
      const s = setting[0];
      const parseJson = (val) => {
        if (typeof val === "string") {
          try {
            return JSON.parse(val);
          } catch (e) {
            return null;
          }
        }
        return val;
      };
      initialData = {
        siteName: s.siteName || "",
        logo: s.logo || "",
        announcementBanner: s.announcementBanner || "",
        hero: {
          title: s.heroTitle || "",
          subtitle: s.heroSubtitle || "",
          ctaText: s.heroCtaText || "",
          ctaLink: s.heroCtaLink || "",
          backgroundImage: s.heroImage || ""
        },
        about: {
          title: s.aboutTitle || "",
          description: s.aboutDescription || "",
          image: s.aboutImage || ""
        },
        features: parseJson(s.features) || [],
        agenda: parseJson(s.agenda) || [],
        biaya: parseJson(s.biaya) || [],
        biayaBankName: s.biayaBankName || "",
        biayaAccountNumber: s.biayaAccountNumber || "",
        biayaAccountName: s.biayaAccountName || "",
        biayaInstruction: s.biayaInstruction || "",
        faq: parseJson(s.faq) || [],
        contact: {
          address: s.contactAddress || "",
          phone: s.contactPhone || "",
          email: s.contactEmail || "",
          mapEmbed: s.contactMapEmbed || ""
        },
        social: {
          facebook: s.socialFacebook || "",
          instagram: s.socialInstagram || "",
          youtube: s.socialYoutube || "",
          whatsapp: s.socialWhatsapp || ""
        },
        announcements: parseJson(s.announcements) || [],
        footer: s.footer || ""
      };
    }
  } catch (error) {
    console.error("Error fetching web setting:", error);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Setting Website", "description": "Setting Website" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "SettingWebContent", null, { "client:only": "react", "initialData": initialData, "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/ui/admin/setting-web", "client:component-export": "default" })} ` })}`;
}, "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/admin/setting/index.astro", void 0);

const $$file = "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/admin/setting/index.astro";
const $$url = "/admin/setting";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
