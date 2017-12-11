import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SettingsIcon from 'ringcentral-widgets/assets/images/Settings.svg';
import MeetingIcon from 'ringcentral-widgets/assets/images/Meeting.svg';
import ContactIcon from 'ringcentral-widgets/assets/images/Contact.svg';
import MeetingHoverIcon from 'ringcentral-widgets/assets/images/MeetingHover.svg';
import RcIcon from 'ringcentral-widgets/assets/images/RcIcon.svg';

import Markdown from '../../../components/Markdown';
import styles from './styles.scss';

const CONTACT_FILTERS = [
  'All Contacts',
  'Company',
  'Google',
  'Personal',
];

const MENUS_LIST = [
  {
    icon: ContactIcon,
    title: 'Contacts',
  },
  {
    icon: MeetingIcon,
    title: 'Schedule Meeting',
  },
  {
    icon: SettingsIcon,
    title: 'Setting',
  }
];

const ACTIVE_MENUS_LIST = [
  {
    icon: ContactIcon,
    title: 'Contacts',
  },
  {
    icon: MeetingHoverIcon,
    title: 'Schedule Meeting',
  },
  {
    icon: SettingsIcon,
    title: 'Setting',
  }
];

const SEARCH_LIST = [
  {
    name: 'Jane Smith',
    source: 'Contact',
    phone: '10001',
    phoneType: 'Extension Phone',
  },
  {
    name: 'Jane Smith',
    source: 'Contact',
    phone: '(650) 555-1234',
    phoneType: 'Direct Number',
  },
  {
    name: 'Jane',
    source: 'Contact',
    phone: '(650) 555-4321',
    phoneType: 'Home',
  }
];

const CONTACT_DIPLAY_LIST = [
  'Jonny Hua',
  'Jane Holly',
  'Jane Merry',
  'Jane Holly1',
  'Jane Merry1',
];

const contactDisplayRender = item => (
  <div className={styles.contactItem} key={item}>
    <div className={styles.icon}><RcIcon /></div>
    <div className={styles.name}>{item}</div>
  </div>
);

const searchRender = item => (
  <div className={styles.searchItem} key={item.phone}>
    <div className={styles.line}>
      <span className={styles.name}>{item.name}</span> | <span>{item.source}</span>
    </div>
    <div className={styles.line}>
      <span>{item.phone}</span> | <span>{item.phoneType}</span>
    </div>
  </div>
);

const menuRender = (item) => {
  const Icon = item.icon;
  return (
    <div className={styles.menuItem} key={item.title}>
      <div className={styles.icon}><Icon width={22} height={22} /></div>
      <div className={styles.title}>{item.title}</div>
    </div>
  );
};

function Dropdown({ items, itemRender, className }) {
  const renderFunc = itemRender || (
    item => (<div className={styles.option} key={item}>{item}</div>)
  );
  return (
    <div className={classnames(styles.dropdown, className)}>
      {
        items.map(renderFunc)
      }
    </div>
  );
}

Dropdown.propTypes = {
  items: PropTypes.array.isRequired,
  itemRender: PropTypes.func,
  className: PropTypes.string,
};

Dropdown.defaultProps = {
  itemRender: undefined,
  className: undefined,
};

function DropdownList({ label }) {
  return (
    <div>
      <Dropdown
        items={CONTACT_DIPLAY_LIST}
        className={classnames(styles.contactDisplay, styles[label])}
        itemRender={contactDisplayRender}
      />,
      <Dropdown
        items={SEARCH_LIST}
        className={classnames(styles.searchList, styles[label])}
        itemRender={searchRender}
      />,
      <Dropdown
        items={label === 'selected' ? ACTIVE_MENUS_LIST : MENUS_LIST}
        className={classnames(styles.menus, styles[label])}
        itemRender={menuRender}
      />,
      <Dropdown
        items={CONTACT_FILTERS}
        className={classnames(styles.filter, styles[label])}
      />
    </div>
  );
}

DropdownList.propTypes = {
  label: PropTypes.string,
};

DropdownList.defaultProps = {
  label: undefined,
};

function DropdownPage() {
  return (
    <div className={styles.root}>
      <Markdown
        text="# Dropdown"
      />
      <div className={styles.dropdownGroup}>
        <div className={styles.dropdownList}>
          <div className={styles.header}>Normal</div>
          <DropdownList />
        </div>
        <div className={styles.dropdownList}>
          <div className={styles.header}>Hover</div>
          <DropdownList label="hover" />
        </div>
        <div className={styles.dropdownList}>
          <div className={styles.header}>Selected</div>
          <DropdownList label="selected" />
        </div>
      </div>
    </div>
  );
}

export default DropdownPage;
