import {
  defineConfig
} from 'rollup'
import {
  fileURLToPath
} from 'url'
import {
  join, dirname
} from 'path'

import Run from '@rollup/plugin-run'
import Alias from '@rollup/plugin-alias'
import Resolve from '@rollup/plugin-node-resolve'
import Commonjs from '@rollup/plugin-commonjs'
import Env from 'rollup-plugin-dotenv'
import Externals from 'rollup-plugin-node-externals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const aliasOptions = {
  entries: [
    {
      find: '@', replacement: join(__dirname, 'src')
    }
  ]
}

const onWarn = (warning, next) => {
  if (warning.code === 'CIRCULAR_DEPENDENCY') return
  next(warning)
}

const ROLLUP_WATCH = process.env?.ROLLUP_WATCH === 'true'

export default defineConfig({
  input: './src/index.js',
  output: {
    file: 'output/index.js',
    format: 'es',
    sourcemap: true,
    compact: true
  },
  plugins: [
    Env(),
    Alias(aliasOptions),
    Commonjs(),
    Resolve(),
    Externals(),
    ROLLUP_WATCH && Run({
      execArgv: ['-r', 'source-map-support/register']
    })
  ],

  onwarn: onWarn
})