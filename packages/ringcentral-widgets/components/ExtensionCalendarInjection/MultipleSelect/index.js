import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ThemeConsumer } from '../commons/themeContext';
import ArrowSVG from '../ArrowSVG';
import styles from './styles.scss';

class MultipleSelect extends Component {
  state = {
    open: this.props.open
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener('click', this._handleDocumentClick, false);
  }

  toggleShowDropdown = (e) => {
    if (!this.state.open) {
      window.addEventListener('click', this._handleDocumentClick, false);
    } else {
      window.removeEventListener('click', this._handleDocumentClick, false);
    }
    if (e && this.props.stopPropagation) {
      e.stopPropagation();
    }
    this.setState(preState => ({
      open: !preState.open,
    }));
  }

  onChange = (e, option, idx) => {
    e.stopPropagation();
    if (this.props.placeholder && idx === 0) {
      this.toggleShowDropdown();
      return;
    }
    this.props.onChange(option, idx);
  }

  _handleDocumentClick = (e) => {
    if (!this.mounted) {
      return;
    }
    if (this.wrapper && this.wrapper.contains(e.target)) {
      return;
    }
    if (this.dropdownMenu && this.dropdownMenu.contains(e.target)) {
      return;
    }
    this.setState({
      open: false,
    });
  }

  render() {
    const {
      placeholder,
      label,
      buttonStyle,
      className,
      iconClassName,
      wrapperStyle,
      renderValue,
      dataSign,
      theme,
      renderDropdownMenu
    } = this.props;

    const { open } = this.state;

    return (
      <div className={wrapperStyle}>
        <div
          data-sign={dataSign}
          className={classnames(styles.root, className, {
            [styles.isOld]: theme.isOldUI,
          }, theme.UI && styles[theme.UI])}
          ref={(ref) => { this.wrapper = ref; }}
        >
          <div
            type="button"
            className={classnames(styles.button, buttonStyle)}
            onClick={this.toggleShowDropdown}
            title={placeholder}
          >
            {label && <span className={styles.label}>{label}</span>}
            <span className={classnames(styles.dropdownIcon, open && styles.iconUp, iconClassName)}>
              <ArrowSVG />
            </span>
          </div>
          {renderDropdownMenu(open)}
        </div>
        {renderValue()}
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  className: PropTypes.string,
  selectedClassName: PropTypes.string,
  dropdownClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  renderValue: PropTypes.func,
  renderDropdownMenu: PropTypes.func,
  titleEnabled: PropTypes.bool,
  dropdownAlign: PropTypes.oneOf(['left', 'center', 'right']),
  stopPropagation: PropTypes.bool,
  placeholder: PropTypes.string,
  open: PropTypes.bool,
  wrapperStyle: PropTypes.string,
  buttonStyle: PropTypes.string,
  dataSign: PropTypes.string,
  theme: PropTypes.object.isRequired,
};

MultipleSelect.defaultProps = {
  className: null,
  selectedClassName: null,
  dropdownClassName: null,
  iconClassName: null,
  label: null,
  onChange: undefined,
  renderDropdownMenu: undefined,
  renderValue: option => option,
  dropdownAlign: 'center',
  titleEnabled: undefined,
  stopPropagation: false,
  placeholder: undefined,
  open: false,
  wrapperStyle: '',
  buttonStyle: '',
  dataSign: 'MultipleSelect',
};

export default ThemeConsumer(MultipleSelect);
