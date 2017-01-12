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
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import Loganberry from 'loganberry';
import cp from 'child_process';
import semver from 'semver';
import devServerConfig from './dev-server/config';

gulp.task('dev-server', async () => {
  const compiler = webpack(devServerConfig);
  const server = new WebpackDevServer(compiler, {
    contentBase: path.resolve('dev-server'),
    publicPath: '/',
    hot: true,
    inline: true,
    noInfo: true,
    stats: {
      warnings: false,
      chunks: false,
      colors: true,
    },
  });
  server.listen(devServerConfig.port);
  console.log(`server listening to ${devServerConfig.port}...`);
});

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

gulp.task('build', ['clean', 'copy'], () => (
  gulp.src(['src/**/*.js', '!src/**/*.test.js'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'))
));

gulp.task('copy', ['clean'], () => (
  gulp.src(['src/**', '!src/**/*.js'])
    .pipe(gulp.dest('build'))
));

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
  gulp.src('build/**')
    .pipe(gulp.dest('release'))
));

gulp.task('release', ['release-copy'], async () => {
  const packageInfo = JSON.parse(await fs.readFile('package.json'));
  delete packageInfo.scripts;
  await fs.writeFile('release/package.json', JSON.stringify(packageInfo, null, 2));
});
