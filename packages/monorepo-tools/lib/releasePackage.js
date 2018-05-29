const fs = require('fs-extra');
const execa = require('execa');
const path = require('path');

function prepareRelease(packageName, releaseBranchName) {
  if (!fs.existsSync('build')) {
    fs.mkdirpSync('build');
  }
  if (!fs.existsSync('release')) {
    fs.mkdirpSync('release');
  }
  if (!fs.existsSync(`release/${packageName}`)) {
    console.log('Clone release branch...');
    execa.shellSync(`git clone "https://$RELEASE_USER:$RELEASE_TOKEN@github.com/$REPO" -b ${releaseBranchName} ${packageName} &> /dev/null`, {
      stdio: 'inherit',
      cwd: 'release'
    });
  }
  console.log('Start release build');
  execa.shellSync(`lerna run release --scope ${packageName} --stream`, {
    stdio: 'inherit',
  });
}

exports.prepareRelease = prepareRelease;
