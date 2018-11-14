import gulp from 'gulp';
import path from 'path';
import fs from 'fs-extra';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import execa from 'execa';
import transformLoader from '@ringcentral-integration/locale-loader/lib/transformLoader';
import dedent from 'dedent';
import exportLocale from '@ringcentral-integration/locale-loader/lib/exportLocale';
import importLocale from '@ringcentral-integration/locale-loader/lib/importLocale';
import consolidateLocale from '@ringcentral-integration/locale-loader/lib/consolidateLocale';
import localeSettings from 'locale-settings';

async function getVersionFromTag() {
  let tag = process.env.TRAVIS_TAG;
  if (tag && /^\d+.\d+.\d+/.test(tag)) {
    return tag;
  }
  try {
    tag = await execa.shell('git describe --exact-match --tags $(git rev-parse HEAD)');
    tag = tag.stdout.replace(/\r?\n|\r/g, '');
    if (/^\d+.\d+.\d+/.test(tag)) {
      return tag;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

function buildConfig(brandConfig) {
  const brand = brandConfig.name;
  const pathName = brand === 'RC' ? '' : `-${brand}`;
  const BUILD_PATH = path.resolve(__dirname, `../../build/ringcentral-widgets${pathName}`);
  const RELEASE_PATH = path.resolve(__dirname, `../../release/ringcentral-widgets${pathName}`);

  function clean() {
    return fs.remove(BUILD_PATH);
  }
  function copy() {
    return gulp.src([
      './**',
      '!./**/*.js',
      '!./test{/**,}',
      '!./coverage{/**,}',
      '!./node_modules{/**,}',
      '!package-lock.json'
    ]).pipe(gulp.dest(BUILD_PATH));
  }
  function _build() {
    return gulp.src([
      './**/*.js',
      '!./**/*.test.js',
      '!./test{/**,}',
      '!./coverage{/**,}',
      '!./node_modules{/**,}',
      '!gulpfile.babel.js']
    ).pipe(transformLoader({
      ...brandConfig,
    }))
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(BUILD_PATH));
  }
  const build = gulp.series(clean, copy, _build);
  async function releaseClean() {
    if (!await fs.exists(RELEASE_PATH)) {
      await execa.shell(`mkdir -p ${RELEASE_PATH}`);
    }
    const files = (await fs.readdir(RELEASE_PATH)).filter(file => !/^\./.test(file));
    for (const file of files) {
      await fs.remove(path.resolve(RELEASE_PATH, file));
    }
  }
  function releaseCopy() {
    return gulp.src([
      `${BUILD_PATH}/**`,
      `${__dirname}/README.md`,
      `${__dirname}/LICENSE`
    ]).pipe(gulp.dest(RELEASE_PATH));
  }
  async function _release() {
    const packageInfo = JSON.parse(await fs.readFile(path.resolve(BUILD_PATH, 'package.json')));
    delete packageInfo.scripts;
    delete packageInfo.jest;
    const version = await getVersionFromTag();
    console.log('version:', version);
    if (version) {
      packageInfo.version = version;
      packageInfo.name = 'ringcentral-widgets';
    }
    await fs.writeFile(path.resolve(RELEASE_PATH, 'package.json'), JSON.stringify(packageInfo, null, 2));
  }
  const release = gulp.series(gulp.parallel(build, releaseClean),
    releaseCopy, _release);

  return {
    brand,
    build,
    release,
  };
}

function getAllBrand() {
  const brands = Object.keys(localeSettings);
  return brands.map(brand => buildConfig(localeSettings[brand]).release);
}

exports.build = buildConfig(localeSettings.RC).build;
exports.release = buildConfig(localeSettings.RC).release;
exports['release-all'] = gulp.parallel(...getAllBrand());

function normalizeName(str) {
  return str.split(/[-_]/g)
    .map((token, idx) => (
      `${idx > 0 ? token[0].toUpperCase() : token[0].toLowerCase()}${token.toLowerCase().substr(1)}`
    ))
    .join('');
}
gulp.task('generate-font', async () => {
  try {
    const cssLocation = path.resolve(__dirname, 'assets/DynamicsFont/style.css');
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
    await fs.writeFile(path.resolve(__dirname, 'assets/DynamicsFont/DynamicsFont.scss'), output, 'utf8');
  } catch (error) {
    console.log(error);
  }
});
gulp.task('export-locale', () => exportLocale({
  ...localeSettings,
}));
gulp.task('export-locale-full', () => exportLocale({
  ...localeSettings,
  exportType: 'full'
}));
gulp.task('export-locale-translated', () => exportLocale({
  ...localeSettings,
  exportType: 'translated'
}));
gulp.task('import-locale', () => importLocale({
  ...localeSettings,
}));
gulp.task('consolidate-locale', () => consolidateLocale({
  ...localeSettings,
  sourceFolder: path.resolve(__dirname, 'lib/countryNames'),
}));

