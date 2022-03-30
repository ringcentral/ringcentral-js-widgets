"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SimulateWindowObject;
exports.mockDevice = mockDevice;

require("core-js/modules/es6.object.define-properties");

var defaultDevices = [{
  deviceId: 'default',
  kind: 'audioinput',
  label: 'Default - Internal Microphone (Built-in)',
  groupId: '2303aeba3eb3b5b69d8712798dc9f41b1f1a526f23d032cf53353248d9f6ba83'
}, {
  deviceId: 'b2473af34652a04d9f8d463a4f11640695162b9c08db67d73e2a37f1a2e062a8',
  kind: 'audioinput',
  label: 'Internal Microphone (Built-in)',
  groupId: '2303aeba3eb3b5b69d8712798dc9f41b1f1a526f23d032cf53353248d9f6ba83'
}];

function mockDevice() {
  var devices = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultDevices;
  Object.defineProperties(window.navigator.mediaDevices, {
    getUserMedia: {
      value: function value() {
        return true;
      },
      configurable: true
    },
    enumerateDevices: {
      value: function value() {
        return devices;
      },
      configurable: true
    }
  });
}

function SimulateWindowObject() {
  var isMockDevices = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  Object.defineProperties(window.navigator, {
    userAgent: {
      value: 'Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.10.0'
    }
  });
  Object.defineProperties(window, {
    MediaStream: {
      value: true
    },
    RTCPeerConnection: {
      value: true
    }
  });
  mockDevice(isMockDevices ? defaultDevices : []);

  if (!HTMLMediaElement.prototype || !HTMLMediaElement.prototype.setSinkId) {
    Object.defineProperties(HTMLMediaElement.prototype, {
      setSinkId: {
        value: function value() {
          return true;
        }
      }
    });
  }

  return true;
}
//# sourceMappingURL=SimulateWindowObject.js.map
