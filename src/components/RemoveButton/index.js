import React, { PropTypes } from 'react';
import classnames from 'classnames';
import rcFont from '../../assets/RcFont/RcFont.scss';
import styles from './styles.scss';

function RemoveButton(props) {
  let className = null;
  if (props.visibility) {
    className = classnames(styles.containner, props.className);
  } else {
    className = classnames(styles.containner, props.className, styles.hiddenRemoveButton);
  }
  return (
    <a href="#remove" className={className} onClick={props.onClick}>
      <i className={rcFont.uni2471} />
    </a>
  );
}

RemoveButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  visibility: PropTypes.bool,
};

RemoveButton.defaultProps = {
  className: null,
  visibility: true,
};

export default RemoveButton;
