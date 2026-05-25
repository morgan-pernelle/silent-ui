# Publishing Silent UI to npm

## Before first publish

1. Repository URLs point to `github.com/morgan-pernelle/silent-ui` — update `package.json` if you rename or transfer the repo.
2. **Build locally** and verify the demo:

   ```bash
   npm ci
   npm run typecheck
   npm run test
   npm run build
   npm run build:demo
   ```

3. **Log in to npm** (one-time):

   ```bash
   npm login
   ```

4. **Create an npm access token** with publish rights: [npmjs.com → Access Tokens](https://www.npmjs.com/settings/~tokens).

5. **Add the token to GitHub** (for automated releases):
   - Repository → Settings → Secrets and variables → Actions
   - New secret: `NPM_TOKEN`

## Manual publish

```bash
npm run build
npm publish --access public
```

The `prepublishOnly` script runs typecheck, tests, and build automatically.

## Automated publish (GitHub Release)

1. Bump version in `package.json` and update `CHANGELOG.md`.
2. Create a GitHub Release (tag = version, e.g. `v0.1.0`).
3. The [Publish workflow](.github/workflows/publish.yml) runs `npm publish` with provenance when the release is published.

## Package name

This project publishes as **`@silent-ui/react`** (the unscoped name `silent-ui` is taken on npm).

Before the first publish, create the npm organization **`silent-ui`** at [npmjs.com/org/create](https://www.npmjs.com/org/create) so you can own the `@silent-ui` scope, then add yourself as a publisher.
