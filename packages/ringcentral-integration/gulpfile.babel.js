import gulp from 'gulp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import babelIstanbul from 'babel-istanbul';
import yargs from 'yargs';
import through from 'through2';
import path from 'path';
import fs from 'fs-extra';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
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


gulp.task('pre-coverage', () => {
  const testSources = getTestSources();

  return gulp.src([
    'enums/**/*.js',
    'lib/**/*.js',
    'modules/**/*.js',
    '!./**/*.test.js',
  ]).pipe(istanbul({
    includeUntested: testSources.length === 2 && testSources[0] === './**/*.test.js',
    instrumenter: babelIstanbul.Instrumenter,
  })).pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-coverage'], () => (
  gulp.src(getTestSources())
    .pipe(mocha({
      timeout: TIMEOUT,
      compilers: 'js:babel-core/register'
    }))
    .pipe(istanbul.writeReports())
));

gulp.task('quick-test', () => (
  gulp.src(getTestSources())
    .pipe(mocha({
      timeout: TIMEOUT,
      compilers: 'js:babel-core/register'
    }))
));

async function rm(filepath) {
  if (await fs.exists(filepath)) {
    if ((await fs.stat(filepath)).isDirectory()) {
      await Promise.all(
        (await fs.readdir(filepath))
          .map(item => rm(path.resolve(filepath, item)))
      );
      await fs.rmdir(filepath);
    } else {
      await fs.unlink(filepath);
    }
  }
}

const BUILD_PATH = path.resolve(__dirname, '../../build/ringcentral-integration');
gulp.task('clean', async () => (
  rm(BUILD_PATH)
));

gulp.task('build', ['clean'], () => (
  gulp.src([
    './**/*.js',
    '!./**/*.test.js',
    '!./*.js',
    '!./coverage{/**,}',
    '!./docs{/**,}',
    '!./karma{/**,}',
    '!./junit{/**,}',
    '!./node_modules{/**,}',
  ]).pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(BUILD_PATH))
));

function splitCmd(cmd) {
  const quotes = [];
  const quoteReg = /(".*?"|'.*?')/;
  const replacementReg = /\{\{([0-9]*)\}\}/;
  let pCmd = cmd;
  let match = quoteReg.exec(pCmd);
  while (match) {
    const replaceStr = `{{${quotes.length}}}`;
    quotes.push(match[0]);
    pCmd = pCmd.replace(match[0], replaceStr);
    match = quoteReg.exec(pCmd);
  }
  return pCmd.split(' ').map((token) => {
    const quoteMatch = replacementReg.exec(token);
    if (quoteMatch && quoteMatch[1]) {
      const number = parseInt(quoteMatch[1], 10);
      if (quotes[number]) {
        return quotes[number];
      }
    }
    return token;
  });
}

async function spawn(cmd, opts = {}) {
  return new Promise((resolve, reject) => {
    const [program, ...args] = splitCmd(cmd);
    const options = {
      stdio: 'inherit',
    };
    Object.assign(options, opts);
    cp.spawn(program, args, options).on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(code);
      }
    }).on('error', reject);
  });
}

async function exec(command) {
  return new Promise((resolve, reject) => {
    cp.exec(command, (error, stdout, stderr) => {
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
    let tag = await exec('git describe --exact-match --tags $(git rev-parse HEAD)');
    console.log(tag);
    tag = tag.replace(/\r?\n|\r/g, '');
    if (/^\d+.\d+.\d+/.test(tag)) {
      return tag;
    }
    return null;
  } catch (e) {
    return null;
  }
}

const RELEASE_PATH = path.resolve(__dirname, '../../release/ringcentral-integration');
gulp.task('release-clean', async () => {
  if (!await fs.exists(RELEASE_PATH)) {
    await fs.mkdirp(RELEASE_PATH);
  }
  const files = (await fs.readdir(RELEASE_PATH)).filter(file => !/^\./.test(file));
  for (const file of files) {
    await rm(path.resolve(RELEASE_PATH, file));
  }
});

gulp.task('release-copy', ['build', 'release-clean'], () => (
  gulp.src([`${BUILD_PATH}/**`, `${__dirname}/README.md`, `${__dirname}/LICENSE`])
    .pipe(gulp.dest(RELEASE_PATH))
));

gulp.task('release', ['release-copy'], async () => {
  const packageInfo = JSON.parse(await fs.readFile(path.resolve(__dirname, 'package.json')));
  delete packageInfo.scripts;
  packageInfo.main = 'rc-phone.js';
  const version = await getVersionFromTag();
  console.log(version);
  if (version) {
    packageInfo.version = version;
  }
  await fs.writeFile(path.resolve(RELEASE_PATH, 'package.json'), JSON.stringify(packageInfo, null, 2));
  gulp.src([path.resolve(__dirname, 'integration-test/mock/data/*.json')])
    .pipe(gulp.dest(path.resolve(RELEASE_PATH, 'integration-test/mock/data')));
});
