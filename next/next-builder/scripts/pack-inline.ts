import path from 'path';

import { replaceI18nInlineObject } from './replaceI18nInlineObject';

replaceI18nInlineObject(
  path.join(__dirname, '../src/scriptsLoadFail/inline/i18n'),
  path.join(__dirname, '../src/scriptsLoadFail/inline/scriptsFail.js'),
  {
    excludes: ['incorrectEAVersionTitle', 'incorrectEAVersionContent'],
  },
);
