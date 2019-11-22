import gulp from 'gulp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import babelIstanbul from 'babel-istanbul';
import yargs from 'yargs';
import path from 'path';
import fs from 'fs-extra';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import cp from 'child_process';

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
        });
      });
    } else {
      argv.folder.split(',').forEach((f) => {
        src.add(`${f}/**/*.test.js`);
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
    src.add('!./node_modules{/**,}');
  }

  return [...src];
}

function preCoverage() {
  const testSources = getTestSources();

  return gulp
    .src(['enums/**/*.js', 'lib/**/*.js', 'modules/**/*.js', '!./**/*.test.js'])
    .pipe(
      istanbul({
        includeUntested:
          testSources.length === 2 && testSources[0] === './**/*.test.js',
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
      './**/*.tsx',
      '!./**/*.d.ts',
      '!./**/*.test.js',
      '!./*.js',
      '!./coverage{/**,}',
      '!./docs{/**,}',
      '!./karma{/**,}',
      '!./junit{/**,}',
      '!./node_modules{/**,}',
    ])
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
