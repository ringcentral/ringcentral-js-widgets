const path = require('path');
const dir = require('node-dir');

function walk(src, callback) {
  dir.readFiles(src, { match: /.css$/ },
    (err, content, filename, next) => {
      if (err) throw err;
      const dirs = path.dirname(filename).split('/');
      callback(content, dirs[dirs.length - 1]);
      next();
    }, (err, files) => {
      if (err) throw err;
      console.log('finish');
    }
  );
}

module.exports.walk = walk;
