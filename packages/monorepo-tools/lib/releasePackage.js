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

function startRelease(packageName, releaseBranchName) {
  const gitStatus = execa.shellSync('git status -s', {
    cwd: `release/${packageName}`
  });
  if (gitStatus.stdout === '') {
    return;
  }
  console.log(`start to push ${packageName} release to ${releaseBranchName}`);
  execa.shellSync('git config user.email "integrations@ringcentral.com" &> /dev/null', {
    cwd: `release/${packageName}`
  });
  execa.shellSync('git config user.name "RingCentral Integrations Team" &> /dev/null', {
    cwd: `release/${packageName}`
  });
  execa.shellSync('git add --all . &> /dev/null', {
    cwd: `release/${packageName}`
  });
  execa.shellSync('git commit -m "released at $(date), commit: $TRAVIS_COMMIT" &> /dev/null', {
    cwd: `release/${packageName}`
  });
  execa.shellSync(`git push origin ${releaseBranchName} -f &> /dev/null`, {
    cwd: `release/${packageName}`
  });
  console.log(`release to ${releaseBranchName} successfully.`);
}

exports.prepareRelease = prepareRelease;
exports.startRelease = startRelease;
