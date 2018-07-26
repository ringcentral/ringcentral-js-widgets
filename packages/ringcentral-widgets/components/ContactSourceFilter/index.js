import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import i18n from './i18n';
import styles from './styles.scss';
import ContactFilterIcon from '../../assets/images/ContactFilter.svg';
import ContactFilterSolidIcon from '../../assets/images/ContactFilterSolid.svg';

export function ContactSourceItem({
  sourceName, sourceLabel, isSelected, onSelect
}) {
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
    const unfold = props.unfold !== undefined ? props.unfold : false;
    this.state = {
      unfold,
    };
  }
  componentDidMount() {
    this._mounted = true;
  }
  componentWillUnmount() {
    this._mounted = false;
    if (!this.state.unfold) {
      window.removeEventListener('click', this.hideList);
    }
  }

  getString(key, locale) {
    return i18n.getString(key, locale);
  }

  hideList = () => {
    if (this._mounted) {
      this.setState({
        unfold: false,
      });
      if (typeof this.props.onUnfoldChange === 'function') {
        this.props.onUnfoldChange(false);
      }
    }
    window.removeEventListener('click', this.hideList);
  }

  showList = () => {
    this.setState({
      unfold: true,
    });
    window.addEventListener('click', this.hideList);
    if (typeof this.props.onUnfoldChange === 'function') {
      this.props.onUnfoldChange(true);
    }
  }

  togglePanel = (evt) => {
    evt.stopPropagation();
    if (!this.state.unfold) {
      this.showList();
      return;
    }
    this.hideList();
  }

  emitSelect = (sourceName) => {
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

    const isAllSource = selectedSourceName === contactSourceNames[0];
    return (
      <div
        className={classnames(styles.contactSourceFilter, className)}
        onClick={this.togglePanel}
      >
        <div
          className={styles.filterIconContainer}
          title={this.getString(selectedSourceName, currentLocale)}
        >
          {
            isAllSource
              ? <ContactFilterIcon
                className={classnames(styles.filterIconNode, styles.iconNoneFill)} />
              : <ContactFilterSolidIcon className={styles.filterIconNode} />
          }
        </div>
        {
          !this.state.unfold ? null : (
            <div
              className={styles.contactSourceList}
              onClick={e => e.stopPropagation()}
            >
              {
                contactSourceNames.map(sourceName => (
                  <ContactSourceItem
                    key={sourceName}
                    sourceName={sourceName}
                    sourceLabel={this.getString(sourceName, currentLocale)}
                    isSelected={sourceName === selectedSourceName}
                    onSelect={this.emitSelect}
                  />
                ))
              }
            </div>
          )}
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
  unfold: PropTypes.bool,
  onUnfoldChange: PropTypes.func,
};

ContactSourceFilter.defaultProps = {
  className: undefined,
  selectedSourceName: undefined,
  onSourceSelect: undefined,
  unfold: undefined,
  onUnfoldChange: undefined,
};
