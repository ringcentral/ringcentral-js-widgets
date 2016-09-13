const fs = require('fs');
const path = require('path');
const dir = require('node-dir');

const Handlebars = require('handlebars');
const source = fs.readFileSync(path.resolve(`${__dirname}/template/index.hbs`), 'utf-8');
const template = Handlebars.compile(source);

function walk(src) {
  const result = {
    categories: [],
  };
  dir.readFiles(src, { match: /index.js$/ },
    (err, content, filename, next) => {
      if (err) throw err;
      const dirName = filename.substring(0, filename.lastIndexOf('/'));
      const categoryName = dirName
          .substring(0, dirName.lastIndexOf('/'))
          .split('/').pop();
      const name = dirName.slice(dirName.lastIndexOf('/') + 1);
      let category = result.categories.find(cate => cate.name === categoryName);
      if (!category) {
        category = {
          name: categoryName,
          components: [],
        };
        result.categories.push(category);
      }
      category.components.push(name);
      next();
    }, (err, files) => {
      if (err) throw err;
      const html = template(result);
      fs.writeFile(`${src}components.js`, html, () => console.log('----finish----'));
    }
  );
}

walk(`${path.resolve(__dirname)}/../../src/widgets/`);

// create symlink
