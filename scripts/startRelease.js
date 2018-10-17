const startRelease = require('../packages/monorepo-tools/lib/releasePackage').startRelease;

const packageNames = [
  'ringcentral-integration',
  'ringcentral-widgets',
  '@ringcentral-integration/i18n',
  '@ringcentral-integration/locale-loader',
  '@ringcentral-integration/phone-number',
  '@ringcentral-integration/glip-widgets',
];
const releaseBranchNames = [
  'commons-release',
  'widgets-release',
  'i18n-release',
  'locale-loader-release',
  'phone-number-release',
  'glip-widgets-release',
];

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
