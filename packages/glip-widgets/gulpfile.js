import gulp from 'gulp';
import path from 'path';
import fs from 'fs-extra';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import execa from 'execa';
import * as localeLoader from '@ringcentral-integration/locale-loader';
import localeSettings from '@ringcentral-integration/locale-settings';

async function getVersionFromTag() {
  let tag = process.env.TRAVIS_TAG;
  if (tag && /^\d+.\d+.\d+/.test(tag)) {
    return tag;
  }
  try {
    tag = await execa.shell(
      'git describe --exact-match --tags $(git rev-parse HEAD)',
    );
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

export function clean() {
  return fs.remove(BUILD_PATH);
}
export function copy() {
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
export function compile() {
  return gulp
    .src([
      './**/*.js',
      '!./**/*.test.js',
      '!./coverage{/**,}',
      '!./node_modules{/**,}',
      '!gulpfile.babel.js',
    ])
    .pipe(
      localeLoader.transformLoader({
        ...localeSettings,
      }),
    )
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(BUILD_PATH));
}

export const build = gulp.series(clean, gulp.parallel(copy, compile));

const RELEASE_PATH = path.resolve(__dirname, '../../release/glip-widgets');

export async function releaseClean() {
  if (!(await fs.exists(RELEASE_PATH))) {
    await execa.shell(`mkdir -p ${RELEASE_PATH}`);
  }
  const files = (await fs.readdir(RELEASE_PATH)).filter(
    (file) => !/^\./.test(file),
  );
  for (const file of files) {
    await fs.remove(path.resolve(RELEASE_PATH, file));
  }
}

export function releaseCopy() {
  return gulp
    .src([`${BUILD_PATH}/**`, `${__dirname}/README.md`, `${__dirname}/LICENSE`])
    .pipe(gulp.dest(RELEASE_PATH));
}

export async function generatePackage() {
  const packageInfo = JSON.parse(
    await fs.readFile(path.resolve(BUILD_PATH, 'package.json')),
  );
  delete packageInfo.scripts;
  delete packageInfo.jest;
  const version = await getVersionFromTag();
  console.log('version:', version);
  if (version) {
    packageInfo.version = version;
    packageInfo.name = 'ringcentral-widgets';
  }
  await fs.writeFile(
    path.resolve(RELEASE_PATH, 'package.json'),
    JSON.stringify(packageInfo, null, 2),
  );
}

export const release = gulp.series(
  gulp.parallel(build, releaseClean),
  gulp.parallel(releaseCopy, generatePackage),
);

export function exportLocale() {
  return localeLoader.exportLocale({
    ...localeSettings,
  });
}
export function exportFullLocale() {
  return localeLoader.exportLocale({
    ...localeSettings,
    exportType: 'full',
  });
}

export function exportTranslatedLocale() {
  return localeLoader.exportLocale({
    ...localeSettings,
    exportType: 'translated',
  });
}
export function importLocale() {
  return localeLoader.importLocale({
    ...localeSettings,
  });
}
export function consolidateLocale() {
  return localeLoader.consolidateLocale({
    ...localeSettings,
    sourceFolder: path.resolve(__dirname, 'lib/countryNames'),
  });
}
