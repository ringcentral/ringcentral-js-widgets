const fs = require('fs');
const path = require('path');
const dir = require('node-dir');

function walk(src, root, callback) {
  const results = {};
  dir.readFiles(src, { match: /index.js$/ },
    (err, content, filename, next) => {
      if (err) throw err;
      const dirName = filename.substring(0, filename.lastIndexOf('/'));
      const name = dir.slice(dir.lastIndexOf('/'));
      callback(dirName, `${root}/${name}`, (error) => {
        error && console.log(err);
      });
      // next();
    }, (err, files) => {
      if (err) throw err;
      fs.writeFile('test.json', JSON.stringify(results));
      // console.log('----finish----');
    }
  );
};

walk(
  `${path.resolve(__dirname)}/../../src/widgets/`,
  `${path.resolve(`${path.resolve(__dirname)}/../../`)}`,
  fs.symlink
);

// create symlink
