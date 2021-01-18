# Locale Loader

<!-- TODO: Make this work in monorepo
[![Build Status](https://travis-ci.org/u9520107/locale-loader.svg?branch=master)](https://travis-ci.org/u9520107/locale-loader)
[![Coverage Status](https://coveralls.io/repos/github/u9520107/locale-loader/badge.svg?branch=master)](https://coveralls.io/github/u9520107/locale-loader?branch=master) -->

Simple locale loader for webpack.

## Sample File Structure:

```
    --/src
        |--/i18n
             |--en-US.js
             |--fr-FR.js
             |--localeLoader.js
```

## Locale files

1. Must be ES6 module.
2. No nested structures.
3. Do not support variables in template strings

```javascript
import constants from './constants';

export default {
    title: 'Hello World',
    [constants.fetchError]: 'Fetch Error',
    icuCompliant: 'Greetings, {name}!',
    handleEscapedBraces: "Escape braces with single quote: '{foo}'",
    'complex-keys': 'Support using quoted property names',
    concat: 'support' + 'string' + 'concatenation',
    template: `support
    templateStrings`,
    123: 'numeric key supported',
    templateVariable: `this is ${not} supported`,
};
```

## Loader File

Loader files should be a js file starting with the following comment.

```javascript
/* loadLocale */
```

The webpack loader will generate necessary code (in es6) in compiling process.
Each locale will be placed into separate bundles.

If there is a need to not separate the bundles, the following comment can be used instead.

```javascript
/* loadLocale noChunk */
```

There must be a space after '/\*' and '\*/'.

## locale-loader

locale-loader is a webpack loader, this must be placed before babel-loader.

Example webpack config

```javascript
module.exports = {
    module: {
      rules: [
        {
            test: /\.js$/,
            use: [
                {
                    loader: 'babel-loader',
                },
                {
                    loader: '@ringcentral-integration/locale-loader',
                    options: {
                        supportedLocales: ['en-US','en-GB']// the locales you want to support in the project, when null, undefined or [] , it will pack all locales.
                    }
                },
            ],
            exclude: /node_modules/,
        },
    }
}
```

## transformLocaleLoader

For building libraries and releasing, often we only compile the source to es2015 with babel transform and not webpack. The transformLocaleLoader is a gulp transform that can transform the loader files with generated code so the final result is ready to use.

gulpfile.js

```javascript
gulp.src('./src')
    .pipe(transformLocaleLoader({ supportedLocales: ['en-US', 'en-GB'] }))
    .pipe(babel(...babelConfig))
    .pipe(gulp.dest('./build'));
```

## supportedLocales order

The generated loadLocale file will try to respect the order of locales defined in supportedLocales. This is useful for language wide defaults. For example, `['en-US', 'en-GB', 'en-AU', 'zh-CN', 'zh-TW']` will result in 'en' = 'en-US' and 'zh' = 'zh-TW'. But `['en-GB', 'en-US', 'en-AU', 'zh-TW', 'zh-CN']` will result in 'en' = 'en-GB' and 'zh' = 'zh-TW'. If supportedLocales is not specified, then the order will be alphabetical.

## Export to Xlf

The exportLocale function can be used to generate xlf files.

```javascript
import exportLocale from '@ringcentral-integration/locale-loader/lib/exportLocale';
// or import { exportLocale } from '@ringcentral-integration/locale-laoder';

const config = {
    sourceLocale: 'en-US', // the default locale with original strings
    supportedLocales: ['en-US', 'fr-FR', 'ja-JP'], // the array of locales to support
    sourceFolder: 'src', // export locale will use 'src/**/*.js' glob to search for loaders
    localizationFolder: 'localization', // exported files will be saved to here
    exportType: 'diff', // determines what is exported
    fillEmptyWithSource: true, // default to fill in translated field with source string
};

exportLocale(config);
console.log('.xlf generated to `cwd()/localization/`');
```

**Export Types**

1. 'diff': Diff will only export entries that have not been translated, or have been modified since last translation. This is the default mode.
2. 'full': This will export everything.
3. 'translated': This will only export translated entries.

## Import from Xlf

Place the translated Xlf files in to localization folder.

```javascript
import importLocale from '@ringcentral-integration/locale-loader/lib/importLocale';
// or import { importLocale } from '@ringcentral-integration/locale-laoder';

const config = {
    sourceLocale: 'en-US', // the default locale with original strings
    supportedLocales: ['en-US', 'fr-FR', 'ja-JP'], // the array of locales to support
    sourceFolder: 'src', // export locale will use 'src/**/*.js' glob to search for loaders
    localizationFolder: 'localization', // exported files will be saved to here,
    interactive: true, // will prompt for confirmation on deleting/skipping changed keys
    silent: false, // will not output deletion/skip to console
};

importLocale(config).then(() => {
    console.log('.xlf imported');
});
```

## Consolidate Locale Data

Consolidate locale will do the following:

1. Delete values from translations if the source value has been modified, or if the source no longer contain that key.
2. Re-generate the annotations.

```javascript
import consolidateLocale from '@ringcentral-integration/locale-loader/lib/consolidateLocale';
// or import { consolidateLocale } from '@ringcentral-integration/locale-laoder';

const config = {
    sourceLocale: 'en-US', // the default locale with original strings
    supportedLocales: ['en-US', 'fr-FR', 'ja-JP'], // the array of locales to support
    sourceFolder: 'src', // export locale will use 'src/**/*.js' glob to search for loaders
    localizationFolder: 'localization', // exported files will be saved to here
    interactive: true, // will prompt for confirmation on deleting/skipping changed keys
    silent: false, // will not output deletion/skip to console
};

consolidateLocale(config).then(() => {
    console.log('consolidate done');
});
```
