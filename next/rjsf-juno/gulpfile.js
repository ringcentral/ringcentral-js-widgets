const cp = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

const BUILD_PATH = path.resolve(__dirname, '../../build/rjsf-juno');
const RELEASE_PATH = path.resolve(__dirname, '../../release/rjsf-juno');

function clean() {
  return fs.remove(BUILD_PATH);
}

// Copy TypeScript source files for type information
function copySource() {
  return gulp
    .src(
      [
        './src/**/*.ts',
        './src/**/*.tsx',
        './index.ts',
        '!./**/*.test.ts',
        '!./**/*.test.tsx',
        '!./**/*.spec.ts',
        '!./**/*.spec.tsx',
      ],
      {
        base: './',
      },
    )
    .pipe(gulp.dest(BUILD_PATH));
}

// Compile TypeScript to JavaScript
function compile() {
  return gulp
    .src(
      [
        './src/**/*.ts',
        './src/**/*.tsx',
        './index.ts',
        '!./**/*.test.ts',
        '!./**/*.test.tsx',
        '!./**/*.spec.ts',
        '!./**/*.spec.tsx',
      ],
      {
        base: './',
      },
    )
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(BUILD_PATH));
}

const build = gulp.series(clean, copySource, compile);

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

async function releaseClean() {
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

function releaseCopy() {
  return gulp
    .src([
      `${BUILD_PATH}/**`,
      `${__dirname}/README.md`,
      `${__dirname}/LICENSE`,
    ])
    .pipe(gulp.dest(RELEASE_PATH));
}

async function generatePackage() {
  const packageInfo = JSON.parse(
    await fs.readFile(path.resolve(__dirname, 'package.json'), 'utf-8'),
  );
  delete packageInfo.scripts;
  delete packageInfo.devDependencies;
  delete packageInfo.ci;
  delete packageInfo.nx;
  delete packageInfo.comment;
  delete packageInfo.private;
  const version = await getVersionFromTag();
  if (version) {
    packageInfo.version = version;
  }
  await fs.writeFile(
    path.resolve(RELEASE_PATH, 'package.json'),
    JSON.stringify(packageInfo, null, 2),
  );
}

const release = gulp.series(
  gulp.parallel(build, releaseClean),
  gulp.parallel(releaseCopy, generatePackage),
);

exports.clean = clean;
exports.copySource = copySource;
exports.compile = compile;
exports.build = build;
exports.releaseClean = releaseClean;
exports.releaseCopy = releaseCopy;
exports.generatePackage = generatePackage;
exports.release = release;
