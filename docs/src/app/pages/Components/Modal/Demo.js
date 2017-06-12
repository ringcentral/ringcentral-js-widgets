import React, {Component} from 'react';
// eslint-disable-next-line
import Modal from 'ringcentral-widget/components/Modal';
import Button from 'ringcentral-widget/components/Button';

const props = {};
props.currentLocale = 'en-US';

/**
 * A example of `Modal`
 */
class ModalDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }
  onClick = () => {
    this.setState({
      show: !this.state.show
    });
  }
  onClose = () => {
    this.setState({
      show: false
    });
  }
  render() {
    return (
      <div>
        <Button onClick={ this.onClick }>
          Open Modal
        </Button>
        <Modal
          show={this.state.show}
          onConfirm={this.onClose}
          onCancel={this.onClose}
          title={`Modal Title`}
          {...props}
        >
          <p>Here's the example of Modal</p>
        </Modal>
      </div>
    );
  }
};
export default ModalDemo;
