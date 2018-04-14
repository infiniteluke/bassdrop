# Contributing

## Table of Contents
<!--emdaer-t
  - '@emdaer/transform-table-of-contents'
-->

## Code of Conduct

Before contributing, please read our [code of conduct](./CODE_OF_CONDUCT.md)

## Getting Setup

```sh
npm install # installs dependencies for bassdrop
```

## Scripts

### Run tests
`npm test`
### Run tests in jest `--watch` mode
`npm run test:watch`
### Run tests, check package size, and report coverage
`npm run test:ci`
### Check package size limit
`npm run size`
### Run webpack in `--watch` mode for development
`npm start`
### Build a production bundle
`npm run build`
### Format source code
`npm run prettier`
### Lint source code
`npm run lint`
### Generate documentation site
`npm run documentation`

__NOTE:__ [husky](https://github.com/typicode/husky) is used to run a `precommit` hook. This hook does the following:

- Formats code with [prettier](https://github.com/prettier/prettier)
- Lints code with [eslint](https://github.com/eslint/eslint)
- Runs tests with [jest](https://github.com/facebook/jest)
- Generates documentation site inside ./docs with [documentationjs](documentation.js.org)
- Generates the README with [emdaer](emdaer.me)

## Commits

All commit messages must follow the [Conventional Commits Specification](https://conventionalcommits.org/) which can be described like so:

```
type(scope?): subject

body?
footer?
```

[Commitlint](https://github.com/marionebl/commitlint) is setup to enforce this convention.

### Commitlint Rules:
- [@commitlint/config-angular](https://github.com/marionebl/commitlint/tree/master/@commitlint/config-angular#rules): Enforces common &#8220;types&#8221; , casing, length rules etc..

Example:
```
fix(Next): Add more cat pics
Closes #123, Closes #456
```

## AUTHORS file

If you would like, when making your PR, add yourself to the AUTHORS file by appending `Name <githubusername>`. Doing so will add your name to contributor details list in the [Contributing](https://github.com/infiniteluke/bassdrop#contributing) section.

<!--emdaer-t
  - '@emdaer/transform-prettier'
  - options:
      config: ./prettier.config.js
-->