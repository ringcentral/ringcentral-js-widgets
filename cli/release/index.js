const fs = require('fs');
const path = require('path');
const dir = require('node-dir');

function walk(src, root, callback) {
  dir.readFiles(src, { match: /index.js$/ },
    (err, content, filename, next) => {
      if (err) throw err;
      const dirName = filename.substring(0, filename.lastIndexOf('/'));
      const name = dirName.slice(dirName.lastIndexOf('/'));

      callback(dirName, `${root}/${name}`, (error) => {
        if (error) throw error;
      });
      next();
    }, (err, files) => {
      if (err) throw err;
      // console.log('----finish----');
    }
  );
}

walk(
  `${path.resolve(__dirname)}/../../build/widgets/`,
  `${path.resolve(`${path.resolve(__dirname)}/../../`)}`,
  function(target, path, error) {
    fs.stat(path, function(err, stats) {
      if (err) {
        fs.symlink(target, path, error);
      } else {
        fs.unlink(path, function() {
          fs.symlink(target, path, error);
        });
      }
    });
  }
);

// create symlink
