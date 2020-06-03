interface getCircleIconButtonTitleParamsType {
  isOnHold?: boolean;
  isInComingCall?: boolean;
  isOnMute?: boolean;
}

export function getCircleIconButtonTitle({
  isOnHold,
  isInComingCall,
  isOnMute,
}: getCircleIconButtonTitleParamsType) {
  return {
    holdTitle: isOnHold ? 'onHold' : 'hold',
    endTitle: isInComingCall ? 'reject' : 'hangup',
    muteTitle: isOnMute ? 'unmute' : 'mute',
  };
}
