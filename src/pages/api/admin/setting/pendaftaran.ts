import type { APIRoute } from "astro";
import { 
    getAcademicYears, createAcademicYear, updateAcademicYear, setActiveAcademicYear,
    getRegistrationPaths, createRegistrationPath, updateRegistrationPath, deleteRegistrationPath 
} from "../../../../db/queries/registration-settings";
import { auth } from "../../../../lib/auth";
import { createId } from "@paralleldrive/cuid2";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
    try {
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

        const [years, paths] = await Promise.all([
            getAcademicYears(),
            getRegistrationPaths()
        ]);

        return new Response(JSON.stringify({ years, paths }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

        const b = await request.json();
        const { action, type, data } = b;

        if (type === "year") {
            if (action === "create") {
                await createAcademicYear({
                    id: createId(),
                    year: data.year,
                    isActive: data.isActive || false,
                    startDate: data.startDate ? new Date(data.startDate) : null,
                    endDate: data.endDate ? new Date(data.endDate) : null,
                });
                return new Response(JSON.stringify({ message: "Academic year created" }), { status: 201 });
            }
            if (action === "setActive") {
                await setActiveAcademicYear(data.id);
                return new Response(JSON.stringify({ message: "Active year updated" }), { status: 200 });
            }
            if (action === "update") {
                await updateAcademicYear(data.id, {
                    year: data.year,
                    startDate: data.startDate ? new Date(data.startDate) : null,
                    endDate: data.endDate ? new Date(data.endDate) : null,
                });
                return new Response(JSON.stringify({ message: "Academic year updated" }), { status: 200 });
            }
        }

        if (type === "path") {
            if (action === "create") {
                await createRegistrationPath({
                    id: createId(),
                    name: data.name,
                    description: data.description || "",
                    quota: data.quota || 0,
                    isActive: data.isActive !== undefined ? data.isActive : true,
                });
                return new Response(JSON.stringify({ message: "Registration path created" }), { status: 201 });
            }
            if (action === "update") {
                await updateRegistrationPath(data.id, {
                    name: data.name,
                    description: data.description,
                    quota: data.quota,
                    isActive: data.isActive,
                });
                return new Response(JSON.stringify({ message: "Registration path updated" }), { status: 200 });
            }
            if (action === "delete") {
                await deleteRegistrationPath(data.id);
                return new Response(JSON.stringify({ message: "Registration path deleted" }), { status: 200 });
            }
        }

        return new Response(JSON.stringify({ error: "Invalid action or type" }), { status: 400 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
