import { shallow } from 'enzyme';
import React from 'react';
import callDirections from 'ringcentral-integration/enums/callDirections';
import callResults from 'ringcentral-integration/enums/callResults';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import LogBasicInfo from 'ringcentral-widgets/components/LogBasicInfo';

const setup = (props) => {
  const {
    call
  } = props;
  const currentLog = {
    call
  };
  const wrapper = shallow(<LogBasicInfo
    currentLog={currentLog}
    {...props}
  />);
  return wrapper;
};

describe('Call Basic Info:', () => {
  it('Call Icon Display: Inbound', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.inbound,
        to: {
          phoneNumber: '+16509807435'
        },
        from: {
          phoneNumber: '+16509807433'
        },
        duration: 11,
        result: 'Call connected',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.inbound').length).toBe(1);
    expect(wrapper.find('.active').length).toBe(0);
  });
  it('Call Icon Display: Outbound', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '+16509807435'
        },
        from: {
          phoneNumber: '+16509807433'
        },
        duration: 11,
        result: 'Call connected',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.outbound').length).toBe(1);
    expect(wrapper.find('.active').length).toBe(0);
  });
  it('Call Icon Display: Active Inbound', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.inbound,
        to: {
          phoneNumber: '+16509807435'
        },
        from: {
          phoneNumber: '+16509807433'
        },
        duration: null,
        result: null,
        telephonyStatus: 'CallConnected',
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.inbound').length).toBe(1);
    expect(wrapper.find('.active').length).toBe(1);
  });
  it('Call Icon Display: Active Outbound', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '+16509807435'
        },
        from: {
          phoneNumber: '+16509807433'
        },
        duration: null,
        result: null,
        telephonyStatus: 'CallConnected',
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.outbound').length).toBe(1);
    expect(wrapper.find('.active').length).toBe(1);
  });
  it('Call Icon Display: Missed', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '+16509807435'
        },
        from: {
          phoneNumber: '+16509807433'
        },
        duration: 11,
        result: 'Missed',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.missed').length).toBe(1);
  });
  it('Call Icon Display: Ringing', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.inbound,
        to: {
          phoneNumber: '+16509807435'
        },
        from: {
          phoneNumber: '+16509807433'
        },
        duration: null,
        result: null,
        telephonyStatus: 'Ringing',
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.ringing').length).toBe(1);
  });
  it('Phone Number Display: Inbound from PhoneNumber', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.inbound,
        to: {
          phoneNumber: '+16509807435'
        },
        from: {
          phoneNumber: '+16509807433'
        },
        duration: null,
        result: null,
        telephonyStatus: 'Ringing',
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.number').text()).toBe('+16509807433');
  });
  it('Phone Number Display: Inbound from extensionNumber', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.inbound,
        to: {
          extensionNumber: '111'
        },
        from: {
          extensionNumber: '222'
        },
        duration: null,
        result: null,
        telephonyStatus: 'Ringing',
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.number').text()).toBe('222');
  });
  it('Phone Number Display: Outbound to PhoneNumber', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '+16509807435'
        },
        from: {
          phoneNumber: '+16509807433'
        },
        duration: null,
        result: null,
        telephonyStatus: 'CallConnected',
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.number').text()).toBe('+16509807435');
  });
  it('Phone Number Display: Outbound to extensionNumber', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: null,
        telephonyStatus: 'CallConnected',
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.number').text()).toBe('111');
  });
  it('When Call is Connected, Call Status Color: Black', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Call connected',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.green').length).toBe(0);
    expect(wrapper.find('.red').length).toBe(0);
    expect(wrapper.find('.orange').length).toBe(0);
  });
  it('When Call is Connected, Call Status Color: Green', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: null,
        telephonyStatus: 'CallConnected',
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.green').length).toBe(1);
  });
  it('When Call is Ringing, Call Status Color: Green', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.inbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: null,
        telephonyStatus: 'Ringing',
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.green').length).toBe(1);
  });
  it('When Call is Accepted, Call Status Color: Green', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Call accepted',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.green').length).toBe(1);
  });
  it('When Call is Accepted, Call Status Color: Green', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Accepted',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.green').length).toBe(1);
  });
  it('When Call is Missed, Call Status Color: Red', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Missed',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.red').length).toBe(1);
  });
  it('When Call is Voicemail, Call Status Color: Red', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Voicemail',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.red').length).toBe(1);
  });
  it('When Call is Rejected, Call Status Color: Red', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Rejected',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.red').length).toBe(1);
  });
  it('When Call is Blocked, Call Status Color: Red', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Blocked',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.red').length).toBe(1);
  });
  it('When Call is noAnswer, Call Status Color: Red', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'No Answer',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.red').length).toBe(1);
  });
  it('When Call is Busy, Call Status Color: Red', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Busy',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.red').length).toBe(1);
  });
  it('When Call is hangUp, Call Status Color: Red', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Hang up',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.red').length).toBe(1);
  });
  it('When Call is hangUp, Call Status Color: Red', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Hang up',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.red').length).toBe(1);
  });
  it('When Call is declined, Call Status Color: Red', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Declined',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.red').length).toBe(1);
  });
  it('When Call is onHold, Call Status Color: Orange', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: null,
        telephonyStatus: telephonyStatuses.onHold,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.orange').length).toBe(1);
  });
  it('When Call is parkedCall, Call Status Color: Orange', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: null,
        telephonyStatus: telephonyStatuses.parkedCall,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.orange').length).toBe(1);
  });
  it('When Call Status is NoCall, Call Status Text: Disconnected', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: null,
        telephonyStatus: telephonyStatuses.noCall,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Disconnected');
  });
  it('When Call Status is CallConnected, Call Status Text: Connected', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: null,
        telephonyStatus: 'CallConnected',
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Connected');
  });
  it('When Call Status is OnHold, Call Status Text: On Hold', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: null,
        telephonyStatus: telephonyStatuses.onHold,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('On Hold');
  });
  it('When Call Status is ParkedCall, Call Status Text: Parked', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: null,
        telephonyStatus: telephonyStatuses.parkedCall,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Parked');
  });
  it('When Call Status is Call Accepted, Call Status Text: Answered', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.inbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Call accepted',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Answered');
  });
  it('When Call Status is Rejected, Call Status Text: Declined', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Rejected',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Declined');
  });
  it('When Call Status is Call connected, Call Status Text: Disconected', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Call connected',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Disconnected');
  });
  it('When Call Status is Hang up, Call Status Text: Hung up', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Hang up',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Hung up');
  });
  it('When Call Status is Hang Up, Call Status Text: Hung up', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Hang up',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Hung up');
  });
  it('When Call Status is Ringing, Call Status Text: Ringing', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.inbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: null,
        telephonyStatus: 'Ringing',
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Ringing');
  });
  it('When Call Status is Unknown, Call Status Text: Unknown', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Unknown',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Unknown');
  });
  it('When Call Status is Missed, Call Status Text: Missed', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Missed',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Missed');
  });
  it('When Call Status is Voicemail, Call Status Text: Voicemail', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Voicemail',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Voicemail');
  });
  it('When Call Status is Reply, Call Status Text: Reply', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Reply',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Reply');
  });
  it('When Call Status is Received, Call Status Text: Received', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Received',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Received');
  });
  it('When Call Status is Fax Receipt Error, Call Status Text: Fax Receipt Error', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Fax Receipt Error',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Fax Receipt Error');
  });
  it('When Call Status is Fax on Demand, Call Status Text: Fax on Demand', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Fax on Demand',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Fax on Demand');
  });
  it('When Call Status is Partial Receive, Call Status Text: Partial Receive', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Partial Receive',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Partial Receive');
  });
  it('When Call Status is Blocked, Call Status Text: Blocked', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Blocked',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Blocked');
  });
  it('When Call Status is No answer, Call Status Text: No Answer', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'No Answer',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('No Answer');
  });
  it('When Call Status is International Disabled, Call Status Text: International Disabled', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'International Disabled',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('International Disabled');
  });
  it('When Call Status is Busy, Call Status Text: Busy', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Busy',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Busy');
  });
  it('When Call Status is Fax Send Error, Call Status Text: Fax Send Error', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Fax Send Error',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Fax Send Error');
  });
  it('When Call Status is Sent, Call Status Text: Sent', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Sent',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Sent');
  });
  it('When Call Status is Call Failed, Call Status Text: Call Failed', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Call Failed',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Call Failed');
  });
  it('When Call Status is Internal Error, Call Status Text: Internal Error', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Internal Error',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Internal Error');
  });
  it('When Call Status is IP Phone Offline, Call Status Text: IP Phone Offline', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'IP Phone Offline',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('IP Phone Offline');
  });
  it('When Call Status is Restricted Number, Call Status Text: Restricted Number', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Restricted Number',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Restricted Number');
  });
  it('When Call Status is Wrong Number, Call Status Text: Wrong Number', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Wrong Number',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Wrong Number');
  });
  it('When Call Status is Stopped, Call Status Text: Stopped', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Stopped',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Stopped');
  });
  it('When Call Status is Suspended Account, Call Status Text: Suspended Account', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Suspended Account',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Suspended Account');
  });
  it('When Call Status is Abandoned, Call Status Text: Abandoned', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Abandoned',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Abandoned');
  });
  it('When Call Status is Declined, Call Status Text: Declined', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Declined',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Declined');
  });
  it('When Call Status is Fax Receipt, Call Status Text: Fax Receipt', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Fax Receipt',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Fax Receipt');
  });
  it('When Call Status is Fax Send Error, Call Status Text: Fax Send Error', () => {
    const props = {
      formatPhone: value => value,
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Fax Send Error',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.status').text()).toBe('Fax Send Error');
  });
  it('Phone number should be formatted as local number when format phone return local number format', () => {
    const props = {
      formatPhone: value => '(123)4567-890',
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Fax Send Error',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.number').text()).toBe('(123)4567-890');
  });
  it('Phone number should be formatted as E164 when format phone return E164 number', () => {
    const props = {
      formatPhone: value => '+44123456789',
      call: {
        direction: callDirections.outbound,
        to: {
          phoneNumber: '111'
        },
        from: {
          phoneNumber: '222'
        },
        duration: null,
        result: 'Fax Send Error',
        telephonyStatus: null,
      }
    };
    const wrapper = setup(props);
    expect(wrapper.find('.number').text()).toBe('+44123456789');
  });
});

