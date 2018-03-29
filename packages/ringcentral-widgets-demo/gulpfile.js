import gulp from 'gulp';
import path from 'path';
import fs from 'fs-promise';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import devServerConfig from './dev-server/webpack.config';
import demoExtensionConfig from './demo-extension/webpack.config';

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

gulp.task('demo-extension-clean', async () => {
  await rm('demo-extension-build');
});
gulp.task('demo-extension-webpack', ['demo-extension-clean'], () => (
  new Promise((resolve, reject) => {
    webpack(demoExtensionConfig, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  })
));
gulp.task('demo-extension-copy', ['demo-extension-clean'], () => (
  gulp.src(['demo-extension/**/*', '!demo-extension/**/*.js'])
    .pipe(gulp.dest('demo-extension-build'))
));
gulp.task('demo-extension',
  [
    'demo-extension-clean',
    'demo-extension-webpack',
    'demo-extension-copy',
  ],
);
