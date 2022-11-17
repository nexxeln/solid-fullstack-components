import solid from "solid-start/vite";
import dotenv from "dotenv";
import unocss from "unocss/vite";
import { defineConfig } from "vite";
// @ts-expect-error no typing
import vercel from "solid-start-vercel";

export default defineConfig(() => {
  dotenv.config();
  return {
    plugins: [solid({ ssr: true, adapter: vercel({ edge: false }) }), unocss()],
  };
});
