import React, { Component } from 'react';
import { presenceStatus } from 'ringcentral-integration/enums/presenceStatus.enum';
import DndStatus from 'ringcentral-integration/modules/Presence/dndStatus';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Line from '../Line';
import PresenceItem from '../PresenceItem';
import styles from './style.scss';

export default class PresenceDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelects: false,
    };
    // TODO: Consider for the bubble event of click to set status.
    // (maybe discuss in coding dojo)
    this.toggleShow = () => {
      const { isReady } = this.props;
      if (isReady) {
        this.setState((preState) => ({
          showSelects: !preState.showSelects,
        }));
      }
    };
  }

  render() {
    const {
      userStatus,
      dndStatus,
      currentLocale,
      setAvailable,
      setBusy,
      setDoNotDisturb,
      setInvisible,
      className,
    } = this.props;
    const { showSelects } = this.state;
    const showDropdown = classnames(
      styles.root,
      showSelects ? styles.showSelects : null,
    );
    const showBackground = classnames(
      styles.bk,
      showSelects ? styles.showSelects : null,
    );
    return (
      <div>
        <div
          className={classnames(
            styles.presence,
            styles[userStatus],
            styles[dndStatus],
            className,
          )}
          onClick={this.toggleShow}
        >
          <div className={styles.presenceBar} />
          <div className={showDropdown}>
            <Line className={styles.presenceList}>
              <PresenceItem
                className={styles.presenceItem}
                userStatus={presenceStatus.available}
                dndStatus={DndStatus.takeAllCalls}
                currentLocale={currentLocale}
                onClick={setAvailable}
                selected={
                  userStatus === presenceStatus.available &&
                  dndStatus !== DndStatus.doNotAcceptAnyCalls
                }
              />
              <PresenceItem
                className={styles.presenceItem}
                userStatus={presenceStatus.busy}
                dndStatus={DndStatus.takeAllCalls}
                currentLocale={currentLocale}
                onClick={setBusy}
                selected={
                  userStatus === presenceStatus.busy &&
                  dndStatus !== DndStatus.doNotAcceptAnyCalls
                }
              />
              <PresenceItem
                className={styles.presenceItem}
                userStatus={presenceStatus.busy}
                dndStatus={DndStatus.doNotAcceptAnyCalls}
                currentLocale={currentLocale}
                onClick={setDoNotDisturb}
                selected={dndStatus === DndStatus.doNotAcceptAnyCalls}
              />
              <PresenceItem
                className={styles.presenceItem}
                userStatus={presenceStatus.offline}
                dndStatus={DndStatus.takeAllCalls}
                currentLocale={currentLocale}
                onClick={setInvisible}
                selected={
                  userStatus === presenceStatus.offline &&
                  dndStatus !== DndStatus.doNotAcceptAnyCalls
                }
              />
            </Line>
          </div>
        </div>
        <div className={showBackground} onClick={this.toggleShow} />
      </div>
    );
  }
}

PresenceDropdown.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  dndStatus: PropTypes.string,
  userStatus: PropTypes.string,
  setAvailable: PropTypes.func.isRequired,
  setBusy: PropTypes.func.isRequired,
  setDoNotDisturb: PropTypes.func.isRequired,
  setInvisible: PropTypes.func.isRequired,
  isReady: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

PresenceDropdown.defaultProps = {
  dndStatus: null,
  userStatus: null,
  className: null,
};
