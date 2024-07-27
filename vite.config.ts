import { defineConfig } from "vite";
import devServer, { defaultOptions } from "@hono/vite-dev-server";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  // root: "public",

  plugins: [
    devServer({
      entry: "src/server.tsx", // The file path of your application.
      exclude: [
        /.*\.css$/,
        /.*\.ts$/,
        /.*\.tsx$/,
        /.*\.ts$/,
        /.*\.tsx$/,
        /.*\.png$/,
        /^\/@.+$/,
        /\?t\=\d+$/,
        /^\/favicon\.ico$/,
        /^\/static\/.+/,
        /^\/node_modules\/.*/,
      ],
    }),
  ],
});
