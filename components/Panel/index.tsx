import React from 'react';

import classnames from 'classnames';

import styles from './styles.scss';

type PanelProps = {
  className?: string;
};
const Panel: React.SFC<PanelProps> = (props) => {
  return (
    <div className={classnames(styles.root, props.className)}>
      {props.children}
    </div>
  );
};
export default Panel;
