const startRelease = require('../packages/monorepo-tools/lib/releasePackage').startRelease;

const prepareRelease = require('../packages/monorepo-tools/lib/releasePackage').prepareRelease;

const packageNames = ['ringcentral-integration', 'ringcentral-widgets'];
const releaseBranchNames = ['commons-release', 'widgets-release'];

const args = process.argv.slice(2);
const packageName = args[0];
if (!packageNames.includes(packageName)) {
  console.log('package name invalid!');
  return;
}
const releaseBranchName = args[1];
if (!releaseBranchNames.includes(releaseBranchName)) {
  console.log('releaseBranchName name invalid!');
  return;
}

startRelease(packageName, releaseBranchName);
