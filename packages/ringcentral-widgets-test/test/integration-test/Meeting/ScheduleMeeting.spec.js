import moment from 'moment';
import { MeetingType } from 'ringcentral-integration/modules/Meeting';
import MeetingSection from 'ringcentral-widgets/components/MeetingSection';
import NavigationBar from 'ringcentral-widgets/components/NavigationBar';
import sleep from 'ringcentral-integration/lib/sleep';
import { getWrapper } from '../shared';

/* global jasmine */

let app = null;
beforeAll(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  app = await getWrapper();
  // Nav to Meeting page
  const navigationBar = app.find(NavigationBar).first();
  await navigationBar.props().goTo('/meeting');
  app.update();
});

describe('Schedule Meeting', () => {
  const EXPECT_HOUR = 5;
  const EXPECT_MINUTES = 15;
  test('<Topic />', async () => {
    const topic = app.find(MeetingSection).first();
    const maxInput = '#'.repeat(128);
    const exceedInput = `${maxInput}#`;
    topic.find('input').simulate('change', { target: { value: maxInput } });
    // To fit the Debounce timeout on MeetingPanel
    await sleep(10);
    expect(app.props().phone.meeting.meeting.topic).toBe(maxInput);
    // Exceed 128 chars length should failed and keep the origin
    topic.find('input').simulate('change', { target: { value: exceedInput } });
    await sleep(10);
    expect(app.props().phone.meeting.meeting.topic).not.toBe(exceedInput);
    topic.find('input').simulate('change', { target: { value: 'aloha' } });
    await sleep(10);
    expect(app.props().phone.meeting.meeting.topic).toBe('aloha');
  });
  test('<When />', async () => {
    let when = app.find(MeetingSection).at(1);
    // Tolerance one minute range
    const now = moment(Date.now());
    expect(moment(app.props().phone.meeting.meeting.schedule.startTime)
      .diff(now, 'minutes')).toBeLessThanOrEqual(60);
    // DATE
    const dateField = when.find('DateTimePicker').at(0);
    const expectedDate = now.add(1, 'days');
    dateField.props().onChange(expectedDate.toDate());
    app.update();
    // HR/MIN
    expectedDate.hours(EXPECT_HOUR).minutes(EXPECT_MINUTES);
    when = app.find(MeetingSection).at(1);
    const hourField = when.find('input').at(2);
    hourField.simulate('change', { target: { value: EXPECT_HOUR.toString() } });
    hourField.props().onBlur();
    // To fit the Debounce timeout on MeetingPanel
    await sleep(100);
    when = app.find(MeetingSection).at(1);
    const minuteField = when.find('input').at(3);
    minuteField.simulate('change', { target: { value: EXPECT_MINUTES.toString() } });
    minuteField.props().onBlur();
    await sleep(100);
    const actualDate = moment(app.props().phone.meeting.meeting.schedule.startTime);
    expect(actualDate.diff(expectedDate, 'minutes')).toBeLessThan(1);
  });
  test('<Duration />', async () => {
    const duration = app.find(MeetingSection).at(2);
    expect(app.props().phone.meeting.meeting.schedule.durationInMinutes).toBe(60);
    const hourField = duration.find('DropdownList').first();
    hourField.props().onChange({ value: EXPECT_HOUR });
    expect(app.props().phone.meeting.meeting.schedule.durationInMinutes).toBe(EXPECT_HOUR * 60);
    const minuteField = duration.find('DropdownList').at(1);
    minuteField.props().onChange({ value: EXPECT_MINUTES });
    expect(app.props().phone.meeting.meeting.schedule.durationInMinutes)
      .toBe(EXPECT_HOUR * 60 + EXPECT_MINUTES);
  });
  test('<MeetingType />', async () => {
    const recurring = app.find(MeetingSection).at(3);
    expect(app.props().phone.meeting.meeting.meetingType).toBe('Scheduled');
    const typeField = recurring.find('Switch').first();
    typeField.props().onChange(false);
    expect(app.props().phone.meeting.meeting.meetingType).toBe(MeetingType.SCHEDULED);
    typeField.props().onChange(true);
    expect(app.props().phone.meeting.meeting.meetingType).toBe(MeetingType.RECURRING);
  });
  test('<Video />', async () => {
    const video = app.find(MeetingSection).at(4);
    expect(app.props().phone.meeting.meeting.startHostVideo).toBe(false);
    expect(app.props().phone.meeting.meeting.startParticipantsVideo).toBe(false);
    const hostField = video.find('Switch').first();
    hostField.props().onChange(false);
    expect(app.props().phone.meeting.meeting.startHostVideo).toBe(false);
    hostField.props().onChange(true);
    expect(app.props().phone.meeting.meeting.startHostVideo).toBe(true);
    const participantField = video.find('Switch').at(1);
    participantField.props().onChange(false);
    expect(app.props().phone.meeting.meeting.startParticipantsVideo).toBe(false);
    participantField.props().onChange(true);
    expect(app.props().phone.meeting.meeting.startParticipantsVideo).toBe(true);
  });
  test('<Audio />', async () => {
    const audio = app.find(MeetingSection).at(5);
    expect(app.props().phone.meeting.meeting.audioOptions).toEqual(['Phone', 'ComputerAudio']);
    const audioField = audio.find('CheckBox');
    audioField.find('.item').first().simulate('click');
    expect(app.props().phone.meeting.meeting.audioOptions).toEqual(['Phone']);
    audioField.find('.item').at(1).simulate('click');
    expect(app.props().phone.meeting.meeting.audioOptions).toEqual(['ComputerAudio']);
    audioField.find('.item').at(2).simulate('click');
    expect(app.props().phone.meeting.meeting.audioOptions).toEqual(['Phone', 'ComputerAudio']);
  });
  test('<Options />', async () => {
    let options = app.find(MeetingSection).at(6);
    expect(app.props().phone.meeting.meeting._requireMeetingPassword).toBe(false);
    expect(app.props().phone.meeting.meeting.allowJoinBeforeHost).toBe(false);
    // Expand Section
    options.find('.arrow').simulate('click');
    // Get reference after update
    options = app.find(MeetingSection).at(6);
    const requirePwdField = options.find('Switch').first();
    requirePwdField.props().onChange(false);
    expect(app.props().phone.meeting.meeting._requireMeetingPassword).toBe(false);
    requirePwdField.props().onChange(true);
    app.update();
    expect(app.props().phone.meeting.meeting._requireMeetingPassword).toBe(true);
    options = app.find(MeetingSection).at(6);
    const passwordField = options.find('input.password');
    passwordField.props().onChange({ target: { value: 'papapa' } });
    expect(app.props().phone.meeting.meeting.password).toBe('papapa');
    // Exceed 10 chars length should failed and keep the origin
    passwordField.simulate('change', { target: { value: '12345678901' } });
    expect(app.props().phone.meeting.meeting.password).toBe('papapa');
    const joinBeforeField = options.find('Switch').at(1);
    joinBeforeField.props().onChange(false);
    expect(app.props().phone.meeting.meeting.allowJoinBeforeHost).toBe(false);
    joinBeforeField.props().onChange(true);
    expect(app.props().phone.meeting.meeting.allowJoinBeforeHost).toBe(true);
  });
  test('<MeetingScheduleButton />', async () => {
    const MeetingScheduleButton = app.find('MeetingScheduleButton').find('button');
    expect(MeetingScheduleButton.props().children).toBe('Schedule Meeting');
    expect(MeetingScheduleButton.props().disabled).toBe(false);
  });
});
