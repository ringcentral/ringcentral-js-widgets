"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSyncStatusReducer = getSyncStatusReducer;
exports.getContactListReducer = getContactListReducer;
exports.getSyncTokenReducer = getSyncTokenReducer;
exports.getSyncTimestampReducer = getSyncTimestampReducer;
exports.default = getAddressBookReducer;

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _availabilityTypes = _interopRequireDefault(require("../../enums/availabilityTypes"));

var _removeUri = _interopRequireDefault(require("../../lib/removeUri"));

var _syncStatus = _interopRequireDefault(require("./syncStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getSyncStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _syncStatus.default.idle;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type;

    switch (type) {
      case types.sync:
        return _syncStatus.default.syncing;

      case types.syncError:
      case types.syncSuccess:
        return _syncStatus.default.idle;

      default:
        return state;
    }
  };
}

function getContactListReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        records = _ref2.records;

    var contacts = [];
    var contactMap = {};

    switch (type) {
      case types.syncSuccess:
        if (!records || records.length === 0) {
          return state;
        }

        state.forEach(function (contact) {
          contacts.push(contact);
          contactMap[contact.id] = contacts.length - 1;
        });
        records.forEach(function (record) {
          var isDeleted = record.availability === _availabilityTypes.default.deleted;
          var oldIndex = contactMap[record.id];

          if (oldIndex !== undefined && oldIndex !== null) {
            if (isDeleted) {
              contacts[oldIndex] = null;
              delete contactMap[record.id];
            } else {
              var oldContact = contacts[oldIndex];
              contacts[oldIndex] = _objectSpread({}, oldContact, (0, _removeUri.default)(record));
            }
          } else if (!isDeleted) {
            contacts.push((0, _removeUri.default)(record));
            contactMap[record.id] = contacts.length - 1;
          }
        });
        return contacts.filter(function (contact) {
          return !!contact;
        });

      case types.resetSuccess:
      case types.cleanUp:
        return [];

      default:
        return state;
    }
  };
}

function getSyncTokenReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        syncToken = _ref3.syncToken;

    switch (type) {
      case types.syncSuccess:
        return syncToken;

      case types.resetSuccess:
      case types.cleanUp:
        return null;

      default:
        return state;
    }
  };
}

function getSyncTimestampReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type,
        syncTime = _ref4.syncTime;

    switch (type) {
      case types.syncSuccess:
        return new Date(syncTime).getTime();

      case types.resetSuccess:
      case types.cleanUp:
        return null;

      default:
        return state;
    }
  };
}

function getAddressBookReducer(types) {
  var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _redux.combineReducers)(_objectSpread({}, reducers, {
    status: (0, _getModuleStatusReducer.default)(types),
    syncStatus: getSyncStatusReducer(types)
  }));
}
//# sourceMappingURL=getAddressBookReducer.js.map
