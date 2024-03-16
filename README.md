## Reproduction repo for msw issue

mock-service-worker does not work with vitest and solid-js.
The reason is that `vite-plugin-solid` sets the vite config option `resolve.conditions` to `['browser']`,

If it would not do that, solid-js would load the server-version of its code, providing an empty "render" function.

But because it does this, the `msw/node` package cannot be loaded in the test, because in its package.json, 
it says under `exports`

```
  "exports": {
    "./node": {
      "browser": null,
-----------------^
      "types": "./lib/node/index.d.ts",
      "require": "./lib/node/index.js",
      "import": "./lib/node/index.mjs",
      "default": "./lib/node/index.mjs"
    }
  }
```

