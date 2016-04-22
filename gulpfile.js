import gulp from 'gulp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import babelIstanbul from 'babel-istanbul';
import config from './config';

gulp.task('pre-coverage', () => {
  return gulp.src('src/**/*.js')
  .pipe(istanbul({
    includeUntested: true,
    instrumenter: babelIstanbul.Instrumenter
  }))
  .pipe(istanbul.hookRequire());
});

gulp.task('coverage', ['pre-coverage'], () => {
  return gulp.src('test/*')
  .pipe(mocha())
  .pipe(istanbul.writeReports());
});

gulp.task('test', () => {
  return gulp.src('test/*')
  .pipe(mocha());
});
