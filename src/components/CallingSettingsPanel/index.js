import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import formatMessage from 'format-message';

import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';
import 'font-awesome/css/font-awesome.css';
import styles from './styles.scss';
import i18n from './i18n';

import Header from '../../components/Header';
import Panel from '../../components/Panel';
import Line from '../../components/Line';
import Switch from '../../components/Switch';
import IconLine from '../../components/IconLine';
import InputLine from '../../components/InputLine';
import TextInput from '../../components/TextInput';

export default class CallingSettingsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callWith: props.callWith,
      ringoutPrompt: props.ringoutPrompt,
      myLocation: props.myLocation,
    };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.callWith !== this.props.callWith) {
      this.setState({
        callWith: newProps.callWith,
      });
    }
    if (newProps.ringoutPrompt !== this.props.ringoutPrompt) {
      this.setState({
        ringoutPrompt: newProps.ringoutPrompt,
      });
    }
    if (newProps.myLocation !== this.props.myLocation) {
      this.setState({
        myLocation: newProps.myLocation,
      });
    }
  }
  onSave = () => {
    if (typeof this.props.onSave === 'function') {
      const {
        callWith,
        myLocation,
        ringoutPrompt,
      } = this.state;
      this.props.onSave({
        callWith,
        myLocation,
        ringoutPrompt,
      });
    }
  }
  onReset = () => {
    const {
      callWith,
      myLocation,
      ringoutPrompt,
    } = this.props;
    this.setState({
      callWith,
      myLocation,
      ringoutPrompt,
    });
  }
  onCallWithChange = (e) => {
    const callWith = e.currentTarget.value;
    this.setState({
      callWith,
      myLocation: (this.props.availableNumbers[callWith] &&
        this.props.availableNumbers[callWith][0]) ||
        '',
    });
  }
  onMyLocationChange = (e) => {
    this.setState({
      myLocation: e.currentTarget.value,
    });
  }
  onRingoutPromptChange = (checked) => {
    this.setState({
      ringoutPrompt: checked,
    });
  }
  render() {
    const {
      currentLocale,
      callWith,
      callWithOptions,
      myLocation,
      ringoutPrompt,
      onBackButtonClick,
      brand,
      availableNumbers,
      className,
    } = this.props;
    const buttons = [];
    const hasChanges = this.state.callWith !== callWith ||
      this.state.myLocation !== myLocation ||
      this.state.ringoutPrompt !== ringoutPrompt;
    buttons.push({
      label: <i className="fa fa-chevron-left" />,
      onClick: onBackButtonClick,
      placement: 'left',
    });
    buttons.push({
      label: <i className="fa fa-undo" />,
      onClick: this.onReset,
      placement: 'right',
      hidden: !hasChanges,
    });
    buttons.push({
      label: <i className="fa fa-floppy-o" />,
      onClick: this.onSave,
      placement: 'right',
      disabled: !hasChanges,
    });

    const ringout = this.state.callWith !== callingOptions.softphone ? (
      <div>
        <Line>
          {i18n.getString('ringoutHint', currentLocale)}
        </Line>
        <InputLine
          label={i18n.getString('myLocationLabel', currentLocale)}>
          {
            availableNumbers[this.state.callWith] ? (
              <select
                className={styles.select}
                value={this.state.myLocation}
                onChange={this.onMyLocationChange}>
                {
                  availableNumbers[this.state.callWith]
                    .map((phoneNumber, idx) => (
                      <option
                        key={idx}
                        value={phoneNumber}>
                        {phoneNumber}
                      </option>
                    ))
                }
              </select>
            ) : (
              <TextInput
                value={this.state.myLocation}
                maxLength={30}
                onChange={this.onMyLocationChange} />
            )
          }
        </InputLine>
        <IconLine
          icon={
            <Switch
              checked={this.state.ringoutPrompt}
              onChange={this.onRingoutPromptChange}
              />
          }
          >
          {i18n.getString('press1ToStartCallLabel', currentLocale)}
        </IconLine>
      </div>
    ) : null;
    return (
      <div className={classnames(styles.root, className)}>
        <Header buttons={buttons}>
          {i18n.getString('title', currentLocale)}
        </Header>
        <Panel className={styles.content}>
          <InputLine
            label={i18n.getString('makeCallsWith', currentLocale)}>
            <select
              title={this.state.callWith}
              className={styles.select}
              value={this.state.callWith}
              onChange={this.onCallWithChange} >
              {
                callWithOptions.map((option, idx) => (
                  <option key={idx} value={option}>
                    {formatMessage(i18n.getString(option, currentLocale), { brand })}
                  </option>
                ))
              }
            </select>
          </InputLine>
          {ringout}
        </Panel>
      </div>
    );
  }
}

CallingSettingsPanel.propTypes = {
  brand: PropTypes.string.isRequired,
  className: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  callWithOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  callWith: PropTypes.string.isRequired,
  myLocation: PropTypes.string.isRequired,
  ringoutPrompt: PropTypes.bool.isRequired,
  availableNumbers: PropTypes.object.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
