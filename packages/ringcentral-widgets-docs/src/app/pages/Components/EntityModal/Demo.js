import React, {Component} from 'react';
// eslint-disable-next-line
import EntityModal from 'ringcentral-widgets/components/EntityModal';
import Button from 'ringcentral-widgets/components/Button';

const props = {};
props.currentLocale = 'en-US';

/**
 * A example of `EntityModal`
 */
class EntityModalDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      selected: `unknown`,
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
  onCreate = (selected) => {
    this.setState({
      selected
    });
    this.onClose();
  }
  render() {
    return(
      <div>
        <Button onClick={this.onClick}>
          Open Entity Modal
        </Button>
        <EntityModal
          title={`Entity Modal Title`}
          onCancel={this.onClose}
          onCreate={this.onCreate}
          show={this.state.show}
          {...props}
        />
        <p>{`You choose [ ${this.state.selected} ] as your Entity Type.`}</p>
      </div>
    );
  }
}
export default EntityModalDemo;
