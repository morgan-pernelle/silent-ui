# Publier sur npm

## Prérequis

- Compte npm avec accès au scope `@silent-ui` (mainteneur : `morgan-pernelle`)
- Session active : `npm login`

## Release manuelle

```bash
# Depuis la racine du repo
npm run typecheck
npm run test
npm run build
npm publish --access public
# ou
npm run release
```

Vérifier :

```bash
npm view @silent-ui/react version
```

## Après publication

Dans les projets consommateurs (ex. `ma-shop`) :

```bash
npm install @silent-ui/react@latest
```

## Déjà fait pour v0.1.2

- Version `0.1.2` dans `package.json`
- `CHANGELOG.md` mis à jour
- Tag git `v0.1.2` et [release GitHub](https://github.com/morgan-pernelle/silent-ui/releases/tag/v0.1.2)
- Correctif : `dist/silent-ui.css` aligné avec l’export `@silent-ui/react/styles.css`

Il reste à exécuter `npm login` puis `npm publish` depuis une machine authentifiée.
