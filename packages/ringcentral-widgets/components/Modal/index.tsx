import React from 'react';

import createModal from '../../lib/createModal';
import Dialog from '../Dialog';

const ModalDialog = createModal(Dialog);
type ModalProps = {
  onCancel?: (...args: any[]) => any;
};
const Modal: React.FC<ModalProps> = ({ onCancel, ...props }) => {
  // @ts-expect-error TS(2322): Type '{ onCancel: ((...args: any[]) => any) | unde... Remove this comment to see the full error message
  return <ModalDialog {...props} onCancel={onCancel} onClose={onCancel} />;
};
Modal.defaultProps = {
  onCancel: undefined,
};
export default Modal;
