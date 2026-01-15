"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentLog = void 0;
var currentLog = exports.currentLog = {
  subjectPicklist: ['Call', 'Email'],
  call: {
    id: 'Y3MxNjk2MTIzOTcyNzM2NDU2OEAxMC4yOC4yMC4xMDk2698',
    direction: 'Outbound',
    from: {
      phoneNumber: '+17322764403'
    },
    to: {
      phoneNumber: '+16501234567'
    },
    telephonyStatus: 'CallConnected',
    sipData: {
      toTag: 'blf',
      fromTag: 'cs169612398224415837-1',
      remoteUri: 'sip:+16501234567@ringcentral.com',
      localUri: 'sip:+17322764403@ringcentral.com'
    },
    sessionId: '18380522004',
    telephonySessionId: 'Y3MxNjk2MTIzOTcyNzM2NDU2OEAxMC4yOC4yMC4xMDk2698',
    partyId: 'cs172622609151221459-2',
    startTime: 1571900841157,
    offset: 0,
    fromMatches: [],
    toMatches: [],
    activityMatches: []
  },
  currentSessionId: '18380522004',
  nameEntities: [],
  relatedToEntities: [],
  navigateToEntities: {
    name: [],
    relatedTo: []
  },
  currentLogCall: {
    isFailed: false,
    isAutoSave: false,
    isCreated: false
  },
  showLog: true,
  showSpinner: false,
  type: 'call',
  logName: 'Unknown',
  customLogFields: [{
    label: 'Subject',
    sort: 0,
    type: 'combobox',
    value: 'subject',
    required: false,
    maxLength: 255,
    picklistOptions: [],
    referenceObjs: []
  }, {
    label: 'Name ID',
    sort: 1,
    type: 'reference',
    value: 'whoid',
    required: false,
    maxLength: 18,
    picklistOptions: [],
    referenceObjs: ['Contact', 'Lead']
  }, {
    label: 'Related To ID',
    sort: 2,
    type: 'reference',
    value: 'whatid',
    required: false,
    maxLength: 18,
    picklistOptions: [],
    referenceObjs: ['Account', 'Asset', 'Campaign', 'Case', 'Contract', 'Goal', 'Metric', 'Opportunity', 'Order', 'Product2', 'Solution', 'WorkCoaching']
  }, {
    label: 'Notes',
    sort: 3,
    type: 'textarea',
    value: 'description',
    required: false,
    maxLength: 32000,
    picklistOptions: [],
    referenceObjs: []
  }, {
    label: 'Due date',
    sort: 4,
    type: 'date',
    value: 'activitydate',
    required: false,
    maxLength: 0,
    picklistOptions: [],
    referenceObjs: []
  }, {
    defaultValue: 'Normal',
    label: 'Priority',
    sort: 5,
    type: 'picklist',
    value: 'priority',
    required: true,
    maxLength: 40,
    picklistOptions: ['High', 'Normal', 'Low'],
    referenceObjs: []
  }, {
    label: 'Type',
    sort: 6,
    type: 'picklist',
    value: 'type',
    required: false,
    maxLength: 40,
    picklistOptions: [null, 'Call', 'Meeting', 'Other', 'Email'],
    referenceObjs: []
  }, {
    label: 'C_Field',
    sort: 7,
    type: 'string',
    value: 'ringcentralsfl__c_field__c',
    required: false,
    maxLength: 255,
    picklistOptions: [],
    referenceObjs: []
  }],
  task: {
    priority: 'Normal',
    external_whoid__c: '',
    whoid: '',
    whatid: '',
    description: '',
    activitydate: 1571961600000,
    callobject: '18380522004-098F6BCD4621D373CADE4E832627B4F6-208594004',
    calltype: 'Outbound',
    status: 'Completed',
    RC_Logging_Type__c: 'call',
    TaskSubtype: 'Call',
    subject: 'Outbound to +16501234567',
    calldisposition: 'Connected',
    recording_information__c: ''
  }
};
//# sourceMappingURL=callLogPanel.sample.js.map
