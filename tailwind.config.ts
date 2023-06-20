/* eslint-disable prettier/prettier */
import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import shadcnPlugin from "./lib/shadcn-plugin.ts";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  plugins: [animatePlugin,shadcnPlugin],
} satisfies Config;

export default config;
