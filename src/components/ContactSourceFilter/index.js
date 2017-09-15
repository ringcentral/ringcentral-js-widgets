import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import i18n from './i18n';
import styles from './styles.scss';
import ContactFilterIcon from '../../assets/images/ContactFilter.svg';

export function ContactSourceItem({ sourceName, sourceLabel, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(sourceName)}
      className={classnames(
        styles.contactSourceItem,
        isSelected ? styles.selected : ''
      )}
    >
      {sourceLabel}
    </div>
  );
}
ContactSourceItem.propTypes = {
  sourceName: PropTypes.string.isRequired,
  sourceLabel: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default class ContactSourceFilter extends Component {
  constructor(props) {
    super(props);
    this.showList = this.showList.bind(this);
    this.hideList = this.hideList.bind(this);
    this.hideListAlt = this.hideListAlt.bind(this);
    this.emitSelect = this.emitSelect.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.hideListAlt);
  }

  showList() {
    if (!this.listElem) { return; }
    this.listElem.style.display = 'block';
    window.addEventListener('click', this.hideListAlt);
  }

  hideList() {
    if (!this.listElem) { return; }
    this.listElem.style.display = 'none';
    window.removeEventListener('click', this.hideListAlt);
  }

  hideListAlt(ev) {
    if (
      !this.rootElem ||
      this.rootElem === ev.target ||
      this.rootElem.contains(ev.target)
    ) {
      return;
    }
    this.hideList();
  }

  emitSelect(sourceName) {
    const { onSourceSelect } = this.props;
    if (onSourceSelect) {
      onSourceSelect(sourceName);
    }
    this.hideList();
  }

  render() {
    const {
      className,
      currentLocale,
      contactSourceNames,
      selectedSourceName,
    } = this.props;

    return (
      <div
        className={classnames(styles.contactSourceFilter, className)}
        ref={(el) => { this.rootElem = el; }}
      >
        <div
          className={styles.filterIconContainer}
          title={i18n.getString(selectedSourceName, currentLocale)}
          onClick={this.showList}
        >
          <ContactFilterIcon
            className={styles.filterIconNode}
          />
        </div>
        <div
          className={styles.contactSourceList}
          ref={(el) => { this.listElem = el; }}
        >
          {
            contactSourceNames.map(sourceName => (
              <ContactSourceItem
                key={sourceName}
                sourceName={sourceName}
                sourceLabel={i18n.getString(sourceName, currentLocale)}
                isSelected={sourceName === selectedSourceName}
                onSelect={this.emitSelect}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

ContactSourceFilter.propTypes = {
  className: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  onSourceSelect: PropTypes.func,
  selectedSourceName: PropTypes.string,
  contactSourceNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ContactSourceFilter.defaultProps = {
  className: undefined,
  selectedSourceName: undefined,
  onSourceSelect: undefined,
};
