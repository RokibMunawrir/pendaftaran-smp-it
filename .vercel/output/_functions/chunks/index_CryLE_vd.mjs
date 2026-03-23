import { g as getProfiles, c as createProfile, u as updateProfile } from './profiles_DJkIwHAp.mjs';

const prerender = false;
const GET = async () => {
  const profiles = await getProfiles();
  return new Response(JSON.stringify(profiles));
};
const POST = async ({ request }) => {
  const body = await request.json();
  const profile = await createProfile(body);
  return new Response(JSON.stringify(profile));
};
const PUT = async ({ request }) => {
  const body = await request.json();
  const profile = await updateProfile(body);
  return new Response(JSON.stringify(profile));
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    POST,
    PUT,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
