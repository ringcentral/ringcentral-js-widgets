import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

import type { OptionsInterface } from './optionInterface';
import styles from './styles.scss';

const Option: FunctionComponent<OptionsInterface> = ({
  option,
  isOption,
  stylesFromProps = {},
}) => {
  const currentStyles = {
    ...styles,
    ...stylesFromProps,
  };
  const icon = option?.data?.icon ?? null;
  const { disabled = false, dataSign } = option;

  return (
    <div
      title={option.text}
      data-sign={dataSign}
      className={clsx(
        disabled ? currentStyles.disabled : null,
        isOption && !disabled ? currentStyles.option : currentStyles.value,
      )}
    >
      {icon ? (
        <i
          dangerouslySetInnerHTML={{ __html: icon }}
          role="presentation"
          className={clsx([currentStyles.icon, currentStyles.marginRight5])}
        />
      ) : null}
      <span>{option.text}</span>
    </div>
  );
};

export { Option };
