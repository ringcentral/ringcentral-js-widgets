"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuidePopover = exports.GuideAnchor = void 0;
exports.isElementInsideViewport = isElementInsideViewport;
exports.useGuidePopoverManager = exports.useGuidePopover = void 0;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _excluded = ["children", "showHint", "popoverOpen", "className", "activeClassName", "hintClassName", "animateHint", "closePopover"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var defaultActiveClasses = 'h-full rounded bg-neutral-base z-tooltip pointer-events-none';
var rightTopHintClasses = 'absolute right-1.5 top-1.5 size-2 rounded-full bg-primary-f pointer-events-none';
/**
 * Component that renders the popover content.
 * Only renders when popover is open.
 */
var GuidePopover = exports.GuidePopover = function GuidePopover(_ref) {
  var children = _ref.children,
    anchorRef = _ref.anchorRef,
    popoverOpen = _ref.popoverOpen;
  if (!popoverOpen) return null;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_springUi.Portal, null, /*#__PURE__*/_react["default"].createElement(_springUi.Backdrop, {
    className: "z-0"
  })), /*#__PURE__*/_react["default"].createElement(_springUi.Popper, {
    anchorEl: function anchorEl() {
      return anchorRef.current;
    },
    "data-sign": "guidePopover",
    className: "z-modal max-w-[calc(100%-32px)]",
    arrowHeight: 8,
    padding: 16,
    offset: 8
  }, function (_ref2) {
    var arrowRef = _ref2.arrowRef,
      arrowStyle = _ref2.arrowStyle;
    return /*#__PURE__*/_react["default"].createElement(_springUi.PopperPaper, {
      arrowRef: arrowRef,
      arrowStyle: arrowStyle,
      className: "rounded-md bg-neutral-base p-3 max-w-[280px]"
    }, children);
  }));
};
/**
 * Component that wraps the anchor element.
 * Shows a ringing animation indicator in the top-right corner when `showHint` is true.
 * Applies active styles when popover is open.
 */
var GuideAnchor = exports.GuideAnchor = /*#__PURE__*/(0, _react.forwardRef)(function (_ref3, ref) {
  var children = _ref3.children,
    showHint = _ref3.showHint,
    popoverOpen = _ref3.popoverOpen,
    className = _ref3.className,
    _ref3$activeClassName = _ref3.activeClassName,
    activeClassName = _ref3$activeClassName === void 0 ? defaultActiveClasses : _ref3$activeClassName,
    _ref3$hintClassName = _ref3.hintClassName,
    hintClassName = _ref3$hintClassName === void 0 ? rightTopHintClasses : _ref3$hintClassName,
    _ref3$animateHint = _ref3.animateHint,
    animateHint = _ref3$animateHint === void 0 ? true : _ref3$animateHint,
    closePopover = _ref3.closePopover,
    rest = _objectWithoutProperties(_ref3, _excluded);
  (0, _react.useEffect)(function () {
    return function () {
      closePopover();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    ref: ref
  }, rest, {
    className: (0, _clsx["default"])(className, (0, _clsx["default"])(showHint && 'relative', popoverOpen && activeClassName))
  }), children, showHint && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: hintClassName
  }), animateHint && /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(hintClassName, 'animate-ping')
  })));
});

/**
 * Hook for creating a guide popover with ringing animation indicator.
 *
 * This hook is designed to guide users through new features or actions.
 * It provides:
 * - A popover component that displays instructional content
 * - An anchor wrapper component that shows a ringing animation hint when the user hasn't seen the popover
 * - State management for opening/closing the popover
 *
 * @param options - Configuration options for the guide popover
 *
 * @returns An object containing:
 * - `anchorRef`: Ref for the anchor element (used internally)
 * - `popoverOpen`: Boolean indicating if popover is open
 * - `open`: Function to open the popover
 * - `close`: Function to close the popover
 *
 * @example
 * ```tsx
 * import { GuideAnchor, GuidePopover, useGuidePopover } from '@ringcentral-integration/next-widgets/components';
 *
 * const { anchorRef, popoverOpen, open, close } = useGuidePopover({});
 *
 * const handleClick = () => {
 *   if (!hasSeenPopover) {
 *     open();
 *     markAsSeen();
 *   } else {
 *     // Perform actual action
 *   }
 * };
 *
 * return (
 *   <>
 *     <GuideAnchor
 *       ref={anchorRef}
 *       popoverOpen={popoverOpen}
 *       closePopover={close}
 *       showHint={!hasSeenPopover}
 *     >
 *       <IconButton onClick={handleClick} />
 *     </GuideAnchor>
 *     <GuidePopover anchorRef={anchorRef} popoverOpen={popoverOpen}>
 *       <div>
 *         <h3>Guide Title</h3>
 *         <p>Guide description</p>
 *       </div>
 *       <Button onClick={close}>Got it</Button>
 *     </GuidePopover>
 *   </>
 * );
 * ```
 */
var useGuidePopover = exports.useGuidePopover = function useGuidePopover(options) {
  var _options$scrollIntoVi = options.scrollIntoView,
    scrollIntoView = _options$scrollIntoVi === void 0 ? 'visible' : _options$scrollIntoVi,
    _options$scrollIntoVi2 = options.scrollIntoViewOptions,
    scrollIntoViewOptions = _options$scrollIntoVi2 === void 0 ? {
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    } : _options$scrollIntoVi2;
  var anchorRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    popoverOpen = _useState2[0],
    setPopoverOpen = _useState2[1];
  var openPopover = (0, _react.useCallback)(function () {
    var elm = anchorRef.current;
    if (scrollIntoView && elm) {
      if (scrollIntoView === true) {
        elm.scrollIntoView(scrollIntoViewOptions);
      } else {
        var isInsideViewport = isElementInsideViewport(elm);
        if (!isInsideViewport) {
          elm.scrollIntoView(scrollIntoViewOptions);
        }
      }
    }
    setPopoverOpen(true);
  }, [scrollIntoView, scrollIntoViewOptions]);
  var closePopover = (0, _react.useCallback)(function () {
    setPopoverOpen(false);
  }, []);
  return {
    anchorRef: anchorRef,
    popoverOpen: popoverOpen,
    open: openPopover,
    close: closePopover
  };
};
/**
 * Hook for managing multiple guide popovers in a step-by-step sequence.
 *
 * This hook coordinates multiple guide popovers to create a multi-step guide experience.
 * It manages which popover should be open at any given time and provides navigation
 * methods to move between steps.
 *
 * @param popovers - Array of guide popover instances returned from `useGuidePopover`
 * @param options - Configuration options for the manager
 * @param options.autoStart - Whether to automatically start the guide sequence
 * @param options.initialStep - Initial step index to start from
 *
 * @returns An object containing:
 * - `currentStep`: Current step index (0-based, -1 if not started)
 * - `totalSteps`: Total number of steps
 * - `isFirst`: Whether current step is the first step
 * - `isLast`: Whether current step is the last step
 * - `isActive`: Whether the guide sequence is active (any step is open)
 * - `next`: Function to go to the next step
 * - `previous`: Function to go to the previous step
 * - `goToStep`: Function to go to a specific step index
 * - `start`: Function to start the guide sequence from the first step
 * - `finish`: Function to finish the guide sequence and close all popovers
 * - `reset`: Function to reset the guide sequence to initial state
 *
 * @example
 * ```tsx
 * import { GuideAnchor, GuidePopover, useGuidePopover, useGuidePopoverManager } from '@ringcentral-integration/next-widgets/components';
 *
 * const guidePopover1 = useGuidePopover({});
 * const guidePopover2 = useGuidePopover({});
 * const guidePopover3 = useGuidePopover({});
 *
 * const guidePopoverManager = useGuidePopoverManager([
 *   guidePopover1,
 *   guidePopover2,
 *   guidePopover3,
 * ]);
 *
 * const handleNext = () => {
 *   if (guidePopoverManager.isLast) {
 *     guidePopoverManager.finish();
 *   } else {
 *     guidePopoverManager.next();
 *   }
 * };
 *
 * return (
 *   <>
 *     <GuideAnchor
 *       ref={guidePopover1.anchorRef}
 *       popoverOpen={guidePopover1.popoverOpen}
 *       closePopover={guidePopover1.close}
 *       showHint={true}
 *     >
 *       <IconButton onClick={() => guidePopoverManager.start()} />
 *     </GuideAnchor>
 *     <GuidePopover
 *       anchorRef={guidePopover1.anchorRef}
 *       popoverOpen={guidePopover1.popoverOpen}
 *     >
 *       <div>Step 1 content</div>
 *       <Button onClick={handleNext}>Next</Button>
 *     </GuidePopover>
 *
 *     <GuideAnchor
 *       ref={guidePopover2.anchorRef}
 *       popoverOpen={guidePopover2.popoverOpen}
 *       closePopover={guidePopover2.close}
 *       showHint={false}
 *     >
 *       <IconButton />
 *     </GuideAnchor>
 *     <GuidePopover
 *       anchorRef={guidePopover2.anchorRef}
 *       popoverOpen={guidePopover2.popoverOpen}
 *     >
 *       <div>Step 2 content</div>
 *       <Button onClick={handleNext}>Next</Button>
 *     </GuidePopover>
 *
 *     <GuideAnchor
 *       ref={guidePopover3.anchorRef}
 *       popoverOpen={guidePopover3.popoverOpen}
 *       closePopover={guidePopover3.close}
 *       showHint={false}
 *     >
 *       <IconButton />
 *     </GuideAnchor>
 *     <GuidePopover
 *       anchorRef={guidePopover3.anchorRef}
 *       popoverOpen={guidePopover3.popoverOpen}
 *     >
 *       <div>Step 3 content</div>
 *       <Button onClick={guidePopoverManager.finish}>Finish</Button>
 *     </GuidePopover>
 *   </>
 * );
 * ```
 */
var useGuidePopoverManager = exports.useGuidePopoverManager = function useGuidePopoverManager(popovers) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$autoStart = options.autoStart,
    autoStart = _options$autoStart === void 0 ? false : _options$autoStart,
    _options$initialStep = options.initialStep,
    initialStep = _options$initialStep === void 0 ? 0 : _options$initialStep;
  var _useState3 = (0, _react.useState)(-1),
    _useState4 = _slicedToArray(_useState3, 2),
    currentStep = _useState4[0],
    setCurrentStep = _useState4[1];
  var totalSteps = popovers.length;
  var isFirst = currentStep === 0;
  var isLast = currentStep === totalSteps - 1;
  var isActive = currentStep >= 0;

  /**
   * Opens the popover at the specified step and closes all others.
   */
  var goToStep = (0, _react.useCallback)(function (step) {
    if (step < 0 || step >= totalSteps) {
      return;
    }

    // Close all popovers first
    popovers.forEach(function (popover) {
      popover.close();
    });

    // Open the popover at the target step
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
      popovers[step].open();
    }
  }, [popovers, totalSteps]);

  /**
   * Goes to the next step.
   */
  var next = (0, _react.useCallback)(function () {
    if (currentStep < totalSteps - 1) {
      goToStep(currentStep + 1);
    }
  }, [currentStep, totalSteps, goToStep]);

  /**
   * Goes to the previous step.
   */
  var previous = (0, _react.useCallback)(function () {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  /**
   * Starts the guide sequence from the first step.
   */
  var start = (0, _react.useCallback)(function () {
    goToStep(initialStep);
  }, [goToStep, initialStep]);

  /**
   * Finishes the guide sequence and closes all popovers.
   */
  var finish = (0, _react.useCallback)(function () {
    popovers.forEach(function (popover) {
      popover.close();
    });
    setCurrentStep(-1);
  }, [popovers]);

  /**
   * Resets the guide sequence to initial state.
   */
  var reset = (0, _react.useCallback)(function () {
    finish();
    if (autoStart) {
      start();
    }
  }, [finish, autoStart, start]);

  // Auto-start if enabled
  (0, _react.useEffect)(function () {
    if (autoStart && currentStep === -1) {
      start();
    }
  }, [autoStart, currentStep, start]);
  return {
    currentStep: currentStep,
    totalSteps: totalSteps,
    isFirst: isFirst,
    isLast: isLast,
    isActive: isActive,
    next: next,
    previous: previous,
    goToStep: goToStep,
    start: start,
    finish: finish,
    reset: reset
  };
};
function isElementInsideViewport(elm) {
  var rect = elm.getBoundingClientRect();
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  var windowWidth = window.innerWidth || document.documentElement.clientWidth;
  var isVisible = rect.top >= 0 && rect.left >= 0 && rect.bottom <= windowHeight && rect.right <= windowWidth;
  return isVisible;
}
//# sourceMappingURL=useGuidePopover.js.map
