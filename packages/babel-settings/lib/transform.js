import { transform as babelTransform } from 'babel-core';
import babelrc from './babelrc';

export default function transform(content) {
  return babelTransform(content, babelrc).code;
}
