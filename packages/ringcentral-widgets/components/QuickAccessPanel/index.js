import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// eslint-disable-next-line
import logoIconUrl from '!url-loader!brand-logo-path/Icon.svg';
import CheckBox from '../CheckBox';
import Button from '../Button';

import styles from './styles.scss';
import i18n from './i18n';

const OPTION_FOR_GOOGLE = 'GOOGLE';
const OPTION_FOR_ALL = 'ALL';
const OPTION_FOR_USER = 'USER';

export default class QuickAccessPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
      quickEnter: this.props.quickEnter || false,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { quickEnter } = nextProps;
    if (this.state.quickEnter !== quickEnter) {
      this.setState({ quickEnter });
      if (quickEnter) {
        this.props.getChromeStorage((storageData) => {
          if (storageData.whitelistOption === OPTION_FOR_ALL) {
            this.setState({
              selected: 2,
            });
          } else if (storageData.whitelistOption === OPTION_FOR_USER) {
            this.setState({
              selected: 3,
            });
          } else {
            this.setState({
              selected: 1,
            });
          }
        });
      }
    }
  }

 onConfirm = () => {
   if (this.state.selected === 2) {
     this.props.setChromeStorage({ whitelistOption: OPTION_FOR_ALL });
   } else if (this.state.selected === 3) {
     this.props.setChromeStorage({ whitelistOption: OPTION_FOR_USER });
   } else {
     this.props.setChromeStorage({ whitelistOption: OPTION_FOR_GOOGLE });
   }
   this.props.onCancel();
 };

 onSelectOption = (item) => {
   this.setState({
     selected: item.value,
   });
 };
s

render() {
  if (!this.state.quickEnter) return null;
  const data = [{
    text: i18n.getString('textGoogle', this.props.currentLocale),
    value: 1
  }, {
    text: i18n.getString('textAll', this.props.currentLocale),
    value: 2
  }, {
    text: i18n.getString('textUser', this.props.currentLocale),
    value: 3
  }];
  let description = null;
  if (this.state.selected === 2) {
    description = (<div className={styles.description}>Go to <a href="#" onClick={this.props.openOptionspage}> Extension Options</a > to define your blacklist.</div>);
  } else if (this.state.selected === 3) {
    description = (<div className={styles.description}>Go to <a href="#" onClick={this.props.openOptionspage}> Extension Options</a > to define your specific websites.</div>);
  }
  return (
    <div className={classnames(styles.root, this.props.className)}>
      <div className={styles.group}>
        <div className={styles.header} >
          <div className={styles.title} > {i18n.getString('titleFirst', this.props.currentLocale) + this.props.brandName }
            <br />{i18n.getString('titleSecond')}
          </div>
          <div className={classnames(styles.bage, styles[this.props.brandCode])} ><div className={styles.presence} />
            <div className={styles.iconContainer}>
              <img className={styles.icon} src={logoIconUrl} alt={this.props.brandName} />
            </div>
          </div>
        </div>
        <CheckBox
          className={styles.checkbox}
          valueField="value"
          textField="text"
          data={data}
          selected={this.state.selected}
          onSelect={this.onSelectOption}
        />
        {/* <div>{props.data[this.state.selected - 1].description}</div> */}
        {description}
      </div>
      <Button
        className={styles.confirmBtn}
        onClick={this.onConfirm}
        >
        {'Confirm'}
      </Button>
      <Button
        className={styles.cancelBtn}
        onClick={this.props.onCancel}>
        {'Cancel'}
      </Button>
    </div>
  );
}
}

QuickAccessPanel.propTypes = {
  quickEnter: PropTypes.bool,
  className: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  brandName: PropTypes.string,
  brandCode: PropTypes.string,
  setChromeStorage: PropTypes.func.isRequired,
  getChromeStorage: PropTypes.func.isRequired,
  openOptionspage: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
};

QuickAccessPanel.defaultProps = {
  quickEnter: false,
  className: '',
  brandName: 'RingCentral'
};
