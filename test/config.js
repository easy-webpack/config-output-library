import test from 'ava'
import { assign } from '../src'
import outputLibrary from "../src"
import { generateConfig } from '@easy-webpack/core';

const webpackConfig = { output: {path: 'dist'}}

test(`no parameters`, t => {
  // No parameters defaults to var with no library name so we throw.  This matches webpack defaults.
  t.throws(() => generateConfig(webpackConfig, outputLibrary())
  );
})

test(`undefined and invalid`, t => {
  // Throw when an invalid module is specified
  t.throws(() => generateConfig(webpackConfig, outputLibrary({library: undefined, libraryTarget: 'invalid'})));
})

test(`undefined and umd and umdNamedDefine`, t => {
  // Throw when setting umdNamedDefine to true, but no library specified
  t.throws(() => generateConfig(webpackConfig, outputLibrary(undefined, 'umd', true)));
})

test(`myLib and umd`, t => {
  const cfg = generateConfig(webpackConfig, outputLibrary({library: "myLib", libraryTarget: "umd"}));
  t.true(cfg.output.library === "myLib");
  t.true(cfg.output.libraryTarget === "umd");
  t.true(cfg.output.path === "dist");
})

test(`myLib and umd named and umdNamedDefine`, t => {
  const cfg = generateConfig(webpackConfig, outputLibrary({library: "myLib", libraryTarget: "umd", umdNamedDefine: true}));
  t.true(cfg.output.library === "myLib");
  t.true(cfg.output.libraryTarget === "umd");
  t.true(cfg.output.umdNamedDefine === true);
  t.true(cfg.output.path === "dist");
})

test(`myLib and undefined`, t => {
  const cfg = generateConfig(webpackConfig, outputLibrary({library: "myLib"}));
  t.true(cfg.output.library === "myLib");
  t.true(cfg.output.libraryTarget === "var");
  t.true(cfg.output.path === "dist");
})

test(`undefined and commonjs`, t => {
  const cfg = generateConfig(webpackConfig, outputLibrary({library: undefined, libraryTarget: 'commonjs'}));

  t.true(cfg.output.library === undefined);
  t.true(cfg.output.libraryTarget === "commonjs");
  t.true(cfg.output.path === "dist");
})

test(`undefined and commonjs2`, t => {
  const cfg = generateConfig(webpackConfig, outputLibrary({library: undefined, libraryTarget: 'commonjs2'}));

  t.true(cfg.output.library === undefined);
  t.true(cfg.output.libraryTarget === "commonjs2");
  t.true(cfg.output.path === "dist");
})


test(`undefined and amd`, t => {
  const cfg = generateConfig(webpackConfig, outputLibrary({library: undefined, libraryTarget: 'amd'}));

  t.true(cfg.output.library === undefined);
  t.true(cfg.output.libraryTarget === "amd");
  t.true(cfg.output.path === "dist");
})

test(`myLib and commonjs`, t => {
  const cfg = generateConfig(webpackConfig, outputLibrary({library: "myLib", libraryTarget: "commonjs"}));

  t.true(cfg.output.library === "myLib");
  t.true(cfg.output.libraryTarget === "commonjs");
  t.true(cfg.output.path === "dist");
})