const fs = require('fs');
const path = require('path');
const detective = require('detective-es6');

const basePath = path.resolve(`${path.resolve(__dirname)}/../../src/applications/demo/`);

let p = path.resolve(`${path.resolve(__dirname)}/../../src/components/widgets/webphone/`);
const src = `${p}/index.react.js`;
const source = fs.readFileSync(src, 'utf-8');
const result = [];
const imports = [];
const names = [];

function getSrc(src, srcPath) {
  const currentPath = path.resolve(`${srcPath}/${src}.js`);
  const target = fs.readFileSync(currentPath, 'utf-8');
  return target;
}

function getDir(src, srcPath) {
  return path.dirname(path.resolve(`${srcPath}/${src}.js`));
}

function getPath(src, srcPath) {
  return path.resolve(`${srcPath}/${src}.js`);
}

function detect(dependencies, currentPath, level) {
  dependencies.forEach(dep => {
    if (dep.indexOf('react') !== -1 &&
        dep.indexOf('.') === 0) {

      // got something
      if (!result[level]) {
        result[level] = [];
      }
      if (!imports[level]) {
        imports[level] = [];
      }
      const depSrc = getPath(dep, currentPath);
      const depSrcToken = depSrc.split(path.sep);
      const name = depSrcToken[depSrcToken.length - 1].split('.')[0];
      if (names.indexOf(name) === -1) {
        imports[level].push({
          name,
          path: path.relative(basePath, depSrc),
        });
        names.push(name);
      }
      result[level].push({
        name,
        path: path.relative(basePath, depSrc),
      });
      detect(detective(getSrc(dep, currentPath)), getDir(dep, currentPath), level + 1);
    }
  });
}

function analysis() {
  detect(detective(source), p, 0);
  return {
    imports,
    dependencies: result,
  };
}

module.exports.analysis = analysis;
