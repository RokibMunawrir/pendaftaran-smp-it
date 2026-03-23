import { g as getSettings, u as updateSettings, c as createSetting } from './settings_B91pbR9f.mjs';

const prerender = false;
const POST = async ({ request }) => {
  let body = {};
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400 }
    );
  }
  const b = body;
  const dataToSave = {
    siteName: b.siteName,
    logo: b.logo,
    announcementBanner: b.announcementBanner,
    heroTitle: b.hero?.title,
    heroSubtitle: b.hero?.subtitle,
    heroImage: b.hero?.backgroundImage,
    heroCtaText: b.hero?.ctaText,
    heroCtaLink: b.hero?.ctaLink,
    aboutTitle: b.about?.title,
    aboutDescription: b.about?.description,
    aboutImage: b.about?.image,
    features: b.features,
    agenda: b.agenda,
    biaya: b.biaya,
    biayaBankName: b.biayaBankName,
    biayaAccountNumber: b.biayaAccountNumber,
    biayaAccountName: b.biayaAccountName,
    biayaInstruction: b.biayaInstruction,
    faq: b.faq,
    announcements: b.announcements,
    contactAddress: b.contact?.address,
    contactPhone: b.contact?.phone,
    contactEmail: b.contact?.email,
    contactMapEmbed: b.contact?.mapEmbed,
    socialFacebook: b.social?.facebook,
    socialInstagram: b.social?.instagram,
    socialWhatsapp: b.social?.whatsapp,
    socialYoutube: b.social?.youtube,
    footer: b.footer,
    tesSchedule: b.tesSchedule,
    updatedAt: /* @__PURE__ */ new Date()
  };
  const existingSettings = await getSettings();
  if (existingSettings && existingSettings.length > 0) {
    await updateSettings(existingSettings[0].id, dataToSave);
  } else {
    await createSetting({
      id: "default",
      ...dataToSave,
      createdAt: /* @__PURE__ */ new Date()
    });
  }
  return new Response(JSON.stringify({ ok: true }));
};
const GET = async () => {
  const settings = await getSettings();
  return new Response(JSON.stringify(settings));
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
