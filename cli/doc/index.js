const docs = require('react-docgen');
const path = require('path');
const dir = require('node-dir');
const fs = require('fs');

const Handlebars = require('handlebars');
const source = fs.readFileSync(path.resolve(`${__dirname}/template/index.hbs`), 'utf-8');
const template = Handlebars.compile(source);

function genDoc(src) {
  let componentInfo;
  try {
    componentInfo = docs.parse(src);
  } catch (err) {
    console.error(err);
  }
  // console.log(componentInfo);
  return componentInfo;
}

function walk(src, callback) {
  const results = {
    components: [],
  };
  dir.readFiles(src, { match: /index.js$/ },
    (err, content, filename, next) => {
      if (err) throw err;
      console.log(filename)
      const tokens = filename.split('/');
      const componentName = tokens[tokens.length - 2];
      results.components.push(callback(content));
      results.components[results.components.length - 1].name = componentName;
      next();
      const html = template(results);
      // console.log(html);
    }, (err, files) => {
      if (err) throw err;
      // console.dir(JSON.stringify(results));
      const html = template(results);
      console.log(html)
      // console.log('----finish----');
    }
  );
}

walk(
  `${path.resolve(__dirname)}/../../src/widgets/`,
  genDoc
);
