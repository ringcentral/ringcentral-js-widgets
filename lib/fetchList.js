'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var parallelFetch = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(fn, perPage, params) {
    var data, list, promises, i;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fn((0, _extends3.default)({}, params, {
              perPage: perPage,
              page: 1
            }));

          case 2:
            data = _context.sent;
            list = data.records.slice();

            if (!(data.paging.totalPages > 1)) {
              _context.next = 12;
              break;
            }

            promises = [];

            for (i = data.paging.totalPages; i > 1; i -= 1) {
              promises.push(fn((0, _extends3.default)({}, params, {
                perPage: perPage,
                page: i
              })));
            }
            _context.next = 9;
            return _promise2.default.all(promises);

          case 9:
            _context.t0 = function (output, item) {
              output.push.apply(output, (0, _toConsumableArray3.default)(item.records));
              return output;
            };

            _context.t1 = list;

            _context.sent.reduce(_context.t0, _context.t1);

          case 12:
            return _context.abrupt('return', list);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function parallelFetch(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var serialFetch = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(fn, perPage, params) {
    var fetchedPages, totalPages, list, data;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fetchedPages = 0;
            totalPages = 1;
            list = [];

          case 3:
            if (!(fetchedPages < totalPages)) {
              _context2.next = 12;
              break;
            }

            fetchedPages += 1;
            _context2.next = 7;
            return fn((0, _extends3.default)({}, params, {
              perPage: perPage,
              page: fetchedPages
            }));

          case 7:
            data = _context2.sent;

            /* eslint { "prefer-destructuring": 0 } */
            totalPages = data.paging.totalPages;
            list.push.apply(list, (0, _toConsumableArray3.default)(data.records));
            _context2.next = 3;
            break;

          case 12:
            return _context2.abrupt('return', list);

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function serialFetch(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(fn) {
    var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _ref4$perPage = _ref4.perPage,
        perPage = _ref4$perPage === undefined ? 'MAX' : _ref4$perPage,
        _ref4$parallel = _ref4.parallel,
        parallel = _ref4$parallel === undefined ? true : _ref4$parallel,
        params = (0, _objectWithoutProperties3.default)(_ref4, ['perPage', 'parallel']);
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', parallel ? parallelFetch(fn, perPage, params) : serialFetch(fn, perPage, params));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  function fetchList(_x7) {
    return _ref3.apply(this, arguments);
  }

  return fetchList;
}();
//# sourceMappingURL=fetchList.js.map
