const meetingProviderTypes = {
  meeting: 'RCMeetings',
  video: 'RCVideo'
};

function getVideoSettings(topic = '', extensionName = '') {
  return {
    name: topic || `${extensionName}'s Meeting`,
    allowJoinBeforeHost: true,
  };
}
// TODO: will remove this when google app script could support export seperately
// export together because google app script not fully support export
export { meetingProviderTypes, getVideoSettings };
