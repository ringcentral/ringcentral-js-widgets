type devicesProps = {
  deviceId: string;
  kind: string;
  label: string;
  groupId: string;
}[];

const defaultDevices = [
  {
    deviceId: 'default',
    kind: 'audioinput',
    label: 'Default - Internal Microphone (Built-in)',
    groupId: '2303aeba3eb3b5b69d8712798dc9f41b1f1a526f23d032cf53353248d9f6ba83',
  },
  {
    deviceId:
      'b2473af34652a04d9f8d463a4f11640695162b9c08db67d73e2a37f1a2e062a8',
    kind: 'audioinput',
    label: 'Internal Microphone (Built-in)',
    groupId: '2303aeba3eb3b5b69d8712798dc9f41b1f1a526f23d032cf53353248d9f6ba83',
  },
];

export function mockDevice(devices: devicesProps = defaultDevices) {
  Object.defineProperties(window.navigator.mediaDevices, {
    getUserMedia: {
      value() {
        return true;
      },
      configurable: true,
    },
    enumerateDevices: {
      value() {
        return devices;
      },
      configurable: true,
    },
  });
}

export default function SimulateWindowObject(
  isMockDevices = true,
  mockDevices?: {
    deviceId: string;
    kind: 'audioinput' | 'videoinput' | 'audiooutput';
    label: string;
    groupId: string;
  }[],
) {
  Object.defineProperties(window.navigator, {
    userAgent: {
      value:
        'Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.10.0',
    },
  });
  Object.defineProperties(window, {
    MediaStream: { value: true },
    RTCPeerConnection: { value: true },
  });

  mockDevice(isMockDevices ? mockDevices ?? defaultDevices : []);

  if (!HTMLMediaElement.prototype || !HTMLMediaElement.prototype.setSinkId) {
    Object.defineProperties(HTMLMediaElement.prototype, {
      setSinkId: {
        value() {
          return true;
        },
      },
    });
  }
  return true;
}
