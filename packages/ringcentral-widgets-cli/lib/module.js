const fs = require('fs');
const path = require('path');
const { copyTemplate } = require('./helper');

exports.generateModule = ({ name, distination, ...options }) => {
  const destinationDir = path.resolve(distination, name);
  if (fs.existsSync(destinationDir)) {
    throw Error('module name existed');
  }
  fs.mkdirSync(destinationDir);
  const dependences = [];
  copyTemplate({
    templatePath: path.resolve(__dirname, '../templates/Module/index.js'),
    destinationPath: path.resolve(destinationDir, 'index.js'),
    params: { name, dependences }
  });
  if (dependences.length === 0) {
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
