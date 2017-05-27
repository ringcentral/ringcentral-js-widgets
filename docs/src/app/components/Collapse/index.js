import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class Collapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.collapsed,
    };

    this.toggleCollapsed = () => {
      this.setState(preState => ({
        collapsed: !preState.collapsed,
      }));
    };
  }

  render() {
    const collapseClassName = classnames(
      styles.collapse,
      this.state.collapsed ? styles.collapsed : null,
    );
    return (
      <div className={classnames(styles.root, this.props.className)}>
        <button className={styles.button} onClick={this.toggleCollapsed}>
          {this.props.button}
        </button>
        <div className={collapseClassName}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Collapse.propTypes = {
  collapsed: PropTypes.bool,
  className: PropTypes.string,
  button: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

Collapse.defaultProps = {
  collapsed: true,
  className: undefined,
};

export default Collapse;
