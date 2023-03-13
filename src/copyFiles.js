const util = require('util');
const path = require('path');
const fs = require('fs');

const copyFilePromise = util.promisify(fs.copyFile);

module.exports = function copyFiles(source, destination, files) {
  return Promise.all(
    files.map((eachFile) =>
      copyFilePromise(
        path.join(source, eachFile),
        path.join(destination, eachFile)
      )
    )
  );
};
