export default {
  meetingTitle: "{extensionName}'s Meeting",
  scheduledSuccess: 'Meeting added',
  updatedSuccess: 'Meeting updated',
  meetingIsDeleted: 'Meeting has been deleted',
  renderInviteError:
    "Sorry, there was a problem on our end and we couldn't add the meeting invitation. Please try again later.",
  insufficientPermissions:
    '{application} do not have {permissionName} permission.',
  internalError: 'Sorry, something went wrong on our end. Try again.',
  emptyTopic: 'Please enter meeting topic.',
  noPassword: 'Please provide meeting password.',
  // TODO: in old version, those alert message be missing, need translation
  durationIncorrect: 'incorrect duration',
  invalidMeetingInfo: 'invalid meeting info',
} as const;
