import React, { Component } from 'react';

import classnames from 'classnames';

import { isFunction } from '@ringcentral-integration/commons/lib/di/utils/is_type';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import styles from './styles.scss';

const POSITION = ObjectMap.fromKeys(['top', 'left']);
const TAIL_HEIGHT = Math.sqrt(10 ** 2 * 2);
const getDimensions = (element) => {
  const PROPERTIES = {
    position: 'fixed',
    visibility: 'hidden',
  };
  if (element.nodeType) {
    let clonedEl = element.cloneNode(true);
    Object.keys(PROPERTIES).forEach((key) => {
      clonedEl.style[key] = PROPERTIES[key];
    });
    document.body.appendChild(clonedEl);
    const result = {
      width: element.offsetWidth,
      height: element.offsetHeight,
    };
    document.body.removeChild(clonedEl);
    clonedEl = null;
    return result;
  }
  return null;
};
const transitionEnd = () => {
  const el = document.createElement('bootstrap');
  const transEndEventNames = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend',
  };
  for (const name in transEndEventNames) {
    if (el.style[name] !== undefined) {
      return transEndEventNames[name];
    }
  }
  return null;
};
const getPageOffset = (el) => {
  if (!el) {
    return null;
  }
  const rect = el.getBoundingClientRect();
  const scollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scollLeft,
  };
};
const getRelativeOffset = (el) => {
  const res = { top: 0, left: 0 };
  if (!el) {
    return null;
  }
  let tmp = el;
  while (window.getComputedStyle(tmp).position === 'static') {
    res.top += el.offsetTop;
    res.left += el.offsetLeft;
    tmp = tmp.parentElement;
  }
  return res;
};
const TRANSITION_END_EVT_NAME = transitionEnd();
type TooltipProps = {
  triggerElm?: object;
  fixed?: boolean;
  direction?: string;
  open?: boolean;
  onOpen?: (...args: any[]) => any;
  beforeOpen?: (...args: any[]) => any;
  beforeClose?: (...args: any[]) => any;
  onClose?: (...args: any[]) => any;
};
type TooltipState = ((preState: any) => any) &
  ((preState: any) => any) &
  ((preState: any) => any) & {
    cachedPositioning: { elm: any; position: string };
  } & ((preState: any) => any) & {
    cachedPositioning: null;
    visibility: null;
    position: null;
  };
class Tooltip extends Component<TooltipProps, TooltipState> {
  constructor(props) {
    super(props);
    this.onResize = this.checkPosition.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.state = {
      cachedPositioning: null,
      visibility: null,
      position: null,
    };
    this.dom = React.createRef();
  }
  onTransitionEnd() {
    return !this.props.open ? this.setInVisible() : null;
  }
  setVisibility(props = this.props) {
    this.setState((preState) => ({
      ...preState,
      visibility: props.open ? 'initial' : 'hidden',
    }));
  }
  setVisible() {
    this.setState((preState) => ({
      ...preState,
      visibility: 'initial',
    }));
  }
  setInVisible() {
    this.setState((preState) => ({
      ...preState,
      visibility: 'hidden',
    }));
  }
  changeTriggerElmPosition(
    fixed = this.props.fixed,
    triggerElm = this.props.triggerElm,
  ) {
    const RELATIVE = 'relative';
    let elm;
    if (!fixed) {
      elm = triggerElm;
    } else {
      elm = document.body;
    }
    if (elm) {
      elm.style.position = RELATIVE;
    }
  }
  recordPositioning(triggerElm = this.props.triggerElm) {
    if (triggerElm) {
      const cachedPositioning = this.props.fixed
        ? {
            elm: document.body,
            position: window.getComputedStyle(document.body).position,
          }
        : {
            elm: triggerElm,
            position: window.getComputedStyle(triggerElm).position,
          };
      this.setState({
        cachedPositioning,
      });
    }
  }
  restorePositioning() {
    if (this.state.cachedPositioning && this.state.cachedPositioning.elm) {
      this.state.cachedPositioning.elm.style.potition =
        this.state.cachedPositioning.position;
    }
  }
  checkPosition(props = this.props) {
    const triggerElm = this.props.triggerElm;
    if (triggerElm) {
      const {
        dom: { current },
      } = this;
      const demensionOfTrigger = getDimensions(triggerElm);
      const currentDemension = getDimensions(current);
      let offset;
      if (props.fixed) {
        offset = getPageOffset(triggerElm);
      } else {
        offset = getRelativeOffset(triggerElm);
      }
      const top =
        props.direction === POSITION.top
          ? offset && offset.top - currentDemension.height - TAIL_HEIGHT / 2
          : offset && offset.top + demensionOfTrigger.height + TAIL_HEIGHT / 2;
      const left =
        offset &&
        offset.left + demensionOfTrigger.width / 2 - currentDemension.width / 2;
      this.setState((preState) => ({
        ...preState,
        position: {
          left,
          top,
        },
      }));
    }
  }
  componentDidMount() {
    this.recordPositioning();
    this.changeTriggerElmPosition();
    this.checkPosition();
    this.setVisibility();
    window.addEventListener('resize', this.onResize);
    if (TRANSITION_END_EVT_NAME) {
      this.dom.current.addEventListener(
        TRANSITION_END_EVT_NAME,
        this.onTransitionEnd,
      );
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.triggerElm !== this.props.triggerElm) {
      this.restorePositioning();
      this.recordPositioning(nextProps.triggerElm);
      this.changeTriggerElmPosition(nextProps.fixed, nextProps.triggerElm);
    }
    if (
      nextProps.children !== this.props.children ||
      nextProps.fixed !== this.props.fixed
    ) {
      this.checkPosition(nextProps);
    }
    if (nextProps.open !== this.props.open) {
      if (nextProps.open) {
        this.setVisible(nextProps);
      }
      if (nextProps.open) {
        isFunction(this.props.beforeOpen) && this.props.beforeOpen();
      } else {
        isFunction(this.props.beforeClose) && this.props.beforeClose();
      }
    }
  }
  componentDidUpdate() {
    if (this.props.open) {
      isFunction(this.props.onOpen) && this.props.onOpen();
    } else {
      isFunction(this.props.onClose) && this.props.onClose();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    if (TRANSITION_END_EVT_NAME) {
      this.dom.current.removeEventListener(
        TRANSITION_END_EVT_NAME,
        this.onTransitionEnd,
      );
    }
    this.restorePositioning();
  }
  render() {
    const { open, direction, fixed, children } = this.props;
    return (
      <div
        ref={this.dom}
        className={classnames(
          styles.dropdownContainer,
          open ? styles.opened : null,
          styles[direction],
        )}
        style={{
          visibility: this.state.visibility,
          position: fixed ? 'fixed' : 'absolute',
          ...this.state.position,
        }}
      >
        <div className={styles.dropdown}>{children}</div>
        <div className={styles.tail} />
      </div>
    );
  }
}
Tooltip.defaultProps = {
  triggerElm: null,
  fixed: false,
  direction: 'bottom',
  open: false,
  children: null,
  beforeOpen: (i) => i,
  onOpen: (i) => i,
  beforeClose: (i) => i,
  onClose: (i) => i,
};
export default Tooltip;
