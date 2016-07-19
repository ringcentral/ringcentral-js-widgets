const fs = require('fs');
const path = require('path');
const { analysis } = require('./analysis');
const Handlebars = require('handlebars');

const source = fs.readFileSync(path.resolve(__dirname + '/template.hbs'), 'utf-8');
const template = Handlebars.compile(source);
const html = template(analysis());
console.log(html);
