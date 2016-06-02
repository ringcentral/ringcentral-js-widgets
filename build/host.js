/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _frame = __webpack_require__(79);
	
	var _frame2 = _interopRequireDefault(_frame);
	
	var _oauth = __webpack_require__(80);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.Ringcentral = window.Ringcentral || {};
	window.Ringcentral.widgets = {
	    oauth: _oauth.oauth
	};
	window.addEventListener('message', function (e) {
	    var state = e.data;
	    _frame2.default.width = state.size.width;
	    _frame2.default.height = state.size.height;
	    if (state.status.unmount) {
	        _frame2.default.parentNode.removeChild(_frame2.default);
	    }
	    if (state.status.ready) {
	        _frame2.default.style['box-shadow'] = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)';
	    }
	});
	// Ringcentral.on()
	// Ringcentral.oauth()

/***/ },

/***/ 78:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    HOST_DIALPAD_NUMBER: 100,
	    GUEST_INIT: 200,
	    GUEST_PHONE_RESIZE: 201,
	    GUEST_DIALPAD_NUMBER: 202,
	    GUEST_PHONE_UNMOUNT: 203,
	    GUEST_PHONE_READY: 204
	};

/***/ },

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _actions = __webpack_require__(78);
	
	var _actions2 = _interopRequireDefault(_actions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var TAG = document.querySelector('#rc-widgets-script').getAttribute('src');
	var BASEURL = new URL(TAG).href;
	// const PHONE_URL = DOMAIN + '/ringcentral-js-widget/build/widgets.js'
	// const LIB_URL = DOMAIN + '/ringcentral-js-widget/build/build.js'
	// const COMMON_STYLE_URL = [DOMAIN + '/ringcentral-js-widget/build/styles/main.css']
	var TARGET_TAG = 'rc-phone';
	var IFRAME_URL = BASEURL.substr(0, BASEURL.lastIndexOf('/')) + '/embed.html';
	var useShadowDOM = false; /* Always fallback to iframe for now */
	var iframeReadyQueue = [];
	var frame;
	
	var iframeReady = false;
	var drag = false;
	
	// var safeEval = function(script, target) {
	//     var tag = document.createElement('script')
	//     tag.text = script
	//     if (target) {
	//         target.appendChild(tag)
	//         // target.removeChild(tag)
	//     } else {
	//         document.body.appendChild(tag)
	//         document.body.removeChild(tag)
	//     }
	// }
	// var fetchAndEval = function(url, target) {
	//     return function() {
	//         return fetch(url)
	//                 .then(res => res.text())
	//                 .then(data => safeEval(data, target))
	//     }
	// }
	
	// var fetchAndEvalFramework = fetchAndEval(LIB_URL)
	// var fetchAndEvalWidget = fetchAndEval(PHONE_URL)
	
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
	        clickToDial(target, iframe);
	        // iframe.style.background = '#1e89ed'
	        // iframe.style['box-shadow'] = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
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
	            // target.style.display = 'block'
	            // target.style.position = 'absolute'
	            // target.style.top = `${e.pageY + 3}px`
	            // target.style.left = `${e.pageX + 3}px`
	            iframe.contentWindow.postMessage({
	                type: _actions2.default.HOST_DIALPAD_NUMBER,
	                value: ele.getAttribute('data-phone')
	            }, IFRAME_URL);
	            e.stopPropagation();
	        });
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
	exports.default = frame;

/***/ },

/***/ 80:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.oauth = oauth;
	function oauth(sdk) {
	    var redirectUri = window.location.origin + '/ringcentral-js-widget/demo/redirect.html';
	    window.open(sdk.platform().authUrl({ redirectUri: redirectUri }), 'rc-iframe-2', 'width=400, height=600');
	    return new Promise(function (resolve, reject) {
	        window.addEventListener('message', function (e) {
	            if (e.data.type === 'oauth') {
	                var qs = sdk.platform().parseAuthRedirectUrl(e.data.value);
	                qs.redirectUri = redirectUri;
	                resolve(qs);
	            }
	        });
	    });
	}

/***/ }

/******/ });
//# sourceMappingURL=host.js.map