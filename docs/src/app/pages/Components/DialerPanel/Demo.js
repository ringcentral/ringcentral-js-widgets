import React, { Component } from 'react';
// eslint-disable-next-line
import DialerPanel from 'ringcentral-widgets/components/DialerPanel';
import styles from './styles.scss';
/**
 * A example of `DialerPanel`
 */
class DialerPanelDemo extends Component {
  constructor(props) {
    super(props);
    this.state={
      toNumber: ''
    }
  }
  onCall = () => {
    alert('click \'onCall\'');
  }
  keepToNumber = (toNumber) => {
    this.setState({
      toNumber
    });
  }
  render() {
    return (
      <DialerPanel
        className={styles.root}
        currentLocale='en-US'
        onCall={this.onCall}
        keepToNumber={this.keepToNumber}
        toNumber={this.state.toNumber}
        callButtonDisabled={false}
      />
    );
  }
}


export default DialerPanelDemo;
