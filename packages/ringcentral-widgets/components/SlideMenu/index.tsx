import React, { Component } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const ExtendIcon = ({ onClick, extendIconClassName }: any) => (
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
  _mounted: any;
  constructor(props: any) {
    super(props);
    this.state = {
      extended: false,
    };
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    // @ts-expect-error TS(2339): Property 'extended' does not exist on type 'Readon... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2339): Property 'extended' does not exist on type 'Readon... Remove this comment to see the full error message
    this.setState((prevState) => ({ extended: !prevState.extended }));
    // @ts-expect-error TS(2339): Property 'onToggle' does not exist on type 'Readon... Remove this comment to see the full error message
    const { onToggle } = this.props;
    if (onToggle) {
      onToggle(e);
    }
  };

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const {
      // @ts-expect-error TS(2339): Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
      className,
      // @ts-expect-error TS(2339): Property 'minHeight' does not exist on type 'Reado... Remove this comment to see the full error message
      minHeight,
      // @ts-expect-error TS(2339): Property 'maxHeight' does not exist on type 'Reado... Remove this comment to see the full error message
      maxHeight,
      children,
      // @ts-expect-error TS(2339): Property 'withAnimation' does not exist on type 'R... Remove this comment to see the full error message
      withAnimation,
      // @ts-expect-error TS(2339): Property 'extendIconClassName' does not exist on t... Remove this comment to see the full error message
      extendIconClassName,
      // @ts-expect-error TS(2339): Property 'extended' does not exist on type 'Readon... Remove this comment to see the full error message
      extended: propsExtended,
    } = this.props;

    // @ts-expect-error TS(2339): Property 'extended' does not exist on type 'Readon... Remove this comment to see the full error message
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
