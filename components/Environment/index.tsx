import React, { Component } from 'react';

import classnames from 'classnames';

import BackHeader from '../BackHeader';
import { Button } from '../Button';
import IconLine from '../IconLine';
import Line from '../Line';
import Panel from '../Panel';
import Switch from '../Switch';
import TextInput from '../TextInput';
import styles from './styles.scss';

type EnvironmentProps = {
  server: string;
  recordingHost: string;
  enabled: boolean;
  onSetData: (...args: any[]) => any;
  defaultHidden?: boolean;
};
type EnvironmentState = {
  serverValue: any;
  recordingHostValue: any;
  enabledValue: any;
  hidden: any;
};
/**
 * Environment component for switching api server. Intended only for testing.
 * This component current does not comply to use redux properly.
 */
class Environment extends Component<EnvironmentProps, EnvironmentState> {
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
        <BackHeader onBackClick={this.onCancel} buttons={[]}>
          Environment
        </BackHeader>
        <Panel classname={styles.content}>
          <Line>
            Server
            <TextInput
              dataSign="envServerUrl"
              value={this.state.serverValue}
              onChange={this.onServerChange}
            />
          </Line>
          <Line>
            Recording Host
            <TextInput
              dataSign="envRecordingHost"
              value={this.state.recordingHostValue}
              onChange={this.onRecordingHostChange}
            />
          </Line>
          <IconLine
            icon={
              <Switch
                dataSign="envToggle"
                checked={this.state.enabledValue}
                onChange={this.onToggleEnabled}
              />
            }
          >
            Enable
          </IconLine>
          <Line>
            <Button
              dataSign="envSave"
              className={classnames(
                styles.saveButton,
                !hasChanges ? styles.disabled : null,
              )}
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
Environment.defaultProps = {
  defaultHidden: true,
};
export default Environment;
