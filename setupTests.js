'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chai = require('chai');
var chaiEnzyme = require('chai-enzyme');

chai.use(chaiEnzyme());

if (!global.document) {
  try {
    var jsdom = require('jsdom').jsdom; // could throw

    global.document = jsdom('');
    global.window = document.defaultView;
    (0, _keys2.default)(document.defaultView).forEach(function (property) {
      if (typeof global[property] === 'undefined') {
        global[property] = document.defaultView[property];
      }
    });

    global.navigator = {
      userAgent: 'node.js'
    };
  } catch (e) {
    // jsdom is not supported...
    if (e.message === "Cannot find module 'jsdom'") {
      console.error('[enzyme/withDom] Error: missing required module "jsdom"');
      console.error('[enzyme/withDom] To fix this you must run:');
      console.error('[enzyme/withDom]   npm install jsdom --save-dev');
    } else {
      console.error('[enzyme withDom] ' + (e.stack || e.message));
    }
  }
}
//# sourceMappingURL=setupTests.js.map
