import path from 'path';
import { generate } from './generate';

generate(
  path.resolve(__dirname, '../rc-platform.yml'),
  path.resolve(__dirname, '../src/platform'),
);
