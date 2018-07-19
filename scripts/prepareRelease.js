const prepareRelease = require('../packages/monorepo-tools/lib/releasePackage').prepareRelease;

const packageNames = [
  'ringcentral-integration',
  'ringcentral-widgets',
  '@ringcentral-integration/i18n',
  '@ringcentral-integration/locale-loader',
  '@ringcentral-integration/phone-number'
];
const releaseBranchNames = [
  'commons-release',
  'widgets-release',
  'i18n-release',
  'locale-loader-release',
  'phone-number-release'
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

prepareRelease(packageName, releaseBranchName);
