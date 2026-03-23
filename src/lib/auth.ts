import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import db from "../db";
import { user, account, session, verification } from "../db/schema/auth-schema";
import { eq } from "drizzle-orm";

export const auth = betterAuth({
    baseURL: process.env.BASE_URL,
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