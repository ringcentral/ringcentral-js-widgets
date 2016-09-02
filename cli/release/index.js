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
  `${path.resolve(__dirname)}/../../src/widgets/`,
  `${path.resolve(`${path.resolve(__dirname)}/../../`)}`,
  fs.symlink
);

// create symlink
