import { c as createComponent } from './astro-component_BNzcyMhR.mjs';
import 'piccolore';
import { L as renderTemplate } from './sequence_q2GBgLGh.mjs';
import { r as renderComponent } from './entrypoint_CFef_-o-.mjs';
import { $ as $$Layout } from './Layout_D1AtF-Rk.mjs';
import { d as db } from './index_0YfntIbu.mjs';
import { s as settings } from './settings_YrV0kQ3T.mjs';
import { a as announcements } from './announcement_BC0Oyqeh.mjs';
import { eq, desc } from 'drizzle-orm';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let webData = null;
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
      webData = {
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
        footer: s.footer || "",
        announcements: []
      };
      const news = await db.select().from(announcements).where(eq(announcements.isPublished, true)).orderBy(desc(announcements.createdAt));
      webData.announcements = news.map((a) => ({
        id: a.id,
        title: a.title,
        content: a.content,
        date: new Date(a.createdAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }),
        isImportant: a.isImportant
      }));
    }
  } catch (error) {
    console.error("Error fetching web setting:", error);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home", "description": "Home" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", null, { "client:only": "react", "siteName": webData?.siteName, "logo": webData?.logo, "announcementBanner": webData?.announcementBanner, "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/ui/navbar-page.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "Hero", null, { "client:only": "react", "title": webData?.hero?.title, "subtitle": webData?.hero?.subtitle, "ctaText": webData?.hero?.ctaText, "ctaLink": webData?.hero?.ctaLink, "backgroundImage": webData?.hero?.backgroundImage, "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/page/hero.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "About", null, { "client:only": "react", "title": webData?.about?.title, "description": webData?.about?.description, "image": webData?.about?.image, "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/page/about.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "Superior", null, { "client:only": "react", "features": webData?.features, "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/page/superior.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "Agenda", null, { "client:only": "react", "agenda": webData?.agenda, "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/page/agenda.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "Cost", null, { "client:only": "react", "biaya": webData?.biaya, "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/page/cost.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "Info", null, { "client:only": "react", "announcements": webData?.announcements, "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/page/info.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "FAQ", null, { "client:only": "react", "faq": webData?.faq, "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/page/faq.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "Contact", null, { "client:only": "react", "contact": webData?.contact, "social": webData?.social, "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/page/contact.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "Footer", null, { "client:only": "react", "siteName": webData?.siteName, "logo": webData?.logo, "footerText": webData?.footer, "contact": webData?.contact, "social": webData?.social, "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/page/footer.tsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/index.astro", void 0);

const $$file = "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
