import cp from 'child_process';
import path from 'path';
import babelIstanbul from 'babel-istanbul';
import fs from 'fs-extra';
import gulp from 'gulp';
import babel from 'gulp-babel';
import istanbul from 'gulp-istanbul';
import mocha from 'gulp-mocha';
import sourcemaps from 'gulp-sourcemaps';
import yargs from 'yargs';

import transformLoader from '@ringcentral-integration/locale-loader/lib/transformLoader';
import localeSettings from '@ringcentral-integration/locale-settings';
import exportLocale from '@ringcentral-integration/locale-loader/lib/exportLocale';
import importLocale from '@ringcentral-integration/locale-loader/lib/importLocale';

const TIMEOUT = 30000;
const { argv } = yargs;

function getTestSources() {
  const src = new Set();

  // check --folder
  if (argv.folder) {
    if (Array.isArray(argv.folder)) {
      argv.folder.forEach((str) => {
        str.split(',').forEach((f) => {
          src.add(`${f}/**/*.test.js`);
          src.add(`${f}/**/*.test.ts`);
        });
      });
    } else {
      argv.folder.split(',').forEach((f) => {
        src.add(`${f}/**/*.test.js`);
        src.add(`${f}/**/*.test.ts`);
      });
    }
  }

  // check --file
  if (argv.file) {
    if (Array.isArray(argv.file)) {
      argv.file.forEach((str) => {
        str.split(',').forEach((f) => {
          src.add(f);
        });
      });
    } else {
      argv.file.split(',').forEach((f) => {
        src.add(f);
      });
    }
  }

  if (!src.size) {
    src.add('./**/*.test.js');
    src.add('./**/*.test.ts');
    src.add('!./node_modules{/**,}');
  }

  return [...src];
}

function preCoverage() {
  const testSources = getTestSources();

  return gulp
    .src([
      'enums/**/*.js',
      'lib/**/*.js',
      'modules/**/*.js',
      '!./**/*.test.js',
      '!./**/*.test.ts',
    ])
    .pipe(
      istanbul({
        includeUntested:
          testSources.length === 2 &&
          (testSources[0] === './**/*.test.js' ||
            testSources[0] === './**/*.test.ts'),
        instrumenter: babelIstanbul.Instrumenter,
      }),
    )
    .pipe(istanbul.hookRequire());
}

function runTest() {
  return gulp
    .src(getTestSources())
    .pipe(
      mocha({
        require: ['integration-test/setup.ts'],
        timeout: TIMEOUT,
        compilers: 'js:@ringcentral-integration/babel-settings/lib/register',
      }),
    )
    .pipe(istanbul.writeReports());
}

export const test = gulp.series(preCoverage, runTest);

export function quickTest() {
  return gulp.src(getTestSources()).pipe(
    mocha({
      require: ['integration-test/setup.ts'],
      timeout: TIMEOUT,
      compilers: 'js:@ringcentral-integration/babel-settings/lib/register',
    }),
  );
}
const BUILD_PATH = path.resolve(
  __dirname,
  '../../build/ringcentral-integration',
);

export function clean() {
  return fs.remove(BUILD_PATH);
}

export function compile() {
  return gulp
    .src([
      './**/*.js',
      './**/*.ts',
      '!./**/*.d.ts',
      '!./**/*.test.js',
      '!./**/*.test.ts',
      '!./*.js',
      '!./coverage{/**,}',
      '!./docs{/**,}',
      '!./karma{/**,}',
      '!./junit{/**,}',
      '!./node_modules{/**,}',
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

export const build = gulp.series(clean, compile);

async function exec(command) {
  return new Promise((resolve, reject) => {
    cp.exec(command, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

async function getVersionFromTag() {
  let tag = process.env.TRAVIS_TAG;
  if (tag && /^\d+.\d+.\d+/.test(tag)) {
    return tag;
  }
  try {
    tag = await exec('git describe --exact-match --tags $(git rev-parse HEAD)');
    console.log(tag);
    tag = tag.replace(/\r?\n|\r/g, '');
    if (/^\d+.\d+.\d+/.test(tag)) {
      return tag;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

const RELEASE_PATH = path.resolve(
  __dirname,
  '../../release/ringcentral-integration',
);

export async function releaseClean() {
  if (!(await fs.exists(RELEASE_PATH))) {
    await fs.mkdirp(RELEASE_PATH);
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
    await fs.readFile(path.resolve(__dirname, 'package.json')),
  );
  delete packageInfo.scripts;
  packageInfo.main = 'rc-phone.js';
  const version = await getVersionFromTag();
  console.log('version:', version);
  if (version) {
    packageInfo.version = version;
  }
  await fs.writeFile(
    path.resolve(RELEASE_PATH, 'package.json'),
    JSON.stringify(packageInfo, null, 2),
  );
  gulp
    .src([path.resolve(__dirname, 'integration-test/mock/data/*.json')])
    .pipe(gulp.dest(path.resolve(RELEASE_PATH, 'integration-test/mock/data')));
}

export const release = gulp.series(
  gulp.parallel(build, releaseClean),
  gulp.parallel(releaseCopy, generatePackage),
);

exports['export-locale'] = async () =>
  exportLocale({
    ...localeSettings,
  });
exports['export-locale-full'] = async () =>
  exportLocale({
    ...localeSettings,
    exportType: 'full',
  });
exports['export-locale-translated'] = async () =>
  exportLocale({
    ...localeSettings,
    exportType: 'translated',
  });
exports['import-locale'] = async () =>
  importLocale({
    ...localeSettings,
  });
