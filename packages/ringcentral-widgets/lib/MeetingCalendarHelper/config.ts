export const REG_EXP = {
  EMAIL: /w?(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
  MEETING: /(http|https):\/\/(((meetings\.(ringcentral|btcloudphone\.bt|businessconnect\.telus))|(meetings-officeathand\.att))\.com|((\w+\.)*(meetzoom|zoom)\.us))(\/\w+)?(\/(\d+))/,
  RCV: /(http|https):\/\/(((v\.ringcentral)|(meetings\.officeathand\.att)|(xmnup-shr-1-v\.lab\.nordigy))\.(com|ru))(\/{1,2}\w+)*(\/{1,2}(\d+))/,
};
