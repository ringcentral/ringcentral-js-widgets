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
