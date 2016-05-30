'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function (global, factory) {
    (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory() : typeof define === 'function' && define.amd ? define(factory) : factory();
})(undefined, function () {
    'use strict';

    var actions = {
        HOST_DIALPAD_NUMBER: 100,
        GUEST_INIT: 200,
        GUEST_PHONE_RESIZE: 201,
        GUEST_DIALPAD_NUMBER: 202,
        GUEST_PHONE_UNMOUNT: 203,
        GUEST_PHONE_READY: 204
    };

    var DOMAIN = window.location.origin;
    var PHONE_URL = DOMAIN + '/ringcentral-js-widget/build/widgets.js';
    var LIB_URL = DOMAIN + '/ringcentral-js-widget/build/build.js';
    var COMMON_STYLE_URL = [DOMAIN + '/ringcentral-js-widget/build/styles/main.css'];
    var TARGET_TAG = 'rc-phone';
    var IFRAME_URL = DOMAIN + '/ringcentral-js-widget/demo/embed.html';
    var useShadowDOM = false; /* Always fallback to iframe for now */
    var iframeReadyQueue = [];
    var frame;

    var iframeReady = false;
    var safeEval = function safeEval(script, target) {
        var tag = document.createElement('script');
        tag.text = script;
        if (target) {
            target.appendChild(tag);
            // target.removeChild(tag)
        } else {
                document.body.appendChild(tag);
                document.body.removeChild(tag);
            }
    };
    var fetchAndEval = function fetchAndEval(url, target) {
        return function () {
            return fetch(url).then(function (res) {
                return res.text();
            }).then(function (data) {
                return safeEval(data, target);
            });
        };
    };

    var fetchAndEvalFramework = fetchAndEval(LIB_URL);
    var fetchAndEvalWidget = fetchAndEval(PHONE_URL);

    var createContainer = function createContainer() {
        var target = document.querySelector(TARGET_TAG);
        if (!target) return;
        var shadow = target.createShadowRoot();
        var container = document.createElement('div');
        shadow.appendChild(container);

        COMMON_STYLE_URL.forEach(function (src) {
            fetch(src).then(function (res) {
                return res.text();
            }).then(function (style) {
                var tag = document.createElement('style');
                tag.innerHTML = style;
                shadow.appendChild(tag);
            });
        });
        appendWidget(container, shadow);

        function appendStyle() {}

        function appendWidget(container, shadowRoot) {
            var phone = w(TARGET_TAG, {
                shadowRoot: shadowRoot,
                data: {
                    shadowRoot: shadowRoot
                }
            });
            phone.mount(container);
        }
        return container;
    };

    var createIframe = function createIframe() {
        var target = document.querySelector(TARGET_TAG);
        var options = getOptions(target);
        var iframe = document.createElement('iframe');

        iframe.width = parseInt(options.width) + 2; // border
        iframe.height = options.height;
        iframe.style.border = 0;
        iframe.src = IFRAME_URL + '?' + ('first-level=' + options.firstLevel + '&') + ('width=' + options.width + '&') + ('height=' + options.height + '&') + ('key=' + options.key + '&') + ('secret=' + options.secret + '&') + ('origin=' + window.location.origin);
        iframe.setAttribute('name', 'rc-iframe');
        if (options.dynamic != null) {
            target.style.display = 'none';
            iframe.style['box-shadow'] = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)';
            clickToDial(target, iframe);
        }
        if (options.fixed != null) {
            target.style.position = 'fixed';
            target.style.top = 0;
            target.style.right = '5px';
            iframe.style.background = '#1e89ed';
            iframe.style['box-shadow'] = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)';
        }
        target.appendChild(iframe);
        return iframe;
    };

    var getOptions = function getOptions(target) {
        return {
            firstLevel: target.getAttribute('first-level'),
            width: target.getAttribute('width'),
            height: target.getAttribute('height'),
            dynamic: target.getAttribute('dynamic'),
            fixed: target.getAttribute('fixed'),
            key: target.getAttribute('key'),
            secret: target.getAttribute('secret')
        };
    };

    var clickToDial = function clickToDial(target, iframe) {
        [].concat(_toConsumableArray(document.querySelectorAll('[data-phone]'))).forEach(function (ele) {
            ele.style['text-decoration'] = 'underline black';
            ele.style['cursor'] = 'pointer';
            ele.addEventListener('click', function (e) {
                target.style.display = 'block';
                target.style.position = 'absolute';
                target.style.top = e.pageY + 3 + 'px';
                target.style.left = e.pageX + 3 + 'px';
                iframe.contentWindow.postMessage({
                    type: actions.HOST_DIALPAD_NUMBER,
                    value: ele.getAttribute('data-phone')
                }, IFRAME_URL);
                e.stopPropagation();
            });
        });
        document.addEventListener('click', function (e) {
            var clicked = e.target;
            while (clicked.parentNode) {
                if (clicked === target) {
                    return;
                }
                clicked = clicked.parentNode;
            }
            target.style.display = 'none';
        });
    };

    window.addEventListener('message', function (e) {
        if (e.data.type === 'init') {
            iframeReady = true;
            iframeReadyQueue.forEach(function (action) {
                return action(e.source);
            });
            iframeReadyQueue.length = 0;
        }
    });

    if (document.body.createShadowRoot && useShadowDOM) {
        // shadow dom is supported
        // The order is important
        fetchAndEvalWidget().then(fetchAndEvalFramework).then(createContainer).catch(function (e) {
            return console.error(e);
        });
    } else {
        // fallback to iframe
        frame = createIframe();
    }
    var frame$1 = frame;

    window.addEventListener('message', function (e) {
        var state = e.data;
        frame$1.width = state.size.width;
        frame$1.height = state.size.height;
        if (state.status.unmount) {
            frame$1.parentNode.removeChild(frame$1);
        }
        if (state.status.ready) {
            frame$1.style.background = 'transparent';
        }
    });
    // Ringcentral.on()
    // Ringcentral.oauth()
});
//# sourceMappingURL=host.js.map
