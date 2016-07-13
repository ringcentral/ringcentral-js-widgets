const path = require('path');
const fs = require('fs');
const { walk } = require('./walker');
const { transform } = require('./parser');
const output = 'bundle.css';

const p = path.resolve(`${path.resolve(__dirname)}/../../src/components`);
fs.openSync(output, 'w');
walk(p, (input, src) => {
  const css = transform(input, src);
  fs.appendFileSync(output, css);
});
