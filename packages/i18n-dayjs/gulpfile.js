import cp from 'child_process';
import fs from 'fs-extra';
import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import path from 'path';
import yargs from 'yargs';
import transformLoader from '@ringcentral-integration/locale-loader/lib/transformLoader';
import localeSettings from '@ringcentral-integration/locale-settings';

const DEFAULT_BUILD_PATH = path.resolve(__dirname, '../../build/i18n-dayjs');

const { argv } = yargs
  .alias({
    buildPath: 'build-path',
  })
  .default('buildPath', DEFAULT_BUILD_PATH);

const { buildPath } = argv;

export function clean() {
  return fs.remove(buildPath);
}

// Copy TypeScript source files for type information
export function copySource() {
  return gulp
    .src(['./src/**/*.ts', './index.ts'], { base: './' })
    .pipe(gulp.dest(buildPath));
}

// Compile TypeScript to JavaScript with locale transformation
export function compile() {
  return gulp
    .src(['./src/**/*.ts', './index.ts'], { base: './' })
    .pipe(transformLoader({ ...localeSettings }))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildPath));
}

export const build = gulp.series(clean, copySource, compile);

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
  try {
    let tag = await exec(
      'git describe --exact-match --tags $(git rev-parse HEAD)',
    );
    tag = tag.replace(/\r?\n|\r/g, '');
    if (/^\d+.\d+.\d+/.test(tag)) {
      return tag;
    }
    return null;
  } catch (e) {
    return null;
  }
}

const RELEASE_PATH = path.resolve(__dirname, '../../release/i18n-dayjs');

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
    .src([`${buildPath}/**`, `${__dirname}/README.md`, `${__dirname}/LICENSE`])
    .pipe(gulp.dest(RELEASE_PATH));
}

export async function generatePackage() {
  const packageInfo = JSON.parse(
    await fs.readFile(path.resolve(__dirname, 'package.json')),
  );
  delete packageInfo.scripts;
  delete packageInfo.devDependencies;
  const version = await getVersionFromTag();
  if (version) {
    packageInfo.version = version;
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
