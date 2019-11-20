import PropTypes from 'prop-types';
import React, { useState } from 'react';

import i18n from './i18n';
import { ListView } from './ListView';
import { SelectListBasic } from '../SelectListBasic';
import { WithScrollCheck } from './WithScrollCheck';
import styles from './styles.scss';

export const SelectList = (props) => {
  const {
    valueFunction,
    renderFunction,
    children,
    disabled,
    value: sourceValue,
    onChange,
    currentLocale,
    startAdornment,
    matchedTitle,
    otherTitle,
    backHeaderClassName,
  } = props;

  const [open, setOpen] = useState(false);

  const renderListView = (data, type, filter, scrollCheck) => (
    <ListView
      filter={filter}
      options={data}
      value={sourceValue}
      onChange={(value) => {
        if (document.activeElement) {
          document.activeElement.blur();
        }
        onChange(value);
      }}
      renderFunction={renderFunction}
      valueFunction={valueFunction}
      onSelect={(elm) => scrollCheck(elm, type)}
      startAdornment={startAdornment}
    />
  );

  const SelectListWithScrollCheck = WithScrollCheck(SelectListBasic);

  return (
    <div
      className={disabled ? styles.disabled : null}
      data-sign="select-list-panel"
    >
      <div
        className={styles.field}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (disabled) {
            return;
          }
          setOpen(true);
        }}
      >
        {children}
      </div>
      <SelectListWithScrollCheck
        matchedTitle={matchedTitle || i18n.getString('matched', currentLocale)}
        otherTitle={otherTitle || i18n.getString('other', currentLocale)}
        renderListView={renderListView}
        open={open}
        setOpen={setOpen}
        backHeaderClassName={backHeaderClassName}
        {...props}
      />
    </div>
  );
};

SelectList.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  otherOptions: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  valueFunction: PropTypes.func.isRequired,
  renderFunction: PropTypes.func.isRequired,
  searchOption: PropTypes.func.isRequired,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  rightIcon: PropTypes.element,
  onChange: PropTypes.func,
  currentLocale: PropTypes.string.isRequired,
  startAdornment: PropTypes.func,
  matchedTitle: PropTypes.string,
  otherTitle: PropTypes.string,
  backHeaderClassName: PropTypes.string,
};

SelectList.defaultProps = {
  options: [],
  otherOptions: [],
  placeholder: '',
  children: null,
  disabled: false,
  matchedTitle: '',
  otherTitle: '',
  value: {},
  rightIcon: null,
  onChange() {},
  startAdornment() {},
  backHeaderClassName: null,
};
