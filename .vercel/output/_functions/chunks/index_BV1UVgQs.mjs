import { a as auth } from './auth_BrZ9-7fq.mjs';
import { d as db } from './index_0YfntIbu.mjs';
import { user } from './auth-schema_DxQznFiq.mjs';
import { g as getUser, d as deleteUser, a as getUsers, u as updateUser } from './user_Bn5kOyuo.mjs';
import { count, eq } from 'drizzle-orm';

const prerender = false;
const GET = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session || session.user.role !== "admin") {
    if (session?.user.role?.toLowerCase() !== "admin") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
  }
  const url = new URL(request.url);
  const search = url.searchParams.get("search") || "";
  try {
    const allUsers = await getUsers(search);
    return new Response(JSON.stringify(allUsers), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
const POST = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session || session.user.role?.toLowerCase() !== "admin") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const body = await request.json();
  const { name, email, password, role, status } = body;
  if (!name || !email || !password) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }
  try {
    const newUser = await auth.api.createUser({
      body: {
        email,
        password,
        name,
        role: role?.toLowerCase() || "operator"
      },
      headers: request.headers
      // Pass headers for admin context
    });
    if (status && status !== "ACTIVE") {
      await db.update(user).set({ status }).where(eq(user.email, email));
    }
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
const PATCH = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session || session.user.role?.toLowerCase() !== "admin") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const body = await request.json();
  const { id, name, email, password, role, status } = body;
  if (!id) {
    return new Response(JSON.stringify({ error: "Missing user ID" }), { status: 400 });
  }
  try {
    const targetUser = await getUser(id);
    if (targetUser.length === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    if (role && role.toLowerCase() !== "admin" && targetUser[0].role === "admin") {
      const adminCountResult = await db.select({ value: count() }).from(user).where(eq(user.role, "admin"));
      if (adminCountResult[0].value <= 1) {
        return new Response(JSON.stringify({ error: "Tidak dapat mengubah role admin terakhir. Harus ada minimal 1 admin." }), { status: 400 });
      }
    }
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role.toLowerCase();
    if (status) updateData.status = status;
    if (password) {
      await auth.api.setUserPassword({
        body: {
          userId: id,
          newPassword: password
        },
        headers: request.headers
      });
    }
    await updateUser(id, updateData);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
const DELETE = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session || session.user.role?.toLowerCase() !== "admin") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return new Response(JSON.stringify({ error: "Missing user ID" }), { status: 400 });
  }
  try {
    const targetUser = await getUser(id);
    if (targetUser.length === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    if (targetUser[0].role === "admin") {
      if (id === session.user.id) {
        const adminCountResult = await db.select({ value: count() }).from(user).where(eq(user.role, "admin"));
        if (adminCountResult[0].value <= 1) {
          return new Response(JSON.stringify({ error: "Anda adalah admin terakhir. Anda tidak dapat menghapus diri sendiri." }), { status: 400 });
        }
      } else {
        const adminCountResult = await db.select({ value: count() }).from(user).where(eq(user.role, "admin"));
        if (adminCountResult[0].value <= 1) {
          return new Response(JSON.stringify({ error: "Tidak dapat menghapus admin terakhir." }), { status: 400 });
        }
      }
    }
    await deleteUser(id);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    DELETE,
    GET,
    PATCH,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
