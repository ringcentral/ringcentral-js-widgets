import gulp from 'gulp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import babelIstanbul from 'babel-istanbul';
import yargs from 'yargs';

const TIMEOUT = 10000;
const argv = yargs.argv;

function getTestSources() {
  const src = new Set();

  // check --folder
  if (argv.folder) {
    if (Array.isArray(argv.folder)) {
      argv.folder.forEach(str => {
        str.split(',').forEach(f => {
          src.add(`${f}/**/*.js`);
        });
      });
    } else {
      argv.folder.split(',').forEach(f => {
        src.add(`${f}/**/*.js`);
      });
    }
  }

  // check --file
  if (argv.file) {
    if (Array.isArray(argv.file)) {
      argv.file.forEach(str => {
        str.split(',').forEach(f => {
          src.add(f);
        });
      });
    } else {
      argv.file.split(',').forEach(f => {
        src.add(f);
      });
    }
  }

  if (!src.size) {
    src.add('test/**/*.js');
  }

  return [...src];
}


gulp.task('pre-coverage', () => (
  gulp.src('src/**/*.js')
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: babelIstanbul.Instrumenter,
    }))
    .pipe(istanbul.hookRequire())
));

gulp.task('coverage', ['pre-coverage'], () => (
  gulp.src('test/**/*.js')
    .pipe(mocha({
      timeout: TIMEOUT,
    }))
    .pipe(istanbul.writeReports())
));

gulp.task('test', () => (
  gulp.src(getTestSources())
    .pipe(mocha({
      timeout: TIMEOUT,
    }))
));
