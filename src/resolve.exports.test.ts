import {describe, it} from "vitest";
import {resolve} from "resolve.exports";

const conditions ={
    "browser": false,
    "require": false,
    "conditions": [
        "development",
        "module",
        "solid",
        "browser",
        "node"
    ]
}

describe("resolve.exports", () => {
    it("'browser: null' as first prop of './node', browser in conditions => FAILS", () => {
        const packageJson = {
            "name": "msw",
            "version": "2.2.4",
            "description": "Seamless REST/GraphQL API mocking library for browser and Node.js.",
            "main": "./lib/core/index.js",
            "module": "./lib/core/index.mjs",
            "types": "./lib/core/index.d.ts",
            "packageManager": "pnpm@7.12.2",
            "exports": {
                "./node": {
                    "browser": null,
                    "types": "./lib/node/index.d.ts",
                    "require": "./lib/node/index.js",
                    "import": "./lib/node/index.mjs",
                    "default": "./lib/node/index.mjs"
                },
                "./mockServiceWorker.js": "./lib/mockServiceWorker.js",
                "./package.json": "./package.json"
            },
        }
        resolve(packageJson, "./node", conditions )
    })

    it("'browser: null' as last prop of './node', browser in conditions => WORKS", () => {
        const packageJson = {
            "name": "msw",
            "version": "2.2.4",
            "description": "Seamless REST/GraphQL API mocking library for browser and Node.js.",
            "main": "./lib/core/index.js",
            "module": "./lib/core/index.mjs",
            "types": "./lib/core/index.d.ts",
            "packageManager": "pnpm@7.12.2",
            "exports": {
                "./node": {
                    "types": "./lib/node/index.d.ts",
                    "require": "./lib/node/index.js",
                    "import": "./lib/node/index.mjs",
                    "default": "./lib/node/index.mjs",
                    "browser": null,
                },
                "./mockServiceWorker.js": "./lib/mockServiceWorker.js",
                "./package.json": "./package.json"
            },
        }
        resolve(packageJson, "./node", conditions )
    })

})

