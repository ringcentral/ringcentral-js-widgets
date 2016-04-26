import gulp from 'gulp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import babelIstanbul from 'babel-istanbul';
import config from './config';

const TIMEOUT = 10000;

gulp.task('pre-coverage', () => {
  return gulp.src('src/**/*.js')
  .pipe(istanbul({
    includeUntested: true,
    instrumenter: babelIstanbul.Instrumenter
  }))
  .pipe(istanbul.hookRequire());
});

gulp.task('coverage', ['pre-coverage'], () => {
  return gulp.src('test/**/*.js')
  .pipe(mocha({
    timeout: TIMEOUT
  }))
  .pipe(istanbul.writeReports());
});

gulp.task('test', () => {
  return gulp.src('test/**/*.js')
  .pipe(mocha({
    timeout: TIMEOUT
  }));
});

gulp.task('unitTest', () => {
  return gulp.src('test/unit/*')
  .pipe(mocha({
    timeout: TIMEOUT
  }));
});
