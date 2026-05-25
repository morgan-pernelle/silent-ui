# Maintainer guide — npm releases

> Internal notes for project maintainers. Not required to use the library.

## Release checklist

1. Bump `version` in `package.json` and update [CHANGELOG.md](../CHANGELOG.md).
2. Verify locally:

   ```bash
   npm ci
   npm run typecheck
   npm run test
   npm run build
   npm run build:demo
   ```

3. Create a [GitHub Release](https://github.com/morgan-pernelle/silent-ui/releases/new) with tag `vX.Y.Z` (e.g. `v0.2.0`).
4. The [Publish workflow](./workflows/publish.yml) runs `npm publish --provenance --access public` when the release is published.

## GitHub secret

Repository → Settings → Secrets → Actions → `NPM_TOKEN` (npm access token with publish rights).

## Manual publish

```bash
npm login
npm publish --access public
```

The `prepublishOnly` script runs typecheck, tests, and build automatically.

## Package name

Published as **`@silent-ui/react`** on npm.
