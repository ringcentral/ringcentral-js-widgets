import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import clsx from 'clsx';
import React, { Component } from 'react';

import styles from './styles.scss';

const POSITION = ObjectMap.fromKeys(['top', 'left']);
const TAIL_HEIGHT = Math.sqrt(10 ** 2 * 2);
const getDimensions = (element: any) => {
  const PROPERTIES = {
    position: 'fixed',
    visibility: 'hidden',
  };
  if (element.nodeType) {
    let clonedEl = element.cloneNode(true);
    Object.keys(PROPERTIES).forEach((key) => {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
    // @ts-expect-error TS(7015): Element implicitly has an 'any' type because index... Remove this comment to see the full error message
    if (el.style[name] !== undefined) {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      return transEndEventNames[name];
    }
  }
  return null;
};
const getPageOffset = (el: any) => {
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
const getRelativeOffset = (el: any) => {
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
  dom: any;
  onResize: any;
  TRANSITION_END_EVT_NAME: any;
  constructor(props: any) {
    super(props);
    this.onResize = this.checkPosition.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.TRANSITION_END_EVT_NAME = transitionEnd();

    // @ts-ignore
    this.state = {
      // @ts-ignore
      cachedPositioning: null,
      // @ts-ignore
      visibility: null,
      // @ts-ignore
      position: null,
    };
    this.dom = React.createRef();
  }
  onTransitionEnd() {
    return !this.props.open ? this.setInVisible() : null;
  }
  setVisibility(props = this.props) {
    this.setState((preState) => ({
      // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
      ...preState,
      visibility: props.open ? 'initial' : 'hidden',
    }));
  }
  setVisible() {
    this.setState((preState) => ({
      // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
      ...preState,
      visibility: 'initial',
    }));
  }
  setInVisible() {
    this.setState((preState) => ({
      // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2339): Property 'style' does not exist on type 'object'.
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
            // @ts-expect-error TS(2345): Argument of type 'object' is not assignable to par... Remove this comment to see the full error message
            position: window.getComputedStyle(triggerElm).position,
          };
      // @ts-expect-error TS(2345): Argument of type '{ cachedPositioning: { elm: obje... Remove this comment to see the full error message
      this.setState({
        cachedPositioning,
      });
    }
  }
  restorePositioning() {
    // @ts-expect-error TS(2339): Property 'cachedPositioning' does not exist on typ... Remove this comment to see the full error message
    if (this.state.cachedPositioning && this.state.cachedPositioning.elm) {
      // @ts-expect-error TS(2339): Property 'cachedPositioning' does not exist on typ... Remove this comment to see the full error message
      this.state.cachedPositioning.elm.style.potition =
        // @ts-expect-error TS(2339): Property 'cachedPositioning' does not exist on typ... Remove this comment to see the full error message
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
          ? // @ts-expect-error TS(2531): Object is possibly 'null'.
            offset && offset.top - currentDemension.height - TAIL_HEIGHT / 2
          : // @ts-expect-error TS(2531): Object is possibly 'null'.
            offset && offset.top + demensionOfTrigger.height + TAIL_HEIGHT / 2;
      const left =
        offset &&
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        offset.left + demensionOfTrigger.width / 2 - currentDemension.width / 2;
      this.setState((preState) => ({
        // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
        ...preState,
        position: {
          left,
          top,
        },
      }));
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this.recordPositioning();
    this.changeTriggerElmPosition();
    this.checkPosition();
    this.setVisibility();
    window.addEventListener('resize', this.onResize);
    if (this.TRANSITION_END_EVT_NAME) {
      this.dom.current.addEventListener(
        this.TRANSITION_END_EVT_NAME,
        this.onTransitionEnd,
      );
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
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
        // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
        this.setVisible(nextProps);
      }
      if (nextProps.open) {
        this.props.beforeOpen?.();
      } else {
        this.props.beforeClose?.();
      }
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidUpdate() {
    if (this.props.open) {
      this.props.onOpen?.();
    } else {
      this.props.onClose?.();
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    if (this.TRANSITION_END_EVT_NAME) {
      this.dom.current.removeEventListener(
        this.TRANSITION_END_EVT_NAME,
        this.onTransitionEnd,
      );
    }
    this.restorePositioning();
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const { open, direction, fixed, children } = this.props;
    return (
      <div
        ref={this.dom}
        className={clsx(
          styles.dropdownContainer,
          open ? styles.opened : null,
          // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
          styles[direction],
        )}
        style={{
          // @ts-expect-error TS(2339): Property 'visibility' does not exist on type 'neve... Remove this comment to see the full error message
          visibility: this.state.visibility,
          position: fixed ? 'fixed' : 'absolute',
          // @ts-expect-error TS(2339): Property 'position' does not exist on type 'never'... Remove this comment to see the full error message
          ...this.state.position,
        }}
      >
        <div className={styles.dropdown}>{children}</div>
        <div className={styles.tail} />
      </div>
    );
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
Tooltip.defaultProps = {
  triggerElm: null,
  fixed: false,
  direction: 'bottom',
  open: false,
  children: null,
  beforeOpen: (i: any) => i,
  onOpen: (i: any) => i,
  beforeClose: (i: any) => i,
  onClose: (i: any) => i,
};
export default Tooltip;
