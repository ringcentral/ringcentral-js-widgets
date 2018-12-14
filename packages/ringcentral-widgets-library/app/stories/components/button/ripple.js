import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default class Ripple extends React.Component {
  createRipple = (e) => {
    const node = this.ripple.childNodes[0];
    const { left, top } = node.getBoundingClientRect();

    const circle = document.createElement('div');
    node.appendChild(circle);

    const circleSize = Math.max(node.clientWidth, node.clientHeight);

    circle.style.width = `${circleSize}px`;
    circle.style.height = `${circleSize}px`;

    circle.style.left = `${e.clientX - left - circleSize / 2}px`;
    circle.style.top = `${e.clientY - top - circleSize / 2}px`;
    console.log('left:', `${e.clientX - left - circleSize}px`);
    console.log('top:', circle.style.top);
    circle.classList.add(styles.ripple2);
  }
  componentDidMount() {
    const node = this.ripple.childNodes[0];
    node.addEventListener('click', this.createRipple, false);
  }
  componentWillUnmount() {
    const node = this.ripple.childNodes[0];
    node.removeEventListener('click', this.createRipple);
  }
  render() {
    const { children } = this.props;
    return (
      <div className={styles.rippleWrapper} ref={(wrapper) => { this.ripple = wrapper; }}>
        {children}
      </div>
    );
  }
}

Ripple.propTypes = {
  children: PropTypes.node.isRequired
};
