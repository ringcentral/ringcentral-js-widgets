import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import formatMessage from 'format-message';

import FormattedMessage from '../FormattedMessage';
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
      entered: this.props.entered || false,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { entered } = nextProps;
    if (this.state.entered !== entered) {
      this.setState({ entered });
      if (entered) {
        this.props.getOptionData((storageData) => {
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
     this.props.setOptionData({ whitelistOption: OPTION_FOR_ALL });
   } else if (this.state.selected === 3) {
     this.props.setOptionData({ whitelistOption: OPTION_FOR_USER });
   } else {
     this.props.setOptionData({ whitelistOption: OPTION_FOR_GOOGLE });
   }
   this.props.onCancel();
 };

 onSelectOption = (item) => {
   this.setState({
     selected: item.value,
   });
 };

 render() {
   if (!this.state.entered) return null;
   const data = [{
     text: formatMessage(i18n.getString('textGoogle', this.props.currentLocale), { appName: this.props.appName }),
     value: 1
   }, {
     text: i18n.getString('textAll', this.props.currentLocale),
     value: 2
   }, {
     text: i18n.getString('textUser', this.props.currentLocale),
     value: 3
   }];
   let description = null;
   const extensionOptions = i18n.getString('extensionOptions', this.props.currentLocale);
   const optionsLink = (
     <a href="#" onClick={this.props.openOptionspage}>
       {extensionOptions}
     </a>
   );
   if (this.state.selected === 2) {
     description = (<FormattedMessage
       message={i18n.getString('descriptionAll', this.props.currentLocale)}
       values={{ optionsLink }} />);
   } else if (this.state.selected === 3) {
     description = (<FormattedMessage
       message={i18n.getString('descriptionUser', this.props.currentLocale)}
       values={{ optionsLink }} />);
   }
   return (
     <div className={classnames(styles.root, this.props.className)}>
       <div className={styles.group}>
         <div className={styles.header} >
           <div className={styles.title} >{formatMessage(i18n.getString('title', this.props.currentLocale), { brandName: this.props.brandName })}
           </div>
           <div className={classnames(styles.bage, styles[this.props.brandCode])} ><div className={styles.presence} />
             <div className={styles.iconContainer}>
               <img className={styles.icon} src={this.props.logoIconUrl} alt={this.props.brandName} />
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
         <div className={styles.description}> {description} </div>
       </div>
       <Button
         className={styles.confirmBtn}
         onClick={this.onConfirm}
        >
         {i18n.getString('Confirm', this.props.currentLocale)}
       </Button>
       <Button
         className={styles.cancelBtn}
         onClick={this.props.onCancel}>
         {i18n.getString('Cancel', this.props.currentLocale)}
       </Button>
     </div>
   );
 }
}

QuickAccessPanel.propTypes = {
  entered: PropTypes.bool,
  className: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  brandName: PropTypes.string,
  brandCode: PropTypes.string,
  appName: PropTypes.string,
  logoIconUrl: PropTypes.any,
  setOptionData: PropTypes.func.isRequired,
  getOptionData: PropTypes.func.isRequired,
  openOptionspage: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
};

QuickAccessPanel.defaultProps = {
  entered: false,
  className: '',
  brandName: 'RingCentral',
  brandCode: '',
  appName: '',
  logoIconUrl: undefined
};
