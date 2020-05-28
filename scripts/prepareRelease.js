import { prepareRelease } from './releaseHelpers';

const packageNames = [
  'ringcentral-integration',
  'ringcentral-widgets',
  '@ringcentral-integration/i18n',
  '@ringcentral-integration/locale-loader',
  '@ringcentral-integration/phone-number',
  '@ringcentral-integration/glip-widgets',
  '@ringcentral-integration/core',
  '@ringcentral-integration/babel-settings',
  '@ringcentral-integration/engage-voice-widgets',
];
const releaseBranchNames = [
  'commons-release',
  'widgets-release',
  'i18n-release',
  'locale-loader-release',
  'phone-number-release',
  'glip-widgets-release',
  'core-release',
  'engage-voice-widgets-release',
];

const args = process.argv.slice(2);
const packageName = args[0];
if (!packageNames.includes(packageName)) {
  console.log('package name invalid!');
  process.exit(1);
}
const releaseBranchName = args[1];
if (!releaseBranchNames.includes(releaseBranchName)) {
  console.log('releaseBranchName name invalid!');
  process.exit(1);
}

prepareRelease(packageName, releaseBranchName);
