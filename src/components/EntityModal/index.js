import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Modal from '../Modal';
import styles from './styles.scss';

import i18n from './i18n';

export default class EntityModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.entities[0],
    };

    this.onCancel = () => {
      console.debug('onCancel!!');
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
        selected: e.target.value
      });
    };
  }
  // componentWillReceiveProps(nextProps) {
  //   // if (this.props.show !== nextProps.show) {
  //   this.setState({
  //     show: nextProps.show
  //   });
  //   // }
  // }
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
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  entities: PropTypes.array,
  currentLocale: PropTypes.string.isRequired,
};
EntityModal.defaultProps = {
  className: '',
  children: undefined,
  show: false,
  entities: ['account', 'lead', 'contact'],
};

