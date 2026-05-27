import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const read = (...segments) => fs.readFileSync(path.join(__dirname, '..', ...segments), 'utf8')

const layout = read('app', 'layout.tsx')
const header = read('components', 'Header.tsx')
const footer = read('components', 'Footer.tsx')

assert.ok(
  layout.includes("title: 'Beezi Test Project'"),
  'Expected metadata.title to be Beezi Test Project',
)
assert.ok(
  layout.includes("authors: [{ name: 'Beezi Test Project' }]"),
  'Expected metadata.authors[0].name to be Beezi Test Project',
)
assert.match(
  layout,
  /openGraph:\s*\{[\s\S]*?title:\s*'Beezi Test Project'/,
  'Expected metadata.openGraph.title to be Beezi Test Project',
)
assert.ok(
  header.includes('Beezi Test Project'),
  'Expected the header logo to render Beezi Test Project',
)
assert.ok(
  footer.includes('Beezi Test Project'),
  'Expected the footer brand heading to render Beezi Test Project',
)
assert.ok(
  footer.includes('© {currentYear} Beezi Test Project. All rights reserved.'),
  'Expected the footer copyright line to render Beezi Test Project',
)
assert.ok(!layout.includes('SaulDesign'), 'Expected app/layout.tsx to stop referencing SaulDesign')
assert.ok(
  !header.includes('Beezi Test React'),
  'Expected components/Header.tsx to stop rendering Beezi Test React',
)
assert.ok(
  !footer.includes('SaulDesign'),
  'Expected components/Footer.tsx to stop rendering SaulDesign',
)

console.log('branding-content.test.mjs: metadata and shared-branding assertions passed')
