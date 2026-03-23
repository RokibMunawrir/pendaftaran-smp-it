import { c as createComponent } from './astro-component_BNzcyMhR.mjs';
import 'piccolore';
import { b6 as renderHead, a2 as addAttribute, L as renderTemplate } from './sequence_q2GBgLGh.mjs';
import 'clsx';
import { g as getRegistrationByUserId } from './registrations_D6_46JUM.mjs';
import { g as getSettings } from './settings_B91pbR9f.mjs';
import { g as getUser } from './user_Bn5kOyuo.mjs';
import { a as auth } from './auth_BrZ9-7fq.mjs';

const $$Schedule = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Schedule;
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
  const allSettings = await getSettings();
  const settings = allSettings[0];
  let adminName = "Panitia Penerimaan Santri Baru";
  if (registration?.verifiedBy) {
    const adminData = await getUser(registration.verifiedBy);
    if (adminData && adminData.length > 0 && adminData[0].name) {
      adminName = adminData[0].name;
    }
  }
  const agenda = Array.isArray(settings?.agenda) ? settings.agenda : [];
  const testAgenda = agenda.find(
    (a) => a.title.toLowerCase().includes("tes") || a.title.toLowerCase().includes("wawancara") || a.title.toLowerCase().includes("seleksi")
  );
  const today = (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  return renderTemplate`<html lang="id" data-astro-cid-ef3drnym> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Jadwal Tes - ${userObj?.name}</title>${renderHead()}</head> <body data-astro-cid-ef3drnym> <div class="no-print" style="text-align: right;" data-astro-cid-ef3drnym> <button class="btn-print" onclick="window.print()" data-astro-cid-ef3drnym>Cetak Halaman (PDF)</button> </div> <div class="header" data-astro-cid-ef3drnym> <img src="/logo.svg" alt="Logo" class="logo" data-astro-cid-ef3drnym> <div class="header-text" data-astro-cid-ef3drnym> <h1 data-astro-cid-ef3drnym>SMP IT Darussalam Luwuk</h1> <p data-astro-cid-ef3drnym>
Jl. KH. Hasyim Asyari No. 123, Desa Sejahtera, Kec. Mandiri, Kab. Berkah
</p> <p data-astro-cid-ef3drnym>Email: info@alhikmah.pondok | Telp: (021) 12345678</p> </div> </div> <div class="content" data-astro-cid-ef3drnym> <h2 data-astro-cid-ef3drnym>KARTU JADWAL TES & WAWANCARA</h2> <table class="info-table" data-astro-cid-ef3drnym> <tr data-astro-cid-ef3drnym> <td data-astro-cid-ef3drnym>Nomor Pendaftaran</td> <td data-astro-cid-ef3drnym>: ${registration?.registrationNumber || "-"}</td> </tr> <tr data-astro-cid-ef3drnym> <td data-astro-cid-ef3drnym>Nama Calon Santri</td> <td data-astro-cid-ef3drnym>: ${userObj?.name}</td> </tr> <tr data-astro-cid-ef3drnym> <td data-astro-cid-ef3drnym>Program / Jalur</td> <td data-astro-cid-ef3drnym>: ${registration?.program || "-"}</td> </tr> </table> <div class="schedule-box" data-astro-cid-ef3drnym> <h3 data-astro-cid-ef3drnym>Detail Pelaksanaan Seleksi</h3> <table class="info-table" style="margin-bottom: 0;" data-astro-cid-ef3drnym> <tr data-astro-cid-ef3drnym> <td data-astro-cid-ef3drnym>Materi / Agenda</td> <td data-astro-cid-ef3drnym>: ${testAgenda ? testAgenda.title : "Tes & Wawancara Offline"}</td> </tr> <tr data-astro-cid-ef3drnym> <td data-astro-cid-ef3drnym>Hari / Tanggal</td> <td data-astro-cid-ef3drnym>: ${testAgenda ? testAgenda.date : "Akan segera diinformasikan"}</td> </tr> <tr data-astro-cid-ef3drnym> <td data-astro-cid-ef3drnym>Waktu</td> <td data-astro-cid-ef3drnym>: 08:00 WIB - Selesai</td> </tr> <tr data-astro-cid-ef3drnym> <td data-astro-cid-ef3drnym>Tempat</td> <td data-astro-cid-ef3drnym>: Aula Utama SMP IT Darussalam Luwuk</td> </tr> </table> </div> <div style="font-size: 14px;" data-astro-cid-ef3drnym> <strong data-astro-cid-ef3drnym>Catatan Penting:</strong> <ol data-astro-cid-ef3drnym> <li data-astro-cid-ef3drnym>Peserta wajib hadir 30 menit sebelum acara dimulai.</li> <li data-astro-cid-ef3drnym>Membawa kartu pendaftaran ini.</li> <li data-astro-cid-ef3drnym>Membawa alat tulis (Pensil 2B, Penghapus, Papan Dada).</li> <li data-astro-cid-ef3drnym>Berpakaian sopan dan rapi (Putih Abu-abu / Seragam asal).</li> </ol> </div> </div> <div class="footer" data-astro-cid-ef3drnym> <p style="margin: 0; line-height: 1.2;" data-astro-cid-ef3drnym>Luwuk, ${today}</p> <p style="margin: 0; line-height: 1.2;" data-astro-cid-ef3drnym>Panitia,</p> <div class="signature" data-astro-cid-ef3drnym> ${registration?.verifiedBy ? renderTemplate`<img${addAttribute(`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=Verified%20by%20${encodeURIComponent(adminName)}`, "src")} alt="QR Signature" style="margin: 10px 0; width: 80px; height: 80px;" data-astro-cid-ef3drnym>` : renderTemplate`<div style="height: 60px;" data-astro-cid-ef3drnym></div>`} <div data-astro-cid-ef3drnym>${adminName}</div> </div> </div> <div style="clear: both;" data-astro-cid-ef3drnym></div> </body></html>`;
}, "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/user/print/schedule.astro", void 0);

const $$file = "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/user/print/schedule.astro";
const $$url = "/user/print/schedule";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Schedule,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
