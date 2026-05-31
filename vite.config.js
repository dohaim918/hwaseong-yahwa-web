import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { fileURLToPath } from "url"
import { dirname, resolve } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    // ── 코드 스플릿 — 외부 라이브러리는 별도 청크로
    //    초기 번들 슬림화 + 캐시 적중률↑
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return
          if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom")) {
            return "react"
          }
          if (id.includes("@emotion")) {
            return "emotion"
          }
        },
      },
    },
  },
})
