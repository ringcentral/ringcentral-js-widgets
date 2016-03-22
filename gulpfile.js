var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var rollup = require('gulp-rollup');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var util = require('gulp-util');
var jscs = require('gulp-jscs');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var print = require('gulp-print');

gulp.task('compile', () => {
    watch('./src/scripts/**/**', compile);
    return compile();
});

function compile() {
    return gulp.src('./src/scripts/index.js')
        .pipe(print(function(filepath) {
            return 'built: ' + filepath;
        }))
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err.message);
                this.emit('end');
            }
        }))
        .pipe(rollup({
            sourceMap: true
        }))
        .pipe(babel())
        .on('error', util.log)
        .pipe(rename('build.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build'));
}

gulp.task('default', ['compile']);
gulp.task('lint', function() {
    return gulp.src('src/scripts/**/**')
          .pipe(jscs({fix: true, configPath: '.jscsrc'}))
          .pipe(gulp.dest('src/scripts'));
});
