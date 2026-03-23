import { c as createComponent } from './astro-component_BNzcyMhR.mjs';
import 'piccolore';
import { L as renderTemplate } from './sequence_q2GBgLGh.mjs';
import { r as renderComponent } from './entrypoint_CFef_-o-.mjs';
import { $ as $$Layout } from './Layout_D1AtF-Rk.mjs';
import { d as db } from './index_0YfntIbu.mjs';
import { registrations } from './registration_75Bi9R3x.mjs';
import { user } from './auth-schema_DxQznFiq.mjs';
import { count, eq, sql, desc } from 'drizzle-orm';
import { REGISTRATION_STATUS } from './status_Dwl0Qi7R.mjs';
import { a as auth } from './auth_BrZ9-7fq.mjs';

const getDashboardStats = async () => {
  const totalPendaftarRes = await db.select({ value: count() }).from(registrations);
  const diverifikasiRes = await db.select({ value: count() }).from(registrations).where(eq(registrations.status, REGISTRATION_STATUS.ACCEPTED));
  const draftRes = await db.select({ value: count() }).from(registrations).where(eq(registrations.status, REGISTRATION_STATUS.DRAFT));
  const ditolakRes = await db.select({ value: count() }).from(registrations).where(eq(registrations.status, REGISTRATION_STATUS.REJECTED));
  const menungguRes = await db.select({ value: count() }).from(registrations).where(eq(registrations.status, REGISTRATION_STATUS.VERIFYING));
  return {
    totalPendaftar: totalPendaftarRes[0]?.value || 0,
    diverifikasi: diverifikasiRes[0]?.value || 0,
    draft: draftRes[0]?.value || 0,
    ditolak: ditolakRes[0]?.value || 0,
    menunggu: menungguRes[0]?.value || 0
  };
};
const getMonthlyStats = async () => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const statsQuery = sql`
    SELECT 
      MONTH(registered_at) as monthIndex,
      CAST(COUNT(*) AS UNSIGNED) as pendaftar,
      CAST(SUM(CASE WHEN status = 'VERIFIED' THEN 1 ELSE 0 END) AS UNSIGNED) as diverifikasi
    FROM registrations
    WHERE YEAR(registered_at) = ${currentYear}
    GROUP BY MONTH(registered_at)
    ORDER BY monthIndex ASC
  `;
  const [rows] = await db.execute(statsQuery);
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const monthlyData = months.map((month, index) => ({
    month,
    pendaftar: 0,
    diverifikasi: 0
  }));
  if (Array.isArray(rows)) {
    rows.forEach((row) => {
      const index = row.monthIndex - 1;
      if (index >= 0 && index < 12) {
        monthlyData[index].pendaftar = Number(row.pendaftar) || 0;
        monthlyData[index].diverifikasi = Number(row.diverifikasi) || 0;
      }
    });
  }
  return monthlyData;
};
const getRecentRegistrants = async (limitNum = 6) => {
  const recent = await db.select({
    name: user.name,
    date: registrations.registeredAt,
    status: registrations.status
  }).from(registrations).innerJoin(user, eq(registrations.userId, user.id)).orderBy(desc(registrations.registeredAt)).limit(limitNum);
  return recent.map((r) => ({
    name: r.name,
    date: r.date ? new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(r.date) : "-",
    status: mapStatusToId(r.status || "DRAFT")
  }));
};
function mapStatusToId(status) {
  switch (status) {
    case "VERIFIED":
      return "Diverifikasi";
    case "REJECTED":
      return "Ditolak";
    case "PENDING":
      return "Menunggu";
    case "DRAFT":
      return "Draft";
    default:
      return status;
  }
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const session = await auth.api.getSession({
    headers: Astro2.request.headers
  });
  if (!session) {
    return Astro2.redirect("/login");
  }
  const stats = await getDashboardStats();
  const monthly = await getMonthlyStats();
  const recent = await getRecentRegistrants();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard", "description": "Dashboard" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "DashboardContent", null, { "client:only": "react", "stats": stats, "monthly": monthly, "recent": recent, "client:component-hydration": "only", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/ui/admin/dashboard", "client:component-export": "default" })} ` })}`;
}, "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/admin/dashboard/index.astro", void 0);

const $$file = "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/admin/dashboard/index.astro";
const $$url = "/admin/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
