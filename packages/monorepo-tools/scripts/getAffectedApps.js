import { argv } from 'yargs';
import fs from 'fs-extra';
import calculateAffectedPackages from '../lib/calculateAffectedPackages';

const defaultAppsPath = './app-mapping.json';

(async () => {
  let files;
  if (argv.file) {
    files = JSON.parse(await fs.readFile(argv.file, 'utf8'));
  } else if (argv.files) {
    files = argv.files.split(',');
  } else {
    console.log('Please supply path to diff file with --file');
    return;
  }
  let appMapping;
  if (argv.appMapping) {
    appMapping = JSON.parse(await fs.readFile(argv.appMapping, 'utf8'));
  } else {
    appMapping = JSON.parse(await fs.readFile(defaultAppsPath, 'utf8'));
  }
  const affectedPackages = await calculateAffectedPackages({ files });
  const affectedApps = affectedPackages.reduce((result, item) => {
    if (appMapping[item]) {
      result.add(appMapping[item]);
    }
    return result;
  }, new Set());
  console.log([...affectedApps]);
})();
