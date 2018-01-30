'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Enum = require('ringcentral-integration/lib/Enum');

var _ensureExist = require('ringcentral-integration/lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _debounce = require('ringcentral-integration/lib/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _baseMessageTypes = require('./baseMessageTypes');

var _baseMessageTypes2 = _interopRequireDefault(_baseMessageTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SANDBOX_ATTRIBUTE_VALUE = ['allow-same-origin', 'allow-scripts', 'allow-forms', 'allow-popups'].join(' ');

// chrome 63 mandate the declaration of this attribute for getUserMedia to work in iframes
var ALLOW_ATTRIBUTE_VALUE = ['microphone'].join(' ');

var AdapterCore = function () {
  function AdapterCore(_ref) {
    var _this = this;

    var prefix = _ref.prefix,
        styles = _ref.styles,
        container = _ref.container,
        _ref$root = _ref.root,
        root = _ref$root === undefined ? container : _ref$root,
        _ref$messageTypes = _ref.messageTypes,
        messageTypes = _ref$messageTypes === undefined ? _baseMessageTypes2.default : _ref$messageTypes,
        _ref$defaultDirection = _ref.defaultDirection,
        defaultDirection = _ref$defaultDirection === undefined ? 'left' : _ref$defaultDirection,
        _ref$defaultPadding = _ref.defaultPadding,
        defaultPadding = _ref$defaultPadding === undefined ? 15 : _ref$defaultPadding;
    (0, _classCallCheck3.default)(this, AdapterCore);

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
        } else {
          _this._translateX = _this._dragStartPosition.translateX + delta.x * factor;
          _this._translateY = _this._dragStartPosition.translateY + delta.y;
        }
        _this._syncPosition();
        _this._renderRestrictedPosition();
      }
    };

    this._debouncedPostMessage = (0, _debounce2.default)(this._postMessage, 200);

    this._prefix = prefix;
    this._messageTypes = (0, _Enum.prefixEnum)({ enumMap: messageTypes, prefix: prefix });
    this._container = _ensureExist2.default.call(this, container, 'container');
    this._root = root;
    this._styles = styles;
    this._defaultDirection = defaultDirection;

    this._padding = defaultPadding;
    this._minTranslateX = 0;
    this._translateX = 0;
    this._translateY = 0;
    this._appWidth = 0;
    this._appHeight = 0;
    this._dragStartPosition = null;

    this._closed = true;
    this._minimized = true;
    this._dragging = false;
    this._hover = false;
    this._loading = false;
    this._userStatus = null;
    this._dndStatus = null;
    this._telephonyStatus = null;
  }

  (0, _createClass3.default)(AdapterCore, [{
    key: '_onMessage',
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
          default:
            break;
        }
      }
    }
  }, {
    key: '_generateContentDOM',
    value: function _generateContentDOM() {
      var _this2 = this;

      this._root.innerHTML = '\n      <header class="' + this._styles.header + '" draggable="false">\n        <div class="' + this._styles.presence + ' ' + this._styles.NoPresence + '">\n          <div class="' + this._styles.presenceBar + '">\n          </div>\n        </div>\n        <div class="' + this._styles.button + ' ' + this._styles.toggle + '">\n          <div class="' + this._styles.minimizeIcon + '">\n            <div class="' + this._styles.minimizeIconBar + '"></div>\n          </div>\n        </div>\n        <div class="' + this._styles.button + ' ' + this._styles.close + '">\n          <div class="' + this._styles.closeIcon + '">\n            <div></div><div></div>\n          </div>\n        </div>\n        <img class="' + this._styles.logo + '" draggable="false"></img>\n      </header>\n      <div class="' + this._styles.frameContainer + '">\n        <iframe class="' + this._styles.contentFrame + '" sandbox="' + SANDBOX_ATTRIBUTE_VALUE + '" allow="' + ALLOW_ATTRIBUTE_VALUE + '" >\n        </iframe>\n      </div>\n    ';
      this._headerEl = this._root.querySelector('.' + this._styles.header);
      this._logoEl = this._root.querySelector('.' + this._styles.logo);
      this._logoEl.addEventListener('dragstart', function () {
        return false;
      });

      this._contentFrameContainerEl = this._root.querySelector('.' + this._styles.frameContainer);

      // toggle button
      this._toggleEl = this._root.querySelector('.' + this._styles.toggle);
      this._toggleEl.addEventListener('click', function () {
        _this2.toggleMinimized();
      });

      // close button
      this._closeEl = this._root.querySelector('.' + this._styles.close);
      this._closeEl.addEventListener('click', function () {
        _this2.setClosed(true);
      });

      this._presenceEl = this._root.querySelector('.' + this._styles.presence);
      this._presenceEl.addEventListener('click', function () {
        _this2._postMessage({
          type: _this2._messageTypes.presenceClicked
        });
      });
      this._contentFrameEl = this._root.querySelector('.' + this._styles.contentFrame);

      this._headerEl.addEventListener('mousedown', function (e) {
        _this2._dragging = true;
        _this2._dragStartPosition = {
          x: e.clientX,
          y: e.clientY,
          translateX: _this2._translateX,
          translateY: _this2._translateY,
          minTranslateX: _this2._minTranslateX
        };
        _this2._renderMainClass();
      });
      this._headerEl.addEventListener('mouseup', function () {
        _this2._dragging = false;
        _this2._renderMainClass();
      });
      window.addEventListener('mousemove', this._onWindowMouseMove);

      this._resizeTimeout = null;
      this._resizeTick = null;
      window.addEventListener('resize', this._onWindowResize);

      // hover detection for ie
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

      this._render();
    }
  }, {
    key: '_postMessage',
    value: function _postMessage(data) {
      this.messageTransport.postMessage(data);
    }
  }, {
    key: '_setLogoUrl',
    value: function _setLogoUrl(logoUrl) {
      this._logoUrl = logoUrl;
      this._logoEl.src = logoUrl;
      this._logoEl.setAttribute('class', (0, _classnames2.default)(this._styles.logo, this._logoUrl && this._logoUrl !== '' && this._styles.visible));
    }
  }, {
    key: '_setAppUrl',
    value: function _setAppUrl(appUrl) {
      this._appUrl = appUrl;
      if (appUrl) {
        this.contentFrameEl.src = appUrl;
      }
    }
  }, {
    key: '_onSyncMinimized',
    value: function _onSyncMinimized(minimized) {
      this._minimized = !!minimized;
      this._renderMainClass();
      this.renderAdapterSize();
      this._renderRestrictedPosition();
    }
  }, {
    key: 'setMinimized',
    value: function setMinimized(minimized) {
      this._onSyncMinimized(minimized);
      this._postMessage({
        type: this._messageTypes.syncMinimized,
        minimized: this._minimized
      });
    }
  }, {
    key: 'toggleMinimized',
    value: function toggleMinimized() {
      this.setMinimized(!this._minimized);
    }
  }, {
    key: '_calculateMinMaxPosition',
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
    key: '_onSyncClosed',
    value: function _onSyncClosed(closed) {
      this._closed = !!closed;
      this._renderMainClass();
    }
  }, {
    key: 'setClosed',
    value: function setClosed(closed) {
      this._onSyncClosed(closed);
      this._postMessage({
        type: this._messageTypes.syncClosed,
        closed: this.closed
      });
    }
  }, {
    key: 'toggleClosed',
    value: function toggleClosed() {
      this.setClosed(!this.closed);
    }
  }, {
    key: '_onSyncSize',
    value: function _onSyncSize(_ref2) {
      var width = _ref2.width,
          height = _ref2.height;

      this._appWidth = width;
      this._appHeight = height;
      this._contentFrameEl.style.width = width + 'px';
      this._contentFrameEl.style.height = height + 'px';
      this.renderAdapterSize();
    }
  }, {
    key: 'setSize',
    value: function setSize(size) {
      this._onSyncSize(size);
      this._postMessage({
        type: this._messageTypes.syncSize,
        size: size
      });
    }
  }, {
    key: '_onPushRingState',
    value: function _onPushRingState(_ref3) {
      var ringing = _ref3.ringing;

      this._ringing = ringing;
      this._render();
    }
  }, {
    key: '_onPushPresence',
    value: function _onPushPresence(_ref4) {
      var dndStatus = _ref4.dndStatus,
          userStatus = _ref4.userStatus,
          telephonyStatus = _ref4.telephonyStatus;

      if (dndStatus !== this._dndStatus || userStatus !== this._userStatus || telephonyStatus !== this._telephonyStatus) {
        this._dndStatus = dndStatus;
        this._userStatus = userStatus;
        this._telephonyStatus = telephonyStatus;
        this.renderPresence();
      }
    }
  }, {
    key: '_onPushLocale',
    value: function _onPushLocale(_ref5) {
      var locale = _ref5.locale,
          _ref5$strings = _ref5.strings,
          strings = _ref5$strings === undefined ? {} : _ref5$strings;

      this._locale = locale;
      this._strings = strings;
    }
  }, {
    key: '_syncPosition',
    value: function _syncPosition() {
      this._debouncedPostMessage.call(this, {
        type: this._messageTypes.syncPosition,
        position: {
          translateX: this._translateX,
          translateY: this._translateY,
          minTranslateX: this._minTranslateX
        }
      });
    }
  }, {
    key: '_onPushAdapterState',
    value: function _onPushAdapterState(_ref6) {
      var _ref6$size = _ref6.size,
          width = _ref6$size.width,
          height = _ref6$size.height,
          minimized = _ref6.minimized,
          closed = _ref6.closed,
          _ref6$position = _ref6.position,
          translateX = _ref6$position.translateX,
          translateY = _ref6$position.translateY,
          minTranslateX = _ref6$position.minTranslateX,
          dndStatus = _ref6.dndStatus,
          userStatus = _ref6.userStatus,
          telephonyStatus = _ref6.telephonyStatus;

      this._minimized = minimized;
      this._closed = closed;
      if (!this._dragging) {
        this._translateX = translateX;
        this._translateY = translateY;
        this._minTranslateX = minTranslateX;
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
    key: '_calculateFactor',
    value: function _calculateFactor() {
      return this._defaultDirection === 'right' ? -1 : 1;
    }
  }, {
    key: 'renderPosition',
    value: function renderPosition() {
      var factor = this._calculateFactor();
      if (this._minimized) {
        this._container.setAttribute('style', 'transform: translate( ' + this._minTranslateX * factor + 'px, ' + -this._padding + 'px)!important;');
      } else {
        this._container.setAttribute('style', 'transform: translate( ' + this._translateX * factor + 'px, ' + this._translateY + 'px)!important;');
      }
    }
  }, {
    key: '_renderRestrictedPosition',
    value: function _renderRestrictedPosition() {
      var _calculateMinMaxPosit = this._calculateMinMaxPosition(),
          minimumX = _calculateMinMaxPosit.minimumX,
          minimumY = _calculateMinMaxPosit.minimumY,
          maximumX = _calculateMinMaxPosit.maximumX,
          maximumY = _calculateMinMaxPosit.maximumY;

      if (this._minimized) {
        var newMinTranslateX = Math.max(Math.min(this._minTranslateX, maximumX), minimumX);
        if (newMinTranslateX !== this._minTranslateX) {
          this._minTranslateX = newMinTranslateX;
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
    key: 'renderAdapterSize',
    value: function renderAdapterSize() {
      if (this._minimized) {
        this._contentFrameContainerEl.style.width = 0;
        this._contentFrameContainerEl.style.height = 0;
      } else {
        this._contentFrameContainerEl.style.width = this._appWidth + 'px';
        this._contentFrameContainerEl.style.height = this._appHeight + 'px';
        this._contentFrameEl.style.width = this._appWidth + 'px';
        this._contentFrameEl.style.height = this._appHeight + 'px';
      }
    }
  }, {
    key: '_renderMainClass',
    value: function _renderMainClass() {
      this._container.setAttribute('class', (0, _classnames2.default)(this._styles.root, this._styles[this._defaultDirection], this._closed && this._styles.closed, this._minimized && this._styles.minimized, this._dragging && this._styles.dragging, this._hover && this._styles.hover, this._loading && this._styles.loading));
      this._headerEl.setAttribute('class', (0, _classnames2.default)(this._styles.header, this._minimized && this._styles.minimized, this._ringing && this._styles.ringing));
    }
  }, {
    key: 'renderPresence',
    value: function renderPresence() {
      this._presenceEl.setAttribute('class', (0, _classnames2.default)(this._minimized && this._styles.minimized, this._styles.presence, this._userStatus && this._styles[this._userStatus], this._dndStatus && this._styles[this._dndStatus]));
    }
  }, {
    key: '_render',
    value: function _render() {
      this._renderMainClass();
      this.renderPresence();
      this.renderAdapterSize();
      this._renderRestrictedPosition();
    }
  }, {
    key: 'dispose',
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
    key: 'messageTransport',
    get: function get() {
      return this._messageTransport;
    }
  }, {
    key: 'container',
    get: function get() {
      return this._container;
    }
  }, {
    key: 'root',
    get: function get() {
      return this._root;
    }
  }, {
    key: 'headerEl',
    get: function get() {
      return this._headerEl;
    }
  }, {
    key: 'contentFrameContainerEl',
    get: function get() {
      return this._contentFrameContainerEl;
    }
  }, {
    key: 'toggleEl',
    get: function get() {
      return this._toggleEl;
    }
  }, {
    key: 'closeEl',
    get: function get() {
      return this._closeEl;
    }
  }, {
    key: 'presenceEl',
    get: function get() {
      return this._presenceEl;
    }
  }, {
    key: 'contentFrameEl',
    get: function get() {
      return this._contentFrameEl;
    }
  }, {
    key: 'minTranslateX',
    get: function get() {
      return this._minTranslateX;
    }
  }, {
    key: 'translateX',
    get: function get() {
      return this._translateX;
    }
  }, {
    key: 'translateY',
    get: function get() {
      return this._translateY;
    }
  }, {
    key: 'appWidth',
    get: function get() {
      return this._appWidth;
    }
  }, {
    key: 'appHeight',
    get: function get() {
      return this._appHeight;
    }
  }, {
    key: 'dragStartPosition',
    get: function get() {
      return this._dragStartPosition;
    }
  }, {
    key: 'closed',
    get: function get() {
      return this._closed;
    }
  }, {
    key: 'minimized',
    get: function get() {
      return this._minimized;
    }
  }, {
    key: 'dragging',
    get: function get() {
      return this._dragging;
    }
  }, {
    key: 'hover',
    get: function get() {
      return this._hover;
    }
  }, {
    key: 'loading',
    get: function get() {
      return this._loading;
    }
  }, {
    key: 'userStatus',
    get: function get() {
      return this._userStatus;
    }
  }, {
    key: 'dndStatus',
    get: function get() {
      return this._dndStatus;
    }
  }, {
    key: 'ringing',
    get: function get() {
      return this._ringing;
    }
  }]);
  return AdapterCore;
}();

exports.default = AdapterCore;
//# sourceMappingURL=index.js.map
