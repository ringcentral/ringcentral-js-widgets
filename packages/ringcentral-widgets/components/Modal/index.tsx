import React from 'react';

import createModal from '../../lib/createModal';
import Dialog from '../Dialog';

const ModalDialog = createModal(Dialog);
type ModalProps = {
  onCancel?: (...args: any[]) => any;
};
const Modal: React.SFC<ModalProps> = ({ onCancel, ...props }) => {
  return <ModalDialog {...props} onCancel={onCancel} onClose={onCancel} />;
};
Modal.defaultProps = {
  onCancel: undefined,
};
export default Modal;
