'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(fn) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var fetchedPages, totalPages, list, _params$perPage, perPage, data;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fetchedPages = 0;
            totalPages = 1;
            list = [];
            _params$perPage = params.perPage, perPage = _params$perPage === undefined ? 'MAX' : _params$perPage;

          case 4:
            if (!(fetchedPages < totalPages)) {
              _context.next = 13;
              break;
            }

            fetchedPages++;
            _context.next = 8;
            return fn((0, _extends3.default)({}, params, {
              perPage: perPage,
              page: fetchedPages
            }));

          case 8:
            data = _context.sent;

            totalPages = data.paging.totalPages;
            list = list.concat(data.records);
            _context.next = 4;
            break;

          case 13:
            return _context.abrupt('return', list);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function fetchList(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return fetchList;
}();
//# sourceMappingURL=fetchList.js.map
