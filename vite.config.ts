import { copyFileSync, writeFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const pages = process.env.GITHUB_PAGES === 'true'
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = pages && repo ? `/${repo}/` : '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'github-pages-spa',
      apply: 'build',
      closeBundle() {
        if (!pages) return
        copyFileSync('dist/index.html', 'dist/404.html')
        writeFileSync('dist/.nojekyll', '')
      },
    },
  ],
  server: {
    watch: {
      ignored: ['**/.cursor-rules-import/**'],
    },
  },
})
