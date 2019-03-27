"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.date.now");

var _classnames = _interopRequireDefault(require("classnames"));

var _Enum = require("ringcentral-integration/lib/Enum");

var _ensureExist = _interopRequireDefault(require("ringcentral-integration/lib/ensureExist"));

var _debounce = _interopRequireDefault(require("ringcentral-integration/lib/debounce"));

var _presenceStatus = _interopRequireDefault(require("ringcentral-integration/modules/Presence/presenceStatus"));

var _dndStatus = _interopRequireDefault(require("ringcentral-integration/modules/Presence/dndStatus"));

var _formatDuration = _interopRequireDefault(require("../formatDuration"));

var _baseMessageTypes = _interopRequireDefault(require("./baseMessageTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SANDBOX_ATTRIBUTE_VALUE = ['allow-same-origin', 'allow-scripts', 'allow-forms', 'allow-popups'].join(' '); // chrome 63 mandate the declaration of this attribute for getUserMedia to work in iframes

var ALLOW_ATTRIBUTE_VALUE = ['microphone'].join(' ');
var ON_HOLD_CALLS = 0;
var RINGING_CALLS = 1;
var CURRENT_CALL = 2;
var ROTATE_LENGTH = 3;
var ROTATE_INTERVAL = 5000;

var AdapterCore =
/*#__PURE__*/
function () {
  function AdapterCore(_ref) {
    var _this = this;

    var prefix = _ref.prefix,
        styles = _ref.styles,
        container = _ref.container,
        _ref$root = _ref.root,
        root = _ref$root === void 0 ? container : _ref$root,
        _ref$messageTypes = _ref.messageTypes,
        messageTypes = _ref$messageTypes === void 0 ? _baseMessageTypes.default : _ref$messageTypes,
        _ref$defaultDirection = _ref.defaultDirection,
        defaultDirection = _ref$defaultDirection === void 0 ? 'left' : _ref$defaultDirection,
        _ref$defaultPadding = _ref.defaultPadding,
        defaultPadding = _ref$defaultPadding === void 0 ? 15 : _ref$defaultPadding;

    _classCallCheck(this, AdapterCore);

    this._onWindowResize = function () {
      if (_this._dragging) {
        return;
      }

      if (_this._resizeTimeout) {
        clearTimeout(_this._resizeTimeout);
      }

      _this._resizeTimeout = setTimeout(function () {
        return _this._renderRestrictedPosition();
      }, 100);

      if (!_this._resizeTick || Date.now() - _this._resizeTick > 50) {
        _this._resizeTick = Date.now();

        _this._renderRestrictedPosition();
      }
    };

    this._onWindowMouseMove = function (e) {
      if (_this._dragging) {
        if (e.buttons === 0) {
          _this._dragging = false;

          _this._renderMainClass();

          return;
        }

        var factor = _this._calculateFactor();

        var delta = {
          x: e.clientX - _this._dragStartPosition.x,
          y: e.clientY - _this._dragStartPosition.y
        };

        if (_this._minimized) {
          _this._minTranslateX = _this._dragStartPosition.minTranslateX + delta.x * factor;
          _this._minTranslateY = _this._dragStartPosition.minTranslateY + delta.y;
        } else {
          _this._translateX = _this._dragStartPosition.translateX + delta.x * factor;
          _this._translateY = _this._dragStartPosition.translateY + delta.y;
        }

        if (delta.x !== 0 || delta.y !== 0) _this._isClick = false;

        _this._syncPosition();

        _this._renderRestrictedPosition();
      }
    };

    this._debouncedPostMessage = (0, _debounce.default)(this._postMessage, 100);
    this._prefix = prefix;
    this._messageTypes = (0, _Enum.prefixEnum)({
      enumMap: messageTypes,
      prefix: prefix
    });
    this._container = _ensureExist.default.call(this, container, 'container');
    this._root = root;
    this._styles = styles;
    this._defaultDirection = defaultDirection;
    this._padding = defaultPadding;
    this._minTranslateX = 0;
    this._minTranslateY = 0;
    this._translateX = 0;
    this._translateY = 0;
    this._appWidth = 0;
    this._appHeight = 0;
    this._dragStartPosition = null;
    this._closed = true;
    this._minimized = true;
    this._dragging = false;
    this._hover = false;
    this._hoverHeader = false;
    this._loading = true;
    this._userStatus = null;
    this._dndStatus = null;
    this._telephonyStatus = null;
    this._presenceOption = null;
    this.currentState = -1;
    this._scrollale = false;
    this._strings = {};
  }

  _createClass(AdapterCore, [{
    key: "_onMessage",
    value: function _onMessage(msg) {
      if (msg) {
        switch (msg.type) {
          case this._messageTypes.syncClosed:
            this._onSyncClosed(msg.closed);

            break;

          case this._messageTypes.syncMinimized:
            this._onSyncMinimized(msg.minimized);

            break;

          case this._messageTypes.syncSize:
            this._onSyncSize(msg.size);

            break;

          case this._messageTypes.syncPresence:
            this._onPushPresence(msg);

            break;

          case this._messageTypes.pushAdapterState:
            this._onPushAdapterState(msg);

            break;

          case this._messageTypes.pushLocale:
            this._onPushLocale(msg);

            break;

          case this._messageTypes.pushRingState:
            this._onPushRingState(msg);

            break;

          case this._messageTypes.pushCalls:
            this._onPushCallsInfo(msg);

            break;

          case this._messageTypes.pushOnCurrentCallPath:
            this._onPushOnCurrentCallPath(msg);

            break;

          case this._messageTypes.pushOnAllCallsPath:
            this._onPushOnAllCallsPath(msg);

            break;

          default:
            break;
        }
      }
    }
  }, {
    key: "_getContentDOM",
    value: function _getContentDOM(sanboxAttributeValue, allowAttributeValue) {
      return "\n      <header class=\"".concat(this._styles.header, "\" draggable=\"false\">\n        <div class=\"").concat(this._styles.presence, " ").concat(this._styles.NoPresence, "\">\n          <div class=\"").concat(this._styles.presenceBar, "\">\n          </div>\n        </div>\n        <div class=\"").concat(this._styles.button, " ").concat(this._styles.toggle, "\">\n          <div class=\"").concat(this._styles.minimizeIcon, "\">\n            <div class=\"").concat(this._styles.minimizeIconBar, "\"></div>\n          </div>\n        </div>\n        <div class=\"").concat(this._styles.button, " ").concat(this._styles.close, "\">\n          <div class=\"").concat(this._styles.closeIcon, "\">\n            <div></div><div></div>\n          </div>\n        </div>\n        <img class=\"").concat(this._styles.logo, "\" draggable=\"false\"></img>\n        <div class=\"").concat(this._styles.duration, "\"></div>\n        <div class=\"").concat(this._styles.ringingCalls, "\"></div>\n        <div class=\"").concat(this._styles.onHoldCalls, "\"></div>\n        <div class=\"").concat(this._styles.currentCallBtn, "\">").concat(this._strings.currentCallBtn, "</div>\n        <div class=\"").concat(this._styles.viewCallsBtn, "\">").concat(this._strings.viewCallsBtn, "</div>\n      </header>\n      <div class=\"").concat(this._styles.dropdownPresence, "\">\n        <div class=\"").concat(this._styles.line, "\">\n          <a class=\"").concat(this._styles.presenceItem, "\" data-presence=\"available\">\n            <div class=\"").concat(this._styles.presence, " ").concat(this._styles.statusIcon, " ").concat(this._styles.Available, "\">\n            </div>\n            <span>").concat(this._strings.availableBtn, "</span>\n          </a>\n          <a class=\"").concat(this._styles.presenceItem, "\" data-presence=\"busy\">\n            <div class=\"").concat(this._styles.presence, " ").concat(this._styles.statusIcon, " ").concat(this._styles.Busy, "\">\n            </div>\n            <span>").concat(this._strings.busyBtn, "</span>\n          </a>\n          <a class=\"").concat(this._styles.presenceItem, "\" data-presence=\"doNotAcceptAnyCalls\">\n            <div class=\"").concat(this._styles.presence, " ").concat(this._styles.statusIcon, " ").concat(this._styles.DoNotAcceptAnyCalls, "\">\n              <div class=\"").concat(this._styles.presenceBar, "\"></div>\n            </div>\n            <span>").concat(this._strings.doNotAcceptAnyCallsBtn, "</span>\n          </a>\n          <a class=\"").concat(this._styles.presenceItem, "\" data-presence=\"offline\">\n            <div class=\"").concat(this._styles.presence, " ").concat(this._styles.statusIcon, " ").concat(this._styles.Offline, "\">\n            </div>\n            <span>").concat(this._strings.offlineBtn, "</span>\n          </a>\n        </div>\n      </div>\n      <div class=\"").concat(this._styles.frameContainer, "\">\n        <iframe class=\"").concat(this._styles.contentFrame, "\" sandbox=\"").concat(sanboxAttributeValue, "\" allow=\"").concat(allowAttributeValue, "\" >\n        </iframe>\n      </div>");
    }
  }, {
    key: "_generateContentDOM",
    value: function _generateContentDOM() {
      var _this2 = this;

      this._root.innerHTML = this._getContentDOM(SANDBOX_ATTRIBUTE_VALUE, ALLOW_ATTRIBUTE_VALUE);
      this._headerEl = this._root.querySelector(".".concat(this._styles.header));
      this._logoEl = this._root.querySelector(".".concat(this._styles.logo));

      this._logoEl.addEventListener('dragstart', function () {
        return false;
      });

      this._contentFrameContainerEl = this._root.querySelector(".".concat(this._styles.frameContainer)); // toggle button

      this._toggleEl = this._root.querySelector(".".concat(this._styles.toggle));

      this._toggleEl.addEventListener('click', function (evt) {
        evt.stopPropagation();

        _this2.toggleMinimized();
      }); // close button


      this._closeEl = this._root.querySelector(".".concat(this._styles.close));

      if (this._closeEl) {
        this._closeEl.addEventListener('click', function () {
          _this2.setClosed(true);
        });
      }

      this._presenceEl = this._root.querySelector(".".concat(this._styles.presence));

      this._presenceEl.addEventListener('click', function (evt) {
        evt.stopPropagation();

        _this2.togglePresenceDropdown();
      });

      this._presenceItemEls = this._root.querySelectorAll(".".concat(this._styles.presenceItem));

      this._presenceItemEls.forEach(function (itemEl) {
        var dataPresence = itemEl.getAttribute('data-presence');
        itemEl.addEventListener('click', function (evt) {
          evt.stopPropagation();

          _this2.togglePresenceDropdown();

          _this2._postMessage({
            type: _this2._messageTypes.presenceItemClicked,
            presenceType: _presenceStatus.default[dataPresence] || _dndStatus.default[dataPresence]
          });
        });
      });

      if (this._dropdownPresence) {
        this._dropdownPresence.addEventListener('click', function (evt) {
          evt.stopPropagation();

          _this2.togglePresenceDropdown();
        });
      }

      this._contentFrameEl = this._root.querySelector(".".concat(this._styles.contentFrame));
      this._durationEl = this._root.querySelector(".".concat(this._styles.duration));

      this._durationEl.addEventListener('click', function (evt) {
        evt.stopPropagation();

        _this2._postMessage({
          type: _this2._messageTypes.navigateToCurrentCall
        });
      });

      this._currentCallEl = this._root.querySelector(".".concat(this._styles.currentCallBtn));

      this._currentCallEl.addEventListener('click', function (evt) {
        evt.stopPropagation();

        _this2._postMessage({
          type: _this2._messageTypes.navigateToCurrentCall
        });
      });

      this._viewCallsEl = this._root.querySelector(".".concat(this._styles.viewCallsBtn));

      this._viewCallsEl.addEventListener('click', function (evt) {
        evt.stopPropagation();

        _this2._postMessage({
          type: _this2._messageTypes.navigateToViewCalls
        });
      });

      this._ringingCallsEl = this._root.querySelector(".".concat(this._styles.ringingCalls));
      this._onHoldCallsEl = this._root.querySelector(".".concat(this._styles.onHoldCalls));

      this._headerEl.addEventListener('mousedown', function (e) {
        _this2._dragging = true;
        _this2._isClick = true;
        _this2._dragStartPosition = {
          x: e.clientX,
          y: e.clientY,
          translateX: _this2._translateX,
          translateY: _this2._translateY,
          minTranslateX: _this2._minTranslateX,
          minTranslateY: _this2._minTranslateY
        };

        _this2._renderMainClass();
      });

      this._headerEl.addEventListener('mouseup', function () {
        _this2._dragging = false;

        _this2._renderMainClass();
      });

      window.addEventListener('mousemove', this._onWindowMouseMove);

      this._headerEl.addEventListener('mouseenter', function () {
        if (!_this2._minimized) {
          if (_this2._currentStartTime > 0) {
            _this2._hoverBar = true;
            _this2._scrollable = false;

            _this2._renderCallsBar();
          }

          return;
        }

        _this2._hoverHeader = true;

        _this2._renderMainClass();
      });

      this._headerEl.addEventListener('mouseleave', function () {
        _this2._hoverHeader = false;
        _this2._hoverBar = false;
        _this2._scrollable = false;

        _this2._renderCallsBar();

        _this2._renderMainClass();
      });

      this._isClick = true;

      this._headerEl.addEventListener('click', function (evt) {
        if (!_this2._isClick) return;

        _this2._onHeaderClicked(evt);
      });

      this._resizeTimeout = null;
      this._resizeTick = null;
      window.addEventListener('resize', this._onWindowResize); // hover detection for ie

      this._container.addEventListener('mouseenter', function () {
        _this2._hover = true;

        _this2._renderMainClass();
      });

      this._container.addEventListener('mouseleave', function () {
        _this2._hover = false;

        _this2._renderMainClass();
      });

      if (document.readyState === 'loading') {
        window.addEventListener('load', function () {
          document.body.appendChild(_this2._container);
        });
      } else {
        document.body.appendChild(this._container);
      }

      if (typeof this._beforeRender === 'function') {
        this._beforeRender();
      }

      this._render();
    }
  }, {
    key: "togglePresenceDropdown",
    value: function togglePresenceDropdown() {
      if (this.dropdownPresence) {
        this.dropdownPresence.classList.toggle("".concat(this._styles.showDropdown));
        this.setMinimized(false);
      }
    }
  }, {
    key: "_postMessage",
    value: function _postMessage(data) {
      this.messageTransport.postMessage(data);
    }
  }, {
    key: "_setLogoUrl",
    value: function _setLogoUrl(logoUrl) {
      this._logoUrl = logoUrl;
      this._logoEl.src = logoUrl;

      this._logoEl.setAttribute('class', (0, _classnames.default)(this._styles.logo, this._logoUrl && this._logoUrl !== '' && this._styles.visible));
    }
  }, {
    key: "_setAppUrl",
    value: function _setAppUrl(appUrl) {
      this._appUrl = appUrl;

      if (appUrl) {
        this.contentFrameEl.src = appUrl;
      }
    }
  }, {
    key: "_onSyncMinimized",
    value: function _onSyncMinimized(minimized) {
      this._minimized = !!minimized;

      this._renderMainClass();

      this.renderAdapterSize();

      this._renderRestrictedPosition();
    }
  }, {
    key: "setMinimized",
    value: function setMinimized(minimized) {
      this._onSyncMinimized(minimized);

      this._postMessage({
        type: this._messageTypes.syncMinimized,
        minimized: this._minimized
      });

      if (minimized && this.dropdownPresence) {
        this.dropdownPresence.classList.remove("".concat(this._styles.showDropdown));
      }
    }
  }, {
    key: "toggleMinimized",
    value: function toggleMinimized() {
      this.setMinimized(!this._minimized);
    }
  }, {
    key: "_calculateMinMaxPosition",
    value: function _calculateMinMaxPosition() {
      var maximumX = window.innerWidth - (this._minimized ? this._headerEl.clientWidth : this._appWidth) - 2 * this._padding;
      var maximumY = window.innerHeight - (this._minimized ? this._headerEl.clientHeight : this._headerEl.clientHeight + this._appHeight) - this._padding;
      return {
        minimumX: this._padding,
        minimumY: this._padding,
        maximumX: maximumX,
        maximumY: maximumY
      };
    }
  }, {
    key: "_onSyncClosed",
    value: function _onSyncClosed(closed) {
      this._closed = !!closed;

      this._renderMainClass();
    }
  }, {
    key: "setClosed",
    value: function setClosed(closed) {
      this._onSyncClosed(closed);

      this._postMessage({
        type: this._messageTypes.syncClosed,
        closed: this.closed
      });
    }
  }, {
    key: "toggleClosed",
    value: function toggleClosed() {
      this.setClosed(!this.closed);
    }
  }, {
    key: "_onSyncSize",
    value: function _onSyncSize(_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      this._appWidth = width;
      this._appHeight = height;
      this._contentFrameEl.style.width = "".concat(width, "px");
      this._contentFrameEl.style.height = "".concat(height, "px");
      this.renderAdapterSize();
    }
  }, {
    key: "setSize",
    value: function setSize(size) {
      this._onSyncSize(size);

      this._postMessage({
        type: this._messageTypes.syncSize,
        size: size
      });
    }
  }, {
    key: "_onPushRingState",
    value: function _onPushRingState(_ref3) {
      var ringing = _ref3.ringing;
      this._ringing = ringing;

      this._render();
    }
  }, {
    key: "_onPushCallsInfo",
    value: function _onPushCallsInfo(_ref4) {
      var ringingCallsLength = _ref4.ringingCallsLength,
          onHoldCallsLength = _ref4.onHoldCallsLength,
          currentStartTime = _ref4.currentStartTime;
      this._currentStartTime = currentStartTime;
      this._ringingCallsLength = ringingCallsLength;
      this._onHoldCallsLength = onHoldCallsLength;
      this._hasActiveCalls = this._currentStartTime > 0 || this._ringingCallsLength > 0 || this._onHoldCallsLength > 0;
      this.renderCallsBar();
    }
  }, {
    key: "_onPushOnCurrentCallPath",
    value: function _onPushOnCurrentCallPath(_ref5) {
      var onCurrentCallPath = _ref5.onCurrentCallPath;
      this._onCurrentCallPath = onCurrentCallPath;

      this._render();
    }
  }, {
    key: "_onPushOnAllCallsPath",
    value: function _onPushOnAllCallsPath(_ref6) {
      var onAllCallsPath = _ref6.onAllCallsPath;
      this._onAllCallsPath = onAllCallsPath;

      this._render();
    }
  }, {
    key: "_onPushPresence",
    value: function _onPushPresence(_ref7) {
      var dndStatus = _ref7.dndStatus,
          userStatus = _ref7.userStatus,
          telephonyStatus = _ref7.telephonyStatus,
          presenceOption = _ref7.presenceOption;

      if (dndStatus !== this._dndStatus || userStatus !== this._userStatus || telephonyStatus !== this._telephonyStatus) {
        this._dndStatus = dndStatus;
        this._userStatus = userStatus;
        this._telephonyStatus = telephonyStatus;
        this._presenceOption = presenceOption;
        this.renderPresence();
      }
    }
  }, {
    key: "_onPushLocale",
    value: function _onPushLocale(_ref8) {
      var locale = _ref8.locale,
          _ref8$strings = _ref8.strings,
          strings = _ref8$strings === void 0 ? {} : _ref8$strings;
      this._locale = locale;
      this._strings = strings;

      this._renderString();
    }
  }, {
    key: "_renderString",
    value: function _renderString() {
      this._renderCallBarBtn();

      this._renderRingingCalls();

      this._renderOnHoldCalls();

      this._renderPresenceItem();
    }
  }, {
    key: "_syncPosition",
    value: function _syncPosition() {
      this._debouncedPostMessage.call(this, {
        type: this._messageTypes.syncPosition,
        position: {
          translateX: this._translateX,
          translateY: this._translateY,
          minTranslateX: this._minTranslateX,
          minTranslateY: this._minTranslateY
        }
      });
    }
  }, {
    key: "_onPushAdapterState",
    value: function _onPushAdapterState(_ref9) {
      var _ref9$size = _ref9.size,
          width = _ref9$size.width,
          height = _ref9$size.height,
          minimized = _ref9.minimized,
          closed = _ref9.closed,
          _ref9$position = _ref9.position,
          translateX = _ref9$position.translateX,
          translateY = _ref9$position.translateY,
          minTranslateX = _ref9$position.minTranslateX,
          minTranslateY = _ref9$position.minTranslateY,
          dndStatus = _ref9.dndStatus,
          userStatus = _ref9.userStatus,
          telephonyStatus = _ref9.telephonyStatus;
      this._minimized = minimized;
      this._closed = closed;

      if (!this._dragging) {
        this._translateX = translateX;
        this._translateY = translateY;
        this._minTranslateX = minTranslateX;
        this._minTranslateY = minTranslateY;
      }

      this._appWidth = width;
      this._appHeight = height;
      this._dndStatus = dndStatus;
      this._userStatus = userStatus;
      this._telephonyStatus = telephonyStatus;
      this._loading = false;

      this._render();
    }
  }, {
    key: "_calculateFactor",
    value: function _calculateFactor() {
      return this._defaultDirection === 'right' ? -1 : 1;
    }
  }, {
    key: "renderPosition",
    value: function renderPosition() {
      var factor = this._calculateFactor();

      if (this._minimized) {
        this._container.setAttribute('style', "transform: translate( ".concat(this._minTranslateX * factor, "px, ").concat(-this._padding, "px)!important;"));
      } else {
        this._container.setAttribute('style', "transform: translate( ".concat(this._translateX * factor, "px, ").concat(this._translateY, "px)!important;"));
      }
    }
  }, {
    key: "_renderRestrictedPosition",
    value: function _renderRestrictedPosition() {
      var _this$_calculateMinMa = this._calculateMinMaxPosition(),
          minimumX = _this$_calculateMinMa.minimumX,
          minimumY = _this$_calculateMinMa.minimumY,
          maximumX = _this$_calculateMinMa.maximumX,
          maximumY = _this$_calculateMinMa.maximumY;

      if (this._minimized) {
        var newMinTranslateX = Math.max(Math.min(this._minTranslateX, maximumX), minimumX);

        if (newMinTranslateX !== this._minTranslateX) {
          this._minTranslateX = newMinTranslateX;
        }

        var newMinTranslateY = Math.max(Math.min(this._minTranslateY, -minimumY), -maximumY);

        if (newMinTranslateY !== this._minTranslateY) {
          this._minTranslateY = newMinTranslateY;
        }
      } else {
        var newTranslateX = Math.max(Math.min(this._translateX, maximumX), minimumX);
        var newTranslateY = Math.max(Math.min(this._translateY, -minimumY), -maximumY);

        if (this._translateX !== newTranslateX || this._translateY !== newTranslateY) {
          this._translateX = newTranslateX;
          this._translateY = newTranslateY;
        }
      }

      this.renderPosition();
    }
  }, {
    key: "renderAdapterSize",
    value: function renderAdapterSize() {
      if (this._minimized) {
        this._contentFrameContainerEl.style.width = 0;
        this._contentFrameContainerEl.style.height = 0;
      } else {
        this._contentFrameContainerEl.style.width = "".concat(this._appWidth, "px");
        this._contentFrameContainerEl.style.height = "".concat(this._appHeight, "px");
        this._contentFrameEl.style.width = "".concat(this._appWidth, "px");
        this._contentFrameEl.style.height = "".concat(this._appHeight, "px");
      }
    }
  }, {
    key: "_renderMainClass",
    value: function _renderMainClass() {
      this._container.setAttribute('class', (0, _classnames.default)(this._styles.root, this._styles[this._defaultDirection], this._closed && this._styles.closed, this._minimized && this._styles.minimized, this._dragging && this._styles.dragging, this._hover && this._styles.hover, this._loading && this._styles.loading));

      this._headerEl.setAttribute('class', (0, _classnames.default)(this._styles.header, this._minimized && this._styles.minimized, this._ringing && this._styles.ringing));
    }
  }, {
    key: "renderPresence",
    value: function renderPresence() {
      var _this3 = this;

      this._presenceEl.setAttribute('class', (0, _classnames.default)(this._minimized && this._styles.minimized, this._styles.presence, this._userStatus && this._styles[this._userStatus], this._dndStatus && this._styles[this._dndStatus]));

      this._presenceItemEls.forEach(function (presenceItem) {
        var dataPresence = presenceItem.getAttribute('data-presence');

        if (_presenceStatus.default[dataPresence] === _this3._presenceOption || _dndStatus.default[dataPresence === _this3._presenceOption]) {
          presenceItem.setAttribute('class', (0, _classnames.default)(_this3._styles.presenceItem, _this3._styles.selected));
        } else {
          presenceItem.setAttribute('class', (0, _classnames.default)(_this3._styles.presenceItem));
        }
      });
    }
  }, {
    key: "calculateState",
    value: function calculateState() {
      var startTime = this._currentStartTime;
      return Math.round((new Date().getTime() - startTime) / 1000);
    }
  }, {
    key: "renderCallsBar",
    value: function renderCallsBar() {
      var _this$callInfoMap,
          _this4 = this;

      // should clean up rotate duration when call info changed
      if (this.rotateInterval) {
        clearInterval(this.rotateInterval);
        this.rotateInterval = null;
      } // when there is no call


      if (!this._hasActiveCalls) {
        this.currentState = -1;
        this._scrollable = false;
        this._hoverBar = false;

        if (this.durationInterval) {
          clearInterval(this.durationInterval);
          this.durationInterval = null;
        }

        this._renderCallsBar();

        return;
      } // when there is only one active call, only need to display call duration


      if (this._currentStartTime > 0 && this._ringingCallsLength === 0 && this._onHoldCallsLength === 0) {
        this.currentState = CURRENT_CALL;
        this._scrollable = false;

        this._renderCallDuration();

        this._renderCallsBar();

        return;
      } // when there are only ringing calls(no onhold or active calls)
      // only need to display incoming call inco


      if (this._currentStartTime === 0 && this._ringingCallsLength > 0) {
        this.currentState = RINGING_CALLS;
        this._scrollable = false;
        this._hoverBar = false;

        if (this.durationInterval) {
          clearInterval(this.durationInterval);
          this.durationInterval = null;
        }

        this._renderRingingCalls();

        this._renderCallsBar();

        return;
      }

      this.callInfoMap = (_this$callInfoMap = {}, _defineProperty(_this$callInfoMap, CURRENT_CALL, this._currentStartTime > 0), _defineProperty(_this$callInfoMap, RINGING_CALLS, this._ringingCallsLength > 0), _defineProperty(_this$callInfoMap, ON_HOLD_CALLS, this._onHoldCallsLength > 0), _this$callInfoMap); // when multiple calls, should scroll with call info

      this.rotateCallInfo();
      this.rotateInterval = setInterval(function () {
        _this4.rotateCallInfo();
      }, ROTATE_INTERVAL);
    }
  }, {
    key: "rotateCallInfo",
    value: function rotateCallInfo() {
      if (this._hoverBar && this.callInfoMap[this.currentState]) {
        return;
      }

      this.lastState = this.currentState;
      this.currentState = this.increment(this.currentState);

      while (!this.callInfoMap[this.currentState]) {
        this.currentState = this.increment(this.currentState);
      }

      switch (this.currentState) {
        case ON_HOLD_CALLS:
          this._renderOnHoldCalls();

          break;

        case RINGING_CALLS:
          this._renderRingingCalls();

          break;

        case CURRENT_CALL:
          this._renderCallDuration();

          break;

        default:
          break;
      }

      this._scrollable = true;

      this._renderCallsBar();

      this._scrollable = false;
    }
  }, {
    key: "increment",
    value: function increment(state) {
      var newState = state + 1;

      if (state >= ROTATE_LENGTH - 1) {
        return 0;
      }

      return newState;
    }
  }, {
    key: "_renderMinimizedBar",
    value: function _renderMinimizedBar() {
      this._logoEl.setAttribute('class', (0, _classnames.default)(this._styles.logo, this._logoUrl && this._logoUrl !== '' && this._styles.visible));

      this._durationEl.setAttribute('class', (0, _classnames.default)(this._styles.duration));

      this._ringingCallsEl.setAttribute('class', (0, _classnames.default)(this._styles.ringingCalls));

      this._onHoldCallsEl.setAttribute('class', (0, _classnames.default)(this._styles.onHoldCalls));

      this._currentCallEl.setAttribute('class', (0, _classnames.default)(this._styles.currentCallBtn));

      this._viewCallsEl.setAttribute('class', (0, _classnames.default)(this._styles.viewCallsBtn));
    }
  }, {
    key: "_renderCallsBar",
    value: function _renderCallsBar() {
      if (this._minimized) {
        this._renderMinimizedBar();

        return;
      }

      this._logoEl.setAttribute('class', (0, _classnames.default)(this._styles.logo, !this._hasActiveCalls && this._logoUrl && this._logoUrl !== '' && this._styles.visible));

      this._durationEl.setAttribute('class', (0, _classnames.default)(this._styles.duration, this.showDuration && this._styles.visible, this.centerDuration && this._styles.center, this.moveOutDuration && this._styles.moveOut, this.moveInDuration && this._styles.moveIn));

      this._ringingCallsEl.setAttribute('class', (0, _classnames.default)(this._styles.ringingCalls, this.showRingingCalls && this._styles.visible, this.centerCallInfo && this._styles.center, this.moveOutRingingInfo && this._styles.moveOut, this.moveInRingingInfo && this._styles.moveIn));

      this._onHoldCallsEl.setAttribute('class', (0, _classnames.default)(this._styles.onHoldCalls, this.showOnHoldCalls && this._styles.visible, this.centerCallInfo && this._styles.center, this.moveOutOnHoldInfo && this._styles.moveOut, this.moveInOnHoldInfo && this._styles.moveIn));

      this._currentCallEl.setAttribute('class', (0, _classnames.default)(this._styles.currentCallBtn, this.showCurrentCallBtn && this._styles.visible, this.moveOutCurrentCallBtn && this._styles.moveOut, this.moveInCurrentCallBtn && this._styles.moveIn));

      this._viewCallsEl.setAttribute('class', (0, _classnames.default)(this._styles.viewCallsBtn, this.showViewCallsBtn && this._styles.visible, !this.moveInViewCallsBtn && this.moveOutViewCallsBtn && this._styles.moveOut, this.moveInViewCallsBtn && this._styles.moveIn));
    }
  }, {
    key: "_renderCallDuration",
    value: function _renderCallDuration() {
      var _this5 = this;

      if (this.durationInterval) {
        clearInterval(this.durationInterval);
        this.durationInterval = null;
      }

      var duration = (0, _formatDuration.default)(this.calculateState());
      this._durationEl.innerHTML = duration;
      this.durationInterval = setInterval(function () {
        var duration = (0, _formatDuration.default)(_this5.calculateState());
        _this5._durationEl.innerHTML = duration;
      }, 1000);
    }
  }, {
    key: "_renderRingingCalls",
    value: function _renderRingingCalls() {
      if (!this._ringingCallsLength || !this._strings) {
        return;
      }

      this._ringingCallsEl.innerHTML = this._strings.ringCallsInfo;
      this._ringingCallsEl.title = this._strings.ringCallsInfo;
    }
  }, {
    key: "_renderOnHoldCalls",
    value: function _renderOnHoldCalls() {
      if (!this._onHoldCallsLength || !this._strings) {
        return;
      }

      this._onHoldCallsEl.innerHTML = this._strings.onHoldCallsInfo;
      this._onHoldCallsEl.title = this._strings.onHoldCallsInfo;
    }
  }, {
    key: "_renderCallBarBtn",
    value: function _renderCallBarBtn() {
      if (!this._strings) {
        return;
      }

      this._currentCallEl.innerHTML = this._strings.currentCallBtn;
      this._viewCallsEl.innerHTML = this._strings.viewCallsBtn;
    }
  }, {
    key: "_renderPresenceItem",
    value: function _renderPresenceItem() {
      var _this6 = this;

      if (!this._strings) {
        return;
      }

      this._presenceItemEls.forEach(function (presenceItem) {
        var dataPresence = presenceItem.getAttribute('data-presence');
        presenceItem.querySelector('span').innerHTML = _this6._strings["".concat(dataPresence, "Btn")];
      });
    }
  }, {
    key: "_render",
    value: function _render() {
      this.renderPresence();
      this.renderAdapterSize();

      this._renderRestrictedPosition();

      this._renderMainClass();

      this._renderCallsBar();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      // TODO clean up
      window.removeEventListener('mousemove', this._onWindowMouseMove);
      window.removeEventListener('resize', this._onWindowResize);

      if (this._resizeTimeout) {
        clearTimeout(this._resizeTick);
      }

      this._container.remove();
    }
  }, {
    key: "messageTransport",
    get: function get() {
      return this._messageTransport;
    }
  }, {
    key: "container",
    get: function get() {
      return this._container;
    }
  }, {
    key: "root",
    get: function get() {
      return this._root;
    }
  }, {
    key: "headerEl",
    get: function get() {
      return this._headerEl;
    }
  }, {
    key: "contentFrameContainerEl",
    get: function get() {
      return this._contentFrameContainerEl;
    }
  }, {
    key: "toggleEl",
    get: function get() {
      return this._toggleEl;
    }
  }, {
    key: "closeEl",
    get: function get() {
      return this._closeEl;
    }
  }, {
    key: "presenceEl",
    get: function get() {
      return this._presenceEl;
    }
  }, {
    key: "contentFrameEl",
    get: function get() {
      return this._contentFrameEl;
    }
  }, {
    key: "minTranslateX",
    get: function get() {
      return this._minTranslateX;
    }
  }, {
    key: "minTranslateY",
    get: function get() {
      return this._minTranslateY;
    }
  }, {
    key: "translateX",
    get: function get() {
      return this._translateX;
    }
  }, {
    key: "translateY",
    get: function get() {
      return this._translateY;
    }
  }, {
    key: "appWidth",
    get: function get() {
      return this._appWidth;
    }
  }, {
    key: "appHeight",
    get: function get() {
      return this._appHeight;
    }
  }, {
    key: "dragStartPosition",
    get: function get() {
      return this._dragStartPosition;
    }
  }, {
    key: "closed",
    get: function get() {
      return this._closed;
    }
  }, {
    key: "minimized",
    get: function get() {
      return this._minimized;
    }
  }, {
    key: "dragging",
    get: function get() {
      return this._dragging;
    }
  }, {
    key: "hover",
    get: function get() {
      return this._hover;
    }
  }, {
    key: "loading",
    get: function get() {
      return this._loading;
    }
  }, {
    key: "userStatus",
    get: function get() {
      return this._userStatus;
    }
  }, {
    key: "dndStatus",
    get: function get() {
      return this._dndStatus;
    }
  }, {
    key: "ringing",
    get: function get() {
      return this._ringing;
    }
  }, {
    key: "showDuration",
    get: function get() {
      return !this._scrollable && this.currentState === CURRENT_CALL;
    }
  }, {
    key: "showRingingCalls",
    get: function get() {
      return !this._scrollable && this.currentState === RINGING_CALLS;
    }
  }, {
    key: "showOnHoldCalls",
    get: function get() {
      return !this._scrollable && this.currentState === ON_HOLD_CALLS;
    }
  }, {
    key: "showCurrentCallBtn",
    get: function get() {
      return !this._onCurrentCallPath && this.showDuration;
    }
  }, {
    key: "showViewCallsBtn",
    get: function get() {
      return !this._onAllCallsPath && (this.showOnHoldCalls || this.showRingingCalls);
    }
  }, {
    key: "centerDuration",
    get: function get() {
      return this._onCurrentCallPath;
    }
  }, {
    key: "centerCallInfo",
    get: function get() {
      return this._onAllCallsPath;
    }
  }, {
    key: "moveInDuration",
    get: function get() {
      return !this._hoverBar && this.currentState === CURRENT_CALL && this._scrollable;
    }
  }, {
    key: "moveOutDuration",
    get: function get() {
      return !this._hoverBar && this._scrollable && this.lastState === CURRENT_CALL;
    }
  }, {
    key: "moveInRingingInfo",
    get: function get() {
      return !this._hoverBar && this.currentState === RINGING_CALLS && this._scrollable;
    }
  }, {
    key: "moveOutRingingInfo",
    get: function get() {
      return !this._hoverBar && this._scrollable && this.lastState === RINGING_CALLS;
    }
  }, {
    key: "moveInOnHoldInfo",
    get: function get() {
      return !this._hoverBar && this.currentState === ON_HOLD_CALLS && this._scrollable;
    }
  }, {
    key: "moveOutOnHoldInfo",
    get: function get() {
      return !this._hoverBar && this._scrollable && this.lastState === ON_HOLD_CALLS;
    }
  }, {
    key: "moveInCurrentCallBtn",
    get: function get() {
      return !this._onCurrentCallPath && this.moveInDuration;
    }
  }, {
    key: "moveOutCurrentCallBtn",
    get: function get() {
      return !this._onCurrentCallPath && this.moveOutDuration;
    }
  }, {
    key: "moveInViewCallsBtn",
    get: function get() {
      return !this._onAllCallsPath && (this.moveInRingingInfo || this.moveInOnHoldInfo);
    }
  }, {
    key: "moveOutViewCallsBtn",
    get: function get() {
      return !this._onAllCallsPath && (this.moveOutRingingInfo || this.moveOutOnHoldInfo);
    }
  }, {
    key: "dropdownPresence",
    get: function get() {
      return this._root.querySelector(".".concat(this._styles.dropdownPresence));
    }
  }]);

  return AdapterCore;
}();

exports.default = AdapterCore;
//# sourceMappingURL=index.js.map
