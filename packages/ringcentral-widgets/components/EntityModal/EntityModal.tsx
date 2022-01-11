/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';

import Modal from '../Modal';
import i18n from './i18n';
import styles from './styles.scss';

type EntityModalProps = {
  show?: boolean;
  onCreate: (...args: any[]) => any;
  onCancel: (...args: any[]) => any;
  entities?: any[];
  currentLocale: string;
};
type EntityModalState = {
  selected: any;
};
class EntityModal extends Component<EntityModalProps, EntityModalState> {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.entities[0],
    };
    this.onCancel = () => {
      if (typeof this.props.onCancel === 'function') {
        this.props.onCancel();
      }
    };
    this.onCreate = () => {
      if (typeof this.props.onCreate === 'function') {
        this.props.onCreate(this.state.selected);
      }
    };
    this.onRadioChange = (e) => {
      this.setState({
        selected: e.target.value,
      });
    };
  }
  render() {
    const { entities, show, currentLocale } = this.props;
    return (
      <Modal
        show={show}
        title={i18n.getString('chooseEntity', currentLocale)}
        onConfirm={this.onCreate}
        onCancel={this.onCancel}
        textConfirm={i18n.getString('create', currentLocale)}
        currentLocale={currentLocale}
        clickOutToClose
      >
        {entities.map((entityType, idx) => (
          <div className={styles.radio} key={idx}>
            <label>
              <input
                type="radio"
                value={entityType}
                checked={entityType === this.state.selected}
                onChange={this.onRadioChange}
              />
              {i18n.getString(`${entityType}`, currentLocale)}
            </label>
          </div>
        ))}
      </Modal>
    );
  }
}
EntityModal.defaultProps = {
  show: false,
  entities: ['account', 'lead', 'contact'],
};
export default EntityModal;
