"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setNativeValue = setNativeValue;
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
/**
 * using native value to set to trigger native onChange and input event

// TODO: find way to trigger browser history(cmd+z, cmd+y) events
 */
function setNativeValue(element, value) {
  var valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
  var prototype = Object.getPrototypeOf(element);
  var prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else {
    valueSetter.call(element, value);
  }
  element.dispatchEvent(new Event('input', {
    bubbles: true
  }));
}
//# sourceMappingURL=setNativeValue.js.map
