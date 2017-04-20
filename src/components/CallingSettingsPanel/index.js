import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import formatMessage from 'format-message';

import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';
import 'font-awesome/css/font-awesome.css';
import styles from './styles.scss';
import i18n from './i18n';

import BackHeader from '../BackHeader';
import Panel from '../Panel';
import Switch from '../Switch';
import IconField from '../IconField';
import InputField from '../InputField';
import TextInput from '../TextInput';
import Select from '../DropdownSelect';

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
  onCallWithChange = (callWith) => {
    this.setState({
      callWith,
      myLocation: (this.props.availableNumbers[callWith] &&
        this.props.availableNumbers[callWith][0]) ||
        '',
    });
  }
  onMyLocationChange = (myLocation) => {
    this.setState({
      myLocation
    });
  }
  onMyLocationTextChange = (e) => {
    const myLocation = e.target.value;
    this.setState({
      myLocation
    });
  }
  onRingoutPromptChange = (checked) => {
    this.setState({
      ringoutPrompt: checked,
    });
  }
  renderHandler = (option) => {
    const brand = this.props.brand;
    return formatMessage(i18n.getString(option, this.props.currentLocale), { brand });
  }
  render() {
    const {
      currentLocale,
      callWith,
      callWithOptions,
      myLocation,
      ringoutPrompt,
      onBackButtonClick,
      availableNumbers,
      className,
    } = this.props;
    const buttons = [];
    const hasChanges = this.state.callWith !== callWith ||
      this.state.myLocation !== myLocation ||
      this.state.ringoutPrompt !== ringoutPrompt;
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

    const ringout =
      (
        this.state.callWith !== callingOptions.softphone &&
        this.state.callWith !== callingOptions.browser
      ) ? (
        <div>
          <div className={styles.ringoutHint}>
            {i18n.getString('ringoutHint', currentLocale)}
          </div>
          <InputField
            className={styles.inputField}
            label={i18n.getString('myLocationLabel', currentLocale)}>
            {
              availableNumbers[this.state.callWith] ? (
                <Select
                  className={styles.select}
                  value={this.state.myLocation}
                  onChange={this.onMyLocationChange}
                  options={availableNumbers[this.state.callWith]}
                  dropdownAlign="left"
                  titleEnabled
                />
              ) : (
                <TextInput
                  value={this.state.myLocation}
                  maxLength={30}
                  onChange={this.onMyLocationTextChange} />
              )
            }
          </InputField>
          <IconField
            className={styles.iconField}
            icon={
              <Switch
                checked={this.state.ringoutPrompt}
                onChange={this.onRingoutPromptChange}
                />
            }
            >
            {i18n.getString('press1ToStartCallLabel', currentLocale)}
          </IconField>
        </div>
      ) : null;

    return (
      <div className={classnames(styles.root, className)}>
        <BackHeader
          buttons={buttons}
          onBackClick={onBackButtonClick}
          >
          {i18n.getString('title', currentLocale)}
        </BackHeader>
        <Panel className={styles.content}>
          <InputField
            className={styles.inputField}
            label={i18n.getString('makeCallsWith', currentLocale)} noBorder>
            <Select
              className={styles.select}
              value={this.state.callWith}
              onChange={this.onCallWithChange}
              options={callWithOptions}
              dropdownAlign="left"
              renderValue={this.renderHandler}
              renderFunction={this.renderHandler}
              titleEnabled
            />
          </InputField>
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

CallingSettingsPanel.defaultProps = {
  className: null,
};
