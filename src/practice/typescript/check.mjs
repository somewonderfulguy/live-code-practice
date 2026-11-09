import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { runRuntimeChecks } from './checks/runtime.cases.mjs'

const folder = dirname(fileURLToPath(import.meta.url))
const exercises = [
  'getProperty', 'pluck', 'updateEntity', 'narrowing', 'literals',
  'mappedTypes', 'conditionalTypes', 'deepReadonly',
]
const [mode = 'reference', exercise] = process.argv.slice(2)

function usage() {
  console.log('TypeScript practice checks (run from the repository root):')
  console.log('  node src/practice/typescript/check.mjs reference [exercise]')
  console.log('  node src/practice/typescript/check.mjs practice <exercise>')
  console.log(`Exercises: ${exercises.join(', ')}`)
}

if (mode === '--help' || mode === '-h') {
  usage()
} else if (!['reference', 'practice'].includes(mode) ||
           (exercise && !exercises.includes(exercise)) ||
           (mode === 'practice' && !exercise) || process.argv.length > 4) {
  usage()
  process.exitCode = 2
} else {
  try {
    const require = createRequire(import.meta.url)
    let ts
    try {
      ts = require('typescript')
    } catch {
      throw new Error('TypeScript is unavailable. Install repository dependencies with pnpm install first.')
    }

    const selected = exercise ? [exercise] : exercises
    const configPath = join(folder, `tsconfig.${mode === 'reference' ? 'resolved' : 'practice'}.json`)
    const config = ts.readConfigFile(configPath, ts.sys.readFile)
    if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'))
    const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, folder, {}, configPath)
    const program = ts.createProgram(
      selected.map((name) => join(folder, 'checks', `${name}.check.ts`)),
      parsed.options,
    )
    const diagnostics = [...parsed.errors, ...ts.getPreEmitDiagnostics(program)]
    if (diagnostics.length) {
      console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: (name) => name,
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getNewLine: () => '\n',
      }))
      console.error(`${mode}: type checks failed; fix the selected exercise and rerun.`)
      process.exitCode = 1
    } else {
      console.log(`${mode}: type checks passed (${selected.join(', ')}).`)
      const temporary = await mkdtemp(join(tmpdir(), 'live-code-typescript-'))
      try {
        let total = 0
        for (const name of selected) {
          const source = join(folder, `${name}${mode === 'reference' ? '.resolved' : ''}.ts`)
          const output = ts.transpileModule(ts.sys.readFile(source), {
            compilerOptions: { target: ts.ScriptTarget.ES2023, module: ts.ModuleKind.ESNext },
          }).outputText
          const target = join(temporary, `${name}.mjs`)
          await writeFile(target, output, 'utf8')
          const implementation = await import(pathToFileURL(target).href)
          total += runRuntimeChecks(name, implementation)
        }
        console.log(`${mode}: ${total} runtime cases passed. Type-only exercises are checked by the compiler.`)
      } finally {
        // Only this process's freshly allocated temporary directory is removed.
        await rm(temporary, { recursive: true, force: true })
      }
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  }
}
