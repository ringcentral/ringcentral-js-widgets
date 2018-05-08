import glob from 'glob';

export default function readGlob(globString, options = {}) {
  return new Promise((resolve, reject) => {
    glob(globString, options, (err, files) => {
      if (err) {
        return reject(err);
      }
      return resolve(files);
    });
  });
}
