import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import styles from './styles.scss';
import i18n from './i18n';
import { WeekdaysSelectProps } from './WeekdaysSelect.interface';

const WeekdaysSelect: FunctionComponent<WeekdaysSelectProps> = ({
  selected,
  onSelect,
  multiple,
  currentLocale,
}) => {
  const onClick = (e) => {
    e.preventDefault();
    const maxLength = multiple ? 7 : 1;
    if (e.target.nodeName === 'LI') {
      const { dataset } = e.target;
      const dayIndex = selected.indexOf(dataset.value);
      if (dayIndex !== -1) {
        selected.splice(dayIndex, 1);
      }
      if (dayIndex === -1) {
        if (selected.length < maxLength) {
          selected.push(dataset.value);
        } else {
          selected.shift();
          selected.push(dataset.value);
        }
      }
    }
    onSelect(selected);
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
        {i18n.getString(weekday.toLowerCase(), currentLocale)}
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
