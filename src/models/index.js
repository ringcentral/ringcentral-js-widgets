"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _phoneDetails = require("./phone-details");
Object.keys(_phoneDetails).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _phoneDetails[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _phoneDetails[key];
    }
  });
});
var _simpleCrmObject = require("./simple-crm-object");
Object.keys(_simpleCrmObject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _simpleCrmObject[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _simpleCrmObject[key];
    }
  });
});
var _contactSearchResponse = require("./contact-search-response");
Object.keys(_contactSearchResponse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _contactSearchResponse[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _contactSearchResponse[key];
    }
  });
});
var _populateCall = require("./populate-call");
Object.keys(_populateCall).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _populateCall[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _populateCall[key];
    }
  });
});
var _populateCallDisposition = require("./populate-call-disposition");
Object.keys(_populateCallDisposition).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _populateCallDisposition[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _populateCallDisposition[key];
    }
  });
});
var _populateCallResponse = require("./populate-call-response");
Object.keys(_populateCallResponse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _populateCallResponse[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _populateCallResponse[key];
    }
  });
});
var _callLog = require("./call-log");
Object.keys(_callLog).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _callLog[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _callLog[key];
    }
  });
});
var _detailedCrmObject = require("./detailed-crm-object");
Object.keys(_detailedCrmObject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _detailedCrmObject[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _detailedCrmObject[key];
    }
  });
});
var _callLogResponse = require("./call-log-response");
Object.keys(_callLogResponse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _callLogResponse[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _callLogResponse[key];
    }
  });
});
var _callDispositionProperties = require("./call-disposition-properties");
Object.keys(_callDispositionProperties).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _callDispositionProperties[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _callDispositionProperties[key];
    }
  });
});
var _callDisposition = require("./call-disposition");
Object.keys(_callDisposition).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _callDisposition[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _callDisposition[key];
    }
  });
});
var _call = require("./call");
Object.keys(_call).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _call[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _call[key];
    }
  });
});
var _smsConversation = require("./sms-conversation");
Object.keys(_smsConversation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _smsConversation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _smsConversation[key];
    }
  });
});
var _callListResponse = require("./call-list-response");
Object.keys(_callListResponse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _callListResponse[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _callListResponse[key];
    }
  });
});
var _accountConfigurationResponse = require("./account-configuration-response");
Object.keys(_accountConfigurationResponse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _accountConfigurationResponse[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _accountConfigurationResponse[key];
    }
  });
});
//# sourceMappingURL=index.js.map
