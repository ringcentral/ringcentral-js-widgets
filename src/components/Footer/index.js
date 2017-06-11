import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import styles from './styles.scss';

function Footer(props) {
  return (
    <footer className={classnames(styles.root, props.className)}>
      {props.children}
    </footer>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Footer;
