const path = require('path');
const fs = require('fs');
const { walk } = require('./walker');
const { transform } = require('./parser');
const output = 'bundle.css';

const p = path.resolve(`${path.resolve(__dirname)}/../../src/widgets`);
fs.openSync(output, 'w');
walk(p, (input, src, path) => {
  transform(input, src, path).then(css => {
    fs.appendFileSync(output, css);
  });
});
