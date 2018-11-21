import gulp from 'gulp';
import path from 'path';
import fs from 'fs-extra';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import execa from 'execa';
import transformLoader from '@ringcentral-integration/locale-loader/lib/transformLoader';
import dedent from 'dedent';
import exportLocale from '@ringcentral-integration/locale-loader/lib/exportLocale';
import importLocale from '@ringcentral-integration/locale-loader/lib/importLocale';
import consolidateLocale from '@ringcentral-integration/locale-loader/lib/consolidateLocale';
import localeSettings from 'locale-settings';

const BUILD_PATH = path.resolve(__dirname, '../../build/ringcentral-widgets');
const RELEASE_PATH = path.resolve(__dirname, '../../release/ringcentral-widgets');

async function getVersionFromTag() {
  let tag = process.env.TRAVIS_TAG;
  if (tag && /^\d+.\d+.\d+/.test(tag)) {
    return tag;
  }
  try {
    tag = await execa.shell('git describe --exact-match --tags $(git rev-parse HEAD)');
    tag = tag.stdout.replace(/\r?\n|\r/g, '');
    if (/^\d+.\d+.\d+/.test(tag)) {
      return tag;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}
function clean() {
  return fs.remove(BUILD_PATH);
}
function copy() {
  return gulp.src([
    './**',
    '!./**/*.js',
    '!./test{/**,}',
    '!./coverage{/**,}',
    '!./node_modules{/**,}',
    '!package-lock.json'
  ]).pipe(gulp.dest(BUILD_PATH));
}
function preBuild() {
  return gulp.src([
    './**/*.js',
    '!./**/*.test.js',
    '!./test{/**,}',
    '!./coverage{/**,}',
    '!./node_modules{/**,}',
    '!gulpfile.babel.js']
  ).pipe(transformLoader({
    ...localeSettings,
  }))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(BUILD_PATH));
}
const build = gulp.series(clean, copy, preBuild);
async function releaseClean() {
  if (!await fs.exists(RELEASE_PATH)) {
    await execa.shell(`mkdir -p ${RELEASE_PATH}`);
  }
  const files = (await fs.readdir(RELEASE_PATH)).filter(file => !/^\./.test(file));
  for (const file of files) {
    await fs.remove(path.resolve(RELEASE_PATH, file));
  }
}
function releaseCopy() {
  return gulp.src([
    `${BUILD_PATH}/**`,
    `${__dirname}/README.md`,
    `${__dirname}/LICENSE`
  ]).pipe(gulp.dest(RELEASE_PATH));
}
async function preRelease() {
  const packageInfo = JSON.parse(await fs.readFile(path.resolve(BUILD_PATH, 'package.json')));
  delete packageInfo.scripts;
  delete packageInfo.jest;
  const version = await getVersionFromTag();
  console.log('version:', version);
  if (version) {
    packageInfo.version = version;
    packageInfo.name = 'ringcentral-widgets';
  }
  await fs.writeFile(path.resolve(RELEASE_PATH, 'package.json'), JSON.stringify(packageInfo, null, 2));
}
const release = gulp.series(gulp.parallel(build, releaseClean),
  releaseCopy, preRelease);
function normalizeName(str) {
  return str.split(/[-_]/g)
    .map((token, idx) => (
      `${idx > 0 ? token[0].toUpperCase() : token[0].toLowerCase()}${token.toLowerCase().substr(1)}`
    ))
    .join('');
}
export {
  build,
  release
};

exports['generate-font'] = async () => {
  try {
    const cssLocation = path.resolve(__dirname, 'assets/DynamicsFont/style.css');
    const content = await fs.readFile(cssLocation, 'utf8');
    let output = content
      .replace(/url\('fonts\/dynamics_icon/g, "url('./fonts/dynamics_icon")
      .replace('[class^="icon-"], [class*=" icon-"]', '.icon');
    const regExp = /\.icon-(.*):before/;
    let match;
    do {
      match = regExp.exec(output);
      if (match) {
        const [target, name] = match;
        const normalizedName = normalizeName(name);
        const newContent = dedent`
      .${normalizedName} {
        composes: icon;
      }
      .${normalizedName}:before `;
        output = output.replace(target, newContent);
      }
    } while (match);
    await fs.writeFile(path.resolve(__dirname, 'assets/DynamicsFont/DynamicsFont.scss'), output, 'utf8');
  } catch (error) {
    console.log(error);
  }
};
exports['export-locale'] = async () => exportLocale({
  ...localeSettings,
});
exports['export-locale-full'] = async () => exportLocale({
  ...localeSettings,
  exportType: 'full'
});
exports['export-locale-translated'] = async () => exportLocale({
  ...localeSettings,
  exportType: 'translated'
});
exports['import-locale'] = async () => importLocale({
  ...localeSettings,
});
exports['consolidate-locale'] = async () => consolidateLocale({
  ...localeSettings,
  sourceFolder: path.resolve(__dirname, 'lib/countryNames'),
});
