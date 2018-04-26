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
    this.state = {
      toNumber: ''
    };
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
      <div style={{
        position: 'relative',
        height: '500px',
        width: '300px',
        border: '1px solid #f3f3f3',
      }}>
        <DialerPanel
          className={styles.root}
          currentLocale="en-US"
          isWebphoneMode
          onCallButtonClick={this.onCall}
          onToNumberChange={this.keepToNumber}
          toNumber={this.state.toNumber}
          fromNumber="123456789"
          fromNumbers={[
            {
              phoneNumber: '123456789',
              usageType: 'Company',
            }
          ]}
          changeFromNumber={() => null}
          callButtonDisabled={false}
          recipient={{
            phoneNumber: '1234',
            name: 'Test',
          }}
          searchContactList={[]}
          searchContact={() => null}
          clearToNumber={() => null}
          setRecipient={() => null}
          clearRecipient={() => null}
        />
      </div>
    );
  }
}


export default DialerPanelDemo;
