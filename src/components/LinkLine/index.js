import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import IconLine from '../IconLine';
import styles from './styles.scss';
import rcFont from '../../assets/RcFont/RcFont.scss';

function LinkLine(props) {
  return (
    <Link
      to={props.to}
      className={styles.link}
    >
      <IconLine
        className={props.className}
        icon={<span className={classnames(rcFont.uniC9, styles.icon)} />}
      >
        {props.children}
      </IconLine>
    </Link>
  );
}

LinkLine.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default LinkLine;
