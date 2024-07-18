export const isMobile = (): boolean => {
  const userAgent = global.navigator.userAgent.toLowerCase();
  const platform = global.navigator.platform;
  // for new iOS device, it may return the value like MacIntel.
  // We need to check it if there is a same value for M1 chip device.
  const isIOS =
    /iPad|iPhone|iPod/.test(platform) ||
    (platform === 'MacIntel' && navigator.maxTouchPoints >= 1); // change '>' to '>=', convenient for dev on macbook
  return (
    /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || isIOS
  );
};

const OSTypes = {
  Windows: 'Windows',
  MacOS: 'MacOS',
};

export type OSType = keyof typeof OSTypes;

export function getOSType(): OSType {
  let OS: OSType = 'Windows';
  if (global.navigator.userAgent.indexOf('Windows') !== -1) {
    OS = 'Windows';
  } else if (global.navigator.userAgent.indexOf('Mac') !== -1) {
    OS = 'MacOS';
  }
  // WE DON'T SUPPORT THOSE FOR NOW
  // else if (global.navigator.userAgent.indexOf('X11') !== -1) {
  //   OS = 'UNIX';
  // } else if (global.navigator.userAgent.indexOf('Linux') !== -1) {
  //   OS = 'Linux';
  // }
  return OS;
}
