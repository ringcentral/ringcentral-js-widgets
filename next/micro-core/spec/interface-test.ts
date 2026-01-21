import {
  mockPairTransports,
  Transport,
} from '@ringcentral-integration/next-core';

// import createApp from '../src/bootstrap';
import { Interaction } from './interface';

Object.values({
  changeLocale: () => {
    test('check changeLocale', async () => {
      const [providerPort, consumerPort] = mockPairTransports() as [
        Transport,
        Transport<{
          emit: Interaction['listen'];
          listen: Interaction['emit'];
        }>,
      ];
      // @ts-ignore
      const app = createApp(providerPort);
      consumerPort.listen('changeLocale', async (locale) => {
        await consumerPort.emit('setLocale', locale);
      });
      await providerPort.emit('changeLocale', 'zh-CN');
      expect(app.modules.Locale.currentLocale).toBe('zh-CN');
    });
  },
  getLocale: () => {
    test('check getLocale', async () => {
      const [providerPort, consumerPort] = mockPairTransports() as [
        Transport,
        Transport<{
          emit: Interaction['listen'];
          listen: Interaction['emit'];
        }>,
      ];
      // @ts-ignore
      const app = createApp(providerPort);
      const locale = await consumerPort.emit('getLocale');
      expect(locale).toBe('en-US');
    });
  },
  changeThemeType: () => {
    //
  },
  getThemeType: () => {
    //
  },
  setLocale: () => {
    //
  },
  setThemeType: () => {
    //
  },
} satisfies Record<keyof Interaction['emit'] | keyof Interaction['listen'], () => void>).forEach(
  (fn) => {
    fn();
  },
);
