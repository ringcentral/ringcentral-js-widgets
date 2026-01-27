"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* eslint-disable */
var _default = exports["default"] = {
  to: '수신자',
  from: '발신자',
  ext: '내선',
  myCallerId: '내 발신자 ID',
  callerId: '발신자 ID',
  unknownNumber: '알 수 없음',
  Inbound: '수신 통화',
  Outbound: '발신 통화',
  activeCall: '진행 중인 통화',
  otherDevice: '다른 디바이스',
  onHold: '대기 중',
  day: '일',
  hr: '시간',
  min: '분',
  sec: '초',
  yesterday: '어제',
  notes: 'AI 노트',
  logged: '기록됨',
  unlogged: '기록되지 않음',
  answeredBy: '응답자',
  conferenceCall: '원격 회의 모임',
  copyNumberSuccess: '번호 복사됨',
  // #region call status
  '911': '911',
  '933': '933',
  Abandoned: '중단됨',
  Accepted: '수락됨',
  'Answered Not Accepted': '응답됨(수락되지 않음)',
  Blocked: '차단됨',
  Busy: '사용 중',
  'Call Failed': '통화 실패',
  'Call Failure': '통화 오류',
  'Call connected': '통화 연결됨',
  'Carrier is not active': '이동 통신 사업자가 활성화되지 않음',
  Declined: '거부됨',
  'EDGE trunk misconfigured': 'EDGE 트렁크가 잘못 구성됨',
  'Fax Not Sent': '팩스 전송 안 됨',
  'Fax Partially Sent': '팩스가 부분 전송됨',
  'Fax Poor Line': '팩스 회선 불량',
  'Fax Receipt Error': '팩스 수신 오류',
  'Fax on Demand': '주문형 팩스',
  'Hang Up': '전화 끊기',
  'IP Phone Offline': 'IP 전화기 오프라인',
  'In Progress': '진행 중',
  'Internal Error': '내부 오류',
  'International Disabled': '국제 전화 사용 안 함',
  'International Restricted': '국제 전화가 제한됨',
  Missed: '부재중 전화',
  'No Answer': '응답 없음',
  'No Calling Credit': '통화 크레딧 없음',
  'Not Allowed': '허용되지 않음',
  'Partial Receive': '일부 수신',
  'Phone Login': '전화 로그인',
  'Receive Error': '수신 오류',
  Received: '수신됨',
  Rejected: '거부됨',
  Reply: '회신',
  'Restricted Number': '제한된 번호',
  'Send Error': '전송 오류',
  Sent: '전송됨',
  'Sent to Voicemail': '음성 사서함에 보냄',
  Stopped: '중지됨',
  'Suspended account': '일시 중단된 계정',
  Unknown: '알 수 없음',
  Voicemail: '음성 사서함',
  'Wrong Number': '잘못된 번호',
  // some fields are not in the platform list
  'Answered Elsewhere': '다른 위치에서 응답됨',
  'Ringing Elsewhere': '다른 위치에서 벨 울림',
  'Fax Send Error': '팩스 전송 오류',
  Account: '계정',
  'Call accepted': '전화 받음',
  'Hang up': '전화 끊기',
  'International Restriction': '국제 전화 제한',
  'No fax machine': '팩스 없음',
  'Partially Sent': '일부 전송됨',
  'Poor Line Quality': '낮은 전화선 품질',
  ResultEmpty: '비어 있음',
  ResultInProgress: '진행 중',
  Suspended: '일시 중단됨',
  'Fax Receipt': '팩스 수신',
  'Suspended Account': '일시 중단된 계정',
  Disconnected: '연결 끊김',
  multiMatchesContactName: '{name} 외 {count}명',
  // #endregion call status
  matches: '{numberOfMatches}개의 일치 항목',
  maybe: '추천: {contactName}',
  optedOut: '수신자가 수신 거부했습니다.',
  optOutAlertTooltip: '이 번호에서 발송되는 텍스트를 받으려면 수신자가 다시 수신 동의해야 합니다.'
}; // @key: @#@"to"@#@ @source: @#@"To"@#@
// @key: @#@"from"@#@ @source: @#@"From"@#@
// @key: @#@"ext"@#@ @source: @#@"Ext."@#@
// @key: @#@"myCallerId"@#@ @source: @#@"My caller ID"@#@
// @key: @#@"callerId"@#@ @source: @#@"Caller ID"@#@
// @key: @#@"unknownNumber"@#@ @source: @#@"Unknown"@#@
// @key: @#@"Inbound"@#@ @source: @#@"Incoming call"@#@
// @key: @#@"Outbound"@#@ @source: @#@"Outgoing call"@#@
// @key: @#@"activeCall"@#@ @source: @#@"Active call"@#@
// @key: @#@"otherDevice"@#@ @source: @#@"On other device"@#@
// @key: @#@"onHold"@#@ @source: @#@"On hold"@#@
// @key: @#@"day"@#@ @source: @#@"day"@#@
// @key: @#@"hr"@#@ @source: @#@"hr"@#@
// @key: @#@"min"@#@ @source: @#@"min"@#@
// @key: @#@"sec"@#@ @source: @#@"sec"@#@
// @key: @#@"yesterday"@#@ @source: @#@"Yesterday"@#@
// @key: @#@"notes"@#@ @source: @#@"AI notes"@#@
// @key: @#@"logged"@#@ @source: @#@"Logged"@#@
// @key: @#@"unlogged"@#@ @source: @#@"Unlogged"@#@
// @key: @#@"answeredBy"@#@ @source: @#@"Answered by"@#@
// @key: @#@"conferenceCall"@#@ @source: @#@"Conference Call"@#@
// @key: @#@"copyNumberSuccess"@#@ @source: @#@"Number copied"@#@
// @key: @#@"'911'"@#@ @source: @#@"911"@#@
// @key: @#@"'933'"@#@ @source: @#@"933"@#@
// @key: @#@"Abandoned"@#@ @source: @#@"Abandoned"@#@
// @key: @#@"Accepted"@#@ @source: @#@"Accepted"@#@
// @key: @#@"'Answered Not Accepted'"@#@ @source: @#@"Answered Not Accepted"@#@
// @key: @#@"Blocked"@#@ @source: @#@"Blocked"@#@
// @key: @#@"Busy"@#@ @source: @#@"Busy"@#@
// @key: @#@"'Call Failed'"@#@ @source: @#@"Call Failed"@#@
// @key: @#@"'Call Failure'"@#@ @source: @#@"Call Failure"@#@
// @key: @#@"'Call connected'"@#@ @source: @#@"Call connected"@#@
// @key: @#@"'Carrier is not active'"@#@ @source: @#@"Carrier is not active"@#@
// @key: @#@"Declined"@#@ @source: @#@"Declined"@#@
// @key: @#@"'EDGE trunk misconfigured'"@#@ @source: @#@"EDGE trunk misconfigured"@#@
// @key: @#@"'Fax Not Sent'"@#@ @source: @#@"Fax Not Sent"@#@
// @key: @#@"'Fax Partially Sent'"@#@ @source: @#@"Fax Partially Sent"@#@
// @key: @#@"'Fax Poor Line'"@#@ @source: @#@"Fax Poor Line"@#@
// @key: @#@"'Fax Receipt Error'"@#@ @source: @#@"Fax Receipt Error"@#@
// @key: @#@"'Fax on Demand'"@#@ @source: @#@"Fax on Demand"@#@
// @key: @#@"'Hang Up'"@#@ @source: @#@"Hang Up"@#@
// @key: @#@"'IP Phone Offline'"@#@ @source: @#@"IP Phone Offline"@#@
// @key: @#@"'In Progress'"@#@ @source: @#@"In Progress"@#@
// @key: @#@"'Internal Error'"@#@ @source: @#@"Internal Error"@#@
// @key: @#@"'International Disabled'"@#@ @source: @#@"International Disabled"@#@
// @key: @#@"'International Restricted'"@#@ @source: @#@"International Restricted"@#@
// @key: @#@"Missed"@#@ @source: @#@"Missed"@#@
// @key: @#@"'No Answer'"@#@ @source: @#@"No Answer"@#@
// @key: @#@"'No Calling Credit'"@#@ @source: @#@"No Calling Credit"@#@
// @key: @#@"'Not Allowed'"@#@ @source: @#@"Not Allowed"@#@
// @key: @#@"'Partial Receive'"@#@ @source: @#@"Partial Receive"@#@
// @key: @#@"'Phone Login'"@#@ @source: @#@"Phone Login"@#@
// @key: @#@"'Receive Error'"@#@ @source: @#@"Receive Error"@#@
// @key: @#@"Received"@#@ @source: @#@"Received"@#@
// @key: @#@"Rejected"@#@ @source: @#@"Rejected"@#@
// @key: @#@"Reply"@#@ @source: @#@"Reply"@#@
// @key: @#@"'Restricted Number'"@#@ @source: @#@"Restricted Number"@#@
// @key: @#@"'Send Error'"@#@ @source: @#@"Send Error"@#@
// @key: @#@"Sent"@#@ @source: @#@"Sent"@#@
// @key: @#@"'Sent to Voicemail'"@#@ @source: @#@"Sent to Voicemail"@#@
// @key: @#@"Stopped"@#@ @source: @#@"Stopped"@#@
// @key: @#@"'Suspended account'"@#@ @source: @#@"Suspended account"@#@
// @key: @#@"Unknown"@#@ @source: @#@"Unknown"@#@
// @key: @#@"Voicemail"@#@ @source: @#@"Voicemail"@#@
// @key: @#@"'Wrong Number'"@#@ @source: @#@"Wrong Number"@#@
// @key: @#@"'Answered Elsewhere'"@#@ @source: @#@"Answered elsewhere"@#@
// @key: @#@"'Ringing Elsewhere'"@#@ @source: @#@"Ringing elsewhere"@#@
// @key: @#@"'Fax Send Error'"@#@ @source: @#@"Fax Send Error"@#@
// @key: @#@"Account"@#@ @source: @#@"Account"@#@
// @key: @#@"'Call accepted'"@#@ @source: @#@"Call accepted"@#@
// @key: @#@"'Hang up'"@#@ @source: @#@"Hang up"@#@
// @key: @#@"'International Restriction'"@#@ @source: @#@"International Restriction"@#@
// @key: @#@"'No fax machine'"@#@ @source: @#@"No fax machine"@#@
// @key: @#@"'Partially Sent'"@#@ @source: @#@"Partially Sent"@#@
// @key: @#@"'Poor Line Quality'"@#@ @source: @#@"Poor Line Quality"@#@
// @key: @#@"ResultEmpty"@#@ @source: @#@"empty"@#@
// @key: @#@"ResultInProgress"@#@ @source: @#@"In Progress"@#@
// @key: @#@"Suspended"@#@ @source: @#@"Suspended"@#@
// @key: @#@"'Fax Receipt'"@#@ @source: @#@"Fax Receipt"@#@
// @key: @#@"'Suspended Account'"@#@ @source: @#@"Suspended Account"@#@
// @key: @#@"Disconnected"@#@ @source: @#@"Disconnected"@#@
// @key: @#@"multiMatchesContactName"@#@ @source: @#@"{name} and {count} more"@#@
// @key: @#@"matches"@#@ @source: @#@"{numberOfMatches} matches"@#@
// @key: @#@"maybe"@#@ @source: @#@"Maybe: {contactName}"@#@
// @key: @#@"optedOut"@#@ @source: @#@"Recipient has opted out."@#@
// @key: @#@"optOutAlertTooltip"@#@ @source: @#@"The recipient must opt back in to receive texts from this number."@#@
//# sourceMappingURL=ko-KR.js.map
