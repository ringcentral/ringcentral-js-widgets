import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import Icon from '../../../../elements/Icon';
import FormatInfo from '../FormatInfo';

function Call({
  onLog,
  onHangUp,
  onTransfer,
  info,
}) {
  function OperationBar() {
    return (
      <div className={styles.operationBar}>
        <Icon.End onClick={onHangUp} className={styles.icon} />
        <Icon.Transfer onClick={onTransfer} className={styles.icon} />
        <Icon type="Unlogged" onClick={onLog} className={styles.icon} />
      </div>
    );
  }
  return (
    <div className={styles.callItem}>
      <Icon type="ActivityCall" className={styles.inboundIcon} />
      <FormatInfo {...info} className={styles.infoRect} />
      <OperationBar />
    </div>
  );
}

Call.propTypes = {
  onLog: PropTypes.func,
  onHangUp: PropTypes.func,
  onTransfer: PropTypes.func,
  info: PropTypes.object,
};

Call.defaultProps = {
  onLog() {},
  onHangUp() {},
  onTransfer() {},
  info: {}
};

export default Call;
