import classnames from 'classnames';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import ensureExist from 'ringcentral-integration/lib/ensureExist';
import debounce from 'ringcentral-integration/lib/debounce';
import { presenceStatus } from 'ringcentral-integration/enums/presenceStatus.enum';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';
import formatDuration from '../formatDuration';
import { baseMessageTypes } from './baseMessageTypes';

const SANDBOX_ATTRIBUTE_VALUE = [
  'allow-same-origin',
  'allow-scripts',
  'allow-forms',
  'allow-popups',
  // For Google Chrome v83 new feature:
  // https://www.chromestatus.com/feature/5706745674465280
  'allow-downloads',
].join(' ');

// chrome 63 mandate the declaration of this attribute for getUserMedia to work in iframes
const ALLOW_ATTRIBUTE_VALUE = [
  'microphone',
  'autoplay',
  // 'camera',
].join('; ');

const urlRegex = /(https:\/\/)?(?:www\.)?outlook\.office(?:365)?\.com\/(mail)\/(deeplink)/;
const clickEvent = urlRegex.test(window.location.href) ? 'mousedown' : 'click';
const ON_HOLD_CALLS = 0;
const RINGING_CALLS = 1;
const CURRENT_CALL = 2;

const ROTATE_LENGTH = 3;
const ROTATE_INTERVAL = 5000;

export default class AdapterCore {
  constructor({
    prefix,
    styles,
    container,
    root = container,
    messageTypes = baseMessageTypes,
    defaultDirection = 'left',
    defaultPadding = 15,
  }) {
    this._prefix = prefix;
    this._messageTypes = ObjectMap.prefixValues(messageTypes, prefix);
    this._container = ensureExist.call(this, container, 'container');
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

  _onMessage(msg) {
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

  _getContentDOM(sanboxAttributeValue, allowAttributeValue) {
    return `
      <header class="${this._styles.header}" draggable="false">
        <div class="${this._styles.presence} ${this._styles.noPresence}">
          <div class="${this._styles.presenceBar}">
          </div>
        </div>
        <div class="${this._styles.button} ${this._styles.toggle}">
          <div class="${this._styles.minimizeIcon}">
            <div class="${this._styles.minimizeIconBar}"></div>
          </div>
        </div>
        <div class="${this._styles.button} ${this._styles.close}">
          <div class="${this._styles.closeIcon}">
            <div></div><div></div>
          </div>
        </div>
        <img class="${this._styles.logo}" draggable="false"></img>
        <div class="${this._styles.duration}"></div>
        <div class="${this._styles.ringingCalls}"></div>
        <div class="${this._styles.onHoldCalls}"></div>
        <div class="${this._styles.currentCallBtn}">${this._strings.currentCallBtn}</div>
        <div class="${this._styles.viewCallsBtn}">${this._strings.viewCallsBtn}</div>
      </header>
      <div class="${this._styles.dropdownPresence}">
        <div class="${this._styles.line}">
          <a class="${this._styles.presenceItem}" data-presence="available">
            <div class="${this._styles.presence} ${this._styles.statusIcon} ${this._styles.Available}">
            </div>
            <span>${this._strings.availableBtn}</span>
          </a>
          <a class="${this._styles.presenceItem}" data-presence="busy">
            <div class="${this._styles.presence} ${this._styles.statusIcon} ${this._styles.Busy}">
            </div>
            <span>${this._strings.busyBtn}</span>
          </a>
          <a class="${this._styles.presenceItem}" data-presence="doNotAcceptAnyCalls">
            <div class="${this._styles.presence} ${this._styles.statusIcon} ${this._styles.DoNotAcceptAnyCalls}">
              <div class="${this._styles.presenceBar}"></div>
            </div>
            <span>${this._strings.doNotAcceptAnyCallsBtn}</span>
          </a>
          <a class="${this._styles.presenceItem}" data-presence="offline">
            <div class="${this._styles.presence} ${this._styles.statusIcon} ${this._styles.Offline}">
            </div>
            <span>${this._strings.offlineBtn}</span>
          </a>
        </div>
      </div>
      <div class="${this._styles.frameContainer}">
        <iframe class="${this._styles.contentFrame}" sandbox="${sanboxAttributeValue}" allow="${allowAttributeValue}" >
        </iframe>
      </div>`;
  }

  _generateContentDOM() {
    this._root.innerHTML = this._getContentDOM(
      SANDBOX_ATTRIBUTE_VALUE,
      ALLOW_ATTRIBUTE_VALUE,
    );
    this._headerEl = this._root.querySelector(`.${this._styles.header}`);
    this._logoEl = this._root.querySelector(`.${this._styles.logo}`);
    this._logoEl.addEventListener('dragstart', () => false);

    this._contentFrameContainerEl = this._root.querySelector(
      `.${this._styles.frameContainer}`,
    );

    // toggle button
    this._toggleEl = this._root.querySelector(`.${this._styles.toggle}`);
    this._toggleEl.addEventListener(clickEvent, (evt) => {
      evt.stopPropagation();
      this.toggleMinimized();
    });

    // close button
    this._closeEl = this._root.querySelector(`.${this._styles.close}`);
    if (this._closeEl) {
      this._closeEl.addEventListener(clickEvent, () => {
        this.setClosed(true);
      });
    }

    this._presenceEl = this._root.querySelector(`.${this._styles.presence}`);
    this._presenceEl.addEventListener(clickEvent, (evt) => {
      evt.stopPropagation();
      this.togglePresenceDropdown();
    });

    this._presenceItemEls = this._root.querySelectorAll(
      `.${this._styles.presenceItem}`,
    );

    this._presenceItemEls.forEach((itemEl) => {
      const dataPresence = itemEl.getAttribute('data-presence');
      itemEl.addEventListener(clickEvent, (evt) => {
        evt.stopPropagation();
        this.togglePresenceDropdown();
        this._postMessage({
          type: this._messageTypes.presenceItemClicked,
          presenceType: presenceStatus[dataPresence] || dndStatus[dataPresence],
        });
      });
    });

    this._dropdownPresence = this._root.querySelector(
      `.${this._styles.dropdownPresence}`,
    );
    if (this._dropdownPresence) {
      this._dropdownPresence.addEventListener(clickEvent, (evt) => {
        evt.stopPropagation();
        this.togglePresenceDropdown();
      });
    }

    this._contentFrameEl = this._root.querySelector(
      `.${this._styles.contentFrame}`,
    );

    this._durationEl = this._root.querySelector(`.${this._styles.duration}`);
    this._durationEl.addEventListener(clickEvent, (evt) => {
      evt.stopPropagation();
      this._postMessage({
        type: this._messageTypes.navigateToCurrentCall,
      });
    });

    this._currentCallEl = this._root.querySelector(
      `.${this._styles.currentCallBtn}`,
    );
    this._currentCallEl.addEventListener(clickEvent, (evt) => {
      evt.stopPropagation();
      this._postMessage({
        type: this._messageTypes.navigateToCurrentCall,
      });
    });

    this._viewCallsEl = this._root.querySelector(
      `.${this._styles.viewCallsBtn}`,
    );
    this._viewCallsEl.addEventListener(clickEvent, (evt) => {
      evt.stopPropagation();
      this._postMessage({
        type: this._messageTypes.navigateToViewCalls,
      });
    });

    this._ringingCallsEl = this._root.querySelector(
      `.${this._styles.ringingCalls}`,
    );

    this._onHoldCallsEl = this._root.querySelector(
      `.${this._styles.onHoldCalls}`,
    );

    this._headerEl.addEventListener('mousedown', (evt) => {
      this._dragging = true;
      this._isClick = true;
      this._dragStartPosition = {
        x: evt.clientX,
        y: evt.clientY,
        translateX: this._translateX,
        translateY: this._translateY,
        minTranslateX: this._minTranslateX,
        minTranslateY: this._minTranslateY,
      };
      this._renderMainClass();
    });
    this._headerEl.addEventListener('mouseup', () => {
      this._dragging = false;
      this._renderMainClass();
    });
    window.addEventListener('mousemove', this._onWindowMouseMove);

    this._headerEl.addEventListener('mouseenter', () => {
      if (!this._minimized) {
        if (this._currentStartTime > 0) {
          this._hoverBar = true;
          this._scrollable = false;
          this._renderCallsBar();
        }
        return;
      }
      this._hoverHeader = true;
      this._renderMainClass();
    });
    this._headerEl.addEventListener('mouseleave', () => {
      this._hoverHeader = false;
      this._hoverBar = false;
      this._scrollable = false;
      this._renderCallsBar();
      this._renderMainClass();
    });

    this._isClick = true;
    this._headerEl.addEventListener(clickEvent, (evt) => {
      if (this._isClick) {
        this._onHeaderClicked(evt);
      }
    });

    this._resizeTimeout = null;
    this._resizeTick = null;
    window.addEventListener('resize', this._onWindowResize);

    // hover detection for ie
    this._container.addEventListener('mouseenter', () => {
      this._hover = true;
      this._renderMainClass();
    });
    this._container.addEventListener('mouseleave', () => {
      this._hover = false;
      this._renderMainClass();
    });

    if (document.readyState === 'loading') {
      window.addEventListener('load', () => {
        document.body.appendChild(this._container);
      });
    } else {
      document.body.appendChild(this._container);
    }

    if (typeof this._beforeRender === 'function') {
      this._beforeRender();
    }
    this._render();
  }

  _onHeaderClicked() {
    if (this._minimized) {
      this.toggleMinimized();
    }
  }

  _onWindowResize = () => {
    if (this._dragging) {
      return;
    }
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);
    }
    this._resizeTimeout = setTimeout(
      () => this._renderRestrictedPosition(),
      100,
    );
    if (!this._resizeTick || Date.now() - this._resizeTick > 50) {
      this._resizeTick = Date.now();
      this._renderRestrictedPosition();
    }
  };

  _onWindowMouseMove = (evt) => {
    if (this._dragging) {
      if (evt.buttons === 0) {
        this._dragging = false;
        this._renderMainClass();
        return;
      }
      const factor = this._calculateFactor();
      const delta = {
        x: evt.clientX - this._dragStartPosition.x,
        y: evt.clientY - this._dragStartPosition.y,
      };
      if (this._minimized) {
        this._minTranslateX =
          this._dragStartPosition.minTranslateX + delta.x * factor;
        this._minTranslateY = this._dragStartPosition.minTranslateY + delta.y;
      } else {
        this._translateX =
          this._dragStartPosition.translateX + delta.x * factor;
        this._translateY = this._dragStartPosition.translateY + delta.y;
      }
      if (delta.x !== 0 || delta.y !== 0) {
        this._isClick = false;
      }
      this._syncPosition();
      this._renderRestrictedPosition();
    }
  };

  togglePresenceDropdown() {
    if (this._dropdownPresence) {
      this._dropdownPresence.classList.toggle(`${this._styles.showDropdown}`);
      this.setMinimized(false);
    }
  }

  get messageTransport() {
    return this._messageTransport;
  }

  _postMessage(data) {
    this.messageTransport.postMessage(data);
  }

  _setLogoUrl(logoUrl) {
    this._logoUrl = logoUrl;
    this._logoEl.src = logoUrl;
    this._logoEl.setAttribute(
      'class',
      classnames(
        this._styles.logo,
        this._logoUrl && this._logoUrl !== '' && this._styles.visible,
      ),
    );
  }

  _setAppUrl(appUrl) {
    this._appUrl = appUrl;
    if (appUrl) {
      this.contentFrameEl.src = appUrl;
    }
  }

  _onSyncMinimized(minimized) {
    this._minimized = !!minimized;
    this._renderMainClass();
    this.renderAdapterSize();
    this._renderRestrictedPosition();
  }

  setMinimized(minimized) {
    this._onSyncMinimized(minimized);
    this._postMessage({
      type: this._messageTypes.syncMinimized,
      minimized: this._minimized,
    });
    if (minimized && this._dropdownPresence) {
      this._dropdownPresence.classList.remove(`${this._styles.showDropdown}`);
    }
  }

  toggleMinimized() {
    this.setMinimized(!this._minimized);
  }

  _calculateMinMaxPosition() {
    const maximumX =
      window.innerWidth -
      (this._minimized ? this._headerEl.clientWidth : this._appWidth) -
      2 * this._padding;
    const maximumY =
      window.innerHeight -
      (this._minimized
        ? this._headerEl.clientHeight
        : this._headerEl.clientHeight + this._appHeight) -
      this._padding;
    return {
      minimumX: this._padding,
      minimumY: this._padding,
      maximumX,
      maximumY,
    };
  }

  _onSyncClosed(closed) {
    this._closed = !!closed;
    this._renderMainClass();
  }

  setClosed(closed) {
    this._onSyncClosed(closed);
    this._postMessage({
      type: this._messageTypes.syncClosed,
      closed: this.closed,
    });
  }

  toggleClosed() {
    this.setClosed(!this.closed);
  }

  _onSyncSize({ width, height }) {
    this._appWidth = width;
    this._appHeight = height;
    this._contentFrameEl.style.width = `${width}px`;
    this._contentFrameEl.style.height = `${height}px`;
    this.renderAdapterSize();
  }

  setSize(size) {
    this._onSyncSize(size);
    this._postMessage({
      type: this._messageTypes.syncSize,
      size,
    });
  }

  _onPushRingState({ ringing }) {
    this._ringing = ringing;
    this._render();
  }

  _onPushCallsInfo({
    ringingCallsLength,
    onHoldCallsLength,
    currentStartTime,
  }) {
    this._currentStartTime = currentStartTime;
    this._ringingCallsLength = ringingCallsLength;
    this._onHoldCallsLength = onHoldCallsLength;
    this._hasActiveCalls =
      this._currentStartTime > 0 ||
      this._ringingCallsLength > 0 ||
      this._onHoldCallsLength > 0;
    this.renderCallsBar();
  }

  _onPushOnCurrentCallPath({ onCurrentCallPath }) {
    this._onCurrentCallPath = onCurrentCallPath;
    this._render();
  }

  _onPushOnAllCallsPath({ onAllCallsPath }) {
    this._onAllCallsPath = onAllCallsPath;
    this._render();
  }

  _onPushPresence({ dndStatus, userStatus, telephonyStatus, presenceOption }) {
    if (
      dndStatus !== this._dndStatus ||
      userStatus !== this._userStatus ||
      telephonyStatus !== this._telephonyStatus
    ) {
      this._dndStatus = dndStatus;
      this._userStatus = userStatus;
      this._telephonyStatus = telephonyStatus;
      this._presenceOption = presenceOption;
      this.renderPresence();
    }
  }

  _onPushLocale({ locale, strings = {} }) {
    this._locale = locale;
    this._strings = strings;
    this._renderString();
  }

  _renderString() {
    this._renderCallBarBtn();
    this._renderRingingCalls();
    this._renderOnHoldCalls();
    this._renderPresenceItem();
  }

  _debouncedPostMessage = debounce(this._postMessage, 100);

  _syncPosition() {
    this._debouncedPostMessage.call(this, {
      type: this._messageTypes.syncPosition,
      position: {
        translateX: this._translateX,
        translateY: this._translateY,
        minTranslateX: this._minTranslateX,
        minTranslateY: this._minTranslateY,
      },
    });
  }

  _onPushAdapterState({
    size: { width, height },
    minimized,
    closed,
    position: { translateX, translateY, minTranslateX, minTranslateY },
    dndStatus,
    userStatus,
    telephonyStatus,
  }) {
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

  _calculateFactor() {
    return this._defaultDirection === 'right' ? -1 : 1;
  }

  renderPosition() {
    const factor = this._calculateFactor();
    if (this._minimized) {
      this._container.setAttribute(
        'style',
        `transform: translate( ${this._minTranslateX * factor}px, ${-this
          ._padding}px)!important;`,
      );
    } else {
      this._container.setAttribute(
        'style',
        `transform: translate( ${this._translateX * factor}px, ${
          this._translateY
        }px)!important;`,
      );
    }
  }

  _renderRestrictedPosition() {
    const {
      minimumX,
      minimumY,
      maximumX,
      maximumY,
    } = this._calculateMinMaxPosition();

    if (this._minimized) {
      const newMinTranslateX = Math.max(
        Math.min(this._minTranslateX, maximumX),
        minimumX,
      );
      if (newMinTranslateX !== this._minTranslateX) {
        this._minTranslateX = newMinTranslateX;
      }
      const newMinTranslateY = Math.max(
        Math.min(this._minTranslateY, -minimumY),
        -maximumY,
      );
      if (newMinTranslateY !== this._minTranslateY) {
        this._minTranslateY = newMinTranslateY;
      }
    } else {
      const newTranslateX = Math.max(
        Math.min(this._translateX, maximumX),
        minimumX,
      );
      const newTranslateY = Math.max(
        Math.min(this._translateY, -minimumY),
        -maximumY,
      );
      if (
        this._translateX !== newTranslateX ||
        this._translateY !== newTranslateY
      ) {
        this._translateX = newTranslateX;
        this._translateY = newTranslateY;
      }
    }
    this.renderPosition();
  }

  renderAdapterSize() {
    if (this._minimized) {
      this._contentFrameContainerEl.style.width = 0;
      this._contentFrameContainerEl.style.height = 0;
    } else {
      this._contentFrameContainerEl.style.width = `${this._appWidth}px`;
      this._contentFrameContainerEl.style.height = `${this._appHeight}px`;
      this._contentFrameEl.style.width = `${this._appWidth}px`;
      this._contentFrameEl.style.height = `${this._appHeight}px`;
    }
  }

  _renderMainClass() {
    this._container.setAttribute(
      'class',
      classnames(
        this._styles.root,
        this._styles[this._defaultDirection],
        this._closed && this._styles.closed,
        this._minimized && this._styles.minimized,
        this._dragging && this._styles.dragging,
        this._hover && this._styles.hover,
        this._loading && this._styles.loading,
      ),
    );
    this._headerEl.setAttribute(
      'class',
      classnames(
        this._styles.header,
        this._minimized && this._styles.minimized,
        this._ringing && this._styles.ringing,
      ),
    );
  }

  renderPresence() {
    this._presenceEl.setAttribute(
      'class',
      classnames(
        this._minimized && this._styles.minimized,
        this._styles.presence,
        this._userStatus && this._styles[this._userStatus],
        this._dndStatus && this._styles[this._dndStatus],
      ),
    );

    this._presenceItemEls.forEach((presenceItem) => {
      const dataPresence = presenceItem.getAttribute('data-presence');
      if (
        presenceStatus[dataPresence] === this._presenceOption ||
        dndStatus[dataPresence] === this._presenceOption
      ) {
        presenceItem.setAttribute(
          'class',
          classnames(this._styles.presenceItem, this._styles.selected),
        );
      } else {
        presenceItem.setAttribute(
          'class',
          classnames(this._styles.presenceItem),
        );
      }
    });
  }

  calculateState() {
    const startTime = this._currentStartTime;
    return Math.round((new Date().getTime() - startTime) / 1000);
  }

  renderCallsBar() {
    // should clean up rotate duration when call info changed
    if (this.rotateInterval) {
      clearInterval(this.rotateInterval);
      this.rotateInterval = null;
    }
    // when there is no call
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
    }
    // when there is only one active call, only need to display call duration
    if (
      this._currentStartTime > 0 &&
      this._ringingCallsLength === 0 &&
      this._onHoldCallsLength === 0
    ) {
      this.currentState = CURRENT_CALL;
      this._scrollable = false;
      this._renderCallDuration();
      this._renderCallsBar();
      return;
    }
    // when there are only ringing calls(no onhold or active calls)
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
    this.callInfoMap = {
      [CURRENT_CALL]: this._currentStartTime > 0,
      [RINGING_CALLS]: this._ringingCallsLength > 0,
      [ON_HOLD_CALLS]: this._onHoldCallsLength > 0,
    };
    // when multiple calls, should scroll with call info
    this.rotateCallInfo();
    this.rotateInterval = setInterval(() => {
      this.rotateCallInfo();
    }, ROTATE_INTERVAL);
  }

  rotateCallInfo() {
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

  increment(state) {
    const newState = state + 1;
    if (state >= ROTATE_LENGTH - 1) {
      return 0;
    }
    return newState;
  }

  _renderMinimizedBar() {
    this._logoEl.setAttribute(
      'class',
      classnames(
        this._styles.logo,
        this._logoUrl && this._logoUrl !== '' && this._styles.visible,
      ),
    );
    this._durationEl.setAttribute('class', classnames(this._styles.duration));
    this._ringingCallsEl.setAttribute(
      'class',
      classnames(this._styles.ringingCalls),
    );
    this._onHoldCallsEl.setAttribute(
      'class',
      classnames(this._styles.onHoldCalls),
    );
    this._currentCallEl.setAttribute(
      'class',
      classnames(this._styles.currentCallBtn),
    );
    this._viewCallsEl.setAttribute(
      'class',
      classnames(this._styles.viewCallsBtn),
    );
  }

  _renderCallsBar() {
    if (this._minimized) {
      this._renderMinimizedBar();
      return;
    }
    this._logoEl.setAttribute(
      'class',
      classnames(
        this._styles.logo,
        !this._hasActiveCalls &&
          this._logoUrl &&
          this._logoUrl !== '' &&
          this._styles.visible,
      ),
    );
    this._durationEl.setAttribute(
      'class',
      classnames(
        this._styles.duration,
        this.showDuration && this._styles.visible,
        this.centerDuration && this._styles.center,
        this.moveOutDuration && this._styles.moveOut,
        this.moveInDuration && this._styles.moveIn,
      ),
    );
    this._ringingCallsEl.setAttribute(
      'class',
      classnames(
        this._styles.ringingCalls,
        this.showRingingCalls && this._styles.visible,
        this.centerCallInfo && this._styles.center,
        this.moveOutRingingInfo && this._styles.moveOut,
        this.moveInRingingInfo && this._styles.moveIn,
      ),
    );
    this._onHoldCallsEl.setAttribute(
      'class',
      classnames(
        this._styles.onHoldCalls,
        this.showOnHoldCalls && this._styles.visible,
        this.centerCallInfo && this._styles.center,
        this.moveOutOnHoldInfo && this._styles.moveOut,
        this.moveInOnHoldInfo && this._styles.moveIn,
      ),
    );
    this._currentCallEl.setAttribute(
      'class',
      classnames(
        this._styles.currentCallBtn,
        this.showCurrentCallBtn && this._styles.visible,
        this.moveOutCurrentCallBtn && this._styles.moveOut,
        this.moveInCurrentCallBtn && this._styles.moveIn,
      ),
    );
    this._viewCallsEl.setAttribute(
      'class',
      classnames(
        this._styles.viewCallsBtn,
        this.showViewCallsBtn && this._styles.visible,
        !this.moveInViewCallsBtn &&
          this.moveOutViewCallsBtn &&
          this._styles.moveOut,
        this.moveInViewCallsBtn && this._styles.moveIn,
      ),
    );
  }

  _renderCallDuration() {
    if (this.durationInterval) {
      clearInterval(this.durationInterval);
      this.durationInterval = null;
    }
    const duration = formatDuration(this.calculateState());
    this._durationEl.innerHTML = duration;
    this.durationInterval = setInterval(() => {
      const duration = formatDuration(this.calculateState());
      this._durationEl.innerHTML = duration;
    }, 1000);
  }

  _renderRingingCalls() {
    if (!this._ringingCallsLength || !this._strings) {
      return;
    }
    this._ringingCallsEl.innerHTML = this._strings.ringCallsInfo;
    this._ringingCallsEl.title = this._strings.ringCallsInfo;
  }

  _renderOnHoldCalls() {
    if (!this._onHoldCallsLength || !this._strings) {
      return;
    }
    this._onHoldCallsEl.innerHTML = this._strings.onHoldCallsInfo;
    this._onHoldCallsEl.title = this._strings.onHoldCallsInfo;
  }

  _renderCallBarBtn() {
    if (!this._strings) {
      return;
    }
    this._currentCallEl.innerHTML = this._strings.currentCallBtn;
    this._viewCallsEl.innerHTML = this._strings.viewCallsBtn;
  }

  _renderPresenceItem() {
    if (!this._strings) {
      return;
    }
    this._presenceItemEls.forEach((presenceItem) => {
      const dataPresence = presenceItem.getAttribute('data-presence');
      presenceItem.querySelector('span').innerHTML = this._strings[
        `${dataPresence}Btn`
      ];
    });
  }

  _render() {
    this.renderPresence();
    this.renderAdapterSize();
    this._renderRestrictedPosition();
    this._renderMainClass();
    this._renderCallsBar();
  }

  dispose() {
    // TODO clean up
    window.removeEventListener('mousemove', this._onWindowMouseMove);
    window.removeEventListener('resize', this._onWindowResize);
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTick);
    }
    this._container.remove();
  }

  get container() {
    return this._container;
  }

  get root() {
    return this._root;
  }

  get headerEl() {
    return this._headerEl;
  }

  get contentFrameContainerEl() {
    return this._contentFrameContainerEl;
  }

  get toggleEl() {
    return this._toggleEl;
  }

  get closeEl() {
    return this._closeEl;
  }

  get presenceEl() {
    return this._presenceEl;
  }

  get contentFrameEl() {
    return this._contentFrameEl;
  }

  get minTranslateX() {
    return this._minTranslateX;
  }

  get minTranslateY() {
    return this._minTranslateY;
  }

  get translateX() {
    return this._translateX;
  }

  get translateY() {
    return this._translateY;
  }

  get appWidth() {
    return this._appWidth;
  }

  get appHeight() {
    return this._appHeight;
  }

  get dragStartPosition() {
    return this._dragStartPosition;
  }

  get closed() {
    return this._closed;
  }

  get minimized() {
    return this._minimized;
  }

  get dragging() {
    return this._dragging;
  }

  get hover() {
    return this._hover;
  }

  get loading() {
    return this._loading;
  }

  get userStatus() {
    return this._userStatus;
  }

  get dndStatus() {
    return this._dndStatus;
  }

  get ringing() {
    return this._ringing;
  }

  get showDuration() {
    return !this._scrollable && this.currentState === CURRENT_CALL;
  }

  get showRingingCalls() {
    return !this._scrollable && this.currentState === RINGING_CALLS;
  }

  get showOnHoldCalls() {
    return !this._scrollable && this.currentState === ON_HOLD_CALLS;
  }

  get showCurrentCallBtn() {
    return !this._onCurrentCallPath && this.showDuration;
  }

  get showViewCallsBtn() {
    return (
      !this._onAllCallsPath && (this.showOnHoldCalls || this.showRingingCalls)
    );
  }

  get centerDuration() {
    return this._onCurrentCallPath;
  }

  get centerCallInfo() {
    return this._onAllCallsPath;
  }

  get moveInDuration() {
    return (
      !this._hoverBar && this.currentState === CURRENT_CALL && this._scrollable
    );
  }

  get moveOutDuration() {
    return (
      !this._hoverBar && this._scrollable && this.lastState === CURRENT_CALL
    );
  }

  get moveInRingingInfo() {
    return (
      !this._hoverBar && this.currentState === RINGING_CALLS && this._scrollable
    );
  }

  get moveOutRingingInfo() {
    return (
      !this._hoverBar && this._scrollable && this.lastState === RINGING_CALLS
    );
  }

  get moveInOnHoldInfo() {
    return (
      !this._hoverBar && this.currentState === ON_HOLD_CALLS && this._scrollable
    );
  }

  get moveOutOnHoldInfo() {
    return (
      !this._hoverBar && this._scrollable && this.lastState === ON_HOLD_CALLS
    );
  }

  get moveInCurrentCallBtn() {
    return !this._onCurrentCallPath && this.moveInDuration;
  }

  get moveOutCurrentCallBtn() {
    return !this._onCurrentCallPath && this.moveOutDuration;
  }

  get moveInViewCallsBtn() {
    return (
      !this._onAllCallsPath && (this.moveInRingingInfo || this.moveInOnHoldInfo)
    );
  }

  get moveOutViewCallsBtn() {
    return (
      !this._onAllCallsPath &&
      (this.moveOutRingingInfo || this.moveOutOnHoldInfo)
    );
  }
}
