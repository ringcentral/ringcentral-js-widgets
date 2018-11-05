import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

function ExtendIcon({ onClick, extendIconClassName }) {
  return (
    <div className={styles.extendIcon} onClick={onClick}>
      <div className={classnames(styles.extendInner, extendIconClassName)} />
    </div>
  );
}

export default class SlideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extended: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.extended !== this.props.extended) {
      this.setState({
        extended: nextProps.extended
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
    this.setState(prevState => ({ extended: !prevState.extended }));
    if (this.props.onToggle) {
      this.props.onToggle(e);
    }
  }
  render() {
    const {
      className,
      minHeight,
      maxHeight,
      children,
    } = this.props;
    const {
      extended,
    } = this.state;

    const wrapperStyles = {
      height: extended ?
        maxHeight :
        minHeight,
    };

    return (
      <div
        className={classnames(
          styles.root,
          className
        )}
      >
        <div className={styles.wrapper} style={wrapperStyles}>
          <div
            className={styles.content}
          >
            {children}
          </div>
        </div>
        <ExtendIcon
          extendIconClassName={
            extended ? classnames(styles.extended, this.props.extendIconClassName) : null
          }
          onClick={this.onToggle} />
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
};
SlideMenu.defaultProps = {
  children: undefined,
  extended: false,
  onToggle: null,
  className: undefined,
  extendIconClassName: undefined,
  minHeight: 0,
  maxHeight: 100,
};
