import clsx from 'clsx';
import React from 'react';

import styles from './styles.scss';

type IconFieldProps = {
  icon?: React.ReactNode;
  className?: string;
  iconClassName?: string;
  title?: string;
};
const IconField: React.FC<IconFieldProps> = (props) => {
  return (
    <div className={clsx(styles.wrapper, props.className)}>
      <div className={styles.content} title={props.title} data-sign="iconField">
        {props.children}
      </div>
      <div className={styles.iconHolder}>
        <div className={clsx(styles.icon, props.iconClassName)}>
          {props.icon}
        </div>
      </div>
    </div>
  );
};
IconField.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  title: null,
};
export default IconField;
