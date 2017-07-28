import gulp from 'gulp';
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
import cp from 'child_process';
import transformLocaleLoader from 'locale-loader/transformLocaleLoader';
import dedent from 'dedent';
import exportLocale from 'locale-loader/exportLocale';
import importLocale from 'locale-loader/importLocale';
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

async function exec(command) {
  return new Promise((resolve, reject) => {
    cp.exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

async function getVersionFromTag() {
  try {
    let tag = await exec('git describe --exact-match --tags $(git rev-parse HEAD)');
    tag = tag.replace(/\r?\n|\r/g, '');
    if (/^\d+.\d+.\d+/.test(tag)) {
      return tag;
    }
    return null;
  } catch (e) {
    return null;
  }
}

gulp.task('clean', async () => (
  rm(path.resolve(__dirname, 'build'))
));

gulp.task('build', ['clean', 'copy'], () => (
  gulp.src(['src/**/*.js', '!src/**/*.test.js'])
    .pipe(transformLocaleLoader())
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
  const version = await getVersionFromTag();
  if (version) {
    packageInfo.version = version;
    packageInfo.name = 'ringcentral-widget';
  }
  await fs.writeFile('release/package.json', JSON.stringify(packageInfo, null, 2));
});

function normalizeName(str) {
  return str.split(/[-_]/g)
    .map((token, idx) => (
      `${idx > 0 ? token[0].toUpperCase() : token[0].toLowerCase()}${token.toLowerCase().substr(1)}`
    ))
    .join('');
}

gulp.task('generate-font', async () => {
  try {
    const cssLocation = path.resolve('src/assets/DynamicsFont/style.css');
    const content = await fs.readFile(cssLocation, 'utf8');
    let output = content
      .replace(/url\('fonts\/dynamics_icon/g, "url('./fonts/dynamics_icon")
      .replace('[class^="icon-"], [class*=" icon-"]', '.icon');
    const regExp = /\.icon-(.*):before/;
    let match;
    do {
      match = regExp.exec(output);
      if (match) {
        const [target, name] = match;
        const normalizedName = normalizeName(name);
        const newContent = dedent`
      .${normalizedName} {
        composes: icon;
      }
      .${normalizedName}:before `;
        output = output.replace(target, newContent);
      }
    } while (match);
    await fs.writeFile(path.resolve('src/assets/DynamicsFont/DynamicsFont.scss'), output, 'utf8');
  } catch (error) {
    console.log(error);
  }
});

gulp.task('export-locale', () => exportLocale());
gulp.task('export-locale-full', () => exportLocale({ exportType: 'full' }));
gulp.task('import-locale', () => importLocale());

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
