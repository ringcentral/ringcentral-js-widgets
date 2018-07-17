import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Collapse.scss';

const getMaxHeight = (ele) => {
  if (ele == null) {
    return 'auto';
  }
  // Preserve original height
  const h1 = ele.getBoundingClientRect().height;
  // Get nature height
  ele.style.height = 'auto';
  const h2 = ele.getBoundingClientRect().height;
  // Switch back to original height
  ele.style.height = `${h1}px`;
  return h2;
};

export default class Collapse extends Component {
  render() {
    const { open, children } = this.props;
    // open ? getMaxHeight(this.container) : 0;
    return (
      <div
        className={styles.collapseWrapper}
        style={{ maxHeight: open ? getMaxHeight(this.container) : 0 }}>
        <div
          ref={(ref) => { this.container = ref; }}
          className={styles.collapseContainer}>
          {children}
        </div>
      </div>
    );
  }
}

Collapse.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
};

Collapse.defaultProps = {
  open: false,
  children: null,
};
