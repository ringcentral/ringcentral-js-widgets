# Locale Loader
[![Build Status](https://travis-ci.org/u9520107/locale-loader.svg?branch=master)](https://travis-ci.org/u9520107/locale-loader)
[![Coverage Status](https://coveralls.io/repos/github/u9520107/locale-loader/badge.svg?branch=master)](https://coveralls.io/github/u9520107/locale-loader?branch=master)

Simple locale loader for webpack.

Sample File Structure:
---
```
    --/src
        |--/i18n
             |--en-US.js
             |--fr-FR.js
             |--localeLoader.js
             |--index.js
```

Locale files
---
1. Must be ES6 module.
2. No template literals (``).
3. No nested structures.

```javascript
import constants from './constants';

export default {
    title: 'Hello World',
    [constants.fetchError]: 'Fetch Error',
    icuCompliant: 'Greetings, {name}!',
    handleEscapedBraces: 'Escape braces with single quote: \'{foo}\'',
    'complex-keys': 'Support using quoted property names',
};
```

Loader File
---
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

I18n class
---
The ```index.js``` file in the sample structure can be used to export a I18n object.

```javascript
import I18n from 'locale-loader/lib/I18n';
import loadLocale from './loadLocale';

export default new I18n(loadLocale);
```

locale-loader
---

locale-oader is a webpack loader, this must be placed before babel-loader.


Example webpack config
```javascript
module.exports = {
    module: {
      rules: [
        {
            test: /\.js$/,
            use: [
                'babel-loader',
                'locale-loader',
            ],
            exclude: /node_modules/,
        },
    }
}
```

transformLocaleLoader
---
For building libraries and releasing, often we only compile the source to es2015 with babel transform and not webpack. The transformLocaleLoader is a gulp transform that can transform the loader files with generated code so the final result is ready to use.

gulpfile.js
```javascript
gulp.src('./src')
    .pipe(transformLocaleLoader())
    .pipe(babel(...babelConfig))
    .pipe(gulp.dest('./build'));
```

Export to Xlf
---

The exportLocale function can be used to generate xlf files.

```javascript
import ExportLocale from 'locale-loader/exportLocale';

const config = {
    sourceLocale: 'en-US', // the default locale with original strings
    supportedLocales: ['en-US', 'fr-FR', 'ja-JP'], // the array of locales to support
    sourceFolder: 'src', // export locale will use 'src/**/*.js' glob to search for loaders
    localizationFolder: 'localization', // exported files will be saved to here
    exportType: 'diff', // determines what is exported
};

exportLocale(config).then(() => {
    console.log('.xlf generated to `cwd()/localization/`');
});

```

**Export Types**

1. 'diff': Diff will only export entries that have not been translated, or have been modified since last translation. This is the default mode.
2. 'full': This will export everything.
3. 'translated': This will only export translated entries.

