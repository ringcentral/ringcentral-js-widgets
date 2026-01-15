"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeStyle = void 0;
var _juno = require("@ringcentral/juno");
var _templateObject, _templateObject2;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var additionNormalizeStyle = (0, _juno.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  *,\n  ::before,\n  ::after {\n    box-sizing: border-box;\n    border-width: 0;\n    border-style: solid;\n    border-color: currentColor;\n    font-family: Lato, Helvetica, Arial, sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n"])));

/**
 * copy from https://necolas.github.io/normalize.css/latest/normalize.css v8.0.1
 */
var normalizeStyle = exports.normalizeStyle = (0, _juno.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  html {\n    line-height: 1.15;\n\n    -webkit-text-size-adjust: 100%;\n  }\n\n  body {\n    margin: 0;\n  }\n\n  main {\n    display: block;\n  }\n\n  h1 {\n    font-size: 2em;\n    margin: 0.67em 0;\n  }\n\n  hr {\n    box-sizing: content-box;\n\n    height: 0;\n\n    overflow: visible;\n  }\n\n  pre {\n    font-family: monospace, monospace;\n\n    font-size: 1em;\n  }\n\n  a {\n    background-color: transparent;\n  }\n\n  abbr[title] {\n    border-bottom: none;\n\n    text-decoration: underline;\n\n    text-decoration: underline dotted;\n  }\n\n  b,\n  strong {\n    font-weight: bolder;\n  }\n\n  code,\n  kbd,\n  samp {\n    font-family: monospace, monospace;\n\n    font-size: 1em;\n  }\n\n  small {\n    font-size: 80%;\n  }\n\n  sub,\n  sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n  }\n  sub {\n    bottom: -0.25em;\n  }\n  sup {\n    top: -0.5em;\n  }\n\n  img {\n    border-style: none;\n  }\n\n  button,\n  input,\n  optgroup,\n  select,\n  textarea {\n    font-family: inherit;\n\n    font-size: 100%;\n\n    line-height: 1.15;\n\n    margin: 0;\n  }\n\n  button,\n  input {\n    overflow: visible;\n  }\n\n  button,\n  select {\n    text-transform: none;\n  }\n\n  button,\n  [type='button'],\n  [type='reset'],\n  [type='submit'] {\n    -webkit-appearance: button;\n  }\n\n  button::-moz-focus-inner,\n  [type='button']::-moz-focus-inner,\n  [type='reset']::-moz-focus-inner,\n  [type='submit']::-moz-focus-inner {\n    border-style: none;\n    padding: 0;\n  }\n\n  button:-moz-focusring,\n  [type='button']:-moz-focusring,\n  [type='reset']:-moz-focusring,\n  [type='submit']:-moz-focusring {\n    outline: 1px dotted ButtonText;\n  }\n\n  fieldset {\n    padding: 0.35em 0.75em 0.625em;\n  }\n\n  legend {\n    box-sizing: border-box;\n\n    color: inherit;\n\n    display: table;\n\n    max-width: 100%;\n\n    padding: 0;\n\n    white-space: normal;\n  }\n\n  progress {\n    vertical-align: baseline;\n  }\n\n  textarea {\n    overflow: auto;\n  }\n\n  [type='checkbox'],\n  [type='radio'] {\n    box-sizing: border-box;\n\n    padding: 0;\n  }\n\n  [type='number']::-webkit-inner-spin-button,\n  [type='number']::-webkit-outer-spin-button {\n    height: auto;\n  }\n\n  [type='search'] {\n    -webkit-appearance: textfield;\n\n    outline-offset: -2px;\n  }\n\n  [type='search']::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n\n  ::-webkit-file-upload-button {\n    -webkit-appearance: button;\n\n    font: inherit;\n  }\n\n  details {\n    display: block;\n  }\n\n  summary {\n    display: list-item;\n  }\n\n  template {\n    display: none;\n  }\n\n  [hidden] {\n    display: none;\n  }\n\n  ", "\n"])), additionNormalizeStyle);
//# sourceMappingURL=normalize.js.map
