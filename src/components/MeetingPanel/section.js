import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import 'react-widgets/dist/css/react-widgets.css';
import './helper.css';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

export default class Section extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      toggle: this.props.toggle,
    };
  }
  render() {
    const {
      children,
      title,
      withSwitch,
      className,
      hideTopBorderLine,
    } = this.props;
    const toggle = () => {
      this.setState({ toggle: !this.state.toggle });
    };
    const Title = () => (
      title ? (
        <span className={styles.title}>{title}</span>
      ) : null
    );
    const DropDown = ({ isDropDown, onClick }) => (
      withSwitch ? (
        <span
          className={classnames(!isDropDown ? styles.dropDown : null)}
          onClick={onClick}>
          <i className={classnames(dynamicsFont.arrow, styles.arrow)} />
        </span>
      ) : null
    );
    const topBorderLine = hideTopBorderLine ? styles.hiddenTopBorder : null;
    return (
      <div className={classnames(styles.section, topBorderLine, className)}>
        {
          title ? (
            <div className={styles.spaceBetween}>
              <Title />
              <DropDown isDropDown={this.state.toggle} onClick={toggle} />
            </div>
          ) : null
        }
        { this.state.toggle ? children : null }
      </div>
    );
  }
}

Section.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  withSwitch: PropTypes.bool,
  toggle: PropTypes.bool,
  hideTopBorderLine: PropTypes.bool,
};

Section.defaultProps = {
  className: null,
  title: null,
  withSwitch: false,
  toggle: true,
  hideTopBorderLine: false,
};
