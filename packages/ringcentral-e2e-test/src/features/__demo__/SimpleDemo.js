import AccountHelper from '../../lib/accountManager';

describe('test: =====>', () => {
  test({
    title: 'Login salesforce',
    tags: [
      ['salesforce']
    ],
    drivers: ['puppeteer','seleniumWebdriverChrome'],
    // modes: ['sandbox'],
    brands: ['rc'],
    levels: ['p0'],
    options: [
      {account1:'rc_uk_sfentity',account2:'rc_us_sfentity',},
    ],
  }, async ({ option,config }) => {
    const location = 'https://na78.salesforce.com/home/showAllTabs.jsp';
    //login salesforce
    await $(page).type('#username', config.username);
    await $(page).type('#password', config.password);
    await $(page).click('#Login');
    await $(page).waitFor('body');
    
    await $(page).goto(location);

    await $(page).waitFor(10000);
    const accountHelper = new AccountHelper();
    const account1 = await accountHelper.getAccount(option.account1);

    global.app = await $(page).waitForFrames(['SoftphoneIframe', 'rcAppClassic']);

    context.driver.addAfterHook(async () => {
      await accountHelper.recycleAccount(account1[0]['uuid']);
    });

    await $(app).execute(`phone.auth.login({username: '${account1[0]['mainNumber']}', password: '${account1[0]['password']}'})`);

    await $(app).waitFor(8000);
    await $(app).waitForSelector('[title="More Menu"]');
    await $(app).click('[title="More Menu"]');
    await $(app).waitForSelector('[title="Settings"]');
    await $(app).click('[title="Settings"]');
    await $(app).waitFor(2000);

    await $(app).click('#viewport > div > div > div > div > div > div.node_modules-ringcentral-widgets-components-SettingsPanel-_styles_root_1Eq2f > div > a:nth-child(1) > div > div > div.node_modules-ringcentral-widgets-components-IconField-_styles_content_2rExK')
    await $(app).click('[class*="DropdownSelect"]');
    await $(app).click('[title="My RingCentral Phone"]');
    await $(app).click('[class*=SaveButton]');
    await $(app).waitForSelector('[class*="AlertDisplay"]');
    await $(app).execute('phone.alert.dismissAll');
    await $(app).waitFor(3000);
    const RCPhone = await $(app).getText('[class*="DropdownSelect"]');
    expect(RCPhone.trim()).toBe('My RingCentral Phone');

  });
});
