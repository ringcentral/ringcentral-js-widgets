import clsx from 'clsx';
import React from 'react';

import styles from './styles.scss';

type PanelProps = {
  className?: string;
};
const Panel: React.FC<PanelProps> = (props) => {
  return (
    <div className={clsx(styles.root, props.className)}>{props.children}</div>
  );
};
export default Panel;
