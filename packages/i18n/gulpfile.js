import path from 'path';
import cp from 'child_process';
import gulp from 'gulp';
import fs from 'fs-extra';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import yargs from 'yargs';

const DEFAULT_BUILD_PATH = path.resolve(__dirname, '../../build/i18n');
const DEFAULT_BABEL_CONFIG = 'babel.config.js';
const SUPPORTED_BABEL_CONFIGS = [
  DEFAULT_BABEL_CONFIG,
  'electron-babel.config.js',
];

const { argv } = yargs
  .alias({
    buildPath: 'build-path',
    babelConfig: 'babel-config',
  })
  .default('buildPath', DEFAULT_BUILD_PATH)
  .default('babelConfig', DEFAULT_BABEL_CONFIG)
  .choices('babelConfig', SUPPORTED_BABEL_CONFIGS);

const { buildPath, babelConfig } = argv;

export function clean() {
  return fs.remove(buildPath);
}

export function compile() {
  const configFile = path.resolve(__dirname, babelConfig);
  if (!fs.existsSync(configFile)) {
    throw new Error(`Not found babel config ${configFile}`);
  }
  return gulp
    .src(
      [
        './lib/**/*.js',
        './lib/**/*.ts',
        '!./lib/**/*.test.js',
        './index.js',
        './*.ts',
      ],
      {
        base: './',
      },
    )
    .pipe(sourcemaps.init())
    .pipe(babel({ configFile }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildPath));
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

const RELEASE_PATH = path.resolve(__dirname, '../../release/i18n');

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
