/* eslint-disable no-console */
import cp from 'child_process';
import path from 'path';

import {
  exportLocale as el,
  importLocale as il,
} from '@ringcentral-integration/locale-loader';
import localeSettings from '@ringcentral-integration/locale-settings';
import {
  getProjectConfig,
  startDevServer,
} from '@ringcentral-integration/next-builder';
import fs from 'fs-extra';
import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import webpack from 'webpack';

import type { AppConfig } from './config';
import { getWebpackConfig } from './webpack.config';

// ============================================
// App Build Tasks (webpack-based MFE build)
// ============================================

export async function devServer() {
  const projectConfig = getProjectConfig<AppConfig>();
  const webpackConfig = getWebpackConfig({ projectConfig, devServer: true });
  await startDevServer(webpackConfig, projectConfig.devServerPort);
}

export async function build() {
  const projectConfig = getProjectConfig<AppConfig>();
  const webpackConfig = getWebpackConfig({ projectConfig });
  // it should be a serial execution
  // When two different targets have directory dependencies and run in parallel,
  // the worker folder could be accidentally deleted due to race conditions in execution order.
  for (const config of webpackConfig) {
    await new Promise((resolve, reject) => {
      webpack(config, (err, stats) => {
        if (err || stats!.hasErrors()) {
          reject(
            err || new Error(JSON.stringify(stats!.toJson().errors, null, 2)),
          );
          return;
        }
        resolve(true);
      });
    });
  }
}

export async function exportLocale() {
  return el(localeSettings);
}

export async function importLocale() {
  return il(localeSettings);
}

// ============================================
// Library Build Tasks (for NPM release)
// ============================================

const LIB_BUILD_PATH = path.resolve(__dirname, '../../build/micro-next-commons');
const RELEASE_PATH = path.resolve(__dirname, '../../release/micro-next-commons');

export function libClean() {
  return fs.remove(LIB_BUILD_PATH);
}

// Copy TypeScript source files for type information
export function libCopySource() {
  return gulp
    .src(
      [
        './src/**/*.ts',
        './src/**/*.tsx',
        '!./**/*.test.ts',
        '!./**/*.test.tsx',
        '!./**/*.spec.ts',
        '!./**/*.spec.tsx',
      ],
      {
        base: './',
      },
    )
    .pipe(gulp.dest(LIB_BUILD_PATH));
}

// Copy assets (SVG, SCSS, etc.)
export function libCopyAssets() {
  return gulp
    .src(['./src/**/*.svg', './src/**/*.png', './src/**/*.scss'], {
      base: './',
    })
    .pipe(gulp.dest(LIB_BUILD_PATH));
}

// Compile TypeScript to JavaScript
export function libCompile() {
  return gulp
    .src(
      [
        './src/**/*.ts',
        './src/**/*.tsx',
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
    .pipe(gulp.dest(LIB_BUILD_PATH));
}

export const libBuild = gulp.series(
  libClean,
  gulp.parallel(libCopySource, libCopyAssets),
  libCompile,
);

async function exec(command: string): Promise<string> {
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

async function getVersionFromTag(): Promise<string | null> {
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
    .src([
      `${LIB_BUILD_PATH}/**`,
      `${__dirname}/README.md`,
      `${__dirname}/LICENSE`,
    ])
    .pipe(gulp.dest(RELEASE_PATH));
}

export async function generatePackage() {
  const packageInfo = JSON.parse(
    await fs.readFile(path.resolve(__dirname, 'package.json'), 'utf-8'),
  );
  delete packageInfo.scripts;
  delete packageInfo.devDependencies;
  delete packageInfo.ci;
  delete packageInfo.nx;
  delete packageInfo.common;
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

export const release = gulp.series(
  gulp.parallel(libBuild, releaseClean),
  gulp.parallel(releaseCopy, generatePackage),
);
