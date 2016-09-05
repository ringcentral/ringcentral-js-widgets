const path = require('path');
const dir = require('node-dir');

function walk(src, callback) {
  dir.readFiles(src, { match: /.css$/ },
    (err, content, filename, next) => {
      if (err) throw err;
      const dirs = path.dirname(filename).split(path.sep);
      callback(content, dirs[dirs.length - 1], path.dirname(filename));
      next();
    }, (err, files) => {
      if (err) throw err;
      console.log('finish');
    }
  );
}

module.exports.walk = walk;
