import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';

class Draggable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      positionX: 0,
      positionY: 0,
      translateX: props.positionOffsetX,
      translateY: props.positionOffsetY,
    };

    this._isClick = true;

    this._onMouseDown = (e) => {
      if (e.button !== 0) return;
      if (this.state.dragging) {
        return;
      }
      this.setState({
        positionX: e.clientX,
        positionY: e.clientY,
        dragging: true,
      });
      this._isClick = true;
      window.addEventListener('mousemove', this._onMouseMove, false);
      window.addEventListener('mouseup', this._onMouseUp, false);
      e.stopPropagation();
      e.preventDefault();
    };

    this._onMouseMove = (e) => {
      if (!this.state.dragging) {
        return;
      }
      if (!this.draggableDom) {
        return;
      }
      const offsetParent = this.draggableDom.offsetParent;
      const newPositionX = e.clientX;
      const newPositionY = e.clientY;
      const originalPositionX = this.draggableDom.offsetLeft;
      const originalPositionY = this.draggableDom.offsetTop;
      const child = this.draggableDom.firstChild;
      const height = (child && child.clientHeight) || 0;
      const width = (child && child.clientWidth) || 0;
      this._isClick = false;
      this.setState((preState) => {
        const newState = {
          positionX: newPositionX,
          positionY: newPositionY,
          translateX: preState.translateX + (newPositionX - preState.positionX),
          translateY: preState.translateY + (newPositionY - preState.positionY),
        };
        if (
          originalPositionX + newState.translateX > offsetParent.clientWidth + width ||
          originalPositionX + newState.translateX < width / 2
        ) {
          delete newState.translateX;
        }
        if (
          originalPositionY + newState.translateY > offsetParent.clientHeight - height ||
          originalPositionY + newState.translateY < -height
        ) {
          delete newState.translateY;
        }
        return newState;
      });
      e.stopPropagation();
      e.preventDefault();
    };

    this._onMouseUp = (e) => {
      this.setState({
        dragging: false,
      });
      this.props.updatePositionOffset(this.state.translateX, this.state.translateY);
      window.removeEventListener('mousemove', this._onMouseMove);
      window.removeEventListener('mouseup', this._onMouseUp);
      e.stopPropagation();
      e.preventDefault();
    };

    this._onClick = (e) => {
      if (!this._isClick) {
        return;
      }
      this.props.onClick(e);
    };
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('mouseup', this._onMouseUp);
  }

  render() {
    const {
      className,
      children,
    } = this.props;
    const style = {
      msTransition: `translate(${this.state.translateX}px, ${this.state.translateY}px)`,
      WebkitTransition: `translate(${this.state.translateX}px, ${this.state.translateY}px)`,
      transform: `translate(${this.state.translateX}px, ${this.state.translateY}px)`,
    };
    return (
      <div
        onMouseDown={this._onMouseDown}
        ref={(draggableDom) => { this.draggableDom = draggableDom; }}
        style={style}
        className={classnames(styles.root, className)}
        onClick={this._onClick}
        >
        {children}
      </div>
    );
  }
}

Draggable.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  positionOffsetX: PropTypes.number,
  positionOffsetY: PropTypes.number,
  updatePositionOffset: PropTypes.func,
};

Draggable.defaultProps = {
  className: null,
  onClick: () => null,
  positionOffsetX: 0,
  positionOffsetY: 0,
  updatePositionOffset: () => null,
};

export default Draggable;
