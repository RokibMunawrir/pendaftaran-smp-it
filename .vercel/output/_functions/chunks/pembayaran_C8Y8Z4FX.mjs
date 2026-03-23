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
  const dataToSave = {
    biaya: body.biaya,
    biayaBankName: body.biayaBankName,
    biayaAccountNumber: body.biayaAccountNumber,
    biayaAccountName: body.biayaAccountName,
    biayaInstruction: body.biayaInstruction,
    updatedAt: /* @__PURE__ */ new Date()
  };
  try {
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
  } catch (error) {
    console.error("Error saving payment settings:", error);
    return new Response(
      JSON.stringify({ error: "Gagal menyimpan pengaturan pembayaran" }),
      { status: 500 }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
