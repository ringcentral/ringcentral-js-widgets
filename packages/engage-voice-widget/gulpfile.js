import execa from 'execa';
import fs from 'fs-extra';
import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import os from 'os';
import path from 'path';

import exportLocale from '@ringcentral-integration/locale-loader/lib/exportLocale';
import importLocale from '@ringcentral-integration/locale-loader/lib/importLocale';
import transformLoader from '@ringcentral-integration/locale-loader/lib/transformLoader';
import localeSettings from '@ringcentral-integration/locale-settings';

const BUILD_PATH = path.resolve(__dirname, '../../build/engage-voice-widgets');
const RELEASE_PATH = path.resolve(
  __dirname,
  '../../release/engage-voice-widgets',
);

async function getVersionFromTag() {
  let tag = process.env.TRAVIS_TAG;
  if (tag && /^\d+.\d+.\d+/.test(tag)) {
    return tag;
  }
  try {
    tag = await execa.command(
      'git describe --exact-match --tags $(git rev-parse HEAD)',
      {
        shell: true,
      },
    );
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
  return gulp
    .src([
      './**',
      '!./**/*.js',
      '!./test{/**,}',
      '!./coverage{/**,}',
      '!./node_modules{/**,}',
      '!package-lock.json',
    ])
    .pipe(gulp.dest(BUILD_PATH));
}
function preBuild() {
  return gulp
    .src([
      './**/*.js',
      './**/*.ts',
      './**/*.tsx',
      '!./**/*.test.js',
      '!./test{/**,}',
      '!./coverage{/**,}',
      '!./node_modules{/**,}',
      '!gulpfile.js',
      '!babel.config.js',
      '!gulpfile.babel.js',
    ])
    .pipe(
      transformLoader({
        ...localeSettings,
      }),
    )
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(BUILD_PATH));
}
const build = gulp.series(clean, copy, preBuild);
async function releaseClean() {
  if (!(await fs.exists(RELEASE_PATH))) {
    await execa.command(`mkdir -p ${RELEASE_PATH}`, { shell: true });
  }
  const files = (await fs.readdir(RELEASE_PATH)).filter(
    (file) => !/^\./.test(file),
  );
  for (const file of files) {
    await fs.remove(path.resolve(RELEASE_PATH, file));
  }
}
function releaseCopy() {
  return gulp
    .src([`${BUILD_PATH}/**`, `${__dirname}/README.md`, `${__dirname}/LICENSE`])
    .pipe(gulp.dest(RELEASE_PATH));
}
async function preRelease() {
  const packageInfo = JSON.parse(
    await fs.readFile(path.resolve(BUILD_PATH, 'package.json')),
  );
  delete packageInfo.scripts;
  delete packageInfo.jest;
  const version = await getVersionFromTag();
  console.log('version:', version);
  if (version) {
    packageInfo.version = version;
  }
  await fs.writeFile(
    path.resolve(RELEASE_PATH, 'package.json'),
    JSON.stringify(packageInfo, null, 2) + os.EOL,
  );
}
const release = gulp.series(
  gulp.parallel(build, releaseClean),
  releaseCopy,
  preRelease,
);
export { build, release };

exports['export-locale'] = () =>
  exportLocale({
    ...localeSettings,
  });
exports['export-locale-full'] = () =>
  exportLocale({
    ...localeSettings,
    exportType: 'full',
  });
exports['export-locale-translated'] = () =>
  exportLocale({
    ...localeSettings,
    exportType: 'translated',
  });
exports['import-locale'] = () =>
  importLocale({
    ...localeSettings,
  });
