import 'react-widgets/dist/css/react-widgets.css';

import React, { Component } from 'react';

import Moment from 'moment';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import momentLocalizer from 'react-widgets-moment';

import { isRecurringMeeting } from '@ringcentral-integration/commons/helpers/meetingHelper';
import type { RcMMeetingModel } from '@ringcentral-integration/commons/modules/Meeting';

import i18n from './i18n';
import { MeetingDate } from './MeetingDate';
import { MeetingDuration as Duration } from './MeetingDuration';
import { MeetingIdSection } from './MeetingIdSection';
import { MeetingOptions } from './MeetingOptions';
import { Topic } from './MeetingTopic';
import { RecurringOptions as RecurringMeeting } from './RecurringOptions';
import styles from './styles.scss';
import { AudioOptions, Video } from './VideoAudioOptions';

interface MeetingConfigsProps {
  disabled: boolean;
  enablePersonalMeeting: boolean;
  personalMeetingId: string;
  switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => any;
  update: (...args: any[]) => any;
  init: (...args: any[]) => any;
  meeting: RcMMeetingModel;
  currentLocale: string;
  recipientsSection?: React.ReactNode;
  showTopic?: boolean;
  showWhen?: boolean;
  showDuration?: boolean;
  showRecurringMeeting?: boolean;
  meetingOptionToggle?: boolean;
  passwordPlaceholderEnable?: boolean;
  audioOptionToggle?: boolean;
  useTimePicker?: boolean;
}

interface MeetingConfigsState {
  isChangePmiConfirmed: boolean;
}

class MeetingConfig extends Component<
  MeetingConfigsProps,
  MeetingConfigsState
> {
  static defaultProps = {
    recipientsSection: undefined,
    showTopic: true,
    showWhen: true,
    showDuration: true,
    showRecurringMeeting: true,
    meetingOptionToggle: false,
    passwordPlaceholderEnable: false,
    audioOptionToggle: false,
    useTimePicker: false,
  };

  hours: any;
  minutes: any;
  topic: any;

  constructor(args: MeetingConfigsProps) {
    super(args);
    const { init, currentLocale } = this.props;
    init();
    this.state = {
      isChangePmiConfirmed: false,
    };
    Moment.locale(currentLocale);
    momentLocalizer();
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    const { meeting, showWhen } = this.props;
    setTimeout(() => {
      if (showWhen) {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this.displayFormat(meeting.schedule.startTime);
      }
    });
  }

  displayFormat(startTime: Date) {
    const { useTimePicker } = this.props;
    const isAMPM = useTimePicker ? 'hh' : 'HH';
    if (this.hours) {
      this.hours.value = Moment(startTime).format(isAMPM);
    }
    if (this.minutes) {
      this.minutes.value = Moment(startTime).format('mm');
    }
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: MeetingConfigsProps) {
    const { meeting } = this.props;
    if (meeting.topic !== nextProps.meeting.topic) {
      setTimeout(() => {
        if (!this.topic) return;
        const selectionStart = this.topic.selectionStart;
        const selectionEnd = this.topic.selectionEnd;
        this.topic.value = nextProps.meeting.topic;
        this.topic.setSelectionRange(selectionStart, selectionEnd);
      });
    }
    if (
      meeting.schedule &&
      nextProps.meeting.schedule &&
      meeting.schedule.startTime !== nextProps.meeting.schedule.startTime
    ) {
      // @ts-expect-error TS(2345): Argument of type 'string | number | undefined' is ... Remove this comment to see the full error message
      this.displayFormat(nextProps.meeting.schedule.startTime);
    }
  }

  handlePmiConfirmed = (isChangePmiConfirmed: boolean) => {
    this.setState({ isChangePmiConfirmed });
  };

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const { isChangePmiConfirmed } = this.state;
    const {
      update,
      meeting,
      currentLocale,
      recipientsSection,
      showTopic,
      showWhen,
      showDuration,
      showRecurringMeeting,
      meetingOptionToggle,
      passwordPlaceholderEnable,
      audioOptionToggle,
      useTimePicker,
      enablePersonalMeeting,
      personalMeetingId,
      switchUsePersonalMeetingId,
    } = this.props;

    const isOptionDisabled =
      meeting.usePersonalMeetingId && !isChangePmiConfirmed;

    if (!Object.keys(meeting).length) {
      return null;
    }

    const onToggle = (type: any) => {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const isToggle = !this[`${type}Blur`];
      if (isToggle) {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (this[type]._values.open) {
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          this[type].inner.close();
        } else {
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          this[type].focus();
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          this[type].inner.toggle();
        }
      }
    };
    const isRecurring = isRecurringMeeting(meeting.meetingType);
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
      +new Date(meeting.schedule.startTime) < +new Date()
    ) {
      minTime = { min: new Date() };
    }

    return (
      <div className={styles.scroll} data-sign="meetingConfigsPanel">
        {showTopic ? (
          <Topic
            that={this}
            meeting={meeting}
            update={update}
            currentLocale={currentLocale}
          />
        ) : null}
        {enablePersonalMeeting && (
          <MeetingIdSection
            personalMeetingId={personalMeetingId}
            currentLocale={currentLocale}
            meeting={meeting}
            switchUsePersonalMeetingId={switchUsePersonalMeetingId}
            handlePmiConfirmed={this.handlePmiConfirmed}
            isChangePmiConfirmed={isChangePmiConfirmed}
          />
        )}
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
            // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
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
          disabled={isOptionDisabled}
        />
        <AudioOptions
          data={AUDIO_OPTIONS}
          currentLocale={currentLocale}
          meeting={meeting}
          update={update}
          // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
          audioOptionToggle={audioOptionToggle}
          disabled={isOptionDisabled}
        />
        <MeetingOptions
          currentLocale={currentLocale}
          meeting={meeting}
          that={this}
          update={update}
          // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
          meetingOptionToggle={meetingOptionToggle}
          // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
          passwordPlaceholderEnable={passwordPlaceholderEnable}
          disabled={isOptionDisabled}
        />
      </div>
    );
  }
}

export default MeetingConfig;
