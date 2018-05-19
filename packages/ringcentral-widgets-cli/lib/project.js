const fs = require('fs');
const path = require('path');
const { copyTemplate, copyDir, copyFile } = require('./helper');

exports.generateProject = ({
  appName, name
}) => {
  let projectName = name;
  let projectDir;
  if (!projectName) {
    projectName = path.basename(process.cwd());
    projectDir = process.cwd();
  } else {
    projectDir = path.resolve(process.cwd(), projectName);
  }
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir);
  }
  if (fs.existsSync(path.resolve(projectDir, 'package.json'))) {
    throw Error('project existed');
  }
  copyTemplate({
    templatePath: path.resolve(__dirname, '../templates/Project/package-template.json'),
    destinationPath: path.resolve(projectDir, 'package.json'),
    params: { name: projectName.replace(/\s/g, '') }
  });
  copyFile({
    templatePath: path.resolve(__dirname, '../templates/Project/babelrc.default'),
    destinationPath: path.resolve(projectDir, '.babelrc')
  });
  copyFile({
    templatePath: path.resolve(__dirname, '../templates/Project/env.default'),
    destinationPath: path.resolve(projectDir, '.env')
  });
  copyFile({
    templatePath: path.resolve(__dirname, '../templates/Project/gitignore.default'),
    destinationPath: path.resolve(projectDir, '.gitignore')
  });
  copyFile({
    templatePath: path.resolve(__dirname, '../templates/Project/postcss.config.js'),
    destinationPath: path.resolve(projectDir, 'postcss.config.js')
  });
  copyTemplate({
    templatePath: path.resolve(__dirname, '../templates/Project/README.md'),
    destinationPath: path.resolve(projectDir, 'README.md'),
    params: { name: appName }
  });
  copyFile({
    templatePath: path.resolve(__dirname, '../templates/Project/webpack-dev-server.config.js'),
    destinationPath: path.resolve(projectDir, 'webpack-dev-server.config.js')
  });
  copyFile({
    templatePath: path.resolve(__dirname, '../templates/Project/webpack-production.config.js'),
    destinationPath: path.resolve(projectDir, 'webpack-production.config.js')
  });
  if (!fs.existsSync(path.resolve(projectDir, 'src'))) {
    fs.mkdirSync(path.resolve(projectDir, 'src'));
  }
  copyTemplate({
    templatePath: path.resolve(__dirname, '../templates/Project/src/brand.js'),
    destinationPath: path.resolve(projectDir, 'src/brand.js'),
    params: { appName }
  });
  copyFile({
    templatePath: path.resolve(__dirname, '../templates/Project/src/favicon.ico'),
    destinationPath: path.resolve(projectDir, 'src/favicon.ico')
  });
  copyTemplate({
    templatePath: path.resolve(__dirname, '../templates/Project/src/index.html'),
    destinationPath: path.resolve(projectDir, 'src/index.html'),
    params: { appName }
  });
  copyFile({
    templatePath: path.resolve(__dirname, '../templates/Project/src/index.js'),
    destinationPath: path.resolve(projectDir, 'src/index.js'),
  });
  copyTemplate({
    templatePath: path.resolve(__dirname, '../templates/Project/src/prefix.js'),
    destinationPath: path.resolve(projectDir, 'src/prefix.js'),
    params: { name: projectName },
  });
  copyFile({
    templatePath: path.resolve(__dirname, '../templates/Project/src/proxy.js'),
    destinationPath: path.resolve(projectDir, 'src/proxy.js'),
  });
  copyFile({
    templatePath: path.resolve(__dirname, '../templates/Project/src/proxy.html'),
    destinationPath: path.resolve(projectDir, 'src/proxy.html'),
  });
  copyFile({
    templatePath: path.resolve(__dirname, '../templates/Project/src/redirect.js'),
    destinationPath: path.resolve(projectDir, 'src/redirect.js'),
  });
  copyFile({
    templatePath: path.resolve(__dirname, '../templates/Project/src/redirect.html'),
    destinationPath: path.resolve(projectDir, 'src/redirect.html'),
  });
  copyFile({
    templatePath: path.resolve(__dirname, '../templates/Project/src/theme.scss'),
    destinationPath: path.resolve(projectDir, 'src/theme.scss'),
  });
  if (!fs.existsSync(path.resolve(projectDir, 'src/components'))) {
    fs.mkdirSync(path.resolve(projectDir, 'src/components'));
  }
  copyFile({
    templatePath: path.resolve(__dirname, '../templates/Project/src/components/.keep'),
    destinationPath: path.resolve(projectDir, 'src/components/.keep'),
  });
  if (!fs.existsSync(path.resolve(projectDir, 'src/modules'))) {
    fs.mkdirSync(path.resolve(projectDir, 'src/modules'));
  }
  if (!fs.existsSync(path.resolve(projectDir, 'src/modules/Phone'))) {
    fs.mkdirSync(path.resolve(projectDir, 'src/modules/Phone'));
  }
  copyFile({
    templatePath: path.resolve(__dirname, '../templates/Project/src/modules/Phone/index.js'),
    destinationPath: path.resolve(projectDir, 'src/modules/Phone/index.js'),
  });
  copyDir({
    templatePath: path.resolve(__dirname, '../templates/Project/src/containers'),
    destinationPath: path.resolve(projectDir, 'src/containers'),
  });
};
