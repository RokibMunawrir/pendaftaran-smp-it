import { c as createComponent } from './astro-component_BNzcyMhR.mjs';
import 'piccolore';
import { b6 as renderHead, a2 as addAttribute, L as renderTemplate } from './sequence_q2GBgLGh.mjs';
import 'clsx';
import { g as getRegistrationByUserId } from './registrations_D6_46JUM.mjs';
import { g as getUser } from './user_Bn5kOyuo.mjs';
import { a as auth } from './auth_BrZ9-7fq.mjs';

const $$Acceptance = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Acceptance;
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
  let adminName = "Panitia PSB";
  if (registration?.verifiedBy) {
    const adminData = await getUser(registration.verifiedBy);
    if (adminData && adminData.length > 0 && adminData[0].name) {
      adminName = adminData[0].name;
    }
  }
  if (registration?.status?.toUpperCase() !== "ACCEPTED") {
    return Astro2.redirect("/user/result");
  }
  const today = (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  return renderTemplate`<html lang="id" data-astro-cid-xnozr327> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Bukti Diterima - ${userObj?.name}</title>${renderHead()}</head> <body data-astro-cid-xnozr327> <div class="no-print" style="text-align: right;" data-astro-cid-xnozr327> <button class="btn-print" onclick="window.print()" data-astro-cid-xnozr327>Cetak Bukti Penerimaan (PDF)</button> </div> <div class="header" data-astro-cid-xnozr327> <div class="header-text" data-astro-cid-xnozr327> <h1 data-astro-cid-xnozr327>SMP IT Darussalam Luwuk</h1> <p data-astro-cid-xnozr327>
Jl. KH. Hasyim Asyari No. 123, Desa Sejahtera, Kec. Mandiri, Kab.
          Berkah
</p> <p data-astro-cid-xnozr327>Email: info@alhikmah.pondok | Telp: (021) 12345678</p> </div> <img src="/logo.svg" alt="Logo" class="logo" data-astro-cid-xnozr327> </div> <div class="content" data-astro-cid-xnozr327> <h2 data-astro-cid-xnozr327>SURAT KETERANGAN LULUS SELEKSI</h2> <p data-astro-cid-xnozr327>
Berdasarkan hasil seleksi tes tulis dan wawancara yang telah
        dilaksanakan, Panitia Penerimaan Santri Baru SMP IT Darussalam Luwuk
        tahun ajaran 2026/2027 dengan ini menyatakan bahwa:
</p> <table class="info-table" data-astro-cid-xnozr327> <tr data-astro-cid-xnozr327> <td data-astro-cid-xnozr327>Nomor Pendaftaran</td> <td data-astro-cid-xnozr327>: ${registration?.registrationNumber || "-"}</td> </tr> <tr data-astro-cid-xnozr327> <td data-astro-cid-xnozr327>Nama Lengkap</td> <td data-astro-cid-xnozr327>: ${userObj?.name}</td> </tr> <tr data-astro-cid-xnozr327> <td data-astro-cid-xnozr327>Asal Sekolah</td> <td data-astro-cid-xnozr327>: ${registration?.previousSchool || "-"}</td> </tr> <tr data-astro-cid-xnozr327> <td data-astro-cid-xnozr327>Program / Jalur</td> <td data-astro-cid-xnozr327>: ${registration?.program || "-"}</td> </tr> </table> <div class="acceptance-box" data-astro-cid-xnozr327>DITERIMA / LULUS SELEKSI</div> <p data-astro-cid-xnozr327>
Dinyatakan DITERIMA sebagai santri baru di SMP IT Darussalam Luwuk. Kepada calon santri yang dinyatakan lulus agar segera
        melakukan daftar ulang sesuai dengan jadwal dan ketentuan yang telah
        ditetapkan.
</p> <p data-astro-cid-xnozr327>
Demikian surat keterangan ini dibuat untuk dapat dipergunakan
        sebagaimana mestinya. Atas perhatian bapak/ibu kami ucapkan terima
        kasih.
</p> </div> <div class="footer" data-astro-cid-xnozr327> <p style="margin: 0; line-height: 1.2;" data-astro-cid-xnozr327>Luwuk, ${today}</p> <p style="margin: 0; line-height: 1.2;" data-astro-cid-xnozr327>Panitia,</p> <div class="signature" data-astro-cid-xnozr327> ${registration?.verifiedBy ? renderTemplate`<img${addAttribute(`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=Verified%20by%20${encodeURIComponent(adminName)}`, "src")} alt="QR Signature" style="margin: 10px 0; width: 80px; height: 80px;" data-astro-cid-xnozr327>` : renderTemplate`<div style="height: 60px;" data-astro-cid-xnozr327></div>`} <div data-astro-cid-xnozr327>${adminName}</div> </div> </div> <div style="clear: both;" data-astro-cid-xnozr327></div> </body></html>`;
}, "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/user/print/acceptance.astro", void 0);

const $$file = "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/user/print/acceptance.astro";
const $$url = "/user/print/acceptance";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Acceptance,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
