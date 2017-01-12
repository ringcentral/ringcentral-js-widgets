import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import Header from '../Header';
import Panel from '../Panel';
import Line from '../Line';
import IconLine from '../IconLine';
import TextInput from '../TextInput';
import Switch from '../Switch';


/**
 * Environment component for switching api server. Intended only for testing.
 * This component current does not comply to use redux properly.
 */

class Environment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      serverValue: props.server,
      enabledValue: props.enabled,
    };

    this.onServerChange = e => {
      this.setState({
        serverValue: e.currentTarget.value,
      });
    };
    this.onToggleEnabled = e => {
      this.setState({
        enabledValue: !this.state.enabledValue,
      });
    };
    this.onOk = () => {
      this.props.onSetData({
        server: this.state.serverValue,
        enabled: this.state.enabledValue,
      });
      this.toggleEnv();
    };
    this.onCancel = () => {
      this.setState({
        serverValue: this.props.server,
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
    return (
      <div className={styles.root}>
        <Header
          buttons={[
            {
              label: <i className="fa fa-times" />,
              onClick: this.onCancel,
            },
            {
              label: <i className="fa fa-save" />,
              onClick: this.onOk,
              disabled: (
                this.state.serverValue === this.props.server &&
                this.state.enabledValue === this.props.enabled
              ),
              placement: 'right',
            },
          ]}
        >Environment</Header>
        <Panel classname={styles.content}>
          <Line>
            Server
            <TextInput
              value={this.state.serverValue}
              onChange={this.onServerChange}
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

        </Panel>
      </div>
    );
  }
}

Environment.propTypes = {
  server: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  onSetData: PropTypes.func.isRequired,
};

export default Environment;
