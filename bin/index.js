#!/usr/bin/env node
/* eslint-disable import/no-dynamic-require */

/**
 * If called via NPX, it should add the configurations scripts I often
 * use and install all the dependencies needed for the scripts
 * @function
 * @return {Void} Nothing is returned
 */

const process = require('process');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
// eslint-disable-next-line import/no-extraneous-dependencies
const chalk = require('chalk');
const copyFiles = require('../src/copyFiles.js');

const userDirectory = process.env.INIT_CWD;
const thisDirectory = path.resolve(__dirname, '../');
let userPkg = require(path.resolve(userDirectory, './package.json'));
(function () {
  const installationScript = String.raw`npm i -D @commitlint/cli@17.4.4 && npm i -D @commitlint/config-conventional@17.4.4 && npm i -D chalk@4.1.2 && npm i -D commitlint-with-husky@1.0.10 && npm i -D eslint-config-clickwithclark@3.2.4 && npm i -D husky@8.0.3 && npm i -D pinst@3.0.0 && npm i -D standard-version@9.5.0 && npm i -D terser-webpack-plugin@5.3.7 && npm i -D webpack-cli@4.10.0 && npm i -D webpack@5.76.1 && npx --yes husky install && npx --yes husky add .husky/commit-msg "npx --yes commitlint --edit \"$1\""`;

  console.log('this directory', thisDirectory);
  // shallow copy to avoid mutating user copy prematurely
  userPkg = JSON.parse(JSON.stringify(userPkg));

  // append custom scripts to user scripts in package.json

  userPkg.scripts.build = 'webpack';
  userPkg.scripts.docs =
    'npx --yes documentation build src/** -f md > README[sample].md';
  userPkg.scripts.html =
    'npx --yes documentation build src/** -f html -o htmlDocs';
  userPkg.scripts.release =
    'standard-version && git push --follow-tags origin main && npm publish';
  userPkg.scripts.lint = 'eslint .';
  userPkg.scripts['lint:fix'] = 'eslint . --fix';
  userPkg.scripts.postpublish = 'pinst --disable';
  userPkg.scripts.prepublishOnly = 'pinst --enable';
  userPkg.eslintConfig = { extends: ['clickwithclark'] };

  // update package.json with merged scripts
  try {
    fs.writeFileSync(
      path.resolve(userDirectory, './package.json'),
      JSON.stringify(userPkg, null, 2)
    );
  } catch (error) {
    console.log(chalk.bold.red('Error updating user package.json:\n'), error);
  }

  // Files to copy from this repo
  const fileList = [
    './LICENSE',
    './webpack.config.js',
    './dot-gitignore',
    './.commitlintrc.json',
    './readme-template.md',
  ];

  // move basic config files to user's project folder
  copyFiles(thisDirectory, userDirectory, fileList)
    .then(() => {
      // since successful copy of files, rename dot-gitignore
      // to .gitignore, .gitignore files are renamed by npm
      // when packed see https://github.com/npm/npm/issues/1862

      /* -------------------------------------------------------------------*/
      // #region [Rename dot-gitignore to .gitignore]
      /* -------------------------------------------------------------------*/

      fs.rename(
        path.join(userDirectory, './dot-gitignore'),
        path.join(userDirectory, '.gitignore'),
        (error) => {
          if (error) {
            console.log(
              chalk.bold.red(
                'Error Occurred While Renaming "dot-gitconfig" file\n'
              )
            );
            console.error(error);
          }
        }
      );

      /* -------------------------------------------------------------------*/
      // #endregion [Rename dot-gitignore to .gitignore]

      /* -------------------------------------------------------------------*/
      // #region [Rename readme-template.md to Readme.md]
      /* -------------------------------------------------------------------*/

      fs.rename(
        path.join(userDirectory, './readme-template.md'),
        path.join(userDirectory, './Readme.md'),
        (error) => {
          if (error) {
            console.log(
              chalk.bold.red(
                'Error Occurred While Renaming "readme-template.md" file\n'
              )
            );
            console.error(error);
          }
        }
      );

      /* -------------------------------------------------------------------*/
      // #endregion [Rename readme-template.md to Readme.md]

      console.log(
        chalk.bold.green(
          'Config Files Copied Successfully\nPlease wait for dependencies to finish installing'
        )
      );
    })
    .catch((err) => {
      console.log(chalk.bold.red('Error Occurred While Copying Files\n'));
      console.error(err);
    });

  // install dependencies to user Directory
  exec(installationScript, { cwd: userDirectory }, (error) => {
    if (error?.code) {
      console.error(
        chalk.bold.red('An Error Occurred while Installing Dependencies:\n\n'),
        error.message
      );
    }
    console.log(chalk.bold.green('clark-pack installed!\n'));
  });
})();
