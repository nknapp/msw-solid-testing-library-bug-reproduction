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

# Patching msw

This repo runs a [postinstall-script](./scripts/patch-msw-libs.mjs) that modifies the exports object like this:

```
  "exports": {
    "./node": {
      "types": "./lib/node/index.d.ts",
      "node": {
        "require": "./lib/node/index.js",
        "import": "./lib/node/index.mjs"
      },
      "browser": null,
      "default": "./lib/node/index.mjs"
    },
  }
```

and a similar change for `@mswjs/interceptors`.

With this change, `vitest` can be executed and `vite build` will fail when 
trying to import `msw/node`.

