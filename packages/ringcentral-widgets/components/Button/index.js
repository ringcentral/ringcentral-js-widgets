import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

export default class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    tooltip: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
    dataSign: PropTypes.string,
  };

  static defaultProps = {
    className: undefined,
    tooltip: '',
    disabled: false,
    onClick: undefined,
    children: undefined,
    dataSign: undefined,
  };

  _mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
    };
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  async onClick() {
    if (!this._mounted) {
      return;
    }
    this.setState({
      disabled: true,
    });

    await this.props.onClick();

    if (this._mounted) {
      this.setState({
        disabled: false,
      });
    }
  }

  render() {
    const { className, disabled, children, tooltip, dataSign } = this.props;

    const realDisabled = disabled || this.state.disabled;

    return (
      <div
        data-sign={dataSign}
        className={classnames(
          className,
          styles.root,
          realDisabled && styles.disabled,
        )}
        onClick={realDisabled ? null : () => this.onClick()}
        title={tooltip}
      >
        {children}
      </div>
    );
  }
}
