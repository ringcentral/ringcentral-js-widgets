import gulp from 'gulp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import babelIstanbul from 'babel-istanbul';

const TIMEOUT = 10000;

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
  gulp.src('test/**/*.js')
  .pipe(mocha({
    timeout: TIMEOUT,
  }))
));

gulp.task('unitTest', () => (
  gulp.src('test/unit/*')
  .pipe(mocha({
    timeout: TIMEOUT,
  }))
));
