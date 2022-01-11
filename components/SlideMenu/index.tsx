import React, { Component } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const ExtendIcon = ({ onClick, extendIconClassName }) => (
  <div data-sign="extendButton" className={styles.extendIcon} onClick={onClick}>
    <div className={classnames(styles.extendInner, extendIconClassName)} />
  </div>
);

ExtendIcon.propTypes = {
  onClick: PropTypes.func,
  extendIconClassName: PropTypes.string,
};

ExtendIcon.defaultProps = {
  onClick() {},
  extendIconClassName: undefined,
};

class SlideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extended: false,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { extended } = this.props;
    if (nextProps.extended !== extended) {
      this.setState({
        extended: nextProps.extended,
      });
    }
  }
  componentDidMount() {
    this._mounted = true;
  }
  componentWillUnmount() {
    this._mounted = false;
  }

  onToggle = (e) => {
    e.stopPropagation();
    this.setState((prevState) => ({ extended: !prevState.extended }));
    const { onToggle } = this.props;
    if (onToggle) {
      onToggle(e);
    }
  };

  render() {
    const {
      className,
      minHeight,
      maxHeight,
      children,
      withAnimation,
      extendIconClassName,
      extended: propsExtended,
    } = this.props;

    const { extended: stateExtended } = this.state;

    const extended = propsExtended || stateExtended;

    const wrapperStyles = {
      height: extended ? maxHeight : minHeight,
    };

    return (
      <div className={classnames(styles.root, className)}>
        <div
          className={classnames(
            styles.wrapper,
            withAnimation && styles.withAnimation,
          )}
          style={wrapperStyles}
        >
          <div className={styles.content}>{children}</div>
        </div>
        <ExtendIcon
          extendIconClassName={
            extended ? classnames(styles.extended, extendIconClassName) : null
          }
          onClick={this.onToggle}
        />
      </div>
    );
  }
}

SlideMenu.propTypes = {
  children: PropTypes.node,
  extended: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
  extendIconClassName: PropTypes.string,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  withAnimation: PropTypes.bool,
};
SlideMenu.defaultProps = {
  className: undefined,
  extendIconClassName: undefined,
  children: undefined,
  onToggle: undefined,
  extended: false,
  minHeight: 0,
  maxHeight: 100,
  withAnimation: true,
};

export default SlideMenu;
