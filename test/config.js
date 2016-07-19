import test from 'ava'
import { assign } from '../src'
import { outputLibrary } from "../src"
import { generateConfig } from '@easy-webpack/core';

const webpackConfig = { output: {path: 'dist'}}

test(`no parameters`, t => {
  // No parameters defaults to var with no library name so we throw.  This matches webpack defaults.
  t.throws(() => generateConfig(webpackConfig, outputLibrary())
  );
})

test(`undefined and invalid`, t => {
  // Throw when an invalid module is specified
  t.throws(() => generateConfig(webpackConfig, outputLibrary(undefined, 'invalid')));
})

test(`undefined and umd and umdNamedDefine`, t => {
  // Throw when setting umdNamedDefine to true, but no library specified
  t.throws(() => generateConfig(webpackConfig, outputLibrary(undefined, 'umd', true)));
})

test(`myLib and umd`, t => {
  const cfg = generateConfig(webpackConfig, outputLibrary("myLib", "umd"));
  t.true(cfg.output.library === "myLib");
  t.true(cfg.output.libraryTarget === "umd");
  t.true(cfg.output.path === "dist");
})

test(`myLib and umd named and umdNamedDefine`, t => {
  const cfg = generateConfig(webpackConfig, outputLibrary("myLib", "umd", true));
  t.true(cfg.output.library === "myLib");
  t.true(cfg.output.libraryTarget === "umd");
  t.true(cfg.output.umdNamedDefine === true);
  t.true(cfg.output.path === "dist");
})

test(`myLib and var`, t => {
  const cfg = generateConfig(webpackConfig, outputLibrary("myLib"));
  t.true(cfg.output.library === "myLib");
  t.true(cfg.output.libraryTarget === "var");
  t.true(cfg.output.path === "dist");
})

test(`undefined and commonjs`, t => {
  const cfg = generateConfig(webpackConfig, outputLibrary(undefined, 'commonjs'));

  t.true(cfg.output.library === undefined);
  t.true(cfg.output.libraryTarget === "commonjs");
  t.true(cfg.output.path === "dist");
})

test(`undefined and commonjs2`, t => {
  const cfg = generateConfig(webpackConfig, outputLibrary(undefined, 'commonjs2'));

  t.true(cfg.output.library === undefined);
  t.true(cfg.output.libraryTarget === "commonjs2");
  t.true(cfg.output.path === "dist");
})


test(`undefined and amd`, t => {
  const cfg = generateConfig(webpackConfig, outputLibrary(undefined, 'amd'));

  t.true(cfg.output.library === undefined);
  t.true(cfg.output.libraryTarget === "amd");
  t.true(cfg.output.path === "dist");
})

test(`myLib and commonjs`, t => {
  const cfg = generateConfig(webpackConfig, outputLibrary("myLib", "commonjs"));

  t.true(cfg.output.library === "myLib");
  t.true(cfg.output.libraryTarget === "commonjs");
  t.true(cfg.output.path === "dist");
})