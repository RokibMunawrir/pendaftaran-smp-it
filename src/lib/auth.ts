import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import db from "../db";
import { user, account, session, verification } from "../db/schema/auth-schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    session: {
        expiresIn: 60 * 15,
        updateAge: 60 * 5,
    },
    database: drizzleAdapter(db, {
        provider: "mysql",
        schema: {
            user,
            account,
            session,
            verification,
        },
    }),
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user: resetUser, url }) => {
            await resend.emails.send({
                from: "PPDB Darussalam <noreply@darussalamluwuk.sch.id>",
                to: resetUser.email,
                subject: "Reset Kata Sandi Akun PPDB Anda",
                html: `
                    <!DOCTYPE html>
                    <html lang="id">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Reset Kata Sandi</title>
                    </head>
                    <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 20px;">
                            <tr>
                                <td align="center">
                                    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                                        <!-- Header -->
                                        <tr>
                                            <td style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);padding:40px 40px 30px;text-align:center;">
                                                <div style="display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;background:rgba(255,255,255,0.15);border-radius:14px;margin-bottom:16px;">
                                                    <span style="font-size:28px;">🔐</span>
                                                </div>
                                                <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">Reset Kata Sandi</h1>
                                                <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">Portal PPDB SMP IT Darussalam Luwuk</p>
                                            </td>
                                        </tr>
                                        <!-- Body -->
                                        <tr>
                                            <td style="padding:40px;">
                                                <p style="margin:0 0 8px;color:#374151;font-size:15px;">Halo, <strong>${resetUser.name || resetUser.email}</strong></p>
                                                <p style="margin:0 0 28px;color:#6b7280;font-size:14px;line-height:1.6;">
                                                    Kami menerima permintaan untuk mereset kata sandi akun PPDB Anda. Klik tombol di bawah ini untuk membuat kata sandi baru.
                                                </p>
                                                <div style="text-align:center;margin:0 0 28px;">
                                                    <a href="${url}" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#ffffff;text-decoration:none;border-radius:10px;font-weight:700;font-size:15px;letter-spacing:0.2px;box-shadow:0 4px 12px rgba(79,70,229,0.4);">Buat Kata Sandi Baru</a>
                                                </div>
                                                <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
                                                    <p style="margin:0 0 6px;color:#374151;font-size:13px;font-weight:600;">⏰ Tautan berlaku selama 1 jam</p>
                                                    <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">Jika Anda tidak meminta reset kata sandi, abaikan email ini. Akun Anda tetap aman.</p>
                                                </div>
                                                <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.5;">Jika tombol di atas tidak berfungsi, salin dan tempel tautan berikut ke browser Anda:<br><a href="${url}" style="color:#4f46e5;word-break:break-all;">${url}</a></p>
                                            </td>
                                        </tr>
                                        <!-- Footer -->
                                        <tr>
                                            <td style="padding:24px 40px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
                                                <p style="margin:0;color:#9ca3af;font-size:12px;">© ${new Date().getFullYear()} SMP IT Darussalam Luwuk · Semua hak dilindungi</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                    </html>
                `,
            });
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
    plugins: [
        admin()
    ],
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    return {
                        data: {
                            ...user,
                            role: user.role || "santri",
                        },
                    };
                },
            },
        },
        session: {
            create: {
                after: async (session) => {
                    await db.update(user).set({ lastLoginAt: new Date() }).where(eq(user.id, session.userId));
                }
            }
        }
    },
});