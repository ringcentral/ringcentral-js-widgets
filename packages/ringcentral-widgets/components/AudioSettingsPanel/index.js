import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


import styles from './styles.scss';
import i18n from './i18n';

import BackHeader from '../BackHeader';
import Panel from '../Panel';
import InputField from '../InputField';
import Select from '../DropdownSelect';
import Button from '../Button';
import SaveButton from '../SaveButton';
import IconLine from '../IconLine';

export default class AudioSettingsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialButtonVolume: props.dialButtonVolume,
      dialButtonMuted: props.dialButtonMuted,
      ringtoneVolume: props.ringtoneVolume,
      ringtoneMuted: props.ringtoneMuted,
      callVolume: props.callVolume,
      inputDeviceId: props.inputDeviceId,
      outputDeviceId: props.outputDeviceId,
    };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.dialButtonVolume !== this.props.dialButtonVolume) {
      this.setState({
        dialButtonVolume: newProps.dialButtonVolume,
      });
    }
    if (newProps.dialButtonMuted !== this.props.dialButtonMuted) {
      this.setState({
        dialButtonMuted: newProps.dialButtonMuted,
      });
    }
    if (newProps.ringtoneVolume !== this.props.ringtoneVolume) {
      this.setState({
        ringtoneVolume: newProps.ringtoneVolume,
      });
    }
    if (newProps.ringtoneMuted !== this.props.ringtoneMuted) {
      this.setState({
        ringtoneMuted: newProps.ringtoneMuted,
      });
    }
    if (newProps.callVolume !== this.props.callVolume) {
      this.setState({
        callVolume: newProps.callVolume,
      });
    }
    if (newProps.inputDeviceId !== this.props.inputDeviceId) {
      this.setState({
        inputDeviceId: newProps.inputDeviceId,
      });
    }
    if (newProps.outputDeviceId !== this.props.outputDeviceId) {
      this.setState({
        outputDeviceId: newProps.outputDeviceId,
      });
    }
  }
  onSave = () => {
    if (typeof this.props.onSave === 'function') {
      const {
        dialButtonVolume,
        dialButtonMuted,
        ringtoneVolume,
        ringtoneMuted,
        callVolume,
        inputDeviceId,
        outputDeviceId,
      } = this.state;
      this.props.onSave({
        dialButtonVolume,
        dialButtonMuted,
        ringtoneVolume,
        ringtoneMuted,
        callVolume,
        inputDeviceId,
        outputDeviceId,
      });
    }
  }
  onReset = () => {
    const {
      dialButtonVolume,
      dialButtonMuted,
      ringtoneVolume,
      ringtoneMuted,
      callVolume,
      inputDeviceId,
      outputDeviceId,
    } = this.props;
    this.setState({
      dialButtonVolume,
      dialButtonMuted,
      ringtoneVolume,
      ringtoneMuted,
      callVolume,
      inputDeviceId,
      outputDeviceId,
    });
  }
  onDialButtonVolumeChange = (dialButtonVolume) => {
    this.setState({
      dialButtonVolume,
    });
  }
  onDialButtonMutedChange = (dialButtonMuted) => {
    this.setState({
      dialButtonMuted,
    });
  }
  onRingtoneVolumeChange = (ringtoneVolume) => {
    this.setState({
      ringtoneVolume,
    });
  }
  onRingtoneMutedChange = (ringtoneMuted) => {
    this.setState({
      ringtoneMuted,
    });
  }
  onCallVolumeChange = (callVolume) => {
    this.setState({
      callVolume,
    });
  }
  onOutputDeviceIdChange = (device) => {
    this.setState({
      outputDeviceId: device.deviceId,
    });
  }
  onInputDeviceIdChange = (device) => {
    this.setState({
      inputDeviceId: device.deviceId,
    });
  }
  renderDeviceOption(device) {
    return device.label;
  }
  renderDeviceValue(device) {
    return device.deviceId;
  }
  renderOutputDevice = (value) => {
    const device = this.props.availableOutputDevices
      .find(device => device.deviceId === value);
    return device && device.label || value;
  }
  renderInputDevice = (value) => {
    const device = this.props.availableInputDevices
      .find(device => device.deviceId === value);
    return device && device.label || value;
  }

  render() {
    const {
      currentLocale,
      onBackButtonClick,
      className,
      availableOutputDevices,
      availableInputDevices,
      supportDevices,
      userMedia,
      isWebRTC,
      checkUserMedia,
      outputDeviceDisabled,
      inputDeviceDisabled,
    } = this.props;
    const {
      dialButtonVolume,
      dialButtonMuted,
      ringtoneVolume,
      ringtoneMuted,
      callVolume,
      outputDeviceId,
      inputDeviceId,
    } = this.state;
    const hasChanges = (
      this.props.dialButtonVolume !== dialButtonVolume ||
      this.props.dialButtonMuted !== dialButtonMuted ||
      this.props.ringtoneVolume !== ringtoneVolume ||
      this.props.ringtoneMuted !== ringtoneMuted ||
      this.props.callVolume !== callVolume ||
      this.props.inputDeviceId !== inputDeviceId ||
      this.props.outputDeviceId !== outputDeviceId
    );

    // TODO: improve UI
    const permission = !userMedia ? (
      <IconLine
        noBorder
        icon={
          <Button onClick={checkUserMedia}>
            {i18n.getString('checkMicPermission')}
          </Button>
        }>
        {i18n.getString('micNoPermissionMessage')}
      </IconLine>
    ) : null;

    // const webphoneVolume = isWebRTC ?
    //   (
    //     <div>
    //       <InputField
    //         label={i18n.getString('ringtoneVolume', currentLocale)}
    //     >
    //         {`${ringtoneVolume * 100}%`}
    //       </InputField>
    //       <InputField
    //         label={i18n.getString('callVolume', currentLocale)}
    //     >
    //         {`${callVolume * 100}%`}
    //       </InputField>
    //     </div>
    //   ) : null;

    const outputDevice = supportDevices ? (
      <InputField
        label={i18n.getString('outputDevice', currentLocale)}
        noBorder>
        <Select
          className={styles.select}
          disabled={outputDeviceDisabled}
          value={
            availableOutputDevices.length ? outputDeviceId :
              i18n.getString('noDevice', currentLocale)
          }
          onChange={this.onOutputDeviceIdChange}
          options={availableOutputDevices}
          dropdownAlign="left"
          renderFunction={this.renderDeviceOption}
          valueFunction={this.renderDeviceValue}
          renderValue={this.renderOutputDevice}
          titleEnabled
        />
      </InputField>
    ) : null;

    const inputDevice = supportDevices ? (
      <InputField
        label={i18n.getString('inputDevice', currentLocale)}
        noBorder>
        <Select
          className={styles.select}
          disabled={inputDeviceDisabled}
          value={
            availableInputDevices.length ? inputDeviceId :
              i18n.getString('noDevice', currentLocale)
          }
          onChange={this.onInputDeviceIdChange}
          options={availableInputDevices}
          dropdownAlign="left"
          renderFunction={this.renderDeviceOption}
          valueFunction={this.renderDeviceValue}
          renderValue={this.renderInputDevice}
          titleEnabled
        />
      </InputField>
    ) : null;

    return (
      <div className={classnames(styles.root, className)}>
        <BackHeader onBackClick={onBackButtonClick}>
          {i18n.getString('title', currentLocale)}
        </BackHeader>
        <Panel className={styles.content}>
          {
            // <InputField
            //   label={i18n.getString('dialButtonVolume', currentLocale)}
            // >
            //   {`${dialButtonVolume * 100}%`}
            // </InputField>
            // webphoneVolume
          }
          {outputDevice}
          {inputDevice}
          {permission}
          <SaveButton
            currentLocale={currentLocale}
            onClick={this.onSave}
            disabled={!hasChanges}
          />
        </Panel>
      </div>
    );
  }
}

const devicePropType = {
  deviceId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

AudioSettingsPanel.propTypes = {
  className: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  dialButtonVolume: PropTypes.number.isRequired,
  ringtoneVolume: PropTypes.number.isRequired,
  ringtoneMuted: PropTypes.bool.isRequired,
  callVolume: PropTypes.number.isRequired,
  dialButtonMuted: PropTypes.bool.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  availableInputDevices: PropTypes.arrayOf(PropTypes.shape(devicePropType)).isRequired,
  inputDeviceId: PropTypes.string.isRequired,
  availableOutputDevices: PropTypes.arrayOf(PropTypes.shape(devicePropType)).isRequired,
  outputDeviceId: PropTypes.string.isRequired,
  supportDevices: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  userMedia: PropTypes.bool.isRequired,
  isWebRTC: PropTypes.bool.isRequired,
  checkUserMedia: PropTypes.func.isRequired,
  outputDeviceDisabled: PropTypes.bool,
  inputDeviceDisabled: PropTypes.bool,
};

AudioSettingsPanel.defaultProps = {
  className: null,
  outputDeviceDisabled: false,
  inputDeviceDisabled: false,
};
