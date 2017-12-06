import React from 'react';
import styles from './styles.scss';

const button = text => <span key={text} className={styles.button}>{text}</span>;

const section = (buttons, title, body) => (
  <div key={buttons.join('')} className={styles.section}>
    {buttons.map(b => button(b))}
    <p className={styles.title}>{title}</p>
    {body.split('\n').map(line => <p className={styles.body}>{line}</p>)}
  </div>
);

const sections = [
  {
    buttons: ['*', '#', '2'],
    title: 'Caller Count',
    body: 'Keep track of how many people are on the call'
  },
  {
    buttons: ['*', '#', '3'],
    title: 'Leave Conference',
    body: 'Lets the host hang up and end the call'
  },
  {
    buttons: ['*', '#', '4'],
    title: 'Menu',
    body: 'Listen to the list of touchtone commands'
  },
  {
    buttons: ['*', '#', '5'],
    title: 'Set Listening Modes',
    body: `Press 1x: Mute callers - Callers can unmute with  *, #, 6
Press 2x: Mute callers - Listen only. No unmuting option
Press 3x: Unmute callers - Opens the line again`
  },
  {
    buttons: ['*', '#', '6'],
    title: 'Mute Host Line',
    body: `Press once to MUTE
Press again to UNMUTE`
  },
  {
    buttons: ['*', '#', '7'],
    title: 'Secure the Call',
    body: `Press once to BLOCK all callers
Press again to OPEN the call`
  },
  {
    buttons: ['*', '#', '8'],
    title: 'Hear sound when people Enter or Exit call',
    body: `Press 1x: Turns OFF sound
Press 2x: Enter tone is ON Exit tone is OFF
Press 3x: Enter tone is OFF Exit tone is ON
Press 4x: Turns ON sound`
  },
  {
    buttons: ['*', '9'],
    title: 'Record your conference',
    body: `Press once to START recording
Press again to STOP recording`
  }
];

const ConferenceCommands = () => (
  <div className={styles.conferenceCommands}>
    {sections.map(s => section(s.buttons, s.title, s.body))}
  </div>
);

export default ConferenceCommands;
