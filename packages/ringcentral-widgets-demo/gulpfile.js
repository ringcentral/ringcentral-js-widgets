import gulp from 'gulp';
import path from 'path';
import fs from 'fs-extra';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import yargs from 'yargs';
import { devServerConfig, port } from './dev-server/webpack.config';
import demoExtensionConfig from './demo-extension/webpack.config';

const {
  argv: { file },
} = yargs.string('file');

export function devServer() {
  const compiler = webpack(devServerConfig);
  const server = new WebpackDevServer(compiler, {
    contentBase: path.resolve('dev-server'),
    publicPath: '/',
    hot: true,
    inline: true,
    // noInfo: true,
    stats: {
      warnings: false,
      chunks: false,
      colors: true,
    },
  });
  server.listen(port);
  console.log(`server listening to ${port}...`);
}

export function demoExtensionClean() {
  return fs.remove('demo-extension-build');
}

export function demoExtensionWebpack() {
  return new Promise((resolve, reject) => {
    webpack(demoExtensionConfig, (err, stats) => {
      if (err || stats.hasErrors()) {
        reject(err || new Error(stats.toJson().errors));
        return;
      }
      resolve();
    });
  });
}
export function demoExtensionCopy() {
  return gulp
    .src(['demo-extension/**/*', '!demo-extension/**/*.js'])
    .pipe(gulp.dest('demo-extension-build'));
}

export const demoExtension = gulp.series(
  demoExtensionClean,
  gulp.parallel(demoExtensionWebpack, demoExtensionCopy),
);

export async function copyConfig() {
  if (!(await fs.exists(file))) {
    console.log(`Error: ${file} does not exist!`);
  }
  const dest = path.resolve(__dirname, 'dev-server/api-config.js');
  await fs.copy(file, dest);
  console.log(`File ${file} copied to ${dest}`);
}
