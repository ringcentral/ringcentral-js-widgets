import sleep from 'ringcentral-integration/lib/sleep';

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



/* global $ */
export default class addMeeting{
  static async openDetail(context) {    
    console.log('Opening o365 specific page.');
    const page = context.page;
    await $(page).goto(context.options.option.o365URL, { // This page could be slower than you think
      waitUntil: 'networkidle2',
      timeout: 600000,
    });
    await $(page).click("button[autoid='_fce_1']");
  }

  static async createVideoMeeting(context){

    console.log('create video meeting');
    const page = context.page;
    await $(page).click("@selectedItem");  
    //select video meeting
    await $(page).click("[value=meeting]");
    //savebtn
    console.log('save schedule');
    await $(page).waitForSelector("#rc-meeting-schedule", {
      visible: true,
      timeout:30*1000
    });
    await $(page).click("#rc-meeting-schedule");
  }

  static async createConfMeeting(context){
    console.log('create conference meeting');
    const page = context.page;
    await $(page).click("@selectedItem");  
    //select video meeting
    await $(page).click("[value=conference]");
    //savebtn
    console.log('save schedule');
    await $(page).waitForSelector("#rc-meeting-schedule", {
      visible: true,
      timeout:30*1000
    });
    await $(page).click("#rc-meeting-schedule");
  }

  static async checkVideoDescExist(context){
    console.log("=========check video description===========");
    const page = context.page;
    await sleep(3000);
    const text = await page.evaluate(()=>{
      var a = document.querySelector('[contenteditable="true"][aria-multiline="true"][role="textbox"]');
      return a.innerHTML;
    });
    const brand = context.options.tag.brands;
    const link_com = video_zoom_reg[brand].test(text);
    const link_spe = video_meeting_reg[brand].test(text);  
    return link_com&&link_spe;
  }

  static async checkConfDescExist(context){
    console.log("=========check conference description===========");
    const page = context.page;
    await sleep(3000);
    const text = await page.evaluate(()=>{
      var a = document.querySelector('[contenteditable="true"][aria-multiline="true"][role="textbox"]');
      return a.innerHTML;
    });
    const brand = context.options.tag.brands;
    const link_com = conf_zoom_reg[brand].test(text);
    const link_spe = conf_meeting_reg[brand].test(text);  
    return link_com&&link_spe;
  }

  static async checkVideoLocaExist(context){
    console.log('==========check video location==========');
    const page = context.page;

    // close the native dialogs
    page.on('dialog',async dialog => {
      dialog.dismiss()
    });
    await sleep(3000);

    const text = await page.evaluate(()=>{
      var a = document.getElementById('MeetingCompose.LocationInputLabel');
      return a && a.parentElement.innerHTML;
    });
    const brand = context.options.tag.brands;
    const result = video_zoom_reg[brand].test(text);
    return result;
  }

  static async checkConfLocaExist(context){
    console.log('==========check conference location==========');
    const page = context.page;

    // close the native dialogs
    page.on('dialog',async dialog => {
      dialog.dismiss()
    });
    await sleep(3000);

    const text = await page.evaluate(()=>{
      var a = document.getElementById('MeetingCompose.LocationInputLabel');
      return a && a.parentElement.innerHTML;
    });
    const brand = context.options.tag.brands;
    const result = conf_zoom_reg[brand].test(text);
    return result;
  }
  static async getSeleItems(context){
    console.log("=======get selector items=========");
    const page = context.page;    
    await $(page).click("@selectedItem");     
    //get select iem
    const results = await page.evaluate(()=>{
      let seleItems = Array.prototype.slice.call(document.querySelectorAll("span[class*='src-lib-MeetingHelper-MeetingSelector-_styles_menuItem']"));
      return seleItems.map( seleItems => { return seleItems.innerHTML });
    });
    
    console.info('=======selector items ======',results);
    //it's a good idea to collapse drop down for don't affect another steps
    await $(page).click("@selectedItem"); 
    return results;
  }

  static async getSelePlaceholder(context){
    console.log("=======get selector placeholder=========");
    const page = context.page;
    await $(page).waitForSelector("@selectedItem");
    const text = await $(page).getAttribute("@selectedItem","placeholder");
    console.info("===placehoder text===",text);
    return text;
  }

  static get steps() {
    return [
      this.openDetail,
      this.createVideoMeeting,
      this.createConfMeeting
    ];
  }
}