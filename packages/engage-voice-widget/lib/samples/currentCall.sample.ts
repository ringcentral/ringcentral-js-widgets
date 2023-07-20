import type { EvCallData } from '../../interfaces/EvData.interface';

export const currentCallSample = {
  uii: '201910162213030139010000000016',
  agentId: '1554304',
  dialDest: '8185321061',
  queueDts: '2019-10-16 22:13:04',
  queueTime: '0',
  ani: '6503945910',
  dnis: '7202255924',
  callType: 'OUTBOUND',
  appUrl: '',
  isMonitoring: false,
  allowHold: true,
  allowTransfer: true,
  allowManualInternationalTransfer: false,
  allowDirectAgentTransfer: '0',
  allowHangup: true,
  allowRequeue: true,
  allowEndCallForEveryone: true,
  scriptId: '',
  scriptVersion: '',
  surveyId: '',
  surveyPopType: '',
  requeueType: 'ADVANCED',
  hangupOnDisposition: false,
  queue: {
    isCampaign: false,
    number: '168624',
    name: 'Q_michael',
    description: '',
  },
} as EvCallData;
