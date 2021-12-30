/* eslint-disable*/
// Original Library: react-virtualized-sticky-tree
// Ref: https://github.com/marchaos/react-virtualized-sticky-tree
import React, { CSSProperties } from 'react';

import {
  Node,
  scrollReasons,
  ScrollReasons,
  StickyVirtualizedListProps,
  StickyVirtualizedListState,
} from './StickyVirtualizedList.interface';

export class StickyVirtualizedList extends React.PureComponent<
  StickyVirtualizedListProps,
  StickyVirtualizedListState
> {
  static defaultProps = {
    overscanRowCount: 10,
    renderRoot: false,
    wrapAllLeafNodes: false,
    isModelImmutable: false,
  };

  nodes: Node[];

  getChildrenCache: {
    [key: string]: Node[];
  };

  rowRenderCache: {
    [key: string]: JSX.Element;
  };

  rowRenderRange: {
    start: number;
    end: number;
    visibleStart: number;
    visibleEnd: number;
  };
  structureChanged: boolean;
  elem: HTMLElement;
  pendingScrollTop: number;
  treeToRender: JSX.Element;

  constructor(props: StickyVirtualizedListProps) {
    super(props);
    this.onScroll = this.onScroll.bind(this);

    this.state = {
      scrollTop: 0,
      currNodePos: 0,
      scrollTick: false,
    };

    this.nodes = [];
    this.getChildrenCache = {};
    this.rowRenderCache = {};
    this.rowRenderRange = undefined;
  }

  flattenTree(
    node: Node,
    props = this.props,
    nodes: Node[] = [],
    isFirstChild = false,
    isLastChild = false,
    parentIndex: number = undefined,
    context = { totalHeight: 0 },
  ) {
    const index = nodes.length;
    const height =
      node.height !== undefined ? node.height : props.defaultRowHeight;

    const parentInfo = nodes[parentIndex];

    const { id, isSticky = false, stickyTop = 0, zIndex = 0, ...rest } = node;

    const nodeInfo = {
      id,
      isSticky,
      stickyTop,
      zIndex,
      ...rest,
      top: context.totalHeight,
      parentIndex,
      parentInfo,
      depth: parentIndex !== undefined ? parentInfo.depth + 1 : 0,
      height,
      index,
      isFirstChild,
      isLastChild,
    };

    nodes.push(nodeInfo);

    if (parentIndex !== undefined) {
      parentInfo.children.push(index);
    }

    context.totalHeight += height;

    const children = props.getChildren(node.id, nodeInfo);

    if (props.isModelImmutable) {
      // If children is undefined, then it is probably a leaf node, so we will have to render this since we don't know if the node
      // itself has changed.
      const oldChildren = this.getChildrenCache[node.id];
      if (children === undefined || oldChildren !== children) {
        delete this.rowRenderCache[node.id];
        this.getChildrenCache[node.id] = children;

        // Check for structure changes...
        if (
          children &&
          oldChildren &&
          (children.length !== oldChildren.length ||
            !children.every((child, i) => child.id === oldChildren[i].id))
        ) {
          this.structureChanged = true;
          // We need to update the entire branch if the structure has changed.
          this.getBranchChildrenIds(children).forEach(
            (id) => delete this.rowRenderCache[id],
          );
        }
      }
    } else {
      this.structureChanged = true;
    }

    if (Array.isArray(children)) {
      nodeInfo.children = [];
      for (let i = 0; i < children.length; i++) {
        // Need to reset parentIndex here as we are recursive.
        const child = children[i];
        this.flattenTree(
          child,
          props,
          nodes,
          i === 0,
          i === children.length - 1,
          index,
          context,
        );
      }
    }

    nodeInfo.totalHeight = context.totalHeight - nodeInfo.top;

    return nodes;
  }

  getBranchChildrenIds(children: Node[], arr: string[] = []) {
    if (!children) {
      return arr;
    }
    children.forEach((child) => {
      arr.push(child.id);
      this.getBranchChildrenIds(this.getChildrenCache[child.id], arr);
    });
    return arr;
  }

  UNSAFE_componentWillMount() {
    this.refreshCachedMetadata(this.props);
    this.storeRenderTree(this.props, this.state);
  }

  treeDataUpdated(newProps: StickyVirtualizedListProps) {
    return (
      newProps.root !== this.props.root ||
      newProps.getChildren !== this.props.getChildren ||
      newProps.defaultRowHeight !== this.props.defaultRowHeight
    );
  }

  UNSAFE_componentWillReceiveProps(newProps: StickyVirtualizedListProps) {
    // These two properties will change when the structure changes, so we need to re-build the tree when this happens.
    if (this.treeDataUpdated(newProps)) {
      this.refreshCachedMetadata(newProps);
    }

    if (newProps.scrollIndex !== undefined && newProps.scrollIndex >= 0) {
      this.scrollIndexIntoView(newProps.scrollIndex);
    }
  }

  UNSAFE_componentWillUpdate(
    newProps: StickyVirtualizedListProps,
    newState: StickyVirtualizedListState,
  ) {
    if (
      newState.scrollTick === this.state.scrollTick ||
      newState.currNodePos !== this.state.currNodePos
    ) {
      this.storeRenderTree(newProps, newState);
    }
  }

  /**
   * Returns the index of the node in a flat list tree (post-order traversal).
   *
   * @param nodeId The node index to get the index for.
   * @returns {number}
   */
  getNodeIndex(nodeId: string) {
    return this.nodes.findIndex((node) => node.id === nodeId);
  }

  /**
   * Returns the node that appears higher than this node (either a parent, sibling or child of the sibling above).
   * @param nodeId The node to get the previous node of.
   * @returns {*}
   */
  getPreviousNodeId(nodeId: string) {
    const index = this.getNodeIndex(nodeId);
    if (index !== -1) {
      const node = this.nodes[index - 1];
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
  getNextNodeId(nodeId: string) {
    const index = this.getNodeIndex(nodeId);
    if (index !== -1) {
      const node = this.nodes[index + 1];
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
  isNodeVisible(nodeId: string, includeObscured = false) {
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
  isIndexVisible(index: number, includeObscured = false) {
    let inView;
    const node = this.nodes[index];

    if (!node) {
      return false;
    }

    if (
      (node.isSticky && index === this.state.currNodePos) ||
      this.getParentPath(this.state.currNodePos).includes(this.nodes[index])
    ) {
      return true;
    }

    if (!includeObscured) {
      inView = this.isIndexInViewport(index);
    } else {
      inView =
        this.elem.scrollTop <= node.top + node.height - node.stickyTop &&
        this.elem.scrollTop + this.props.height >= node.top;
    }
    if (inView) {
      const path = this.getParentPath(index, false);
      // If this node is in view, new need to check to see if it is obscured by a sticky parent.
      // Note that this does not handle weird scenarios where the node's parent has a sticky top which is less than other ancestors.
      // Or any z-index weirdness.
      for (let i = 0; i < path.length; i++) {
        const ancestor = path[i];
        // If the ancestor is sticky and the node is in view, then it must be stuck to the top
        if (ancestor.isSticky) {
          if (
            !includeObscured &&
            ancestor.stickyTop + ancestor.height >
              node.top - this.elem.scrollTop
          ) {
            return false;
          }
          if (
            includeObscured &&
            ancestor.stickyTop + ancestor.height >
              node.top + node.height - this.elem.scrollTop
          ) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }

  isNodeInViewport(nodeId: string) {
    return this.isIndexInViewport(this.getNodeIndex(nodeId));
  }

  isIndexInViewport(index: number) {
    let node = this.nodes[index];
    if (!node || !this.elem) {
      return false;
    }
    return (
      this.elem.scrollTop <= node.top - node.stickyTop &&
      this.elem.scrollTop + this.props.height >= node.top + node.height
    );
  }

  getNodeTop(nodeId: string) {
    return this.getIndexTop(this.getNodeIndex(nodeId));
  }

  getIndexTop(index: number) {
    const node = this.nodes[index];
    return node ? node.top : -1;
  }

  getScrollTop() {
    return this.elem ? this.elem.scrollTop : -1;
  }

  setScrollTop(scrollTop: number) {
    if (!isNaN(scrollTop)) {
      this.setScrollTopAndClosestNode(
        scrollTop,
        this.state.currNodePos,
        scrollReasons.requested,
      );
    }
  }

  scrollNodeIntoView(nodeId: string, alignToTop = true) {
    this.scrollIndexIntoView(this.getNodeIndex(nodeId), alignToTop);
  }

  scrollIndexIntoView(index: number, alignToTop = true) {
    let node = this.nodes[index];
    if (node !== undefined) {
      let scrollTop;
      if (alignToTop) {
        if (node.isSticky) {
          scrollTop = node.top - node.stickyTop;
        } else {
          const path = this.getParentPath(index, false);
          for (let i = 0; i < path.length; i++) {
            const ancestor = path[i];
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

  componentDidUpdate(
    prevProps: StickyVirtualizedListProps,
    prevState: StickyVirtualizedListState,
  ) {
    if (this.state.scrollReason === scrollReasons.requested) {
      if (
        this.state.scrollTop >= 0 &&
        this.state.scrollTop !== this.elem.scrollTop
      ) {
        this.elem.scrollTop = this.state.scrollTop;
      }
    }

    if (
      this.props.onRowsRendered !== undefined &&
      (prevState.currNodePos !== this.state.currNodePos ||
        this.treeDataUpdated(prevProps))
    ) {
      const range = this.rowRenderRange;
      const visibleStartInfo = this.nodes[range.visibleStart];
      const visibleEndInfo = this.nodes[range.visibleEnd];

      this.props.onRowsRendered({
        overscanStartIndex: range.start,
        overscanStopIndex: range.end,
        startIndex: range.visibleStart,
        stopIndex: range.visibleEnd,
        startNode: visibleStartInfo && visibleStartInfo.id,
        endNode: visibleEndInfo && visibleEndInfo.id,
        nodes: this.nodes,
      });
    }
  }

  refreshCachedMetadata(props: StickyVirtualizedListProps) {
    this.structureChanged = false;
    this.nodes = this.flattenTree(props.root, props);

    if (this.structureChanged) {
      // Need to re-render as the curr node may not be in view
      if (this.elem) {
        // We need to find the the closest node to where we are scrolled to since the structure of the
        // the tree probably has changed.
        this.setScrollTopAndClosestNode(
          this.pendingScrollTop || this.elem.scrollTop,
          0,
          scrollReasons.requested,
        );
      }
    }
  }

  recomputeTree() {
    if (this.props.root !== undefined && this.props.getChildren !== undefined) {
      this.refreshCachedMetadata(this.props);
      this.forceUpdate();
    }
  }

  storeRenderTree(
    props: StickyVirtualizedListProps,
    state: StickyVirtualizedListState,
  ) {
    this.treeToRender = this.renderParentTree(props, state);
  }

  forceUpdate() {
    this.getChildrenCache = {};
    this.rowRenderCache = {};
    this.storeRenderTree(this.props, this.state);
    super.forceUpdate();
  }

  renderParentTree(
    props: StickyVirtualizedListProps,
    state: StickyVirtualizedListState,
  ) {
    this.rowRenderRange = this.getRenderRowRange(props, state);
    const path = this.getParentPath(this.rowRenderRange.start);

    // Parent nodes to the current range.
    const indexesToRender: Set<number> = new Set();
    for (let i = 0; i < path.length; i++) {
      indexesToRender.add(path[i].index);
    }

    // The rest of the nodes within the range.
    for (let i = this.rowRenderRange.start; i <= this.rowRenderRange.end; i++) {
      indexesToRender.add(this.nodes[i].index);
    }

    if (this.props.renderRoot) {
      return (
        <div
          className="rv-sticky-node-list"
          style={{ width: '100%', position: 'absolute', top: 0 }}
        >
          {this.renderChildWithChildren(
            props,
            state,
            this.nodes[0],
            0,
            indexesToRender,
          )}
        </div>
      );
    }
    return this.renderParentContainer(
      props,
      state,
      this.nodes[0],
      indexesToRender,
    );
  }

  renderParentContainer(
    props: StickyVirtualizedListProps,
    state: StickyVirtualizedListState,
    parent: Node,
    indexesToRender: Set<number>,
  ) {
    return (
      <div
        className="rv-sticky-node-list"
        style={{
          position: 'absolute',
          width: '100%',
          height: parent.totalHeight - parent.height,
        }}
      >
        {this.renderChildren(props, state, parent, indexesToRender)}
      </div>
    );
  }

  getChildContainerStyle(child: Node, top: number) {
    return {
      position: 'absolute',
      top,
      height: child.totalHeight,
      width: '100%',
    } as CSSProperties;
  }

  renderChildWithChildren(
    props: StickyVirtualizedListProps,
    state: StickyVirtualizedListState,
    child: Node,
    top: number,
    indexesToRender: Set<number>,
  ) {
    return (
      <div
        key={`rv-node-${child.id}`}
        className="rv-sticky-parent-node"
        style={this.getChildContainerStyle(child, top)}
      >
        {this.renderNode(props, state, child, this.getClientNodeStyle(child))}
        {this.renderParentContainer(props, state, child, indexesToRender)}
      </div>
    );
  }

  getClientNodeStyle(node: Node) {
    const style: CSSProperties = { height: node.height };
    if (node.isSticky) {
      style.position = 'sticky';
      style.top = node.stickyTop;
      style.zIndex = node.zIndex;
    }

    return style;
  }

  getClientLeafNodeStyle(node: Node, top: number) {
    return {
      position: 'absolute',
      top,
      height: node.height,
      width: '100%',
    } as CSSProperties;
  }

  renderChildren(
    props: StickyVirtualizedListProps,
    state: StickyVirtualizedListState,
    parent: Node,
    indexesToRender: Set<number>,
  ) {
    const nodes: JSX.Element[] = [];
    let top = 0;
    parent.children.forEach((index) => {
      const child = this.nodes[index];

      if (indexesToRender.has(index)) {
        if (child.children && child.children.length > 0) {
          nodes.push(
            this.renderChildWithChildren(
              props,
              state,
              child,
              top,
              indexesToRender,
            ),
          );
        } else {
          // Sticky nodes will need a container so that their top is correct. The sticky node itself will have a top
          // of the offset where it should stick, which would conflict with the absolute position of the node.
          if (child.isSticky || props.wrapAllLeafNodes) {
            nodes.push(
              <div
                className="rv-sticky-leaf-node"
                key={`rv-node-${child.id}`}
                style={this.getChildContainerStyle(child, top)}
              >
                {this.renderNode(
                  props,
                  state,
                  child,
                  this.getClientNodeStyle(child),
                )}
              </div>,
            );
          } else {
            nodes.push(
              this.renderNode(
                props,
                state,
                child,
                this.getClientLeafNodeStyle(child, top),
              ),
            );
          }
        }
      }
      // Needs to be on the outside so that we add the the top even if
      // this node is not visible
      top += child.totalHeight;
    });
    return nodes;
  }

  renderNode(
    props: StickyVirtualizedListProps,
    state: StickyVirtualizedListState,
    nodeInfo: Node,
    style?: CSSProperties,
  ) {
    // If they have not mutated their getChildren, then no need to call them again for the same structure.
    if (props.isModelImmutable && this.rowRenderCache[nodeInfo.id]) {
      return this.rowRenderCache[nodeInfo.id];
    }

    const renderedRow = props.rowRenderer({ id: nodeInfo.id, nodeInfo, style });

    if (props.isModelImmutable) {
      this.rowRenderCache[nodeInfo.id] = renderedRow;
    }

    return renderedRow;
  }

  /**
   * Determines the start and end number of the range to be rendered.
   * @returns {{start: number, end: number}} Indexes within nodes
   */
  getRenderRowRange(
    props: StickyVirtualizedListProps,
    state: StickyVirtualizedListState,
  ) {
    // Needs to be at least 1
    const overscanRowCount =
      props.overscanRowCount > 0 ? props.overscanRowCount : 1;
    let start = state.currNodePos - overscanRowCount;
    if (start < 0) {
      start = 0;
    }
    let visibleEnd = state.currNodePos + 1;

    while (
      this.nodes[visibleEnd] &&
      this.nodes[visibleEnd].top < state.scrollTop + props.height
    ) {
      visibleEnd++;
    }

    let end = visibleEnd + overscanRowCount;
    if (end > this.nodes.length - 1) {
      end = this.nodes.length - 1;
    }

    return { start, end, visibleStart: state.currNodePos, visibleEnd };
  }

  getParentPath(nodeIndex: number, topDownOrder = true) {
    let currNode = this.nodes[nodeIndex];
    const path = [];
    while (currNode) {
      currNode = this.nodes[currNode.parentIndex];
      if (currNode) {
        path.push(currNode);
      }
    }
    return topDownOrder ? path.reverse() : path;
  }

  forwardSearch(scrollTop: number, searchPos: number) {
    const nodes = this.nodes;
    for (let i = searchPos; i < nodes.length; i++) {
      if (nodes[i].top >= scrollTop) {
        return i;
      }
    }
    return nodes.length - 1;
  }

  backwardSearch(scrollTop: number, searchPos: number) {
    const nodes = this.nodes;
    for (
      let i = Math.min(searchPos, Math.max(nodes.length - 1, 0));
      i >= 0;
      i--
    ) {
      if (nodes[i].top <= scrollTop) {
        return i;
      }
    }
    return 0;
  }

  setScrollTopAndClosestNode(
    scrollTop: number,
    currNodePos: number,
    scrollReason: ScrollReasons,
  ) {
    if (scrollTop === this.state.scrollTop) {
      return;
    }

    if (scrollTop >= this.elem.scrollHeight - this.elem.offsetHeight) {
      scrollTop = this.elem.scrollHeight - this.elem.offsetHeight;
    }

    let pos;
    if (scrollTop > this.state.scrollTop || currNodePos === 0) {
      pos = this.forwardSearch(scrollTop, currNodePos);
    }
    if (scrollTop < this.state.scrollTop && pos === undefined) {
      pos = this.backwardSearch(scrollTop, currNodePos);
    }

    this.pendingScrollTop = scrollTop;
    this.setState(
      { currNodePos: pos ? pos : 0, scrollTop, scrollReason },
      () => {
        this.pendingScrollTop = undefined;
      },
    );
  }

  onScroll(e: React.UIEvent<HTMLElement>) {
    const { scrollTop, scrollLeft } = e.target as HTMLElement;

    const scrollReason = this.state.scrollReason || scrollReasons.requested;

    this.setScrollTopAndClosestNode(
      scrollTop,
      this.state.currNodePos,
      scrollReason,
    );

    if (this.props.onScroll !== undefined) {
      this.props.onScroll({ scrollTop, scrollLeft, scrollReason });
    }

    this.setState({
      scrollTick: !this.state.scrollTick,
      scrollReason: undefined,
    });
  }

  render() {
    let style = { overflow: 'auto', position: 'relative' } as CSSProperties;
    if (this.props.width) {
      style.width = this.props.width;
    }
    if (this.props.height) {
      style.height = this.props.height;
    }

    return (
      <div
        ref={(elem) => (this.elem = elem)}
        className="rv-sticky-tree"
        style={style}
        onScroll={this.onScroll}
      >
        {this.treeToRender}
      </div>
    );
  }
}
