import fs from 'fs-extra';
import glob from 'glob';
import { filter } from 'ramda';
import isLoaderFile from '../isLoaderFile';

/**
 * @function
 * @description Return all the loader file paths in the specified folder.
 * @param {String} folder
 * @returns {Promise<String[]>}
 */
export default function findLoaderFiles(folder) {
  return filter(
    file => fs.statSync(file).isFile() && isLoaderFile(fs.readFileSync(file, 'utf8')),
    glob.sync(`${folder}/**`),
  );
}
