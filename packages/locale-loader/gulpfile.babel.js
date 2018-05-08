import gulp from 'gulp';
import path from 'path';
import fs from 'fs-extra';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import cp from 'child_process';
import yargs from 'yargs';
import istanbul from 'gulp-istanbul';
import babelIstanbul from 'babel-istanbul';
import mocha from 'gulp-mocha';

const TIMEOUT = 30000;
const argv = yargs.argv;

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

gulp.task('clean', async () => (
  rm(path.resolve(__dirname, 'build'))
));

gulp.task('build', ['clean'], () => (
  gulp.src(['src/**/*.js', '!src/**/*.test.js'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'))
));

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
    let tag = await exec('git describe --exact-match --tags $(git rev-parse HEAD)');
    tag = tag.replace(/\r?\n|\r/g, '');
    if (/^\d+.\d+.\d+/.test(tag)) {
      return tag;
    }
    return null;
  } catch (e) {
    return null;
  }
}

gulp.task('release-clean', async () => {
  if (!await fs.exists('release')) {
    await fs.mkdir('release');
  }
  const files = (await fs.readdir('release')).filter(file => !/^\./.test(file));
  for (const file of files) {
    await rm(path.resolve(__dirname, 'release', file));
  }
});

gulp.task('release-copy', ['build', 'release-clean'], () => (
  gulp.src(['build/**', 'README.md', 'LICENSE'])
    .pipe(gulp.dest('release'))
));

gulp.task('release', ['release-copy'], async () => {
  const packageInfo = JSON.parse(await fs.readFile('package.json'));
  delete packageInfo.scripts;
  packageInfo.main = 'index.js';
  const version = await getVersionFromTag();
  if (version) {
    packageInfo.version = version;
  }
  await fs.writeFile('release/package.json', JSON.stringify(packageInfo, null, 2));
});


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
    src.add('src/**/*.test.js');
  }

  return [...src];
}

gulp.task('pre-coverage', () => {
  const testSources = getTestSources();

  return gulp.src(['src/lib/**/*.js', '!src/**/*.test.js'])
    .pipe(istanbul({
      includeUntested: testSources.length === 1 && testSources[0] === 'src/**/*.test.js',
      instrumenter: babelIstanbul.Instrumenter,
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-coverage'], () => (
  gulp.src(getTestSources())
    .pipe(mocha({
      timeout: TIMEOUT,
    }))
    .pipe(istanbul.writeReports())
));

gulp.task('quick-test', () => (
  gulp.src(getTestSources())
    .pipe(mocha({
      timeout: TIMEOUT,
    }))
));
