import gulp from 'gulp';
import path from 'path';
import fs from 'fs-extra';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import devServerConfig from './dev-server/webpack.config';
import demoExtensionConfig from './demo-extension/webpack.config';

export function devServer() {
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
}

export function demoExtensionClean() {
  return fs.remove('demo-extension-build');
}

export function demoExtensionWebpack() {
  return new Promise((resolve, reject) => {
    webpack(demoExtensionConfig, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}
export function demoExtensionCopy() {
  return gulp.src(['demo-extension/**/*', '!demo-extension/**/*.js'])
    .pipe(gulp.dest('demo-extension-build'));
}

export const demoExtension = gulp.series(
  demoExtensionClean,
  gulp.parallel(demoExtensionWebpack, demoExtensionCopy),
);
