'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getSyncStatusReducer = getSyncStatusReducer;
exports.getContactListReducer = getContactListReducer;
exports.getSyncTokenReducer = getSyncTokenReducer;
exports.getSyncTimestampReducer = getSyncTimestampReducer;
exports.default = getAddressBookReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _availabilityTypes = require('../../enums/availabilityTypes');

var _availabilityTypes2 = _interopRequireDefault(_availabilityTypes);

var _removeUri = require('../../lib/removeUri');

var _removeUri2 = _interopRequireDefault(_removeUri);

var _syncStatus = require('./syncStatus');

var _syncStatus2 = _interopRequireDefault(_syncStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSyncStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _syncStatus2.default.idle;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case types.sync:
        return _syncStatus2.default.syncing;
      case types.syncError:
      case types.syncSuccess:
        return _syncStatus2.default.idle;
      default:
        return state;
    }
  };
}

function getContactListReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref2 = arguments[1];
    var type = _ref2.type,
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
          var isDeleted = record.availability === _availabilityTypes2.default.deleted;
          var oldIndex = contactMap[record.id];
          if (oldIndex !== undefined && oldIndex !== null) {
            if (isDeleted) {
              contacts[oldIndex] = null;
              delete contactMap[record.id];
            } else {
              var oldContact = contacts[oldIndex];
              contacts[oldIndex] = (0, _extends3.default)({}, oldContact, (0, _removeUri2.default)(record));
            }
          } else if (!isDeleted) {
            contacts.push((0, _removeUri2.default)(record));
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
    var _ref3 = arguments[1];
    var type = _ref3.type,
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
    var _ref4 = arguments[1];
    var type = _ref4.type,
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

  return (0, _redux.combineReducers)((0, _extends3.default)({}, reducers, {
    status: (0, _getModuleStatusReducer2.default)(types),
    syncStatus: getSyncStatusReducer(types)
  }));
}
//# sourceMappingURL=getAddressBookReducer.js.map
