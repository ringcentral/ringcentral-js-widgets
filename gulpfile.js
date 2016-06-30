import gulp from 'gulp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import babelIstanbul from 'babel-istanbul';
import yargs from 'yargs';
import through from 'through2';
import path from 'path';
import fs from 'fs-promise';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import testServerConfig from './test-server/webpack.config';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import distConfig from './webpack.config';

const TIMEOUT = 30000;
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

const jsExt = /\.js$/;
function ensurePosixPath(str) {
  return str.split(path.sep).join('/');
}

gulp.task('test-browser', done => {
  const files = new Set();
  const testServerPath = path.resolve(__dirname, 'test-server');
  gulp.src(getTestSources())
    .pipe(through.obj((file, enc, cb) => {
      files.add(ensurePosixPath(path.relative(testServerPath, file.path).replace(jsExt, '')));
      cb();
    }))
    .on('finish', async () => {
      const loaderScript = `mocha.setup('bdd');
        mocha.timeout(${TIMEOUT});
        ${[...files].map(f => `require('${f}');`).join('\n')}
        mocha.run();
      `;

      await fs.writeFile(path.resolve(__dirname, './test-server/auto-loader.js'), loaderScript);

      await new Promise((resolve, reject) => {
        const compiler = webpack(testServerConfig, err => {
          if (err) return reject(err);

          new WebpackDevServer(compiler, {
            contentBase: testServerPath,
            publicPath: testServerConfig.output.publicPath,
            hot: true,
          }).listen(8190);
          return resolve();
        });
      });
      done();
    });
});

gulp.task('build', () => (
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'))
));

gulp.task('dist', async () => {
  await new Promise((resolve, reject) => {
    webpack(distConfig, err => {
      if (err) reject(err);
      resolve();
    });
  });
  await new Promise((resolve, reject) => {
    distConfig.plugins = [
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
        output: {
          comments: false,
        },
      }),
    ];
    distConfig.output.filename = 'ringcentral-js-integration-commons.min.js';
    webpack(distConfig, err => {
      if (err) reject(err);
      resolve();
    });
  });
});

gulp.task('watch', async () => {
  await new Promise((resolve, reject) => {
    distConfig.watch = true
    let compiler = webpack(distConfig);

    compiler.watch({}, err => {
      if (err) reject(err);
      compiler.run(err => {
        if (err) reject(err);
      });
    })
  });
});

