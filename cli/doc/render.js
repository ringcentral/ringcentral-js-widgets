require('babel-register');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

function render(path) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(
      require(path).default
    )
  );
}

module.exports.render = render;
