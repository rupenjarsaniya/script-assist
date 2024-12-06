import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    server: {
        port: 5175,
        proxy: {
            "/api": "https://swapi.dev",
        },
    },
    plugins: [react()],
    build: {
        outDir: "build",
    },
});
