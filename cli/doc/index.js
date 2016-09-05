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
  if (componentInfo) {
    componentInfo.description = componentInfo.description.split(/[\r\n]+/)
    for (let key in componentInfo.props) {
      const prop = componentInfo.props[key];
      if (prop.description && prop.description.indexOf('@link') !== -1) {
        const tokens = prop.description.split(/[\n\r\s]+/);
        const href = tokens[tokens.indexOf('@link') + 1];
        prop.description = prop.description.replace(/@link[\s]+.*[\n\r\s]+/g, '')
        prop.type.link = {
          href,
        };
      }
    }
  }
  return componentInfo;
}

function walk(src, callback) {
  const results = {
    components: [],
  };
  dir.readFiles(src, { match: /index.js$/ },
    (err, content, filename, next) => {
      if (err) throw err;
      const tokens = filename.split('/');
      const componentName = tokens[tokens.length - 2];
      console.log(componentName);
      results.components.push(callback(content));
      console.log(results.components)
      results.components[results.components.length - 1].name = componentName;
      results.components[results.components.length - 1].path = path.relative(`{__dirname}/../`, filename);
      next();
      const html = template(results);
      // console.log(html);
    }, (err, files) => {
      if (err) throw err;
      console.dir(JSON.stringify(results));
      const html = template(results);
      fs.writeFile('doc.html', html);
      // console.log('----finish----');
    }
  );
}

walk(
  `${path.resolve(__dirname)}/../../src/widgets/`,
  genDoc
);
