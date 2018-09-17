import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const DEFAULT_SCROLL_INTERVAL = 5000;
export default class CarrouselBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      showAnimation: false
    };
  }
  componentDidMount() {
    this.timeout = setInterval(() => {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex >= this.validChildren.length - 1 ?
          0 : prevState.currentIndex + 1,
        showAnimation: true
      }));
    }, this.props.scrollInterval);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.children !== this.props.children) {
      this.validChildren = this.getValidChildren(nextProps.children);
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
        <div className={this.state.showAnimation ? styles.move : null}>
          {this.validChildren[this.state.currentIndex]}
        </div>
      </div>
    );
  }
}

CarrouselBar.propTypes = {
  children: PropTypes.node,
  scrollInterval: PropTypes.number
};
CarrouselBar.defaultProps = {
  children: undefined,
  scrollInterval: DEFAULT_SCROLL_INTERVAL
};
