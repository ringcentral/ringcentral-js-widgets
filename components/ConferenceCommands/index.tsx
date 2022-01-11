import React from 'react';

import PropTypes from 'prop-types';

import BackHeader from '../BackHeader';
import i18n from './i18n';
import styles from './styles.scss';

const Button = ({ text }) => (
  <span key={text} className={styles.button}>
    {text}
  </span>
);
Button.propTypes = {
  text: PropTypes.string.isRequired,
};

const Section = ({ buttons, title, body }) => (
  <div key={buttons.join('')} className={styles.section}>
    {buttons.map((b) => (
      <Button text={b} key={b} />
    ))}
    <p className={styles.title}>{title}</p>
    {body.split('\n').map((line) => (
      <p key={line} className={styles.body}>
        {line}
      </p>
    ))}
  </div>
);
Section.propTypes = {
  title: PropTypes.string.isRequired,
  buttons: PropTypes.array.isRequired,
  body: PropTypes.string.isRequired,
};

const sections = (currentLocale) => [
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
  },
];

const ConferenceCommands = ({ currentLocale, onBack }) => (
  <div className={styles.root}>
    <BackHeader onBackClick={onBack}>
      {i18n.getString('title', currentLocale)}
    </BackHeader>
    <div className={styles.conferenceCommands}>
      {sections(currentLocale).map((s) => (
        <Section
          key={s.title}
          buttons={s.buttons}
          title={s.title}
          body={s.body}
        />
      ))}
    </div>
  </div>
);

ConferenceCommands.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default ConferenceCommands;
