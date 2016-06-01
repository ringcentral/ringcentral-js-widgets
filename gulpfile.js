var gulp = require('gulp')
var jscs = require('gulp-jscs')
var watch = require('gulp-watch')
var plumber = require('gulp-plumber')
var print = require('gulp-print')

var postcss = require('gulp-postcss')

gulp.task('compile', () => {
    watch('./src/styles/**/**', styles)
    styles()
    return compile()
})

function styles() {
    return gulp.src('./src/styles/main.css')
    .pipe(print(function(filepath) {
            return 'built: ' + filepath
        }))
    .pipe(plumber({
        errorHandler: function(err) {
            console.log(err.message)
            this.emit('end')
        }
    }))
    .pipe(
        postcss([
            require('precss')({ /* options */ })
        ])
    ).pipe(
        gulp.dest('./build/styles')
    )
}

gulp.task('lint', function() {
    return gulp.src('src/scripts/**/**')
          .pipe(jscs({fix: true, configPath: '.jscsrc'}))
          .pipe(gulp.dest('src/scripts'))
})

gulp.task('default', ['compile'])
