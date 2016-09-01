import React from 'react';
import prefix from '../../../utils/style';

const { cancelButton } = prefix(['cancelButton'], 'Closable');

const Closable = (props) => (
  <div className={props.className}>
    <button className={cancelButton} onClick={props.onClose}>Cancel</button>
    {props.children}
  </div>
);

Closable.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
  onClose: React.PropTypes.func,
};

export default Closable;
