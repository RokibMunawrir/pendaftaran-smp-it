import { createAuthClient } from "better-auth/client";
import { admin } from "better-auth/plugins";

export const auth = createAuthClient({
  plugins: [
    admin()
  ]
});