import classnames from 'classnames';
import { prefixEnum } from 'ringcentral-integration/lib/Enum';
import ensureExist from 'ringcentral-integration/lib/ensureExist';
import debounce from 'ringcentral-integration/lib/debounce';
import baseMessageTypes from './baseMessageTypes';

const SANDBOX_ATTRIBUTE_VALUE = [
  'allow-same-origin',
  'allow-scripts',
  'allow-forms',
  'allow-popups',
].join(' ');

// chrome 63 mandate the declaration of this attribute for getUserMedia to work in iframes
const ALLOW_ATTRIBUTE_VALUE = [
  'microphone',
  // 'camera',
].join(' ');

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
    this._messageTypes = prefixEnum({ enumMap: messageTypes, prefix });
    this._container = this::ensureExist(container, 'container');
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
        default:
          break;
      }
    }
  }

  _getContentDOM(sanboxAttributeValue, allowAttributeValue) {
    return `
      <header class="${this._styles.header}" draggable="false">
        <div class="${this._styles.presence} ${this._styles.NoPresence}">
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
      </header>
      <div class="${this._styles.frameContainer}">
        <iframe class="${this._styles.contentFrame}" sandbox="${sanboxAttributeValue}" allow="${allowAttributeValue}" >
        </iframe>
      </div>`;
  }

  _generateContentDOM() {
    this._root.innerHTML = this._getContentDOM(SANDBOX_ATTRIBUTE_VALUE, ALLOW_ATTRIBUTE_VALUE);
    this._headerEl = this._root.querySelector(
      `.${this._styles.header}`
    );
    this._logoEl = this._root.querySelector(
      `.${this._styles.logo}`
    );
    this._logoEl.addEventListener('dragstart', () => false);

    this._contentFrameContainerEl = this._root.querySelector(
      `.${this._styles.frameContainer}`
    );

    // toggle button
    this._toggleEl = this._root.querySelector(
      `.${this._styles.toggle}`
    );
    this._toggleEl.addEventListener('click', (evt) => {
      evt.stopPropagation();
      this.toggleMinimized();
    });

    // close button
    this._closeEl = this._root.querySelector(
      `.${this._styles.close}`
    );

    if (this._closeEl) {
      this._closeEl.addEventListener('click', () => {
        this.setClosed(true);
      });
    }

    this._presenceEl = this._root.querySelector(
      `.${this._styles.presence}`
    );
    this._presenceEl.addEventListener('click', (evt) => {
      evt.stopPropagation();
      this._postMessage({
        type: this._messageTypes.presenceClicked,
      });
    });
    this._contentFrameEl = this._root.querySelector(
      `.${this._styles.contentFrame}`
    );

    this._headerEl.addEventListener('mousedown', (e) => {
      this._dragging = true;
      this._isClick = true;
      this._dragStartPosition = {
        x: e.clientX,
        y: e.clientY,
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
      if (!this._minimized) return;
      this._hoverHeader = true;
      this._renderMainClass();
    });
    this._headerEl.addEventListener('mouseleave', () => {
      this._hoverHeader = false;
      this._renderMainClass();
    });

    this._isClick = true;
    this._headerEl.addEventListener('click', (evt) => {
      if (!this._isClick) return;
      this._onHeaderClicked(evt);
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
  _onWindowResize = () => {
    if (this._dragging) { return; }
    if (this._resizeTimeout) { clearTimeout(this._resizeTimeout); }
    this._resizeTimeout = setTimeout(() => this._renderRestrictedPosition(), 100);
    if (!this._resizeTick || Date.now() - this._resizeTick > 50) {
      this._resizeTick = Date.now();
      this._renderRestrictedPosition();
    }
  }
  _onWindowMouseMove = (e) => {
    if (this._dragging) {
      if (e.buttons === 0) {
        this._dragging = false;
        this._renderMainClass();
        return;
      }
      const factor = this._calculateFactor();
      const delta = {
        x: e.clientX - this._dragStartPosition.x,
        y: e.clientY - this._dragStartPosition.y,
      };
      if (this._minimized) {
        this._minTranslateX = this._dragStartPosition.minTranslateX + delta.x * factor;
        this._minTranslateY = this._dragStartPosition.minTranslateY + delta.y;
      } else {
        this._translateX = this._dragStartPosition.translateX + delta.x * factor;
        this._translateY = this._dragStartPosition.translateY + delta.y;
      }
      if (delta.x !== 0 || delta.y !== 0) this._isClick = false;
      this._syncPosition();
      this._renderRestrictedPosition();
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
    this._logoEl.setAttribute('class', classnames(
      this._styles.logo,
      this._logoUrl && this._logoUrl !== '' && this._styles.visible,
    ));
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
  }
  toggleMinimized() {
    this.setMinimized(!this._minimized);
  }

  _calculateMinMaxPosition() {
    const maximumX = window.innerWidth -
      (this._minimized ? this._headerEl.clientWidth : this._appWidth) - 2 * this._padding;
    const maximumY = window.innerHeight -
      (this._minimized ?
        this._headerEl.clientHeight :
        this._headerEl.clientHeight + this._appHeight) - this._padding;
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

  _onPushPresence({ dndStatus, userStatus, telephonyStatus }) {
    if (
      dndStatus !== this._dndStatus ||
      userStatus !== this._userStatus ||
      telephonyStatus !== this._telephonyStatus
    ) {
      this._dndStatus = dndStatus;
      this._userStatus = userStatus;
      this._telephonyStatus = telephonyStatus;
      this.renderPresence();
    }
  }
  _onPushLocale({
    locale,
    strings = {},
  }) {
    this._locale = locale;
    this._strings = strings;
  }

  _debouncedPostMessage = debounce(this._postMessage, 100)

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
    size: {
      width,
      height
    },
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
    return this._defaultDirection === 'right' ?
      -1 :
      1;
  }
  renderPosition() {
    const factor = this._calculateFactor();
    if (this._minimized) {
      this._container.setAttribute(
        'style',
        `transform: translate( ${this._minTranslateX * factor}px, ${-this._padding}px)!important;`
      );
    } else {
      this._container.setAttribute(
        'style',
        `transform: translate( ${this._translateX * factor}px, ${this._translateY}px)!important;`
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
      const newMinTranslateX = Math.max(Math.min(this._minTranslateX, maximumX), minimumX);
      if (newMinTranslateX !== this._minTranslateX) {
        this._minTranslateX = newMinTranslateX;
      }
      const newMinTranslateY = Math.max(Math.min(this._minTranslateY, -minimumY), -maximumY);
      if (newMinTranslateY !== this._minTranslateY) {
        this._minTranslateY = newMinTranslateY;
      }
    } else {
      const newTranslateX = Math.max(Math.min(this._translateX, maximumX), minimumX);
      const newTranslateY = Math.max(Math.min(this._translateY, -minimumY), -maximumY);
      if (this._translateX !== newTranslateX || this._translateY !== newTranslateY) {
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
    this._container.setAttribute('class', classnames(
      this._styles.root,
      this._styles[this._defaultDirection],
      this._closed && this._styles.closed,
      this._minimized && this._styles.minimized,
      this._dragging && this._styles.dragging,
      this._hover && this._styles.hover,
      this._loading && this._styles.loading,
    ));
    this._headerEl.setAttribute('class', classnames(
      this._styles.header,
      this._minimized && this._styles.minimized,
      this._ringing && this._styles.ringing,
    ));
  }
  renderPresence() {
    this._presenceEl.setAttribute('class', classnames(
      this._minimized && this._styles.minimized,
      this._styles.presence,
      this._userStatus && this._styles[this._userStatus],
      this._dndStatus && this._styles[this._dndStatus],
    ));
  }
  _render() {
    this.renderPresence();
    this.renderAdapterSize();
    this._renderRestrictedPosition();
    this._renderMainClass();
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
}
