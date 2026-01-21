import { contextSourceOption } from '@ringcentral-integration/commons/modules/NumberValidate';
import {
  AppFeatures,
  RegionSettings,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { NumberValidate } from '@ringcentral-integration/micro-contacts/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckParseApiCalledWithParams: StepFunction<{
  maxExtensionNumberLength: number;
  outboundCallPrefix: null | number;
  phoneNumber: string;
  areaCode: string;
}> = async ({ outboundCallPrefix, phoneNumber, areaCode }, { app }) => {
  const regionSettings = app.container.got(RegionSettings)!;
  const appFeatures = app.container.got(AppFeatures)!;
  const numberValidate = app.container.got(NumberValidate)!;
  const requestParam = numberValidate._parsingPhoneNumber.mock.calls[0][0];
  expect(requestParam.originalStrings[0]).toBe(phoneNumber);
  expect(requestParam.contextSource).toBe(contextSourceOption.account);
  expect(requestParam.context.defaultAreaCode).toBe(
    areaCode || regionSettings.defaultAreaCode,
  );
  expect(requestParam.context.outboundCallPrefix).toBe(
    outboundCallPrefix || appFeatures.OCPValue,
  );
};
