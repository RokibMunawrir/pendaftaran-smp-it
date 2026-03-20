import db from "../index";
import { registrations } from "../schema/registration";
import { user } from "../schema/auth-schema";
import { sql, eq, desc, count } from "drizzle-orm";
import { REGISTRATION_STATUS } from "../../lib/utils/status";

export const getDashboardStats = async () => {
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
    menunggu: menungguRes[0]?.value || 0,
  };
};

export const getMonthlyStats = async () => {
  const currentYear = new Date().getFullYear();
  
  // Using raw SQL to group by month for the current year
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

  const [rows] = await db.execute(statsQuery) as any;

  // Initialize all months with 0
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const monthlyData = months.map((month, index) => ({
    month,
    pendaftar: 0,
    diverifikasi: 0
  }));

  // Fill data from query
  if (Array.isArray(rows)) {
    rows.forEach((row: any) => {
      // monthIndex from MySQL MONTH() is 1-12. Array index is 0-11
      const index = row.monthIndex - 1;
      if (index >= 0 && index < 12) {
        monthlyData[index].pendaftar = Number(row.pendaftar) || 0;
        monthlyData[index].diverifikasi = Number(row.diverifikasi) || 0;
      }
    });
  }

  return monthlyData;
};

export const getRecentRegistrants = async (limitNum = 6) => {
  const recent = await db
    .select({
      name: user.name,
      date: registrations.registeredAt,
      status: registrations.status,
    })
    .from(registrations)
    .innerJoin(user, eq(registrations.userId, user.id))
    .orderBy(desc(registrations.registeredAt))
    .limit(limitNum);
    
  // Map db status to UI status if needed, or UI can handle it.
  // We'll let the UI handle the styling based on the status string.
  return recent.map(r => ({
    name: r.name,
    date: r.date ? new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(r.date) : '-',
    status: mapStatusToId(r.status || 'DRAFT'),
  }));
};

function mapStatusToId(status: string) {
  switch (status) {
    case 'VERIFIED': return 'Diverifikasi';
    case 'REJECTED': return 'Ditolak';
    case 'PENDING': return 'Menunggu';
    case 'DRAFT': return 'Draft';
    default: return status;
  }
}
