import gulp from 'gulp';
import path from 'path';
import fs from 'fs-extra';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import execa from 'execa';
import transformLoader from '@ringcentral-integration/locale-loader/lib/transformLoader';
import exportLocale from '@ringcentral-integration/locale-loader/lib/exportLocale';
import importLocale from '@ringcentral-integration/locale-loader/lib/importLocale';
import consolidateLocale from '@ringcentral-integration/locale-loader/lib/consolidateLocale';
import localeSettings from '@ringcentral-integration/locale-settings';

async function getVersionFromTag() {
  let tag = process.env.TRAVIS_TAG;
  if (tag && /^\d+.\d+.\d+/.test(tag)) {
    return tag;
  }
  try {
    tag = await execa.shell('git describe --exact-match --tags $(git rev-parse HEAD)');
    tag = tag.replace(/\r?\n|\r/g, '');
    if (/^\d+.\d+.\d+/.test(tag)) {
      return tag;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

const BUILD_PATH = path.resolve(__dirname, '../../build/glip-widgets');
gulp.task('clean', async () => (
  fs.remove(BUILD_PATH)
));

gulp.task('build', ['clean', 'copy'], () => (
  gulp.src([
    './**/*.js',
    '!./**/*.test.js',
    '!./coverage{/**,}',
    '!./node_modules{/**,}',
    '!gulpfile.babel.js']
  ).pipe(transformLoader({
    ...localeSettings,
  }))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(BUILD_PATH))
));

gulp.task('copy', ['clean'], () => (
  gulp.src([
    './**',
    '!./**/*.js',
    '!./test{/**,}',
    '!./coverage{/**,}',
    '!./node_modules{/**,}',
    '!package-lock.json'
  ]).pipe(gulp.dest(BUILD_PATH))
));

const RELEASE_PATH = path.resolve(__dirname, '../../release/glip-widgets');
gulp.task('release-clean', async () => {
  if (!await fs.exists(RELEASE_PATH)) {
    await execa.shell(`mkdir -p ${RELEASE_PATH}`);
  }
  const files = (await fs.readdir(RELEASE_PATH)).filter(file => !/^\./.test(file));
  for (const file of files) {
    await fs.remove(path.resolve(RELEASE_PATH, file));
  }
});

gulp.task('release-copy', ['build', 'release-clean'], () => (
  gulp.src([
    `${BUILD_PATH}/**`,
    `${__dirname}/README.md`,
    `${__dirname}/LICENSE`
  ]).pipe(gulp.dest(RELEASE_PATH))
));

gulp.task('release', ['release-copy'], async () => {
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
});

gulp.task('export-locale', () => exportLocale({
  ...localeSettings,
}));
gulp.task('export-locale-full', () => exportLocale({
  ...localeSettings,
  exportType: 'full'
}));
gulp.task('export-locale-translated', () => exportLocale({
  ...localeSettings,
  exportType: 'translated'
}));
gulp.task('import-locale', () => importLocale({
  ...localeSettings,
}));
gulp.task('consolidate-locale', () => consolidateLocale({
  ...localeSettings,
  sourceFolder: path.resolve(__dirname, 'lib/countryNames'),
}));
