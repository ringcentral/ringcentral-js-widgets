import React from 'react';

import createModal from '../../lib/createModal';
import Dialog from '../Dialog';

const ModalDialog = createModal(Dialog);
type ModalProps = {
  children?: React.ReactNode;
  onCancel?: (...args: any[]) => any;
};
const Modal: React.FC<ModalProps> = ({ onCancel = undefined, ...props }) => {
  return <ModalDialog {...props} onCancel={onCancel} onClose={onCancel} />;
};
export default Modal;
