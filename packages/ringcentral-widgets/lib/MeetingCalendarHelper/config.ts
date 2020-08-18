export const MEETING_URI_REGEXP: {
  EMAIL: RegExp;
  RCM: RegExp;
  RCV: RegExp;
} = {
  EMAIL: /w?(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
  RCM: /(http|https):\/\/(((meetings\.(ringcentral|btcloudphone\.bt|businessconnect\.telus))|(meetings-officeathand\.att))\.com|((\w+\.)*(meetzoom|zoom)\.us))(\/\w+)?(\/(\d+))(\?pwd=\w+)?/i,
  RCV: /(http|https):\/\/(((v\.ringcentral)|(meetings\.officeathand\.att)|(xmnup-rxe-1-v\.lab\.nordigy)|(amrupams-shr-1-v\.lab\.nordigy)|(vi11-1-v\.lab\.nordigy)|(vi11-1-v-att\.lab\.nordigy))\.(com|ru))(\/{1,2}\w+)*(\/{1,2}(\d+))(\?pw=\w{32})?/i,
};

export const rcvAttTeleconference: string =
  'https://meetings.officeathand.att.com/teleconference';

export const rcvTeleconference: string =
  'https://v.ringcentral.com/teleconference/';
