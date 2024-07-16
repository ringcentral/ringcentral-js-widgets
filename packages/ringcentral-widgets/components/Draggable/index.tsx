import clsx from 'clsx';
import React, { Component } from 'react';

import styles from './styles.scss';

type DraggableProps = {
  className?: string;
  onClick?: (...args: any[]) => any;
  positionOffsetX?: number;
  positionOffsetY?: number;
  updatePositionOffset?: (...args: any[]) => any;
  clickThreshold?: number;
};
type DraggableState = {
  dragging: boolean;
  positionX: number;
  positionY: number;
  translateX: any;
  translateY: any;
};
/* eslint { "react/no-unused-state": 0 } */
class Draggable extends Component<DraggableProps, DraggableState> {
  _isClick: any;
  _onClick: any;
  _onMouseDown: any;
  _onMouseMove: any;
  _onMouseUp: any;
  _positionXOnMouseDown: any;
  _positionYOnMouseDown: any;
  draggableDom: any;
  constructor(props: any) {
    super(props);
    this.state = {
      dragging: false,
      positionX: 0,
      positionY: 0,
      translateX: props.positionOffsetX,
      translateY: props.positionOffsetY,
    };
    this._isClick = true;
    this._onMouseDown = (e: any) => {
      if (e.button !== 0) return;
      if (this.state.dragging) {
        return;
      }
      this.setState({
        positionX: e.clientX,
        positionY: e.clientY,
        dragging: true,
      });
      this._positionXOnMouseDown = e.clientX;
      this._positionYOnMouseDown = e.clientY;
      this._isClick = true;
      window.addEventListener('mousemove', this._onMouseMove, false);
      window.addEventListener('mouseup', this._onMouseUp, false);
      e.stopPropagation();
      e.preventDefault();
    };
    this._onMouseMove = (e: any) => {
      if (!this.state.dragging) {
        return;
      }
      if (!this.draggableDom) {
        return;
      }
      const {
        offsetParent,
        offsetLeft: originalPositionX,
        offsetTop: originalPositionY,
      } = this.draggableDom;
      const newPositionX = e.clientX;
      const newPositionY = e.clientY;
      const child = this.draggableDom.firstChild;
      const height = (child && child.clientHeight) || 0;
      const width = (child && child.clientWidth) || 0;
      if (
        Math.abs(newPositionX - this._positionXOnMouseDown) >
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          this.props.clickThreshold ||
        Math.abs(newPositionY - this._positionYOnMouseDown) >
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          this.props.clickThreshold
      ) {
        this._isClick = false;
      }
      this.setState((preState) => {
        const newState = {
          positionX: newPositionX,
          positionY: newPositionY,
          translateX: preState.translateX + (newPositionX - preState.positionX),
          translateY: preState.translateY + (newPositionY - preState.positionY),
        };
        if (
          originalPositionX - 10 + newState.translateX >
            offsetParent.clientWidth ||
          originalPositionX - 10 + newState.translateX < width
        ) {
          delete newState.translateX;
        }
        if (
          originalPositionY + 10 + newState.translateY >
            offsetParent.clientHeight - height ||
          originalPositionY + 10 + newState.translateY < 0
        ) {
          delete newState.translateY;
        }
        return newState;
      });
      e.stopPropagation();
      e.preventDefault();
    };
    this._onMouseUp = (e: any) => {
      this.setState({
        dragging: false,
      });
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      this.props.updatePositionOffset(
        this.state.translateX,
        this.state.translateY,
      );
      window.removeEventListener('mousemove', this._onMouseMove);
      window.removeEventListener('mouseup', this._onMouseUp);
      e.stopPropagation();
      e.preventDefault();
    };
    this._onClick = (e: any) => {
      if (!this._isClick) {
        return;
      }
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      this.props.onClick(e);
    };
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('mouseup', this._onMouseUp);
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const { className, children } = this.props;
    const style = {
      msTransition: `translate(${this.state.translateX}px, ${this.state.translateY}px)`,
      WebkitTransition: `translate(${this.state.translateX}px, ${this.state.translateY}px)`,
      transform: `translate(${this.state.translateX}px, ${this.state.translateY}px)`,
    };
    return (
      <div
        onMouseDown={this._onMouseDown}
        ref={(draggableDom) => {
          this.draggableDom = draggableDom;
        }}
        style={style}
        className={clsx(styles.root, className)}
        onClick={this._onClick}
      >
        {children}
      </div>
    );
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
Draggable.defaultProps = {
  className: null,
  onClick: () => null,
  positionOffsetX: 0,
  positionOffsetY: 0,
  updatePositionOffset: () => null,
  clickThreshold: 5,
};
export default Draggable;
