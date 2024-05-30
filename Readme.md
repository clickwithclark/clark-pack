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
```

It also installs all the npm dependencies I would need as well.

You are very welcome to overwrite any of these settings, or just fork the entire thing to create your own.

## What's Included

- Commitlint lints your comments based on conventional commits' Standards
- Husky uses githooks to lint the commits before they are actually executed (pre-commit hook)

  > I combined these two to create [commitlint-with-husky](https://www.npmjs.com/package/commitlint-with-husky) to do it right everytime without having to re-watch a tutorial

- A webpack config file with terser setup for easy bundling pre loaded with commented out options
- My eslint preferences from a repo forked from [Wes Bos'](https://github.com/wesbos/eslint-config-wesbos) and my inspiration for making
  my own packages, to get eslint and prettier to work together harmoniously [eslint-config-clickwithclark](https://www.npmjs.com/package/eslint-config-clickwithclark)
- Semantic Versioning & CHANGELOG generation with standard-version
- Place a copy of my license file in my repository
- Place a copy of my .gitignore file with my preferences
- Place a copy of a Readme template to ensure I describe my repository
- Scripts installed to the package.json to trigger linting, documentation generated from jsdoc comments and a build from webpack as well as bump up the version of my repo and create a new tag

## Installing/Usage

1. If you don't already have a `package.json` file, create one with `npm init`.

2. Then ensure you have a .git folder create one with `git init`.

3. In the root of your project execute the following command in your terminal:

```
npm i -D clark-pack && npx --yes clark-pack
```

The configuration files will be added to your project copied from the package itself which is why you first need to install it and then execute it with NPM's package runner NPX.

4. It will then start installing all the dependencies and will notify you when it is done

## Notice

This is solely intended for personal use and personal projects, I just thought I'd share it with fellow developers who might want to use it or fork their own strategy.
I work on a windows machine, to the best of my knowledge the package works on all platforms, if not please don't hesitate to let me know.

Enjoy!

[MIT](https://raw.githubusercontent.com/clickwithclark/clark-pack/main/LICENSE)
