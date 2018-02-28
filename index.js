const fs = require('fs');
const path = require('path');

module.exports = function (dir, extPattern = /\.js$/) {

  function getFilesRecursively (dir) {
    if (fs.statSync(dir).isDirectory()) {
      return Array.prototype.concat(...fs.readdirSync(dir).map(subdir => getFilesRecursively(path.join(dir, subdir))));
    }
    return './' + dir;
  }

  let entries = {};
  getFilesRecursively(dir).forEach(function (file) {
    let ext = path.parse(file).ext;
    if (extPattern.test(ext)) {
      let key = path.relative(dir, file).replace(ext, '');
      entries[key] = file;
    }
  });

  return entries;

};
