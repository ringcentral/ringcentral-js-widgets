import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import formatMessage from 'format-message';
import i18n from './i18n';
import { ListView } from './ListView';
import { SelectListBasic } from '../SelectListBasic';
import { WithScrollCheck } from './WithScrollCheck';
import styles from './styles.scss';

export const SelectListBasicWithScrollCheck = WithScrollCheck(SelectListBasic);

export const SelectList = (props) => {
  const {
    field,
    appName,
    children,
    disabled,
    onChange,
    otherTitle,
    matchedTitle,
    valueFunction,
    currentLocale,
    renderFunction,
    startAdornment,
    associatedTitle,
    value: sourceValue,
    onSelectViewVisible,
    backHeaderClassName,
    foundFromServerTitle,
    showFoundFromServer,
  } = props;

  const [open, setOpen] = useState(false);
  const [showSearchFromServerHint, setShowSearchFromServerHint] = useState(
    true,
  );
  useEffect(() => {
    onSelectViewVisible(open, field);
  }, [field, onSelectViewVisible, open]);

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
          if (showFoundFromServer) {
            setShowSearchFromServerHint(true);
          }
        }}
      >
        {children}
      </div>
      <SelectListBasicWithScrollCheck
        {...props}
        matchedTitle={matchedTitle || i18n.getString('matched', currentLocale)}
        otherTitle={otherTitle || i18n.getString('other', currentLocale)}
        associatedTitle={
          associatedTitle || i18n.getString('associated', currentLocale)
        }
        foundFromServerTitle={
          foundFromServerTitle ||
          formatMessage(i18n.getString('foundFromServer', currentLocale), {
            appName,
          })
        }
        renderListView={renderListView}
        open={open}
        setOpen={setOpen}
        backHeaderClassName={backHeaderClassName}
        showSearchFromServerHint={showSearchFromServerHint}
        setShowSearchFromServerHint={setShowSearchFromServerHint}
      />
    </div>
  );
};

SelectList.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  otherOptions: PropTypes.arrayOf(PropTypes.object),
  associatedOptions: PropTypes.arrayOf(PropTypes.object),
  showAssociatedSection: PropTypes.bool,
  placeholder: PropTypes.string,
  valueFunction: PropTypes.func.isRequired,
  renderFunction: PropTypes.func.isRequired,
  searchOption: PropTypes.func.isRequired,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  field: PropTypes.string,
  value: PropTypes.any,
  rightIcon: PropTypes.element,
  onChange: PropTypes.func,
  onSelectViewVisible: PropTypes.func,
  currentLocale: PropTypes.string.isRequired,
  startAdornment: PropTypes.func,
  matchedTitle: PropTypes.string,
  otherTitle: PropTypes.string,
  associatedTitle: PropTypes.string,
  backHeaderClassName: PropTypes.string,
  contactSearch: PropTypes.func,
  foudsFromServerTitle: PropTypes.string,
  appName: PropTypes.string,
  showFoundFromServer: PropTypes.bool,
  foundFromServerTitle: PropTypes.string,
  foundFromServerEntities: PropTypes.array,
};

SelectList.defaultProps = {
  options: [],
  otherOptions: [],
  associatedOptions: [],
  showAssociatedSection: false,
  placeholder: '',
  children: null,
  disabled: false,
  matchedTitle: '',
  otherTitle: '',
  associatedTitle: '',
  field: '',
  value: {},
  rightIcon: null,
  onChange() {},
  startAdornment() {},
  onSelectViewVisible() {},
  backHeaderClassName: null,
  contactSearch: null,
  foudsFromServerTitle: null,
  appName: null,
  showFoundFromServer: false,
  foundFromServerTitle: null,
  foundFromServerEntities: [],
};
