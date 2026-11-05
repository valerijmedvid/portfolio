/**
 * Prints the CV to dist/cv-cs.pdf and dist/cv-en.pdf after `vite build`.
 *
 * Serves the fresh build with `vite preview` and lets headless Chrome print each
 * language (`?lang=cs|en`) — the same print stylesheet a visitor gets with Cmd+P,
 * but without browser headers/footers and identical in every browser.
 * Chrome is found via CHROME_PATH or the usual macOS / Linux install paths.
 */
import { spawn } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { clearTimeout, setTimeout } from 'node:timers'
import { preview } from 'vite'

const LOCALES = ['cs', 'en'] as const
const OUT_DIR = resolve(import.meta.dirname, '../dist')

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
]

const findChrome = (): string => {
  const found = CHROME_CANDIDATES.find((path) => path && existsSync(path))
  if (!found) throw new Error('Chrome not found — set CHROME_PATH to a Chrome/Chromium binary')
  return found
}

// Async on purpose: the preview server lives in this process, so a blocking
// spawnSync would stop it from answering Chrome and both would wait forever.
const printPdf = (chrome: string, url: string, out: string): Promise<void> =>
  new Promise((resolvePromise, reject) => {
    rmSync(out, { force: true })
    const child = spawn(chrome, [
      '--headless=new',
      '--disable-gpu',
      // Ubuntu 24 runners block Chrome's user-namespace sandbox; we only load our own local build
      '--no-sandbox',
      '--no-pdf-header-footer',
      // Gives fonts and the Vue app time to render before printing
      '--virtual-time-budget=5000',
      `--print-to-pdf=${out}`,
      url,
    ])
    let stderr = ''
    child.stderr.on('data', (chunk: Buffer) => (stderr += chunk.toString()))
    const timer = setTimeout(() => child.kill('SIGKILL'), 60_000)
    child.on('error', reject)
    child.on('close', (code) => {
      clearTimeout(timer)
      if (code === 0 && existsSync(out)) resolvePromise()
      else reject(new Error(`Chrome failed to print ${url} (exit ${code}):\n${stderr}`))
    })
  })

const main = async (): Promise<void> => {
  const chrome = findChrome()
  const server = await preview({ logLevel: 'warn', preview: { port: 4173 } })
  const baseUrl = server.resolvedUrls?.local[0]
  if (!baseUrl) throw new Error('vite preview did not report a local URL')

  try {
    for (const locale of LOCALES) {
      const out = resolve(OUT_DIR, `cv-${locale}.pdf`)
      await printPdf(chrome, `${baseUrl}?lang=${locale}`, out)
      process.stdout.write(`✓ CV PDF (${locale}) → ${out}\n`)
    }
  } finally {
    await server.close()
  }
}

main().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
