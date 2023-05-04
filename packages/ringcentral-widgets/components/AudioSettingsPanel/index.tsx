import React, { Component } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import { all, find } from 'ramda';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'rc-t... Remove this comment to see the full error message
import Tooltip from 'rc-tooltip';

import InfoIcon from '../../assets/images/Info.svg';
import BackHeader from '../BackHeader';
import { Button } from '../Button';
import Select from '../DropdownSelect';
import IconLine from '../IconLine';
import InputField from '../InputField';
import Panel from '../Panel';
import SaveButton from '../SaveButton';
import i18n from './i18n';
import styles from './styles.scss';

const TooltipCom = typeof Tooltip === 'function' ? Tooltip : Tooltip.default;

class AudioSettingsPanel extends Component {
  inputTooltipContainner: any;
  outputTooltipContainner: any;
  _isFirefox = false;

  constructor(props: any) {
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

    this._isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  // eslint-disable-next-line react/no-deprecated
  UNSAFE_componentWillReceiveProps(newProps: any) {
    // @ts-expect-error TS(2339): Property 'dialButtonVolume' does not exist on type... Remove this comment to see the full error message
    if (newProps.dialButtonVolume !== this.props.dialButtonVolume) {
      this.setState({
        dialButtonVolume: newProps.dialButtonVolume,
      });
    }
    // @ts-expect-error TS(2339): Property 'dialButtonMuted' does not exist on type ... Remove this comment to see the full error message
    if (newProps.dialButtonMuted !== this.props.dialButtonMuted) {
      this.setState({
        dialButtonMuted: newProps.dialButtonMuted,
      });
    }
    // @ts-expect-error TS(2339): Property 'ringtoneVolume' does not exist on type '... Remove this comment to see the full error message
    if (newProps.ringtoneVolume !== this.props.ringtoneVolume) {
      this.setState({
        ringtoneVolume: newProps.ringtoneVolume,
      });
    }
    // @ts-expect-error TS(2339): Property 'ringtoneMuted' does not exist on type 'R... Remove this comment to see the full error message
    if (newProps.ringtoneMuted !== this.props.ringtoneMuted) {
      this.setState({
        ringtoneMuted: newProps.ringtoneMuted,
      });
    }
    // @ts-expect-error TS(2339): Property 'callVolume' does not exist on type 'Read... Remove this comment to see the full error message
    if (newProps.callVolume !== this.props.callVolume) {
      this.setState({
        callVolume: newProps.callVolume,
      });
    }
    if (
      // @ts-expect-error TS(2339): Property 'inputDeviceId' does not exist on type 'R... Remove this comment to see the full error message
      newProps.inputDeviceId !== this.props.inputDeviceId ||
      all(
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        (device) => device.deviceId !== this.state.inputDeviceId,
        newProps.availableInputDevices,
      )
    ) {
      this.setState({
        inputDeviceId: newProps.inputDeviceId,
      });
    }
    if (
      // @ts-expect-error TS(2339): Property 'outputDeviceId' does not exist on type '... Remove this comment to see the full error message
      newProps.outputDeviceId !== this.props.outputDeviceId ||
      all(
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        (device) => device.deviceId !== this.state.outputDeviceId,
        newProps.availableOutputDevices,
      )
    ) {
      this.setState({
        outputDeviceId: newProps.outputDeviceId,
      });
    }
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    // @ts-expect-error TS(2339): Property 'userMedia' does not exist on type 'Reado... Remove this comment to see the full error message
    if (!this.props.userMedia) {
      return;
    }
    if (
      // @ts-expect-error TS(2339): Property 'availableInputDevices' does not exist on... Remove this comment to see the full error message
      this.props.availableInputDevices.length > 0 &&
      // @ts-expect-error TS(2339): Property 'availableInputDevices' does not exist on... Remove this comment to see the full error message
      this.props.availableInputDevices[0].label === ''
    ) {
      // @ts-expect-error TS(2339): Property 'checkUserMedia' does not exist on type '... Remove this comment to see the full error message
      this.props.checkUserMedia();
    }
  }

  onSave = () => {
    // @ts-expect-error TS(2339): Property 'onSave' does not exist on type 'Readonly... Remove this comment to see the full error message
    if (typeof this.props.onSave === 'function') {
      const {
        // @ts-expect-error TS(2339): Property 'dialButtonVolume' does not exist on type... Remove this comment to see the full error message
        dialButtonVolume,
        // @ts-expect-error TS(2339): Property 'dialButtonMuted' does not exist on type ... Remove this comment to see the full error message
        dialButtonMuted,
        // @ts-expect-error TS(2339): Property 'ringtoneVolume' does not exist on type '... Remove this comment to see the full error message
        ringtoneVolume,
        // @ts-expect-error TS(2339): Property 'ringtoneMuted' does not exist on type 'R... Remove this comment to see the full error message
        ringtoneMuted,
        // @ts-expect-error TS(2339): Property 'callVolume' does not exist on type 'Read... Remove this comment to see the full error message
        callVolume,
        // @ts-expect-error TS(2339): Property 'inputDeviceId' does not exist on type 'R... Remove this comment to see the full error message
        inputDeviceId,
        // @ts-expect-error TS(2339): Property 'outputDeviceId' does not exist on type '... Remove this comment to see the full error message
        outputDeviceId,
      } = this.state;
      // @ts-expect-error TS(2339): Property 'onSave' does not exist on type 'Readonly... Remove this comment to see the full error message
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
  };

  onReset = () => {
    const {
      // @ts-expect-error TS(2339): Property 'dialButtonVolume' does not exist on type... Remove this comment to see the full error message
      dialButtonVolume,
      // @ts-expect-error TS(2339): Property 'dialButtonMuted' does not exist on type ... Remove this comment to see the full error message
      dialButtonMuted,
      // @ts-expect-error TS(2339): Property 'ringtoneVolume' does not exist on type '... Remove this comment to see the full error message
      ringtoneVolume,
      // @ts-expect-error TS(2339): Property 'ringtoneMuted' does not exist on type 'R... Remove this comment to see the full error message
      ringtoneMuted,
      // @ts-expect-error TS(2339): Property 'callVolume' does not exist on type 'Read... Remove this comment to see the full error message
      callVolume,
      // @ts-expect-error TS(2339): Property 'inputDeviceId' does not exist on type 'R... Remove this comment to see the full error message
      inputDeviceId,
      // @ts-expect-error TS(2339): Property 'outputDeviceId' does not exist on type '... Remove this comment to see the full error message
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
  };

  onDialButtonVolumeChange = (dialButtonVolume: any) => {
    this.setState({
      dialButtonVolume,
    });
  };

  onDialButtonMutedChange = (dialButtonMuted: any) => {
    this.setState({
      dialButtonMuted,
    });
  };

  onRingtoneVolumeChange = (ringtoneVolume: any) => {
    this.setState({
      ringtoneVolume,
    });
  };

  onRingtoneMutedChange = (ringtoneMuted: any) => {
    this.setState({
      ringtoneMuted,
    });
  };

  onCallVolumeChange = (callVolume: any) => {
    this.setState({
      callVolume,
    });
  };

  onOutputDeviceIdChange = (device: any) => {
    this.setState({
      outputDeviceId: device.deviceId,
    });
  };

  onInputDeviceIdChange = (device: any) => {
    this.setState({
      inputDeviceId: device.deviceId,
    });
  };

  renderDeviceOption = (device: any, index: any) => {
    // @ts-expect-error TS(2339): Property 'availableInputDevices' does not exist on... Remove this comment to see the full error message
    const { availableInputDevices, availableOutputDevices, currentLocale } =
      this.props;
    const noLabel = i18n.getString('noLabel', currentLocale);
    if (device.kind === 'audioinput' && availableInputDevices.length > 1) {
      return device.label || `${noLabel} ${index + 1}`;
    }
    if (device.kind === 'audiooutput' && availableOutputDevices.length > 1) {
      return device.label || `${noLabel} ${index + 1}`;
    }
    return device.label || noLabel;
  };

  renderDeviceValue(device: any) {
    return device.deviceId;
  }

  renderOutputDevice = (value: any) => {
    // @ts-expect-error TS(2339): Property 'availableOutputDevices' does not exist o... Remove this comment to see the full error message
    const { availableOutputDevices, currentLocale } = this.props;
    if (value === null) {
      return i18n.getString('noDevice', currentLocale);
    }
    const device = find(
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      (device) => device.deviceId === value,
      availableOutputDevices,
    );
    let noLabel = i18n.getString('noLabel', currentLocale);
    if (availableOutputDevices.length > 1) {
      const index = availableOutputDevices.indexOf(device);
      if (index >= 0) {
        noLabel = `${noLabel} ${index + 1}`;
      }
    }
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    return (device && device.label) || noLabel;
  };

  renderInputDevice = (value: any) => {
    // @ts-expect-error TS(2339): Property 'availableInputDevices' does not exist on... Remove this comment to see the full error message
    const { availableInputDevices, currentLocale } = this.props;
    if (value === null) {
      return i18n.getString('noDevice', currentLocale);
    }
    const device = find(
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      (device) => device.deviceId === value,
      availableInputDevices,
    );
    let noLabel = i18n.getString('noLabel', currentLocale);
    if (availableInputDevices.length > 1) {
      const index = availableInputDevices.indexOf(device);
      if (index >= 0) {
        noLabel = `${noLabel} ${index + 1}`;
      }
    }
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    return (device && device.label) || noLabel;
  };

  isNoLabel() {
    // @ts-expect-error TS(2339): Property 'availableInputDevices' does not exist on... Remove this comment to see the full error message
    const { availableInputDevices } = this.props;

    let noLabel = false;

    if (availableInputDevices && availableInputDevices.length) {
      noLabel = availableInputDevices[0].label === '';
    } else {
      noLabel = this._isFirefox;
    }

    return noLabel;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const {
      // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
      currentLocale,
      // @ts-expect-error TS(2339): Property 'onBackButtonClick' does not exist on typ... Remove this comment to see the full error message
      onBackButtonClick,
      // @ts-expect-error TS(2339): Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
      className,
      // @ts-expect-error TS(2339): Property 'availableOutputDevices' does not exist o... Remove this comment to see the full error message
      availableOutputDevices,
      // @ts-expect-error TS(2339): Property 'availableInputDevices' does not exist on... Remove this comment to see the full error message
      availableInputDevices,
      // @ts-expect-error TS(2339): Property 'supportDevices' does not exist on type '... Remove this comment to see the full error message
      supportDevices,
      // @ts-expect-error TS(2339): Property 'userMedia' does not exist on type 'Reado... Remove this comment to see the full error message
      userMedia,
      // @ts-expect-error TS(2339): Property 'isWebRTC' does not exist on type 'Readon... Remove this comment to see the full error message
      isWebRTC,
      // @ts-expect-error TS(2339): Property 'checkUserMedia' does not exist on type '... Remove this comment to see the full error message
      checkUserMedia,
      // @ts-expect-error TS(2339): Property 'outputDeviceDisabled' does not exist on ... Remove this comment to see the full error message
      outputDeviceDisabled,
      // @ts-expect-error TS(2339): Property 'inputDeviceDisabled' does not exist on t... Remove this comment to see the full error message
      inputDeviceDisabled,
    } = this.props;
    const {
      // @ts-expect-error TS(2339): Property 'dialButtonVolume' does not exist on type... Remove this comment to see the full error message
      dialButtonVolume,
      // @ts-expect-error TS(2339): Property 'dialButtonMuted' does not exist on type ... Remove this comment to see the full error message
      dialButtonMuted,
      // @ts-expect-error TS(2339): Property 'ringtoneVolume' does not exist on type '... Remove this comment to see the full error message
      ringtoneVolume,
      // @ts-expect-error TS(2339): Property 'ringtoneMuted' does not exist on type 'R... Remove this comment to see the full error message
      ringtoneMuted,
      // @ts-expect-error TS(2339): Property 'callVolume' does not exist on type 'Read... Remove this comment to see the full error message
      callVolume,
      // @ts-expect-error TS(2339): Property 'outputDeviceId' does not exist on type '... Remove this comment to see the full error message
      outputDeviceId,
      // @ts-expect-error TS(2339): Property 'inputDeviceId' does not exist on type 'R... Remove this comment to see the full error message
      inputDeviceId,
    } = this.state;
    const hasChanges =
      // @ts-expect-error TS(2339): Property 'dialButtonVolume' does not exist on type... Remove this comment to see the full error message
      this.props.dialButtonVolume !== dialButtonVolume ||
      // @ts-expect-error TS(2339): Property 'dialButtonMuted' does not exist on type ... Remove this comment to see the full error message
      this.props.dialButtonMuted !== dialButtonMuted ||
      // @ts-expect-error TS(2339): Property 'ringtoneVolume' does not exist on type '... Remove this comment to see the full error message
      this.props.ringtoneVolume !== ringtoneVolume ||
      // @ts-expect-error TS(2339): Property 'ringtoneMuted' does not exist on type 'R... Remove this comment to see the full error message
      this.props.ringtoneMuted !== ringtoneMuted ||
      // @ts-expect-error TS(2339): Property 'callVolume' does not exist on type 'Read... Remove this comment to see the full error message
      this.props.callVolume !== callVolume ||
      // @ts-expect-error TS(2339): Property 'inputDeviceId' does not exist on type 'R... Remove this comment to see the full error message
      this.props.inputDeviceId !== inputDeviceId ||
      // @ts-expect-error TS(2339): Property 'outputDeviceId' does not exist on type '... Remove this comment to see the full error message
      this.props.outputDeviceId !== outputDeviceId;

    // TODO: improve UI
    const permission = !userMedia ? (
      <IconLine
        noBorder
        icon={
          <Button dataSign="checkMicPermission" onClick={checkUserMedia}>
            {i18n.getString('checkMicPermission')}
          </Button>
        }
      >
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

    const outputDeviceDropdown = supportDevices ? (
      <InputField
        label={<span>{i18n.getString('outputDevice', currentLocale)}</span>}
        // @ts-expect-error TS(2322): Type '{ children: Element[]; label: Element; noBor... Remove this comment to see the full error message
        noBorder
      >
        <Select
          className={styles.select}
          disabled={outputDeviceDisabled}
          value={availableOutputDevices.length ? outputDeviceId : null}
          onChange={this.onOutputDeviceIdChange}
          options={availableOutputDevices}
          dropdownAlign="left"
          renderFunction={this.renderDeviceOption}
          valueFunction={this.renderDeviceValue}
          renderValue={this.renderOutputDevice}
          titleEnabled
        />
        <div
          className={styles.tooltipContainer}
          ref={(tooltipContainer) => {
            this.outputTooltipContainner = tooltipContainer;
          }}
        />
      </InputField>
    ) : null;
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices
    // Prior to Firefox 63, enumerateDevices() only returned input devices. Starting with Firefox 63, output devices are also included if the `media.setsinkid.enabled` preference is enabled.
    // disabledFrom version 63: this feature is behind the `media.setsinkid.enabled` preferences (needs to be set to true). To change preferences in Firefox, visit about:config.
    const outputDevice =
      this._isFirefox && !availableOutputDevices?.length ? (
        <InputField
          className={styles.noHeightInputField}
          label={<span>{i18n.getString('outputDevice', currentLocale)}</span>}
          // @ts-expect-error TS(2322): Type '{ children: Element; className: string; labe... Remove this comment to see the full error message
          noBorder
        >
          <div className={styles.fakeDropdownContainer}>
            {i18n.getString('defaultOutputDevice', currentLocale)}
          </div>
        </InputField>
      ) : (
        outputDeviceDropdown
      );

    const inputTooltip = this.isNoLabel() ? (
      <TooltipCom
        placement="bottom"
        trigger="click"
        align={{
          offset: [0, 47],
        }}
        overlay={i18n.getString('noLabelTip', currentLocale)}
        arrowContent={<div className="rc-tooltip-arrow-inner" />}
        getTooltipContainer={() => this.inputTooltipContainner}
      >
        <InfoIcon width={14} height={14} className={styles.infoIcon} />
      </TooltipCom>
    ) : null;
    const inputDevice = supportDevices ? (
      <InputField
        label={
          <span>
            {i18n.getString('inputDevice', currentLocale)}
            {inputTooltip}
          </span>
        }
        // @ts-expect-error TS(2322): Type '{ children: Element[]; label: Element; noBor... Remove this comment to see the full error message
        noBorder
      >
        <Select
          className={styles.select}
          disabled={inputDeviceDisabled}
          value={availableInputDevices.length ? inputDeviceId : null}
          onChange={this.onInputDeviceIdChange}
          options={availableInputDevices}
          dropdownAlign="left"
          renderFunction={this.renderDeviceOption}
          valueFunction={this.renderDeviceValue}
          renderValue={this.renderInputDevice}
          titleEnabled
        />
        <div
          className={styles.tooltipContainer}
          ref={(tooltipContainer) => {
            this.inputTooltipContainner = tooltipContainer;
          }}
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

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
AudioSettingsPanel.propTypes = {
  className: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  dialButtonVolume: PropTypes.number.isRequired,
  ringtoneVolume: PropTypes.number.isRequired,
  ringtoneMuted: PropTypes.bool.isRequired,
  callVolume: PropTypes.number.isRequired,
  dialButtonMuted: PropTypes.bool.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  availableInputDevices: PropTypes.arrayOf(PropTypes.shape(devicePropType))
    .isRequired,
  inputDeviceId: PropTypes.string.isRequired,
  availableOutputDevices: PropTypes.arrayOf(PropTypes.shape(devicePropType))
    .isRequired,
  outputDeviceId: PropTypes.string.isRequired,
  supportDevices: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  userMedia: PropTypes.bool.isRequired,
  isWebRTC: PropTypes.bool.isRequired,
  checkUserMedia: PropTypes.func.isRequired,
  outputDeviceDisabled: PropTypes.bool,
  inputDeviceDisabled: PropTypes.bool,
};

// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
AudioSettingsPanel.defaultProps = {
  className: null,
  outputDeviceDisabled: false,
  inputDeviceDisabled: false,
};

export default AudioSettingsPanel;
