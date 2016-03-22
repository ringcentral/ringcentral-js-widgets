var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var rollup = require('gulp-rollup');
var rollupIncludePaths = require('rollup-plugin-includepaths');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var util = require('gulp-util');
var jscs = require('gulp-jscs');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var print = require('gulp-print');

const includePathOptions = {
    paths: ['./src/scripts']
};

gulp.task('compile', () => {
    watch('./src/scripts/**/**', compile);
    return compile();
});

function compile() {
    gulp.src('./src/scripts/index.js')
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
            sourceMap: true,
            plugins: [
              rollupIncludePaths(includePathOptions)
            ]
        }))
        .pipe(babel())
        .on('error', util.log)
        .pipe(rename('build.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build'));
}
// function compile(watch) {
//     var bundler = watchify(browserify('./src/scripts/index.js', {debug: true}).transform(babel, {presets: ['es2015']}));

//     function rebundle() {
//         bundler.bundle()
//           .on('error', function(err) { console.error(err); this.emit('end'); })
//           .pipe(source('build.js'))
//           .pipe(buffer())
//           .pipe(sourcemaps.init({loadMaps: true}))
//           .pipe(sourcemaps.write('./'))
//           .pipe(gulp.dest('./build'));
//     }

//     if (watch) {
//         bundler.on('update', function() {
//             console.log('-> bundling...');
//             rebundle();
//         });
//     }

//     rebundle();
// }

// function watch() {
//     return compile(true);
// };

// gulp.task('build', function() { return compile(); });
// gulp.task('watch', function() { return watch(); });

gulp.task('default', ['compile']);
gulp.task('lint', function() {
    return gulp.src('src/scripts/**/**')
          .pipe(jscs({fix: true, configPath: '.jscsrc'}))
          .pipe(gulp.dest('src/scripts'));
});
