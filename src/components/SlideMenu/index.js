import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import dynamicsFonts from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

function ToggleButton({
  onClick,
}) {
  return (
    <div
      className={styles.toggleButton}
      onClick={onClick}
    >
      <div className={styles.toggleButtonInner} />
      <div className={styles.toggleButtonIcon} >
        <span className={classnames(dynamicsFonts.arrow)} />
      </div>
    </div>
  );
}
ToggleButton.propTypes = {
  onClick: PropTypes.func,
};
ToggleButton.defaultProps = {
  onClick: undefined,
};


export default class SlideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  componentDidMount() {
    this._mounted = true;
  }
  componentWillUnmount() {
    this._mounted = false;
  }
  onMouseEnter = () => {
    this._timestamp = Date.now();
    this.setState({
      expanded: true,
    });
  }
  onMouseLeave = () => {
    this.setState({
      expanded: false,
    });
  }
  onToggle = () => {
    /* On touch enabled devices or devices with pen inputs, click/touch will trigger
     * mouseenter event before the click event, in that case, we simply ignore
     * the click event.
     */
    if (Date.now() - this._timestamp > 30) {
      this.setState({
        expanded: !this.state.expanded,
      });
    }
  }
  render() {
    const {
      children,
      className,
      minWidth,
      maxWidth,
    } = this.props;
    const {
      expanded,
    } = this.state;

    const wrapperStyles = {
      width: expanded ?
        maxWidth :
        minWidth,
    };
    return (
      <div
        className={classnames(
          styles.root,
          className,
          expanded && styles.expanded,
        )}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div className={styles.wrapper} style={wrapperStyles}>
          <div
            className={styles.content}
          >
            {children}
          </div>
        </div>
        <ToggleButton onClick={this.onToggle} />
      </div>
    );
  }
}

SlideMenu.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
};
SlideMenu.defaultProps = {
  className: undefined,
  children: undefined,
  minWidth: 0,
  maxWidth: 100,
};
