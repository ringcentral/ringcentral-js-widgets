import React, { CSSProperties } from 'react';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const scrollReasonsValues = ['observed', 'requested'];
export const scrollReasons = ObjectMap.fromKeys(scrollReasonsValues);
export type ScrollReasons = keyof typeof scrollReasons;

export type Node = {
  children?: number[];
  depth?: number;
  height: number;
  id: string;
  index?: number;
  isFirstChild?: boolean;
  isLastChild?: boolean;
  isSticky: boolean;
  parentIndex?: number;
  parentInfo?: Node;
  stickyTop?: number;
  top?: number;
  totalHeight?: number;
  zIndex?: number;
};

export interface StickyVirtualizedListProps {
  getChildren: (
    id: string,
    nodeInfo: Node,
  ) => { id: string; height: number; isSticky: boolean }[];
  rowRenderer: ({ id, style }: RowRendererProps) => JSX.Element;
  root: Node;
  height: number;
  width: number;
  overscanRowCount?: number;
  renderRoot?: boolean;
  scrollTop?: number;
  scrollIndex?: number;
  onScroll?: ({ scrollTop, scrollLeft, scrollReason }: OnScrollProps) => void;
  onRowsRendered?: any;
  defaultRowHeight?: number;
  wrapAllLeafNodes?: boolean;
  isModelImmutable?: boolean;
}
export interface StickyVirtualizedListState {
  scrollTick: boolean;
  currNodePos: number;
  scrollTop: number;
  scrollReason?: string;
}

export interface RowRendererProps {
  id: string;
  style: React.CSSProperties;
  nodeInfo: Node;
}

export interface OnScrollProps {
  scrollTop: number;
  scrollLeft: number;
  scrollReason: ScrollReasons;
}

export interface OnRowsRenderedProps {
  overscanStartIndex: number;
  overscanStopIndex: number;
  startIndex: number;
  stopIndex: number;
  startNode: string;
  endNode: string;
  nodes: Node[];
}
