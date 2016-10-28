"use strict";
module.exports = function outputLibrary(_a) {
    var _b = _a.library, library = _b === void 0 ? undefined : _b, _c = _a.libraryTarget, libraryTarget = _c === void 0 ? 'var' : _c, _d = _a.umdNamedDefine, umdNamedDefine = _d === void 0 ? false : _d;
    var cfg = { output: {} };
    return function outputLibrary() {
        cfg.output.libraryTarget = libraryTarget;
        var isLibraryInvalid = typeof library !== 'string';
        switch (cfg.output.libraryTarget) {
            case 'var':
                if (isLibraryInvalid) {
                    throw Error("[config-output-library] Specify a library when libraryTarget is set to " + libraryTarget + "!");
                }
                else {
                    cfg.output.library = library;
                }
                break;
            case 'this':
                if (isLibraryInvalid) {
                    console.warn('[config-output-library] When "output.library" does not have a value set in the Webpack' +
                        (" configuration file \nwith \"output.libraryTarget\" set to " + libraryTarget + "!") +
                        '\nEvery property of the exported object will be copied to global.');
                    break;
                }
                else {
                    cfg.output.library = library;
                }
                break;
            case 'commonjs':
                if (isLibraryInvalid) {
                    console.warn('[config-output-library] When "output.library" does not have a value set in the Webpack' +
                        (" configuration file \nwith \"output.libraryTarget\" set to " + libraryTarget + "!") +
                        '\nEvery property of the exported object will be copied to global.');
                    break;
                }
                else {
                    cfg.output.library = library;
                }
                break;
            case 'commonjs2':
                cfg.output.library = library ? library : undefined;
                break;
            case 'amd':
                cfg.output.library = library ? library : undefined;
                break;
            case 'umd':
                cfg.output.library = library ? library : undefined;
                cfg.output.umdNamedDefine = umdNamedDefine;
                if (umdNamedDefine && (cfg.output.library === undefined || cfg.output.library === null)) {
                    throw Error("[config-output-library] When umdNamedDefine = true, library must be set!");
                }
                break;
            default:
                throw Error("[config-output-library] " + libraryTarget + " is not valid for \"libraryTarget\"!");
        }
        return cfg;
    };
};
//# sourceMappingURL=index.js.map