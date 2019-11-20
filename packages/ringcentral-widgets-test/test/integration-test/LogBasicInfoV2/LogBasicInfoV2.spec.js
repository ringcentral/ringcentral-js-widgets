import React from 'react';
import { mount } from 'enzyme';
import LogBasicInfoV2 from 'ringcentral-widgets/components/LogBasicInfoV2';
import callDirections from 'ringcentral-integration/enums/callDirections';
import getIntlDateTimeFormatter, {
  DEFAULT_TIME_OPTIONS,
} from 'ringcentral-integration/lib/getIntlDateTimeFormatter';
import callResults from 'ringcentral-integration/enums/callResults';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';

const setup = (props) => {
  const { call, logName } = props;
  const currentLog = {
    call,
    logName,
  };
  const dateTimeFormatter = getIntlDateTimeFormatter({
    timeOptions: {
      ...DEFAULT_TIME_OPTIONS,
      hour12: true,
    },
  });
  const wrapper = mount(
    <LogBasicInfoV2
      currentLog={currentLog}
      dateTimeFormatter={dateTimeFormatter}
      {...props}
    />,
  );
  return wrapper;
};

function CheckHandler(wrapper) {
  return {
    exist(className) {
      expect(wrapper.find(className).length).toBeGreaterThan(0);
    },
    notExist(className) {
      expect(wrapper.find(className).length).toBe(0);
    },
  };
}

describe('<LogBasicLogInfoV2 />', () => {
  it('Ringing an inbound call', () => {
    const props = {
      formatPhone: (value) => value,
      call: {
        direction: callDirections.inbound,
        to: {
          phoneNumber: '+16509807435',
        },
        from: {
          phoneNumber: '+16509807433',
        },
        duration: 11,
        result: null,
        telephonyStatus: telephonyStatuses.ringing,
        startTime: 1567580584730,
      },
    };
    const wrapper = setup(props);

    const handler = CheckHandler(wrapper);

    handler.exist('.inbound');
    expect(wrapper.find('span[data-sign="callStatus"]').text()).toEqual(
      'Ringing',
    );
    handler.exist('.active');
    handler.exist('.ringing');
  });

  it('Answer an inbound call', () => {
    const props = {
      formatPhone: (value) => value,
      call: {
        direction: callDirections.inbound,
        to: {
          phoneNumber: '+16509807435',
        },
        from: {
          phoneNumber: '+16509807433',
        },
        duration: 11,
        result: null,
        telephonyStatus: telephonyStatuses.callConnected,
        startTime: 1567580584730,
      },
    };
    const wrapper = setup(props);
    const handler = CheckHandler(wrapper);
    handler.exist('.inbound');
    expect(wrapper.find('span[data-sign="callStatus"]').text()).toEqual(
      'Connected',
    );
    handler.exist('.active');
  });

  it('Hangup an inbound call', () => {
    const props = {
      formatPhone: (value) => value,
      call: {
        direction: callDirections.inbound,
        to: {
          phoneNumber: '+16509807435',
        },
        from: {
          phoneNumber: '+16509807433',
        },
        duration: 11,
        result: callResults.disconnected,
        telephonyStatus: null,
        startTime: 1567580584730,
      },
      logName: 'Multiple',
    };
    const wrapper = setup(props);
    const handler = CheckHandler(wrapper);
    handler.exist('.inbound');
    expect(wrapper.find('span[data-sign="callStatus"]').text()).toEqual(
      'Disconnected',
    );
    handler.notExist('.active');
    expect(wrapper.find('.logName').text()).toEqual('Multiple');
  });

  it('Missed an inbound call', () => {
    const props = {
      formatPhone: (value) => value,
      call: {
        direction: callDirections.inbound,
        to: {
          phoneNumber: '+16509807435',
        },
        from: {
          phoneNumber: '+16509807433',
        },
        duration: 11,
        result: callResults.missed,
        telephonyStatus: null,
        startTime: 1567580584730,
      },
    };
    const wrapper = setup(props);
    const handler = CheckHandler(wrapper);
    handler.exist('.missed');
    expect(wrapper.find('span[data-sign="phoneNumber"]').text()).toEqual(
      '+16509807433',
    );
    expect(wrapper.find('span[data-sign="callStatus"]').text()).toEqual(
      'Missed',
    );
    expect(wrapper.find('li.time p:first-child').text()).toEqual('00:11');
    expect(wrapper.find('li.time p:last-child').text()).toEqual('9/4/2019');
    handler.notExist('.active');
  });

  it('Make outbound call', () => {
    const props = {
      formatPhone: (value) => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '+16509807435',
        },
        from: {
          phoneNumber: '+16509807433',
        },
        duration: 11,
        result: null,
        telephonyStatus: telephonyStatuses.callConnected,
        startTime: 1567580584730,
      },
    };
    const wrapper = setup(props);
    const handler = CheckHandler(wrapper);
    handler.exist('.outbound');

    expect(wrapper.find('span[data-sign="phoneNumber"]').text()).toEqual(
      '+16509807435',
    );
    expect(wrapper.find('span[data-sign="callStatus"]').text()).toEqual(
      'Connected',
    );
    handler.exist('.active');
  });

  it('Hangup outbound call', () => {
    const props = {
      formatPhone: (value) => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '+16509807435',
        },
        from: {
          phoneNumber: '+16509807433',
        },
        duration: 11,
        result: callResults.disconnected,
        telephonyStatus: null,
        startTime: 1567580584730,
      },
    };
    const wrapper = setup(props);
    const handler = CheckHandler(wrapper);
    handler.exist('.outbound');

    expect(wrapper.find('span[data-sign="phoneNumber"]').text()).toEqual(
      '+16509807435',
    );
    expect(wrapper.find('span[data-sign="callStatus"]').text()).toEqual(
      'Disconnected',
    );
    handler.notExist('.active');
  });
});
