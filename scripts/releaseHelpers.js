import fs from 'fs-extra';
import execa from 'execa';

function getPackageFolderName(packageName) {
  let packageFolder = packageName;
  if (packageName === '@ringcentral-integration/commons') {
    return 'ringcentral-integration';
  }
  if (packageName === '@ringcentral-integration/widgets') {
    return 'ringcentral-widgets';
  }
  const splitedPackageNames = packageName.split('/');
  if (splitedPackageNames.length > 1) {
    packageFolder = splitedPackageNames[splitedPackageNames.length - 1];
  }
  return packageFolder;
}

export function prepareRelease(packageName, releaseBranchName) {
  const packageFolder = getPackageFolderName(packageName);
  if (!fs.existsSync('build')) {
    fs.mkdirpSync('build');
  }
  if (!fs.existsSync('release')) {
    fs.mkdirpSync('release');
  }
  if (!fs.existsSync(`release/${packageFolder}`)) {
    console.log('Clone release branch...');
    execa.shellSync(
      `git clone "https://$RELEASE_USER:$RELEASE_TOKEN@github.com/$REPO" -b ${releaseBranchName} ${packageFolder} &> /dev/null`,
      {
        stdio: 'inherit',
        cwd: 'release',
      },
    );
  }
  console.log('Start release build');
  execa.shellSync(`yarn workspace ${packageName} release`, {
    stdio: 'inherit',
  });
}

export function startRelease(packageName, releaseBranchName) {
  const packageFolder = getPackageFolderName(packageName);
  const gitStatus = execa.shellSync('git status -s', {
    cwd: `release/${packageFolder}`,
  });
  if (gitStatus.stdout === '') {
    return;
  }
  console.log(`start to push ${packageName} release to ${releaseBranchName}`);
  execa.shellSync(
    'git config user.email "integrations@ringcentral.com" &> /dev/null',
    {
      cwd: `release/${packageFolder}`,
    },
  );
  execa.shellSync(
    'git config user.name "RingCentral Integrations Team" &> /dev/null',
    {
      cwd: `release/${packageFolder}`,
    },
  );
  execa.shellSync('git add --all . &> /dev/null', {
    cwd: `release/${packageFolder}`,
  });
  execa.shellSync(
    'git commit -m "released at $(date), commit: $TRAVIS_COMMIT" &> /dev/null',
    {
      cwd: `release/${packageFolder}`,
    },
  );
  execa.shellSync(`git push origin ${releaseBranchName} -f &> /dev/null`, {
    cwd: `release/${packageFolder}`,
  });
  console.log(`release to ${releaseBranchName} successfully.`);
}
