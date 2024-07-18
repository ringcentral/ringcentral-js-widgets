export enum OsType {
  Mac = 'MacOS',
  IOS = 'iOS',
  Android = 'Android',
  Linux = 'Linux',
  Windows = 'Windows',
  Unknown = 'Unknown',
}

export enum DeviceType {
  Mac = 'Mac',
  PC = 'PC',
  Mobile = 'Mobile',
  Unknown = 'Unknown',
}

type OsInfo = { Device: DeviceType; OS: OsType };

export function isIPad() {
  const platform =
    global.navigator.platform ||
    (global.navigator as any).userAgentData?.platform;

  const isIpad =
    /iPad/.test(platform) ||
    (platform === 'MacIntel' && navigator.maxTouchPoints >= 1); // iPadOS 13 fix
  return isIpad;
}

export function getOsInfo(): OsInfo {
  let OS = OsType.Unknown;
  let Device = DeviceType.Unknown;
  try {
    const userAgent = global.navigator.userAgent;

    const platform =
      global.navigator.platform ||
      (global.navigator as any).userAgentData?.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    // for new iOS device, it may return the value like MacIntel.
    // We need to check it if there is a same value for M1 chip device.
    const isIpad = isIPad();

    if (macosPlatforms.indexOf(platform) !== -1 && !isIpad) {
      OS = OsType.Mac;
      Device = DeviceType.Mac;
    } else if (iosPlatforms.indexOf(platform) !== -1 || isIpad) {
      OS = OsType.IOS;
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      OS = OsType.Windows;
      Device = DeviceType.PC;
    } else if (/Android/.test(userAgent)) {
      OS = OsType.Android;
    } else if (!OS && /Linux/.test(platform)) {
      OS = OsType.Linux;
    }

    if (
      /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent.toLowerCase(),
      ) ||
      OS === OsType.IOS
    ) {
      Device = DeviceType.Mobile;
    }
  } catch (err) {
    console.log('get os info error', err);
  }

  return {
    OS,
    Device,
  };
}

export function isAndroid() {
  return getOsInfo().OS === OsType.Android;
}

export function isIOS() {
  return getOsInfo().OS === OsType.IOS;
}
