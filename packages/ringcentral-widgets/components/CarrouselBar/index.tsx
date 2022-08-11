import React, { Component } from 'react';

import styles from './styles.scss';

const DEFAULT_SCROLL_INTERVAL = 5000;
type CarrouselBarProps = {
  scrollInterval?: number;
  hoverBar?: boolean;
};
type CarrouselBarState = ((prevState: any) => {
  currentIndex: any;
  showAnimation: boolean;
  animationMode: string;
  hoverBar: boolean;
}) &
  (() => { hoverBar: boolean }) & {
    currentIndex: number;
    showAnimation: boolean;
    animationMode: string;
    hoverBar: boolean;
  };
class CarrouselBar extends Component<CarrouselBarProps, CarrouselBarState> {
  timeout: any;
  validChildren: any;
  constructor(props: any) {
    super(props);
    this.state = {
      currentIndex: 0,
      showAnimation: false,
      animationMode: 'move',
      hoverBar: false,
    };
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this.timeout = setInterval(() => {
      if (!this.props.hoverBar) {
        this.setState((prevState: any) => ({
          currentIndex:
            prevState.currentIndex >= this.validChildren.length - 1
              ? 0
              : prevState.currentIndex + 1,

          showAnimation: true,
          animationMode: prevState.animationMode === 'move' ? 'moveOn' : 'move',
          hoverBar: false,
        }));
      }
    }, this.props.scrollInterval);
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (nextProps.children !== this.props.children) {
      this.validChildren = this.getValidChildren(nextProps.children);
    }
    if (nextProps.hoverBar !== this.props.hoverBar && !!nextProps.hoverBar) {
      this.setState(() => ({
        hoverBar: true,
      }));
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.timeout = null;
  }
  getValidChildren(children: any) {
    // .toArray automatically removes invalid React children
    return React.Children.toArray(children);
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    this.validChildren = this.getValidChildren(this.props.children);
    if (this.validChildren.length < 2) {
      return this.props.children;
    }
    return (
      <div className={styles.root}>
        <div
          className={
            this.state.showAnimation && !this.state.hoverBar
              ? styles[this.state.animationMode]
              : styles.center
          }
        >
          {this.validChildren[this.state.currentIndex]}
        </div>
      </div>
    );
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
CarrouselBar.defaultProps = {
  children: undefined,
  scrollInterval: DEFAULT_SCROLL_INTERVAL,
  hoverBar: false,
};
export default CarrouselBar;
