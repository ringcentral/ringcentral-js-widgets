import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { RcListItem, RcListItemText } from '@ringcentral-integration/rcui';

import styles from './styles.scss';

export function ListViewItem({
  renderFunction,
  startAdornment,
  filter,
  valueFunction,
  value,
  option,
  onChange,
  index,
  onSelect,
}) {
  const selectElm = useRef();
  const currentValue = valueFunction(value);
  const thisValue = valueFunction(option);

  const isSelected = thisValue === currentValue;

  const { type } = option;

  useEffect(() => {
    if (isSelected) {
      onSelect(selectElm.current);
    }
  }, []);

  const getFilterResult = (option) => {
    const text = renderFunction(option);
    if (filter && typeof text === 'string') {
      const i = text.toLowerCase().indexOf(filter.toLowerCase());
      return (
        <>
          <span>{text.substring(0, i)}</span>
          <span style={{ background: '#ffdfb1' }}>
            {text.substring(i, i + filter.length)}
          </span>
          <span>{text.substring(i + filter.length)}</span>
        </>
      );
    }
    return text;
  };

  return (
    <div ref={selectElm}>
      <RcListItem
        button
        size="small"
        singleLine
        onClick={() => onChange(isSelected ? {} : option)}
        data-sign={`match${index}`}
        className={classnames(styles.listItem)}
        selected={isSelected}
      >
        {startAdornment && startAdornment(type)}
        <RcListItemText primary={getFilterResult(option)} />
      </RcListItem>
    </div>
  );
}

ListViewItem.propTypes = {
  option: PropTypes.object,
  value: PropTypes.any.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  valueFunction: PropTypes.func.isRequired,
  startAdornment: PropTypes.func,
  filter: PropTypes.string,
  renderFunction: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

ListViewItem.defaultProps = {
  option: {},
  filter: null,
  onChange() {},
  startAdornment() {},
};
