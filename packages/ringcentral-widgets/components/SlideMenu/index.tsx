import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './styles.scss';

type SlideMenuProps = {
  children?: React.ReactNode;
  extended?: boolean;
  onToggle?: (...args: any[]) => any;
  className?: string;
  extendIconClassName?: string;
  minHeight?: number;
  maxHeight?: number;
  withAnimation?: boolean;
};

type SlideMenuState = {
  extended: boolean;
};

class SlideMenu extends Component<SlideMenuProps, SlideMenuState> {
  _mounted: any;
  constructor(props: SlideMenuProps) {
    super(props);
    this.state = {
      extended: false,
    };
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    const { extended } = this.props;
    if (nextProps.extended !== extended) {
      this.setState({
        extended: nextProps.extended,
      });
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this._mounted = true;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    this._mounted = false;
  }

  onToggle = (e: any) => {
    e.stopPropagation();
    this.setState((prevState) => ({ extended: !prevState.extended }));
    const { onToggle } = this.props;
    if (onToggle) {
      onToggle(e);
    }
  };

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
      <div className={clsx(styles.root, className)}>
        <div
          className={clsx(
            styles.wrapper,
            withAnimation && styles.withAnimation,
          )}
          style={wrapperStyles}
        >
          <div className={styles.content}>{children}</div>
        </div>
        <div
          data-sign="extendButton"
          className={styles.extendIcon}
          aria-expanded={Boolean(extended)}
          onClick={this.onToggle}
        >
          <div
            className={clsx(
              styles.extendInner,
              extended ? clsx(styles.extended, extendIconClassName) : null,
            )}
          />
        </div>
      </div>
    );
  }
}

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
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
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
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
