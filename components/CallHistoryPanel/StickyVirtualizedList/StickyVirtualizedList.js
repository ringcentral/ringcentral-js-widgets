"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StickyVirtualizedList = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireDefault(require("react"));

var _StickyVirtualizedList = require("./StickyVirtualizedList.interface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var StickyVirtualizedList = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(StickyVirtualizedList, _React$PureComponent);

  var _super = _createSuper(StickyVirtualizedList);

  function StickyVirtualizedList(props) {
    var _this;

    _classCallCheck(this, StickyVirtualizedList);

    _this = _super.call(this, props);
    _this.nodes = void 0;
    _this.getChildrenCache = void 0;
    _this.rowRenderCache = void 0;
    _this.rowRenderRange = void 0;
    _this.structureChanged = void 0;
    _this.elem = void 0;
    _this.pendingScrollTop = void 0;
    _this.treeToRender = void 0;
    _this.onScroll = _this.onScroll.bind(_assertThisInitialized(_this));
    _this.state = {
      scrollTop: 0,
      currNodePos: 0,
      scrollTick: false
    };
    _this.nodes = [];
    _this.getChildrenCache = {};
    _this.rowRenderCache = {};
    _this.rowRenderRange = undefined;
    return _this;
  }

  _createClass(StickyVirtualizedList, [{
    key: "flattenTree",
    value: function flattenTree(node) {
      var _this2 = this;

      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;
      var nodes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var isFirstChild = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var isLastChild = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var parentIndex = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      var context = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {
        totalHeight: 0
      };
      var index = nodes.length;
      var height = node.height !== undefined ? node.height : props.defaultRowHeight;
      var parentInfo = nodes[parentIndex];

      var id = node.id,
          _node$isSticky = node.isSticky,
          isSticky = _node$isSticky === void 0 ? false : _node$isSticky,
          _node$stickyTop = node.stickyTop,
          stickyTop = _node$stickyTop === void 0 ? 0 : _node$stickyTop,
          _node$zIndex = node.zIndex,
          zIndex = _node$zIndex === void 0 ? 0 : _node$zIndex,
          rest = _objectWithoutProperties(node, ["id", "isSticky", "stickyTop", "zIndex"]);

      var nodeInfo = _objectSpread(_objectSpread({
        id: id,
        isSticky: isSticky,
        stickyTop: stickyTop,
        zIndex: zIndex
      }, rest), {}, {
        top: context.totalHeight,
        parentIndex: parentIndex,
        parentInfo: parentInfo,
        depth: parentIndex !== undefined ? parentInfo.depth + 1 : 0,
        height: height,
        index: index,
        isFirstChild: isFirstChild,
        isLastChild: isLastChild
      });

      nodes.push(nodeInfo);

      if (parentIndex !== undefined) {
        parentInfo.children.push(index);
      }

      context.totalHeight += height;
      var children = props.getChildren(node.id, nodeInfo);

      if (props.isModelImmutable) {
        // If children is undefined, then it is probably a leaf node, so we will have to render this since we don't know if the node
        // itself has changed.
        var oldChildren = this.getChildrenCache[node.id];

        if (children === undefined || oldChildren !== children) {
          delete this.rowRenderCache[node.id];
          this.getChildrenCache[node.id] = children; // Check for structure changes...

          if (children && oldChildren && (children.length !== oldChildren.length || !children.every(function (child, i) {
            return child.id === oldChildren[i].id;
          }))) {
            this.structureChanged = true; // We need to update the entire branch if the structure has changed.

            this.getBranchChildrenIds(children).forEach(function (id) {
              return delete _this2.rowRenderCache[id];
            });
          }
        }
      } else {
        this.structureChanged = true;
      }

      if (Array.isArray(children)) {
        nodeInfo.children = [];

        for (var i = 0; i < children.length; i++) {
          // Need to reset parentIndex here as we are recursive.
          var child = children[i];
          this.flattenTree(child, props, nodes, i === 0, i === children.length - 1, index, context);
        }
      }

      nodeInfo.totalHeight = context.totalHeight - nodeInfo.top;
      return nodes;
    }
  }, {
    key: "getBranchChildrenIds",
    value: function getBranchChildrenIds(children) {
      var _this3 = this;

      var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (!children) {
        return arr;
      }

      children.forEach(function (child) {
        arr.push(child.id);

        _this3.getBranchChildrenIds(_this3.getChildrenCache[child.id], arr);
      });
      return arr;
    }
  }, {
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      this.refreshCachedMetadata(this.props);
      this.storeRenderTree(this.props, this.state);
    }
  }, {
    key: "treeDataUpdated",
    value: function treeDataUpdated(newProps) {
      return newProps.root !== this.props.root || newProps.getChildren !== this.props.getChildren || newProps.defaultRowHeight !== this.props.defaultRowHeight;
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(newProps) {
      // These two properties will change when the structure changes, so we need to re-build the tree when this happens.
      if (this.treeDataUpdated(newProps)) {
        this.refreshCachedMetadata(newProps);
      }

      if (newProps.scrollIndex !== undefined && newProps.scrollIndex >= 0) {
        this.scrollIndexIntoView(newProps.scrollIndex);
      }
    }
  }, {
    key: "UNSAFE_componentWillUpdate",
    value: function UNSAFE_componentWillUpdate(newProps, newState) {
      if (newState.scrollTick === this.state.scrollTick || newState.currNodePos !== this.state.currNodePos) {
        this.storeRenderTree(newProps, newState);
      }
    }
    /**
     * Returns the index of the node in a flat list tree (post-order traversal).
     *
     * @param nodeId The node index to get the index for.
     * @returns {number}
     */

  }, {
    key: "getNodeIndex",
    value: function getNodeIndex(nodeId) {
      return this.nodes.findIndex(function (node) {
        return node.id === nodeId;
      });
    }
    /**
     * Returns the node that appears higher than this node (either a parent, sibling or child of the sibling above).
     * @param nodeId The node to get the previous node of.
     * @returns {*}
     */

  }, {
    key: "getPreviousNodeId",
    value: function getPreviousNodeId(nodeId) {
      var index = this.getNodeIndex(nodeId);

      if (index !== -1) {
        var node = this.nodes[index - 1];

        if (node) {
          return node.id;
        }
      }

      return undefined;
    }
    /**
     * Returns the node that appears lower than this node (sibling or sibling of the node's parent).
     * @param nodeId The node to get the next node of.
     * @returns {*}
     */

  }, {
    key: "getNextNodeId",
    value: function getNextNodeId(nodeId) {
      var index = this.getNodeIndex(nodeId);

      if (index !== -1) {
        var node = this.nodes[index + 1];

        if (node) {
          return node.id;
        }
      }

      return undefined;
    }
    /**
     * Returns true if the node is completely visible and is not obscured.
     * This will return false when the node is partially obscured.
     *
     * @param nodeId The id of the node to check
     * @param includeObscured if true, this method will return true for partially visible nodes.
     * @returns {boolean}
     */

  }, {
    key: "isNodeVisible",
    value: function isNodeVisible(nodeId) {
      var includeObscured = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.isIndexVisible(this.getNodeIndex(nodeId), includeObscured);
    }
    /**
     * Returns true if the node is completely visible and is not obscured, unless includeObscured is specified.
     * This will return false when the node is partially obscured, unless includeObscured is set to true.
     *
     * @param index The index of the node to check, generally retrieved via getNodeIndex()
     * @param includeObscured if true, this method will return true for partially visible nodes.
     * @returns {boolean}
     */

  }, {
    key: "isIndexVisible",
    value: function isIndexVisible(index) {
      var includeObscured = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var inView;
      var node = this.nodes[index];

      if (!node) {
        return false;
      }

      if (node.isSticky && index === this.state.currNodePos || this.getParentPath(this.state.currNodePos).includes(this.nodes[index])) {
        return true;
      }

      if (!includeObscured) {
        inView = this.isIndexInViewport(index);
      } else {
        inView = this.elem.scrollTop <= node.top + node.height - node.stickyTop && this.elem.scrollTop + this.props.height >= node.top;
      }

      if (inView) {
        var path = this.getParentPath(index, false); // If this node is in view, new need to check to see if it is obscured by a sticky parent.
        // Note that this does not handle weird scenarios where the node's parent has a sticky top which is less than other ancestors.
        // Or any z-index weirdness.

        for (var i = 0; i < path.length; i++) {
          var ancestor = path[i]; // If the ancestor is sticky and the node is in view, then it must be stuck to the top

          if (ancestor.isSticky) {
            if (!includeObscured && ancestor.stickyTop + ancestor.height > node.top - this.elem.scrollTop) {
              return false;
            }

            if (includeObscured && ancestor.stickyTop + ancestor.height > node.top + node.height - this.elem.scrollTop) {
              return false;
            }
          }
        }

        return true;
      }

      return false;
    }
  }, {
    key: "isNodeInViewport",
    value: function isNodeInViewport(nodeId) {
      return this.isIndexInViewport(this.getNodeIndex(nodeId));
    }
  }, {
    key: "isIndexInViewport",
    value: function isIndexInViewport(index) {
      var node = this.nodes[index];

      if (!node || !this.elem) {
        return false;
      }

      return this.elem.scrollTop <= node.top - node.stickyTop && this.elem.scrollTop + this.props.height >= node.top + node.height;
    }
  }, {
    key: "getNodeTop",
    value: function getNodeTop(nodeId) {
      return this.getIndexTop(this.getNodeIndex(nodeId));
    }
  }, {
    key: "getIndexTop",
    value: function getIndexTop(index) {
      var node = this.nodes[index];
      return node ? node.top : -1;
    }
  }, {
    key: "getScrollTop",
    value: function getScrollTop() {
      return this.elem ? this.elem.scrollTop : -1;
    }
  }, {
    key: "setScrollTop",
    value: function setScrollTop(scrollTop) {
      if (!isNaN(scrollTop)) {
        this.setScrollTopAndClosestNode(scrollTop, this.state.currNodePos, _StickyVirtualizedList.scrollReasons.requested);
      }
    }
  }, {
    key: "scrollNodeIntoView",
    value: function scrollNodeIntoView(nodeId) {
      var alignToTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.scrollIndexIntoView(this.getNodeIndex(nodeId), alignToTop);
    }
  }, {
    key: "scrollIndexIntoView",
    value: function scrollIndexIntoView(index) {
      var alignToTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var node = this.nodes[index];

      if (node !== undefined) {
        var scrollTop;

        if (alignToTop) {
          if (node.isSticky) {
            scrollTop = node.top - node.stickyTop;
          } else {
            var path = this.getParentPath(index, false);

            for (var i = 0; i < path.length; i++) {
              var ancestor = path[i];

              if (ancestor.isSticky) {
                scrollTop = node.top - ancestor.stickyTop - ancestor.height;
                break;
              }
            }

            if (scrollTop === undefined) {
              // Fallback if nothing is sticky.
              scrollTop = node.top;
            }
          }
        } else {
          scrollTop = node.top - this.props.height + node.height;
        }

        this.setScrollTop(scrollTop);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.scrollReason === _StickyVirtualizedList.scrollReasons.requested) {
        if (this.state.scrollTop >= 0 && this.state.scrollTop !== this.elem.scrollTop) {
          this.elem.scrollTop = this.state.scrollTop;
        }
      }

      if (this.props.onRowsRendered !== undefined && (prevState.currNodePos !== this.state.currNodePos || this.treeDataUpdated(prevProps))) {
        var range = this.rowRenderRange;
        var visibleStartInfo = this.nodes[range.visibleStart];
        var visibleEndInfo = this.nodes[range.visibleEnd];
        this.props.onRowsRendered({
          overscanStartIndex: range.start,
          overscanStopIndex: range.end,
          startIndex: range.visibleStart,
          stopIndex: range.visibleEnd,
          startNode: visibleStartInfo && visibleStartInfo.id,
          endNode: visibleEndInfo && visibleEndInfo.id,
          nodes: this.nodes
        });
      }
    }
  }, {
    key: "refreshCachedMetadata",
    value: function refreshCachedMetadata(props) {
      this.structureChanged = false;
      this.nodes = this.flattenTree(props.root, props);

      if (this.structureChanged) {
        // Need to re-render as the curr node may not be in view
        if (this.elem) {
          // We need to find the the closest node to where we are scrolled to since the structure of the
          // the tree probably has changed.
          this.setScrollTopAndClosestNode(this.pendingScrollTop || this.elem.scrollTop, 0, _StickyVirtualizedList.scrollReasons.requested);
        }
      }
    }
  }, {
    key: "recomputeTree",
    value: function recomputeTree() {
      if (this.props.root !== undefined && this.props.getChildren !== undefined) {
        this.refreshCachedMetadata(this.props);
        this.forceUpdate();
      }
    }
  }, {
    key: "storeRenderTree",
    value: function storeRenderTree(props, state) {
      this.treeToRender = this.renderParentTree(props, state);
    }
  }, {
    key: "forceUpdate",
    value: function forceUpdate() {
      this.getChildrenCache = {};
      this.rowRenderCache = {};
      this.storeRenderTree(this.props, this.state);

      _get(_getPrototypeOf(StickyVirtualizedList.prototype), "forceUpdate", this).call(this);
    }
  }, {
    key: "renderParentTree",
    value: function renderParentTree(props, state) {
      this.rowRenderRange = this.getRenderRowRange(props, state);
      var path = this.getParentPath(this.rowRenderRange.start); // Parent nodes to the current range.

      var indexesToRender = new Set();

      for (var i = 0; i < path.length; i++) {
        indexesToRender.add(path[i].index);
      } // The rest of the nodes within the range.


      for (var _i = this.rowRenderRange.start; _i <= this.rowRenderRange.end; _i++) {
        indexesToRender.add(this.nodes[_i].index);
      }

      if (this.props.renderRoot) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "rv-sticky-node-list",
          style: {
            width: '100%',
            position: 'absolute',
            top: 0
          }
        }, this.renderChildWithChildren(props, state, this.nodes[0], 0, indexesToRender));
      }

      return this.renderParentContainer(props, state, this.nodes[0], indexesToRender);
    }
  }, {
    key: "renderParentContainer",
    value: function renderParentContainer(props, state, parent, indexesToRender) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "rv-sticky-node-list",
        style: {
          position: 'absolute',
          width: '100%',
          height: parent.totalHeight - parent.height
        }
      }, this.renderChildren(props, state, parent, indexesToRender));
    }
  }, {
    key: "getChildContainerStyle",
    value: function getChildContainerStyle(child, top) {
      return {
        position: 'absolute',
        top: top,
        height: child.totalHeight,
        width: '100%'
      };
    }
  }, {
    key: "renderChildWithChildren",
    value: function renderChildWithChildren(props, state, child, top, indexesToRender) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: "rv-node-".concat(child.id),
        className: "rv-sticky-parent-node",
        style: this.getChildContainerStyle(child, top)
      }, this.renderNode(props, state, child, this.getClientNodeStyle(child)), this.renderParentContainer(props, state, child, indexesToRender));
    }
  }, {
    key: "getClientNodeStyle",
    value: function getClientNodeStyle(node) {
      var style = {
        height: node.height
      };

      if (node.isSticky) {
        style.position = 'sticky';
        style.top = node.stickyTop;
        style.zIndex = node.zIndex;
      }

      return style;
    }
  }, {
    key: "getClientLeafNodeStyle",
    value: function getClientLeafNodeStyle(node, top) {
      return {
        position: 'absolute',
        top: top,
        height: node.height,
        width: '100%'
      };
    }
  }, {
    key: "renderChildren",
    value: function renderChildren(props, state, parent, indexesToRender) {
      var _this4 = this;

      var nodes = [];
      var top = 0;
      parent.children.forEach(function (index) {
        var child = _this4.nodes[index];

        if (indexesToRender.has(index)) {
          if (child.children && child.children.length > 0) {
            nodes.push(_this4.renderChildWithChildren(props, state, child, top, indexesToRender));
          } else {
            // Sticky nodes will need a container so that their top is correct. The sticky node itself will have a top
            // of the offset where it should stick, which would conflict with the absolute position of the node.
            if (child.isSticky || props.wrapAllLeafNodes) {
              nodes.push( /*#__PURE__*/_react["default"].createElement("div", {
                className: "rv-sticky-leaf-node",
                key: "rv-node-".concat(child.id),
                style: _this4.getChildContainerStyle(child, top)
              }, _this4.renderNode(props, state, child, _this4.getClientNodeStyle(child))));
            } else {
              nodes.push(_this4.renderNode(props, state, child, _this4.getClientLeafNodeStyle(child, top)));
            }
          }
        } // Needs to be on the outside so that we add the the top even if
        // this node is not visible


        top += child.totalHeight;
      });
      return nodes;
    }
  }, {
    key: "renderNode",
    value: function renderNode(props, state, nodeInfo, style) {
      // If they have not mutated their getChildren, then no need to call them again for the same structure.
      if (props.isModelImmutable && this.rowRenderCache[nodeInfo.id]) {
        return this.rowRenderCache[nodeInfo.id];
      }

      var renderedRow = props.rowRenderer({
        id: nodeInfo.id,
        nodeInfo: nodeInfo,
        style: style
      });

      if (props.isModelImmutable) {
        this.rowRenderCache[nodeInfo.id] = renderedRow;
      }

      return renderedRow;
    }
    /**
     * Determines the start and end number of the range to be rendered.
     * @returns {{start: number, end: number}} Indexes within nodes
     */

  }, {
    key: "getRenderRowRange",
    value: function getRenderRowRange(props, state) {
      // Needs to be at least 1
      var overscanRowCount = props.overscanRowCount > 0 ? props.overscanRowCount : 1;
      var start = state.currNodePos - overscanRowCount;

      if (start < 0) {
        start = 0;
      }

      var visibleEnd = state.currNodePos + 1;

      while (this.nodes[visibleEnd] && this.nodes[visibleEnd].top < state.scrollTop + props.height) {
        visibleEnd++;
      }

      var end = visibleEnd + overscanRowCount;

      if (end > this.nodes.length - 1) {
        end = this.nodes.length - 1;
      }

      return {
        start: start,
        end: end,
        visibleStart: state.currNodePos,
        visibleEnd: visibleEnd
      };
    }
  }, {
    key: "getParentPath",
    value: function getParentPath(nodeIndex) {
      var topDownOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var currNode = this.nodes[nodeIndex];
      var path = [];

      while (currNode) {
        currNode = this.nodes[currNode.parentIndex];

        if (currNode) {
          path.push(currNode);
        }
      }

      return topDownOrder ? path.reverse() : path;
    }
  }, {
    key: "forwardSearch",
    value: function forwardSearch(scrollTop, searchPos) {
      var nodes = this.nodes;

      for (var i = searchPos; i < nodes.length; i++) {
        if (nodes[i].top >= scrollTop) {
          return i;
        }
      }

      return nodes.length - 1;
    }
  }, {
    key: "backwardSearch",
    value: function backwardSearch(scrollTop, searchPos) {
      var nodes = this.nodes;

      for (var i = Math.min(searchPos, Math.max(nodes.length - 1, 0)); i >= 0; i--) {
        if (nodes[i].top <= scrollTop) {
          return i;
        }
      }

      return 0;
    }
  }, {
    key: "setScrollTopAndClosestNode",
    value: function setScrollTopAndClosestNode(scrollTop, currNodePos, scrollReason) {
      var _this5 = this;

      if (scrollTop === this.state.scrollTop) {
        return;
      }

      if (scrollTop >= this.elem.scrollHeight - this.elem.offsetHeight) {
        scrollTop = this.elem.scrollHeight - this.elem.offsetHeight;
      }

      var pos;

      if (scrollTop > this.state.scrollTop || currNodePos === 0) {
        pos = this.forwardSearch(scrollTop, currNodePos);
      }

      if (scrollTop < this.state.scrollTop && pos === undefined) {
        pos = this.backwardSearch(scrollTop, currNodePos);
      }

      this.pendingScrollTop = scrollTop;
      this.setState({
        currNodePos: pos ? pos : 0,
        scrollTop: scrollTop,
        scrollReason: scrollReason
      }, function () {
        _this5.pendingScrollTop = undefined;
      });
    }
  }, {
    key: "onScroll",
    value: function onScroll(e) {
      var _ref = e.target,
          scrollTop = _ref.scrollTop,
          scrollLeft = _ref.scrollLeft;
      var scrollReason = this.state.scrollReason || _StickyVirtualizedList.scrollReasons.requested;
      this.setScrollTopAndClosestNode(scrollTop, this.state.currNodePos, scrollReason);

      if (this.props.onScroll !== undefined) {
        this.props.onScroll({
          scrollTop: scrollTop,
          scrollLeft: scrollLeft,
          scrollReason: scrollReason
        });
      }

      this.setState({
        scrollTick: !this.state.scrollTick,
        scrollReason: undefined
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var style = {
        overflow: 'auto',
        position: 'relative'
      };

      if (this.props.width) {
        style.width = this.props.width;
      }

      if (this.props.height) {
        style.height = this.props.height;
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: function ref(elem) {
          return _this6.elem = elem;
        },
        className: "rv-sticky-tree",
        style: style,
        onScroll: this.onScroll
      }, this.treeToRender);
    }
  }]);

  return StickyVirtualizedList;
}(_react["default"].PureComponent);

exports.StickyVirtualizedList = StickyVirtualizedList;
StickyVirtualizedList.defaultProps = {
  overscanRowCount: 10,
  renderRoot: false,
  wrapAllLeafNodes: false,
  isModelImmutable: false
};
//# sourceMappingURL=StickyVirtualizedList.js.map
