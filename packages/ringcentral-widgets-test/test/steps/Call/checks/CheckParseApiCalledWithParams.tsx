import { contextSourceOption } from '@ringcentral-integration/commons/modules/NumberValidate';

import type { StepFunction } from '../../../lib/step';

export const CheckParseApiCalledWithParams: StepFunction<{
  maxExtensionNumberLength: number;
  outboundCallPrefix: null | number;
  phoneNumber: string;
  areaCode: string;
}> = async ({ outboundCallPrefix, phoneNumber, areaCode }, { phone }) => {
  const requestParam =
    phone.numberValidate._parsingPhoneNumber.mock.calls[0][0];
  expect(requestParam.originalStrings[0]).toBe(phoneNumber);
  expect(requestParam.contextSource).toBe(contextSourceOption.account);
  expect(requestParam.context.defaultAreaCode).toBe(
    areaCode || phone.regionSettings.defaultAreaCode,
  );
  expect(requestParam.context.outboundCallPrefix).toBe(
    outboundCallPrefix || phone.appFeatures.OCPValue,
  );
};
