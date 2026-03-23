import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';
import { d as db } from './index_0YfntIbu.mjs';
import { user, verification, session, account } from './auth-schema_DxQznFiq.mjs';
import { eq } from 'drizzle-orm';

const auth = betterAuth({
  baseURL: process.env.BASE_URL,
  session: {
    expiresIn: 60 * 15,
    updateAge: 60 * 5
  },
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema: {
      user,
      account,
      session,
      verification
    }
  }),
  emailAndPassword: {
    enabled: true
  },
  plugins: [
    admin()
  ],
  databaseHooks: {
    user: {
      create: {
        before: async (user2) => {
          return {
            data: {
              ...user2,
              role: user2.role || "santri"
            }
          };
        }
      }
    },
    session: {
      create: {
        after: async (session2) => {
          await db.update(user).set({ lastLoginAt: /* @__PURE__ */ new Date() }).where(eq(user.id, session2.userId));
        }
      }
    }
  }
});

export { auth as a };
