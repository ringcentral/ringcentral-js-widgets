/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';

import Modal from '../Modal';

import i18n from './i18n';
import styles from './styles.scss';

type EntityModalProps = {
  show?: boolean;
  onCreate: (...args: any[]) => any;
  onCancel: (...args: any[]) => any;
  entities: any[];
  currentLocale: string;
};
type EntityModalState = {
  selected: any;
};
class EntityModal extends Component<EntityModalProps, EntityModalState> {
  onCancel: any;
  onCreate: any;
  onRadioChange: any;
  constructor(props: any) {
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
    this.onRadioChange = (e: any) => {
      this.setState({
        selected: e.target.value,
      });
    };
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const { entities, show, currentLocale } = this.props;
    return (
      <Modal
        // @ts-expect-error TS(2322): Type '{ children: Element[]; show: boolean | undef... Remove this comment to see the full error message
        show={show}
        title={i18n.getString('chooseEntity', currentLocale)}
        onConfirm={this.onCreate}
        onCancel={this.onCancel}
        textConfirm={i18n.getString('create', currentLocale)}
        currentLocale={currentLocale}
        clickOutToClose
        dataSign="createEntityModal"
      >
        {entities.map((entityType, idx) => (
          <div className={styles.radio} key={idx}>
            <label data-sign={`entityOption-${entityType}`}>
              <input
                type="radio"
                value={entityType}
                checked={entityType === this.state.selected}
                onChange={this.onRadioChange}
              />
              {i18n.getString(entityType, currentLocale)}
            </label>
          </div>
        ))}
      </Modal>
    );
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
EntityModal.defaultProps = {
  show: false,
  entities: ['account', 'lead', 'contact'],
};
export default EntityModal;
