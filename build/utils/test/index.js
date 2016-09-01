'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postProcess = postProcess;
function mapping(key) {
  if (key === 'FUNCTION') {
    return function anomy() {};
  } else if (key === 'ELEMENT') {
    // TODO
  } else if (key === 'NODE') {
    // TODO
  }
  return key;
}

function postProcess(obj) {
  var result = {};
  Object.keys(obj).forEach(function (key) {
    result[key] = mapping(obj[key]);
  });
  return result;
}