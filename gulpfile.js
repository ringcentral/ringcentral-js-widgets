import gulp from 'gulp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import babelIstanbul from 'babel-istanbul';
import yargs from 'yargs';

const TIMEOUT = 10000;
const argv = yargs.argv;

function getTestSources() {
  const src = new Set();
  if (!argv.folder) {
    src.add('test/**/*.js');
  } else if (Array.isArray(argv.folder)) {
    argv.folder.forEach(str => {
      str.split(',').forEach(f => {
        src.add(`test/${f}/**/*.js`);
      });
    });
  } else {
    argv.folder.split(',').forEach(f => {
      src.add(`test/${f}/**/*.js`);
    });
  }

  let folders = argv.folder || '';
  if (!Array.isArray(folders)) folders = [folders];

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
