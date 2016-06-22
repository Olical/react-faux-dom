export function webpack (config) {
  config.output.library = 'react-faux-dom'
  config.output.libraryTarget = 'umd'
  config.externals = [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  ]
}
