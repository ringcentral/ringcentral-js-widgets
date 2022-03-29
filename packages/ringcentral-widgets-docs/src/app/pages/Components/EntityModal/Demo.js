import React, { Component } from 'react';
// eslint-disable-next-line
import EntityModal from '@ringcentral-integration/widgets/components/EntityModal/EntityModal';
import { Button } from '@ringcentral-integration/widgets/components/Button';

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
    };
  }
  onClick = () => {
    this.setState((state) => {
      return {
        show: !state.show,
      };
    });
  };
  onClose = () => {
    this.setState({
      show: false,
    });
  };
  onCreate = (selected) => {
    this.setState({
      selected,
    });
    this.onClose();
  };
  render() {
    const { show, selected } = this.state;
    return (
      <div>
        <Button onClick={this.onClick}>Open Entity Modal</Button>
        <EntityModal
          title="Entity Modal Title"
          onCancel={this.onClose}
          onCreate={this.onCreate}
          show={show}
          {...props}
        />
        <p>{`You choose [ ${selected} ] as your Entity Type.`}</p>
      </div>
    );
  }
}
export default EntityModalDemo;
