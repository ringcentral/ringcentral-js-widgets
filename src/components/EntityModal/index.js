import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Modal from '../Modal';
import styles from './styles.scss';

import i18n from './i18n';

export default class EntityModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.show,
      selected: props.entities[0],
    };

    this.onClose = () => {
      if (typeof this.props.onClose === 'function') {
        this.props.onClose();
      }
      this.setState({
        show: false
      });
    };
    this.onSubmit = () => {
      console.debug('onOK', this.state.selected);
      if (typeof this.props.onSubmit === 'function') {
        this.props.onSubmit(this.state.selected);
      }
      this.setState({
        show: false
      });
    };
    this.onRadioChange = (e) => {
      console.debug('onChange:', e.target.value);
      this.setState({
        selected: e.target.value
      });
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show
    });
  }
  render() {
    const { entities, currentLocale } = this.props;
    return (
      <Modal
        show={this.state.show}
        title={i18n.getString('chooseEntity', currentLocale)}
        onConfirm={this.onSubmit}
        onCancel={this.onClose}
        textConfirm={i18n.getString('create', currentLocale)}
        currentLocale={currentLocale}
        clickOutToClose>
        {entities.map((entityType, idx) =>
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
        )}
      </Modal>
    );
  }
}
EntityModal.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  entities: PropTypes.array,
  currentLocale: PropTypes.string.isRequired,
};
EntityModal.defaultProps = {
  className: '',
  children: undefined,
  show: false,
  onClose: undefined,
  entities: ['account', 'lead', 'contact'],
};

