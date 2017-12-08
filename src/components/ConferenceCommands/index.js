import React from 'react';
import PropTypes from 'prop-types';
import BackHeader from '../BackHeader';
import styles from './styles.scss';
import i18n from './i18n';

const button = text => <span key={text} className={styles.button}>{text}</span>;

const section = (buttons, title, body) => (
  <div key={buttons.join('')} className={styles.section}>
    {buttons.map(b => button(b))}
    <p className={styles.title}>{title}</p>
    {body.split('\n').map((line, index) => <p key={index} className={styles.body}>{line}</p>)}
  </div>
);

const sections = currentLocale => ([
  {
    buttons: ['*', '#', '2'],
    title: i18n.getString('starSharp2Title', currentLocale),
    body: i18n.getString('starSharp2Body', currentLocale),
  },
  {
    buttons: ['*', '#', '3'],
    title: i18n.getString('starSharp3Title', currentLocale),
    body: i18n.getString('starSharp3Body', currentLocale),
  },
  {
    buttons: ['*', '#', '4'],
    title: i18n.getString('starSharp4Title', currentLocale),
    body: i18n.getString('starSharp4Body', currentLocale),
  },
  {
    buttons: ['*', '#', '5'],
    title: i18n.getString('starSharp5Title', currentLocale),
    body: i18n.getString('starSharp5Body', currentLocale),
  },
  {
    buttons: ['*', '#', '6'],
    title: i18n.getString('starSharp6Title', currentLocale),
    body: i18n.getString('starSharp6Body', currentLocale),
  },
  {
    buttons: ['*', '#', '7'],
    title: i18n.getString('starSharp7Title', currentLocale),
    body: i18n.getString('starSharp7Body', currentLocale),
  },
  {
    buttons: ['*', '#', '8'],
    title: i18n.getString('starSharp8Title', currentLocale),
    body: i18n.getString('starSharp8Body', currentLocale),
  },
  {
    buttons: ['*', '9'],
    title: i18n.getString('star9Title', currentLocale),
    body: i18n.getString('star9Body', currentLocale),
  }
]);

const ConferenceCommands = ({ currentLocale, onBack }) => (
  <div className={styles.container}>
    <BackHeader onBackClick={onBack}>
      Conference Commands
    </BackHeader>
    <div className={styles.conferenceCommands}>
      {sections(currentLocale).map(s => section(s.buttons, s.title, s.body))}
    </div>
  </div>
);

ConferenceCommands.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired
};

export default ConferenceCommands;
