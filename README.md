Example usage:

````
  // Generates a umd module with a named define "my Lib"
  const cfg = generateConfig (
      webpackConfig, outputLibrary("myLib", "umd", true)
  );

  // Generates a commonjs module with no export name
  const cfg = generateConfig (
      webpackConfig, outputLibrary("myLib", "commonjs")
  );

````