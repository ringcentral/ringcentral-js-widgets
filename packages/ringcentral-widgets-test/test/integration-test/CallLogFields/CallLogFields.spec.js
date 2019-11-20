import React from 'react';
import { RcThemeProvider } from '@ringcentral-integration/rcui';
import { mount } from 'enzyme';
import CallLogFields from 'ringcentral-widgets/components/CallLogFields';

const WrappedCallLogFields = (props) => {
  return (
    <RcThemeProvider>
      <CallLogFields {...props} />
    </RcThemeProvider>
  );
};

const setup = (props) => {
  const { currentLog: _currentLog } = props;
  const currentLog = {
    type: 'call',
    currentLogCall: {
      isAutoSave: false,
    },
    task: {},
    ..._currentLog,
  };
  const currentLocale = 'en-US';
  const wrapper = mount(
    <WrappedCallLogFields
      referenceFieldOptions={{}}
      {...props}
      currentLog={currentLog}
      currentLocale={currentLocale}
    />,
  );
  // console.log('HTML:', wrapper.html());
  return wrapper;
};

describe.skip('<CallLogFields />', () => {
  it('Render field: subject', () => {
    const customLogFields = [
      {
        label: 'subject',
        sort: 0,
        type: 'combobox',
        value: 'subject',
        required: true,
      },
    ];
    const props = {
      currentLog: {
        customLogFields,
        subjectPicklist: [],
      },
    };
    const wrapper = setup(props);
    expect(wrapper.find('div[data-sign="subject"]').length).toBe(1);
    expect(wrapper.find('.MuiFormLabel-asterisk').length).toBe(1);
  });

  it('Render field: Common type fields', () => {
    const customLogFields = [
      {
        label: 'String Field',
        sort: 0,
        type: 'string',
        value: 'stringField',
        required: false,
      },
      {
        label: 'Integer Field',
        sort: 0,
        type: 'integer',
        value: 'integerField',
        required: false,
      },
      {
        label: 'Double Field',
        sort: 0,
        type: 'double',
        value: 'doubleField',
        required: false,
      },
    ];
    const props = {
      currentLog: {
        customLogFields,
      },
    };
    const wrapper = setup(props);
    const inputs = wrapper.find('.MuiInputBase-input');
    expect(wrapper.find('[data-sign="callLogField"]').length).toBe(3);
    expect(inputs.at(0).prop('type')).toEqual('text');
    expect(inputs.at(1).prop('type')).toEqual('number');
    expect(inputs.at(2).prop('type')).toEqual('number');
  });

  it('Render field: Textarea type field', () => {
    const customLogFields = [
      {
        label: 'Textarea Field',
        sort: 0,
        type: 'textarea',
        value: 'textareaField',
        required: false,
      },
    ];
    const props = {
      currentLog: {
        customLogFields,
      },
    };
    const wrapper = setup(props);
    expect(wrapper.find('textarea').length).toBeGreaterThan(0);
  });

  it('Render field: Date type field', () => {
    const customLogFields = [
      {
        label: 'Date Field',
        sort: 0,
        type: 'date',
        value: 'dateField',
        required: false,
      },
    ];
    const props = {
      currentLog: {
        customLogFields,
      },
    };
    const wrapper = setup(props);
    const elements = wrapper.find('PickerBase');
    expect(elements.length).toBe(1);
    expect(elements.at(0).prop('format')).toEqual('MM/DD/YYYY');
  });

  it('Render field: Fields order', () => {
    const customLogFields = [
      {
        label: 'String Field',
        sort: 3,
        type: 'string',
        value: 'stringField',
        required: false,
      },
      {
        label: 'Integer Field',
        sort: 1,
        type: 'integer',
        value: 'integerField',
        required: false,
      },
      {
        label: 'Double Field',
        sort: 2,
        type: 'double',
        value: 'doubleField',
        required: false,
      },
    ];
    const props = {
      currentLog: {
        customLogFields,
      },
    };
    const wrapper = setup(props);
    const inputs = wrapper.find('.MuiInputBase-input');
    expect(inputs.at(0).prop('placeholder')).toEqual('Integer Field');
    expect(inputs.at(1).prop('placeholder')).toEqual('Double Field');
    expect(inputs.at(2).prop('placeholder')).toEqual('String Field');
  });
});
