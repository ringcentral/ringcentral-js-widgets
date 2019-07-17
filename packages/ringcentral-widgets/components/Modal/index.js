import React from 'react';
import propTypes from 'prop-types';
import createModal from '../../lib/createModal';
import Dialog from '../Dialog';

const ModalDialog = createModal(Dialog);

// remap onCancel to onClose for backward compatibility
export default function Modal({ onCancel, ...props }) {
  return (
    <ModalDialog
      {...props}
      onCancel={onCancel}
      onClose={onCancel} />
  );
}
Modal.propTypes = {
  onCancel: propTypes.func,
};
Modal.defaultProps = {
  onCancel: undefined,
};
