import React from 'react';

import classnames from 'classnames';

import styles from './styles.scss';

type FooterProps = {
  className?: string;
};
const Footer: React.SFC<FooterProps> = (props) => {
  return (
    <footer className={classnames(styles.root, props.className)}>
      {props.children}
    </footer>
  );
};
export default Footer;
