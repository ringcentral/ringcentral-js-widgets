import {
  fireEvent,
  screen,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';

export const WaitForRenderReady = {
  parameters: {},
  description: 'wait for render ready',
  action: async () => {
    await waitForRenderReady();
  },
};

export const DebugPreview = {
  parameters: {},
  description: 'use to debug preview',
  action: async () => {
    debugPreview();
  },
};

export const FireEventKeyDown = {
  parameters: {
    elementId: {
      type: 'string',
      description:
        "retrieve the element's testId data-sign of the corresponding operation in the HTML",
    },
    isSelected: {
      type: 'boolean',
      description:
        'check if the element is selected or not base on the description of the current step',
    },
  },
  description:
    'Simulate a keyboard keydown event based on the content of the current step, and return elementId, the required input for key and code.',
  action: async ({
    elementId,
    key,
    code,
  }: {
    elementId: string;
    key: string;
    code: string;
  }) => {
    const element = await screen.findByTestId(elementId);
    fireEvent.keyDown(element, {
      key,
      code,
    });
  },
};

export const CheckMenuItemIsSelected = {
  parameters: {
    elementId: {
      type: 'string',
      description:
        "retrieve the element's testId data-sign of the corresponding operation in the HTML",
    },
    isSelected: {
      type: 'boolean',
      description:
        'check if the element is selected or not base on the description of the current step',
    },
  },
  description:
    'check if the element is selected or not, return the parameters elementId, isSelected',
  action: async ({
    elementId,
    isSelected,
  }: {
    elementId: string;
    isSelected: boolean;
  }) => {
    const element = await screen.findByTestId(elementId);
    if (isSelected) {
      expect(element).toHaveClass('Mui-selected');
    } else {
      expect(element).not.toHaveClass('Mui-selected');
    }
  },
};

export const MakeOutboundCall = {
  parameters: {
    phoneNumber: {
      type: 'string',
      description: 'The phone number to call',
    },
  },
  description: 'Make an outbound call',
  action: ({ phoneNumber }: { phoneNumber: string }) => {
    console.log('MakeOutboundCall', phoneNumber);
  },
};
