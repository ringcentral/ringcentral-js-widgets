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
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      showAnimation: false,
      animationMode: 'move',
      hoverBar: false,
    };
  }
  componentDidMount() {
    this.timeout = setInterval(() => {
      if (!this.props.hoverBar) {
        this.setState((prevState) => ({
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.children !== this.props.children) {
      this.validChildren = this.getValidChildren(nextProps.children);
    }
    if (nextProps.hoverBar !== this.props.hoverBar && !!nextProps.hoverBar) {
      this.setState(() => ({
        hoverBar: true,
      }));
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.timeout = null;
  }
  getValidChildren(children) {
    // .toArray automatically removes invalid React children
    return React.Children.toArray(children);
  }
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
CarrouselBar.defaultProps = {
  children: undefined,
  scrollInterval: DEFAULT_SCROLL_INTERVAL,
  hoverBar: false,
};
export default CarrouselBar;
