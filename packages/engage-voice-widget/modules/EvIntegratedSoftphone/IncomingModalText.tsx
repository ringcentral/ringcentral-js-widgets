import React from 'react';

import classNames from 'classnames';

import styles from './styles.scss';

type ModalTextProps = {
  isInbound: boolean;
  inboundTextProps: {
    incomingText: string;
    queueNameText: string;
  };
  outboundText: string;
};
export const getModalText = ({
  isInbound,
  inboundTextProps,
  outboundText,
}: ModalTextProps) => {
  if (isInbound) {
    const { incomingText, queueNameText } = inboundTextProps;
    return (
      <>
        <p
          className={classNames(styles.text, styles.incomingText)}
          title={incomingText}
        >
          {incomingText}
        </p>
        <p className={styles.text} title={queueNameText}>
          {queueNameText}
        </p>
      </>
    );
  }
  return (
    <p className={styles.text} title={outboundText}>
      {outboundText}
    </p>
  );
};
