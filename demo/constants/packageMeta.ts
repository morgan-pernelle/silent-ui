/** npm package metadata — keep in sync with root package.json version. */
export const packageMeta = {
  name: "@silent-ui/react",
  version: "0.1.3",
  npmUrl: "https://www.npmjs.com/package/@silent-ui/react",
  repoUrl: "https://github.com/morgan-pernelle/silent-ui.git",
  repoClone: "git clone https://github.com/morgan-pernelle/silent-ui.git",
} as const;

export const installSnippet = `npm install ${packageMeta.name} framer-motion

# peer dependencies (if not already installed)
npm install react react-dom`;

export const installSnippetYarn = `yarn add ${packageMeta.name} framer-motion

# peer dependencies (if not already installed)
yarn add react react-dom`;

export const installSnippetPnpm = `pnpm add ${packageMeta.name} framer-motion

# peer dependencies (if not already installed)
pnpm add react react-dom`;
