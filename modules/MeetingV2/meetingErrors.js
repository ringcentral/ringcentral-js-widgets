"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeetingErrors = void 0;

require("core-js/modules/es6.object.define-property");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MeetingErrors = /*#__PURE__*/function () {
  function MeetingErrors(type) {
    _classCallCheck(this, MeetingErrors);

    this._errors = void 0;
    this._errors = [];
    if (type) this._errors.push({
      message: type
    });
  }

  _createClass(MeetingErrors, [{
    key: "push",
    value: function push(type) {
      if (type) this._errors.push({
        message: type
      });
    }
  }, {
    key: "all",
    get: function get() {
      return this._errors;
    }
  }, {
    key: "length",
    get: function get() {
      return this._errors.length;
    }
  }]);

  return MeetingErrors;
}();

exports.MeetingErrors = MeetingErrors;
//# sourceMappingURL=meetingErrors.js.map
