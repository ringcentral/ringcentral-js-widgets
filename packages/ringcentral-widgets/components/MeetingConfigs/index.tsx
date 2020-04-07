import 'react-widgets/dist/css/react-widgets.css';

import Moment from 'moment';
import React, { Component } from 'react';
import momentLocalizer from 'react-widgets-moment';

import i18n from './i18n';
import { MeetingDuration as Duration } from './MeetingDuration';
import { MeetingOptions } from './MeetingOptions';
import { RecurringOptions as RecurringMeeting } from './RecurringOptions';
import styles from './styles.scss';
import { Topic } from './MeetingTopic';
import { AudioOptions, Video } from './VideoAudioOptions';
import { MeetingDate } from './MeetingDate';

interface MeetingConfigsProps {
  update: (...args: any[]) => any;
  init: (...args: any[]) => any;
  meeting: object;
  currentLocale: string;
  recipientsSection?: React.ReactNode;
  showWhen?: boolean;
  showDuration?: boolean;
  showRecurringMeeting?: boolean;
  meetingOptionToggle?: boolean;
  passwordPlaceholderEnable?: boolean;
  audioOptionToggle?: boolean;
  useTimePicker?: boolean;
}

class MeetingConfig extends Component<MeetingConfigsProps, {}> {
  static defaultProps = {
    recipientsSection: undefined,
    showWhen: true,
    showDuration: true,
    showRecurringMeeting: true,
    meetingOptionToggle: false,
    passwordPlaceholderEnable: false,
    audioOptionToggle: false,
    useTimePicker: false,
  };

  constructor(...args) {
    super(...args);
    this.props.init();
    this.state = {};
    Moment.locale(this.props.currentLocale);

    momentLocalizer();
  }

  componentDidMount() {
    setTimeout(() => {
      this.displayFormat(this.props.meeting.schedule.startTime);
    });
  }

  displayFormat(startTime) {
    const isAMPM = this.props.useTimePicker ? 'hh' : 'HH';
    if (this.hours) {
      this.hours.value = Moment(startTime).format(isAMPM);
    }
    if (this.minutes) {
      this.minutes.value = Moment(startTime).format('mm');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.meeting.topic !== nextProps.meeting.topic) {
      setTimeout(() => {
        if (!this.topic) return;
        const selectionStart = this.topic.selectionStart;
        const selectionEnd = this.topic.selectionEnd;
        this.topic.value = nextProps.meeting.topic;
        this.topic.setSelectionRange(selectionStart, selectionEnd);
      });
    }
    if (
      this.props.meeting.schedule &&
      nextProps.meeting.schedule &&
      this.props.meeting.schedule.startTime !==
        nextProps.meeting.schedule.startTime
    ) {
      this.displayFormat(nextProps.meeting.schedule.startTime);
    }
  }

  render() {
    const {
      update,
      meeting,
      currentLocale,
      recipientsSection,
      showWhen,
      showDuration,
      showRecurringMeeting,
      meetingOptionToggle,
      passwordPlaceholderEnable,
      audioOptionToggle,
      useTimePicker,
    } = this.props;
    if (!Object.keys(meeting).length) {
      return null;
    }
    const onToggle = (type) => {
      const isToggle = !this[`${type}Blur`];
      if (isToggle) {
        if (this[type]._values.open) {
          this[type].inner.close();
        } else {
          this[type].focus();
          this[type].inner.toggle();
        }
      }
    };
    const isRecurring =
      meeting.meetingType === 'Recurring' ||
      meeting.meetingType === 'ScheduledRecurring';
    const telephonyOnly = i18n.getString('telephonyOnly', currentLocale);
    const voIPOnly = i18n.getString('voIPOnly', currentLocale);
    const both = i18n.getString('both', currentLocale);
    const AUDIO_OPTIONS = [
      {
        key: 'Phone',
        text: telephonyOnly,
      },
      {
        key: 'ComputerAudio',
        text: voIPOnly,
      },
      {
        key: 'Phone_ComputerAudio',
        text: both,
      },
    ];
    let minTime = {};
    if (
      meeting.schedule &&
      meeting.schedule.startTime &&
      new Date(meeting.schedule.startTime) < +new Date()
    ) {
      minTime = { min: new Date() };
    }
    return (
      <div className={styles.scroll}>
        <Topic
          that={this}
          meeting={meeting}
          update={update}
          currentLocale={currentLocale}
        />
        {recipientsSection}
        {showWhen ? (
          <MeetingDate
            isRecurring={isRecurring}
            currentLocale={currentLocale}
            meeting={meeting}
            update={update}
            that={this}
            onToggle={onToggle}
            minTime={minTime}
            useTimePicker={useTimePicker}
          />
        ) : null}
        {showDuration ? (
          <Duration
            isRecurring={isRecurring}
            currentLocale={currentLocale}
            meeting={meeting}
            update={update}
          />
        ) : null}
        {showRecurringMeeting ? (
          <RecurringMeeting
            isRecurring={isRecurring}
            currentLocale={currentLocale}
            meeting={meeting}
            update={update}
          />
        ) : null}
        <Video
          currentLocale={currentLocale}
          meeting={meeting}
          update={update}
        />
        <AudioOptions
          data={AUDIO_OPTIONS}
          currentLocale={currentLocale}
          meeting={meeting}
          update={update}
          audioOptionToggle={audioOptionToggle}
        />
        <MeetingOptions
          currentLocale={currentLocale}
          meeting={meeting}
          that={this}
          update={update}
          meetingOptionToggle={meetingOptionToggle}
          passwordPlaceholderEnable={passwordPlaceholderEnable}
        />
      </div>
    );
  }
}

export default MeetingConfig;
