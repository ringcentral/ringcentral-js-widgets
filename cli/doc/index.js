const docs = require('react-docgen');
const path = require('path');
const dir = require('node-dir');
const fs = require('fs');
const decamelize = require('decamelize');

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
    // create new line
    componentInfo.description = componentInfo.description.split(/[\r\n]+/)

    for (let key in componentInfo.props) {
      const prop = componentInfo.props[key];

      // flatten propTypes
      while (
        prop.type &&
        prop.type.value &&
        prop.type.value.value &&
        prop.type.value.name 
        // because some prop named 'value', so we need to distinguish the reserved word(value)
        // and word 'value'
      ) {
        if (prop.type.value.name === 'shape') {
          // transform 'shape'
          for (let key in prop.type.value.value) {
            prop.type.value.value[key].value = `${key} : ${prop.type.value.value[key].name}`
          }
        }
        prop.type.name += ` ${prop.type.value.name}`;
        prop.type.value = prop.type.value.value;
        prop.type.type = prop.type.value.type;
        
        console.log(prop)
      }

      // make camel case human-readable
      if (prop.type && prop.type.name) {
        prop.type.name = decamelize(prop.type.name, ' ');
      }

      if (prop.description && prop.description.indexOf('@link') !== -1) {
        
        const tokens = prop.description.split(/[\n\r\s]+/);
        // detect @link
        const href = tokens[tokens.indexOf('@link') + 1];
        // remove @link
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
      results.components.push(callback(content));
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
