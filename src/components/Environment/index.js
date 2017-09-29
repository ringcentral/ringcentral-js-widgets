import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

import BackHeader from '../BackHeader';
import Panel from '../Panel';
import Line from '../Line';
import IconLine from '../IconLine';
import TextInput from '../TextInput';
import Switch from '../Switch';
import Button from '../Button';
import Revert from '../../assets/images/Revert.svg';
import dynamicsFonts from '../../assets/DynamicsFont/DynamicsFont.scss';


/**
 * Environment component for switching api server. Intended only for testing.
 * This component current does not comply to use redux properly.
 */

class Environment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: props.defaultHidden,
      serverValue: props.server,
      recordingHostValue: props.recordingHost,
      enabledValue: props.enabled,
    };

    this.onServerChange = (e) => {
      this.setState({
        serverValue: e.currentTarget.value,
      });
    };
    this.onRecordingHostChange = (e) => {
      this.setState({
        recordingHostValue: e.currentTarget.value,
      });
    };
    this.onToggleEnabled = (e) => {
      this.setState({
        enabledValue: !this.state.enabledValue,
      });
    };
    this.onOk = () => {
      this.props.onSetData({
        server: this.state.serverValue,
        recordingHost: this.state.recordingHostValue,
        enabled: this.state.enabledValue,
      });
      this.toggleEnv();
    };
    this.onCancel = () => {
      this.setState({
        serverValue: this.props.server,
        recordingHostValue: this.props.recordingHost,
        enabledValue: this.props.enabled,
      });
      this.toggleEnv();
    };
    this.toggleEnv = () => {
      this.setState({
        hidden: !this.state.hidden,
      });
    };
    if (typeof window !== 'undefined') {
      window.toggleEnv = this.toggleEnv;
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.server !== this.props.server) {
      this.setState({
        serverValue: nextProps.server,
      });
    }
    if (nextProps.recordingHost !== this.props.recordingHost) {
      this.setState({
        recordingHostValue: nextProps.recordingHost,
      });
    }
    if (nextProps.enabled !== this.props.enabled) {
      this.setState({
        enabledValue: nextProps.enabled,
      });
    }
  }
  render() {
    if (this.state.hidden) {
      return null;
    }
    const hasChanges = !(
      this.state.serverValue === this.props.server &&
      this.state.enabledValue === this.props.enabled &&
      this.state.recordingHostValue === this.props.recordingHost
    );
    return (
      <div className={styles.root}>
        <BackHeader
          onBackClick={this.onCancel}
          buttons={[]}
        >
          Environment
        </BackHeader>
        <Panel classname={styles.content}>
          <Line>
            Server
            <TextInput
              value={this.state.serverValue}
              onChange={this.onServerChange}
            />
          </Line>
          <Line>
            Recording Host
            <TextInput
              value={this.state.recordingHostValue}
              onChange={this.onRecordingHostChange}
            />
          </Line>
          <IconLine
            icon={
              <Switch
                checked={this.state.enabledValue}
                onChange={this.onToggleEnabled}
              />
            }
          >
            Enable
          </IconLine>
          <Line>
            <Button
              className={classnames(styles.saveButton, !hasChanges ? styles.disabled : null)}
              onClick={this.onOk}
              disabled={!hasChanges}
            >
              Save
            </Button>
          </Line>
        </Panel>
      </div>
    );
  }
}

Environment.propTypes = {
  server: PropTypes.string.isRequired,
  recordingHost: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  onSetData: PropTypes.func.isRequired,
  defaultHidden: PropTypes.bool,
};

Environment.defaultProps = {
  defaultHidden: true,
};

export default Environment;
