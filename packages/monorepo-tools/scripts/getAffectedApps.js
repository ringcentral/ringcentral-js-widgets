import { argv } from 'yargs';
import fs from 'fs-extra';
import { reduce } from 'ramda';
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

  if (files.indexOf('yarn.lock') > -1) {
    // if yarn.lock has been changed, all apps should be triggered to run to be safe
    const affectedApps = new Set();
    for (const item in appMapping) {
      if (appMapping[item]) {
        affectedApps.add(appMapping[item]);
      }
    }
    console.log([...affectedApps]);
  } else {
    const affectedPackages = await calculateAffectedPackages({ files });
    const affectedApps = reduce(
      (result, item) => {
        if (appMapping[item]) {
          result.add(appMapping[item]);
        }
        return result;
      },
      new Set(),
      affectedPackages,
    );
    console.log([...affectedApps]);
  }
})();
