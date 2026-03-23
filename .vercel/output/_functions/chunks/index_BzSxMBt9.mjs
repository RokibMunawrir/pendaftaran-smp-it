import { c as createComponent } from './astro-component_BNzcyMhR.mjs';
import 'piccolore';
import { L as renderTemplate } from './sequence_q2GBgLGh.mjs';
import { r as renderComponent } from './entrypoint_CFef_-o-.mjs';
import { $ as $$Layout } from './Layout_D1AtF-Rk.mjs';
import { e as ensureRegistration } from './registrations_D6_46JUM.mjs';
import { a as getPublishedAnnouncements } from './announcement_P7PWMKGR.mjs';
import { g as getUser } from './user_Bn5kOyuo.mjs';
import { a as auth } from './auth_BrZ9-7fq.mjs';
import { REGISTRATION_STATUS } from './status_Dwl0Qi7R.mjs';

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
  const userId = session.user.id;
  const userData = await getUser(userId);
  const user = userData[0];
  const registration = await ensureRegistration(userId);
  const announcementsData = await getPublishedAnnouncements();
  const dashboardUser = {
    name: user?.name || "User",
    registrationNumber: registration?.registrationNumber || null,
    status: registration?.status || REGISTRATION_STATUS.REGISTERED,
    pathway: registration?.program || "Reguler",
    program: registration?.program || "Tahfidz Al-Quran",
    registrationDate: registration?.registrationDate ? new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(new Date(registration.registrationDate)) : null
  };
  const announcements = announcementsData.map((a) => ({
    id: a.id,
    title: a.title,
    content: a.content,
    createdAt: a.createdAt
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard", "description": "Dashboard" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "UserDashboard", null, { "client:only": "react", "user": dashboardUser, "announcements": announcements, "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/user/dashboard", "client:component-export": "default" })} ` })}`;
}, "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/user/dashboard/index.astro", void 0);

const $$file = "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/user/dashboard/index.astro";
const $$url = "/user/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
