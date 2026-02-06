import path from 'path';
import cp from 'child_process';
import gulp from 'gulp';
import fs from 'fs-extra';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';

const BUILD_PATH = path.resolve(__dirname, '../../build/next-builder');

export function clean() {
  return fs.remove(BUILD_PATH);
}

// Copy TypeScript source files for type information
export function copySource() {
  return gulp
    .src(
      [
        './src/**/*.ts',
        './index.ts',
        '!./**/*.test.ts',
        '!./**/*.snapshot.test.ts',
      ],
      {
        base: './',
      },
    )
    .pipe(gulp.dest(BUILD_PATH));
}

// Copy bin directory (CLI entry point)
export function copyBin() {
  return gulp
    .src(['./bin/**/*'], {
      base: './',
    })
    .pipe(gulp.dest(BUILD_PATH));
}

// Copy templates and other assets (HTML, JS, JSON)
export function copyAssets() {
  return gulp
    .src(
      [
        './src/**/*.html',
        './src/**/*.js',
        './src/**/*.json',
        './src/**/README.md',
      ],
      {
        base: './',
      },
    )
    .pipe(gulp.dest(BUILD_PATH));
}

// Compile TypeScript to JavaScript
export function compile() {
  return gulp
    .src(
      [
        './src/**/*.ts',
        './index.ts',
        './scripts/**/*.ts',
        '!./**/*.test.ts',
        '!./**/*.snapshot.test.ts',
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

export const build = gulp.series(
  clean,
  gulp.parallel(copySource, copyBin, copyAssets),
  compile,
);

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

const RELEASE_PATH = path.resolve(__dirname, '../../release/next-builder');

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
  delete packageInfo.devDependencies;
  delete packageInfo.ci;
  delete packageInfo.nx;
  delete packageInfo.common;
  // Update main to point to compiled JS
  packageInfo.main = 'index.js';
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
