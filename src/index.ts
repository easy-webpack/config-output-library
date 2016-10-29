import { WebpackConfigWithMetadata } from '@easy-webpack/core'

type TSTarget = 'var' | 'this' | 'commonjs' | 'commonjs2' | 'amd' | 'umd';

/**
 * Library support for Webpack
 * See: https://webpack.github.io/docs/configuration.html#output-library
 */
export = function outputLibrary({ library = undefined, libraryTarget = 'var', umdNamedDefine = false }) {

  let cfg: WebpackConfigWithMetadata = { output: {} }

  return function outputLibrary(this: WebpackConfigWithMetadata): WebpackConfigWithMetadata {

    cfg.output.libraryTarget = libraryTarget as TSTarget
    const isLibraryInvalid: boolean = typeof library !== 'string'

    switch (cfg.output.libraryTarget) {
      case 'var':
        if (isLibraryInvalid) {
          throw Error(`[config-output-library] Specify a library when libraryTarget is set to ${libraryTarget}!`)
        } else {
          cfg.output.library = library
        }
        break
      case 'this':
        if (isLibraryInvalid) {
          console.warn('[config-output-library] When "output.library" does not have a value set in the Webpack' +
            ` configuration file \nwith "output.libraryTarget" set to ${libraryTarget}!` +
            '\nEvery property of the exported object will be copied to global.')
          break
        } else {
          cfg.output.library = library
        }
        break
      case 'commonjs':
        if (isLibraryInvalid) {
          console.warn('[config-output-library] When "output.library" does not have a value set in the Webpack' +
            ` configuration file \nwith "output.libraryTarget" set to ${libraryTarget}!` +
            '\nEvery property of the exported object will be copied to global.')
          break
        } else {
          cfg.output.library = library
        }
        break
      case 'commonjs2':
        cfg.output.library = library ? library : undefined
        break
      case 'amd':
        cfg.output.library = library ? library : undefined
        break
      case 'umd':
        cfg.output.library = library ? library : undefined
        cfg.output.umdNamedDefine = umdNamedDefine
        if (umdNamedDefine && (cfg.output.library === undefined || cfg.output.library === null)) {
            throw Error(`[config-output-library] When umdNamedDefine = true, library must be set!`)
        }
        break
      default:
        throw Error(`[config-output-library] ${libraryTarget} is not valid for "libraryTarget"!`)
    }

    return cfg
  }
}
