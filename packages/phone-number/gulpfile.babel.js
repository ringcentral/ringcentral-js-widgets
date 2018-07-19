import gulp from 'gulp';
import path from 'path';
import fs from 'fs-extra';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import cp from 'child_process';

const BUILD_PATH = path.resolve(__dirname, '../../build/phone-number');
gulp.task('clean', async () => (
  fs.remove(BUILD_PATH)
));

gulp.task('build', ['clean'], () => (
  gulp.src([
    './lib/**/*.js',
    '!./lib/**/*.test.js',
    './*.js',
    '!./gulpfile*.js',
  ], {
    base: './'
  })
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(BUILD_PATH))
));

async function exec(command) {
  return new Promise((resolve, reject) => {
    cp.exec(command, (error, stdout) => {
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

const RELEASE_PATH = path.resolve(__dirname, '../../release/phone-number');
gulp.task('release-clean', async () => {
  if (!await fs.exists(RELEASE_PATH)) {
    await fs.mkdirp(RELEASE_PATH);
  }
  const files = (await fs.readdir(RELEASE_PATH)).filter(file => !/^\./.test(file));
  for (const file of files) {
    await fs.remove(path.resolve(RELEASE_PATH, file));
  }
});

gulp.task('release-copy', ['build', 'release-clean'], () => (
  gulp.src([`${BUILD_PATH}/**`, `${__dirname}/README.md`, `${__dirname}/LICENSE`])
    .pipe(gulp.dest(RELEASE_PATH))
));

gulp.task('release', ['release-copy'], async () => {
  const packageInfo = JSON.parse(await fs.readFile(path.resolve(__dirname, 'package.json')));
  delete packageInfo.scripts;
  delete packageInfo.devDependencies;
  const version = await getVersionFromTag();
  if (version) {
    packageInfo.version = version;
  }
  await fs.writeFile(path.resolve(RELEASE_PATH, 'package.json'), JSON.stringify(packageInfo, null, 2));
});
