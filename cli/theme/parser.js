const tokenizer = require('css-selector-tokenizer');

function transform(input, path) {
  const token = tokenizer.parse(input);
  transformSelector(token, path);
  const selector = tokenizer.stringify(token);
  return selector;
}

function transformSelector(token, path) {
  if (token.type === 'class') {
    token.name = `${path}-${token.name}`;
  }
  if (token.nodes) {
    token.nodes.forEach(node => transformSelector(node, path));
  }
}

module.exports.transform = transform;
