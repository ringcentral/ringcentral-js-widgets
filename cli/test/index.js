const docs = require('react-docgen');
const path = require('path');
const dir = require('node-dir');
const fs = require('fs');

function genTestData(src) {
  const componentInfo = docs.parse(src);

  function dataGenerator(name, value) {
    const mapping = {
      string: 'randomString',
      array: [],
      func: 'FUNCTION',
      number: 1234567,
      node: 'ELEMENT',
      object: {
        key: 'val',
      },
      bool: true,
      any: 'ANYTHING',
    };
    if (name === 'enum') {
      return value[0].value.replace(/'/g, '');
    } else if (name === 'arrayOf') {
      return [dataGenerator(value.name, value.value)];
    } else if (name === 'shape') {
      const obj = {};
      Object.keys(value).forEach(key => {
        obj[key] = dataGenerator(value[key].name, value[key].value);
      });
      return obj;
    }
    return mapping[name];
  }

  const result = Object.keys(componentInfo.props).reduce((accu, prop) => {
    if (!componentInfo.props[prop].type) {
      return accu;
    }
    return Object.assign({}, accu, {
      [prop]: dataGenerator(
                componentInfo.props[prop].type.name,
                componentInfo.props[prop].type.value
              ),
    });
  }, {});

  return result;
}

function walk(src, callback) {
  const results = {};
  dir.readFiles(src, { match: /index.js$/ },
    (err, content, filename, next) => {
      if (err) throw err;
      console.log(filename);
      results[filename.split('/').pop()] = callback(content);
      next();
    }, (err, files) => {
      if (err) throw err;
      fs.writeFile('test.json', JSON.stringify(results));
      // console.log('----finish----');
    }
  );
}

walk(
  `${path.resolve(__dirname)}/../../src/widgets/`,
  genTestData
);
