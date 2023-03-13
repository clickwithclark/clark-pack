# No-Sweat™ Clark-Pack

This is my attempt at setting up a project/repo with all the config files and npm scripts I need to get up and running as fast as possible

## What it does

It automatically adds the following to my package.json scripts

```json
"build": "webpack",
"docs": "npx --yes documentation build src/** -f md > README[sample].md",
"html": "npx --yes documentation build src/** -f html -o htmlDocs",
"release": "standard-version && git push --follow-tags origin main && npm publish",
"lint": "eslint .",
"lint:fix": "eslint . --fix",
"postpublish": "pinst --disable",
"prepublishOnly": "pinst --enable"
```

It also installs all the npm dependencies I would need as well

```bash
npm i -D @commitlint/cli@17.4.4 && npm i -D @commitlint/config-conventional@17.4.4 && npm i -D chalk@4.1.2 && npm i -D commitlint-with-husky@1.0.10 && npm i -D eslint-config-clickwithclark@3.2.4 && npm i -D husky@8.0.3 && npm i -D pinst@3.0.0 && npm i -D standard-version@9.5.0 && npm i -D terser-webpack-plugin@5.3.7 && npm i -D webpack-cli@4.10.0 && npm i -D webpack@5.76.1 && npx --yes husky install && npx --yes husky add .husky/commit-msg "npx --yes commitlint --edit \"$1\""

```

You are very welcome to overwrite any of these settings, or just fork the entire thing to create your own.

## Installing/Usage

1. If you don't already have a `package.json` file, create one with `npm init`.

2. Then ensure you have a .git folder create one with `git init`.

3. In the root of your project execute the following command in your terminal:

```
npx --yes clark-pack
```

The configuration files will be added to your project copied from the package itself

4. It will then start installing all the dependencies and will notify when it is done

## Notice

I work on a windows machine, to the best of my knowledge the package works on all platforms, if not please don't hesitate to let me know.

Enjoy! 

[MIT](https://raw.githubusercontent.com/clickwithclark/clark-pack/main/LICENSE)
