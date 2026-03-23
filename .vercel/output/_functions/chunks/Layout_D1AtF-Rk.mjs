import { c as createComponent } from './astro-component_BNzcyMhR.mjs';
import 'piccolore';
import { L as renderTemplate, b5 as renderSlot, b6 as renderHead, a2 as addAttribute } from './sequence_q2GBgLGh.mjs';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const title = Astro2.props.title || "Pendaftaran Santri Online";
  const description = Astro2.props.description || "Pendaftaran Santri Online";
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><script>\n      const setTheme = () => {\n        const theme = localStorage.getItem("theme") || "cupcake";\n        document.documentElement.setAttribute("data-theme", theme);\n      };\n      setTheme();\n      document.addEventListener("astro:after-swap", setTheme);\n    <\/script><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><link rel="stylesheet" href="/src/assets/global.css"><meta name="description"', '><meta name="generator"', "><title>", "</title>", "</head> <body> ", " </body></html>"])), addAttribute(description, "content"), addAttribute(Astro2.generator, "content"), title, renderHead(), renderSlot($$result, $$slots["default"]));
}, "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
