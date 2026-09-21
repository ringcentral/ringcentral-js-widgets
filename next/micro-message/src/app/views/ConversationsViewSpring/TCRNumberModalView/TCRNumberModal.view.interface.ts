export type TCRNumberModalPayload = {
  type: 'noNumberAvailable' | 'receiveOnlyNumber' | 'mixed';
  isAdminUser?: boolean;
  fullyRegisteredNumbers?: string[];
  inboundOnlyNumbers?: string[];
  notRegisteredNumbers?: string[];
};
