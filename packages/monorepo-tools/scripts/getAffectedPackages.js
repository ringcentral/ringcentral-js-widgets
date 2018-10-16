import { argv } from 'yargs';
import fs from 'fs-extra';
import calculateAffectedPackages from '../lib/calculateAffectedPackages';

(async () => {
  if (argv.diffFile) {
    const files = JSON.parse(await fs.readFile(argv.diffFile, 'utf8'));
    console.log(await calculateAffectedPackages({
      files,
    }));
  } else if (argv.files) {
    const files = argv.files.split(',');
    console.log(await calculateAffectedPackages({
      files,
    }));
  }
})();
