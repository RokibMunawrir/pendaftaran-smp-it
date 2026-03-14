import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
    dialect: "mysql",
    schema: "./src/db/schema",
    out: "./src/db/migrations",
    dbCredentials: {
        url: process.env.DATABASE_URL as string,
    },
    verbose: true,
    strict: true,
});