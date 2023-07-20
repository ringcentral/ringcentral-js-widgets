import type { FunctionComponent } from 'react';
import React from 'react';

import classNames from 'classnames';

import i18n, { I18nKey } from './i18n';
import styles from './styles.scss';
import type { WeekdaysSelectProps } from './WeekdaysSelect.interface';

const WeekdaysSelect: FunctionComponent<WeekdaysSelectProps> = ({
  selected,
  onSelect,
  multiple,
  currentLocale,
}) => {
  const onClick = (e: any) => {
    e.preventDefault();
    const _selected = selected.slice(0);
    const maxLength = multiple ? 7 : 1;
    if (e.target.nodeName === 'LI') {
      const { dataset } = e.target;
      const dayIndex = _selected.indexOf(dataset.value);
      if (dayIndex !== -1) {
        _selected.splice(dayIndex, 1);
      }
      if (dayIndex === -1) {
        if (_selected.length < maxLength) {
          _selected.push(dataset.value);
        } else {
          _selected.shift();
          _selected.push(dataset.value);
        }
      }
    }
    onSelect(_selected);
  };
  const list = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ].map((weekday) => {
    const isActive =
      Array.isArray(selected) && selected.indexOf(weekday) !== -1;
    return (
      <li
        data-value={weekday}
        key={weekday}
        className={classNames(styles.weekdayItem, {
          [styles.active]: isActive,
        })}
      >
        {i18n.getString(weekday.toLowerCase() as I18nKey, currentLocale)}
      </li>
    );
  });
  return (
    <ul className={styles.weekdaysSelect} onClick={onClick}>
      {list}
    </ul>
  );
};
WeekdaysSelect.defaultProps = {
  multiple: true,
  currentLocale: 'en-US',
};
export { WeekdaysSelect };
