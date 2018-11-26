
const video_zoom_reg = {
  'rc': /(http|https):\/\/(rcdev\.zoom\.us)(\/\w+)?(\/\d+)/,
  'bt': /(http|https):\/\/(rcdev\.zoom\.us)(\/\w+)?(\/\d+)/,
  'att': /(http|https):\/\/(attdev\.zoom\.us)(\/\w+)?(\/\d+)/,
  'telus': /(http|https):\/\/(rcdev\.zoom\.us)(\/\w+)?(\/\d+)/
}
const video_meeting_reg = {
  'rc': /(http|https):\/\/meetings\.ringcentral\.com(\/\w+)?/,
  'bt': /(http|https):\/\/meetings.btcloudphone\.bt\.com(\/\w+)?/,
  'att': /(http|https):\/\/meetings-officeathand\.att\.com(\/\w+)?/,
  'telus': /(http|https):\/\/meetings.businessconnect\.telus\.com(\/\w+)?/
}
const conf_zoom_reg = /^(http|https):\/\/rcconf.net\/\w+$/;
const conf_meeting_reg = /^(http|https):\/\/rcconf.net\/\w+$/;
const owa = "https://outlook.office365.com/owa/?ItemID";
class MeetingHelper {

  static async checkLocation(page, brand, type = 'video') {
    await $(page).waitForSelector()
    const text = await page.evaluate(()=>{
      const a = document.getElementById('MeetingCompose.LocationInputLabel');
      return a && a.parentElement.innerHTML;
    });
    let result;
    if (type === 'video') {
      result = video_zoom_reg[brand].test(text);
      debugger;
     } else {
      result = conf_zoom_reg[brand].test(text);
     }
     console.log(text,result,'s');
    return result;
  }
  static async checkDescription(page, type = 'video') {
    await $(page).waitForSelector('[contenteditable="true"][aria-multiline="true"][role="textbox"]',{
      selector: 'css'
    });
    const text = await $(page).getText('[contenteditable="true"][aria-multiline="true"][role="textbox"]',{
      selector: 'css'
    });
    let link_com;
    let link_spe;
    if (type === 'video') {
      link_com = video_zoom_reg[brand].test(text);
      link_spe = video_meeting_reg[brand].test(text);
    } else {
      link_com = conf_zoom_reg[brand].test(text);
      link_spe = conf_meeting_reg[brand].test(text);
    }
    return link_com && link_spe;
  }
  static async checkTitle(page, context, type = 'video') {
    const text = await $(page).getProperty('div.customScrollBar > div._cx_t1 ul > li:nth-child(1) > div > input',
    'value');
    if(!text) return false;
    const account = context.options.option.playload.loginAccount;
    if (type === 'video') {
      return text.test('${currentAccount.firstName} ${currentAccount.lastName}\'s Meeting');
    } else {
      return text.test('${currentAccount.firstName} ${currentAccount.lastName}\'s Conference Meeting');
    }
  }
  static async checkTime(page,time,type = 'video') {
    let owaStartDate = await $(page).getText('button[autoid="_dx_0"] > span', { selector: 'css' });
    owaStartDate = startDate.split(' ').pop();
    let owaStartTime = await page.getProperty('input[aria-label="start time"]', 'value');
    const owaStartDateTime = new Date(owaStartDate + ' ' + owaStartTime);
    return owaStartDateTime === time;
  }
}
export default MeetingHelper;
