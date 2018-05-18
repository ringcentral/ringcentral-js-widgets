const fs = require('fs');
const path = require('path');
const { copyTemplate } = require('./helper');

exports.generateModule = ({ name, distination, dependencies = [] }) => {
  // console.log(dependencies.length);
  // return;
  const destinationDir = path.resolve(distination, name);
  if (fs.existsSync(destinationDir)) {
    throw Error('module name existed');
  }
  fs.mkdirSync(destinationDir);
  copyTemplate({
    templatePath: path.resolve(__dirname, '../templates/Module/index.js'),
    destinationPath: path.resolve(destinationDir, 'index.js'),
    params: { name, dependencies }
  });
  if (dependencies.length === 0) {
    return;
  }
  copyTemplate({
    templatePath: path.resolve(__dirname, '../templates/Module/actionTypes.js'),
    destinationPath: path.resolve(destinationDir, 'actionTypes.js'),
  });
  copyTemplate({
    templatePath: path.resolve(__dirname, '../templates/Module/getReducer.js'),
    destinationPath: path.resolve(destinationDir, 'getReducer.js'),
  });
};
