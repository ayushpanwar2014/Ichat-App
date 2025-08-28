import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: "localhost", // or "0.0.0.0" if you want LAN access
    strictPort: true, // always use 5173
    cors: true,       // allow CORS from backend
    proxy: {
      // optional: if you want to use relative `/api` instead of full URL
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
