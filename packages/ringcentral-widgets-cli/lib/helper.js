const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

exports.getModulesDistination = () => {
  const base = process.cwd();
  if (base.endsWith('modules')) {
    return base;
  }
  if (fs.existsSync(path.resolve(base, 'src/modules'))) {
    return path.resolve(base, 'src/modules');
  }
  if (fs.existsSync(path.resolve(base, 'modules'))) {
    return path.resolve(base, 'modules');
  }
  return null;
};

exports.copyTemplate = ({
  templatePath,
  destinationPath,
  params,
}) => {
  const template = fs.readFileSync(templatePath, { encoding: 'utf8' });
  const codes = ejs.render(template, params);
  fs.writeFileSync(destinationPath, codes);
  console.log('Created: ', destinationPath);
};

const copyFile = ({
  templatePath,
  destinationPath
}) => {
  const template = fs.readFileSync(templatePath, { encoding: 'utf8' });
  fs.writeFileSync(destinationPath, template);
  console.log('Created: ', destinationPath);
};

exports.copyFile = copyFile;

const copyDir = ({
  templatePath,
  destinationPath
}) => {
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath);
  }
  const files = fs.readdirSync(templatePath);
  files.forEach((fileName) => {
    const filePath = path.resolve(templatePath, fileName);
    const file = fs.lstatSync(filePath);
    if (file.isDirectory()) {
      copyDir({
        templatePath: filePath,
        destinationPath: path.resolve(destinationPath, fileName),
      });
      return;
    }
    copyFile({
      templatePath: filePath,
      destinationPath: path.resolve(destinationPath, fileName),
    });
  });
};

exports.copyDir = copyDir;
