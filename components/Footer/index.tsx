import clsx from 'clsx';
import React from 'react';

import styles from './styles.scss';

type FooterProps = {
  className?: string;
};
const Footer: React.FC<FooterProps> = (props) => {
  return (
    <footer className={clsx(styles.root, props.className)}>
      {props.children}
    </footer>
  );
};
export default Footer;
