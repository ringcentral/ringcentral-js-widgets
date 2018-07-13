import React, { Component } from 'React';
import classnames from 'classnames';
import messageTypes from 'ringcentral-integration/enums/messageTypes';
import messageDirection from 'ringcentral-integration/enums/messageDirection';
import VoicemailIcon from '../../assets/images/VoicemailIcon.svg';
import FaxInboundIcon from '../../assets/images/FaxInbound.svg';
import FaxOutboundIcon from '../../assets/images/FaxOutbound.svg';
import ComposeTextIcon from '../../assets/images/ComposeText.svg';
import GroupConversationIcon from '../../assets/images/GroupConversation.svg';
import styles from './ListItem.scss';
import i18n from './i18n';

const ExtendIcon = ({ open }) => {
  return (
    <div
      className={classnames(styles.extendIcon, open && styles.extended)}
    />
  );
};

const ExtendSeal = ({ open, onClick }) => {  
  return (
    <div className={styles.extendWrapper} onClick={onClick}>
      <div className={styles.extendLocate}>
        <ExtendIcon open={open} />
      </div>
    </div>
  );
};

const renderIcon = ({ type, direction, currentLocale, group }) => {
  const { voiceMail, fax } = messageTypes;
  const { inbound } = messageDirection;
  if ((type === fax) && (direction === inbound)) {
    return {
      title: i18n.getString(fax, currentLocale),
      icon: <FaxInboundIcon width={21} className={styles.icon} />
    };
  } else if ((type === fax) && (direction !== inbound)) {
    return {
      title: i18n.getString(fax, currentLocale),
      icon: <FaxOutboundIcon width={21} className={styles.icon} />
    };
  } else if (type === voiceMail) {
    return {
      title: i18n.getString(messageTypes.voiceMail, currentLocale),
      icon: <VoicemailIcon width={23} className={styles.icon} />
    };
  } else if (group) {
    return {
      title: i18n.getString('groupConversation', currentLocale),
      icon: <GroupConversationIcon width={19} className={styles.icon} />
    };
  }
  return {
    title: i18n.getString('conversation', currentLocale),
    icon: <ComposeTextIcon width={18} className={styles.icon} />
  };
};

const Icon = (props) => {
  const { icon, title } = renderIcon(props);
  return (
    <div className={styles.iconWrapper} title={title}>
      {icon}
    </div>
  );
};

const getMaxHeight = (ele) => {
  if (ele == null) {
    return 'auto';
  }
  // Preserve original height
  const h1 = ele.getBoundingClientRect().height;
  // Get nature height
  ele.style.height = 'auto';
  const h2 = ele.getBoundingClientRect().height;
  // Switch back to original height
  ele.style.height = `${h1}px`;
  return h2;
};

class Collapse extends Component {
  render() {
    const { open, children } = this.props;
    // open ? getMaxHeight(this.container) : 0;
    return (
      <div
        className={styles.collapseWrapper}
        style={{ maxHeight: open ? getMaxHeight(this.container) : 0 }}>
        <div
          ref={(ref) => { this.container = ref; }}
          className={styles.collapseContainer}>
          {children}
        </div>
      </div>
    );
  }
};

export default class ListItem extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  toggle = () => {
    this.setState({ open: !this.state.open });
  }
  // canOpen
  render() {
    // const { Icon } = this.props;
    const { correspondents, type, currentLocale, direction, detail, timeText, unreadCounts } = this.props;
    const { contactDisplay } = this.props;
    const { onClick } = this.props;
    return (
      <div>
        <div
          onClick={onClick || this.toggle}
          className={classnames(
            styles.container,
            unreadCounts && styles.unread
          )}>
          <div className={styles.root}>
            <div className={styles.leftWrapper}>
              <Icon
                group={correspondents.length > 1}
                type={type}
                currentLocale={currentLocale}
                direction={direction}
              />
              <div className={styles.infoWrapper}>
                {contactDisplay}
                <div className={styles.details}>
                  {detail}
                </div>
              </div>
            </div>
            <div className={styles.creationTime}>
              {timeText}
            </div>
          </div>
          <Collapse open={this.state.open}>{this.props.children}</Collapse>
        </div>
        {/* This should be placed here, 
          cause we cannot use relative to prevent scrollbar been cover issue under Safari */}
        <ExtendSeal open={this.state.open} onClick={this.toggle}/>
      </div>
    );
  }
}
