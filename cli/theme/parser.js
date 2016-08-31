const tokenizer = require('css-selector-tokenizer');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const pcssImport = require('postcss-import');
const pcssNested = require('postcss-nested');
const pcssVar = require('postcss-simple-vars');
const pcssMixins = require('postcss-mixins');

function transformSyntax(input, src, path) {
  const processors = [
    pcssImport({ path: ['src/styles'] }),
    pcssMixins,
    pcssVar,
    pcssNested,
    autoprefixer,
  ];
  return postcss(processors).process(input, {
    from: `${path}/${src}.css`,
  }).then(result => result.css).catch(err => console.log(err));
}
let inPseudo = false;
function transformSelector(token, src) {
  if (token.type === 'class') {
    token.name = `${src}__${token.name}`;
    inPseudo = false;
  }
  if (token.type === 'pseudo-class') {
    inPseudo = true;
  }
  if (inPseudo && token.type === 'element' && token.name !== 'content') {
    token.name = `\\${token.name}`;
  }
  if (token.nodes) {
    token.nodes.forEach(node => transformSelector(node, src));
  }
}

function transform(input, src, path) {
  return transformSyntax(input, src, path).then(css => {
    const token = tokenizer.parse(css);
    transformSelector(token, src, path);
    return tokenizer.stringify(token);
  });
}


module.exports.transform = transform;
