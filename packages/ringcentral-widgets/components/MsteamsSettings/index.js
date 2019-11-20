import React from 'react';
import PropTypes from 'prop-types';
import formatMessage from 'format-message';
import BackHeader from '../BackHeader';
import Panel from '../Panel';
import Switch from '../Switch';
import i18n from './i18n';
import styles from './styles.scss';

export default function MsteamsSettings({
  currentLocale,
  brandName,
  showAudioSetting,
  showVideoSetting,
  audioTakeOverEnabled,
  videoTakeOverEnabled,
  onAudioSwitchChange,
  onVideoSwitchChange,
  onBackClick,
}) {
  const audioSetting = showAudioSetting && (
    <div className={styles.block}>
      <div className={styles.text}>
        {formatMessage(i18n.getString('audioSetting', currentLocale), {
          brandName,
        })}
      </div>
      <div className={styles.switch}>
        <Switch checked={audioTakeOverEnabled} onChange={onAudioSwitchChange} />
      </div>
    </div>
  );

  const videoSetting = showVideoSetting && (
    <div className={styles.block}>
      <div className={styles.text}>
        {formatMessage(i18n.getString('videoSetting', currentLocale), {
          brandName,
        })}
      </div>
      <div className={styles.switch}>
        <Switch checked={videoTakeOverEnabled} onChange={onVideoSwitchChange} />
      </div>
    </div>
  );

  return (
    <div className={styles.root}>
      <BackHeader onBackClick={onBackClick}>
        {i18n.getString('msTeamsSettingHeader', currentLocale)}
      </BackHeader>
      <Panel className={styles.content}>
        {audioSetting}
        {videoSetting}
      </Panel>
    </div>
  );
}

MsteamsSettings.propTypes = {
  brandName: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  showAudioSetting: PropTypes.bool,
  showVideoSetting: PropTypes.bool,
  audioTakeOverEnabled: PropTypes.bool,
  videoTakeOverEnabled: PropTypes.bool,
  onAudioSwitchChange: PropTypes.func,
  onVideoSwitchChange: PropTypes.func,
  onBackClick: PropTypes.func.isRequired,
};

MsteamsSettings.defaultProps = {
  showAudioSetting: true,
  showVideoSetting: true,
  audioTakeOverEnabled: false,
  videoTakeOverEnabled: false,
  onAudioSwitchChange: () => null,
  onVideoSwitchChange: () => null,
};
