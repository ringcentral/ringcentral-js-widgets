import removeUri from './removeUri';

export default function processCall(call) {
  return {
    ...removeUri(call),
    startTime: (new Date(call.startTime)).getTime(),
  };
}
