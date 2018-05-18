import fs from 'fs-extra';
import path from 'path';
import { parse } from 'jsonc-parser';

const config = parse(fs.readFileSync(path.resolve(__dirname, '../.babelrc'), 'utf8'));

export default config;
