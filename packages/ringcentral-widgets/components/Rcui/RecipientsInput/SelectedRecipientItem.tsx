// import React from 'react';

// import { RemoveButton } from '../../RemoveButton';
// import styles from './styles.scss';

// type SelectedRecipientItemProps = {
//   phoneNumber: string;
//   name?: string;
//   title?: string;
//   onRemove: (...args: any[]) => any;
// };
// export const SelectedRecipientItem: React.SFC<SelectedRecipientItemProps> = ({
//   phoneNumber,
//   name = phoneNumber,
//   title = name,
//   onRemove,
// }) => {
//   const className =
//     phoneNumber.length > 5 ? styles.phoneNumber : styles.extension;
//   return (
//     <li className={className} title={title}>
//       <span>{name}</span>
//       <RemoveButton
//         className={styles.removeReceiver}
//         onClick={onRemove}
//         visibility
//       />
//     </li>
//   );
// };
// SelectedRecipientItem.defaultProps = {
//   name: undefined,
//   title: undefined,
// };
