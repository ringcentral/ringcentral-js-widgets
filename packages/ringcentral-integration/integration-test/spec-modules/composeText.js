import loginStatus from '../../modules/Auth/loginStatus';
import messageSenderMessages from '../../modules/MessageSender/messageSenderMessages';
import { containsErrorMessage, ensureLogin } from '../utils/HelpUtil';
import { waitUntilEqual, waitInSeconds, waitUntilNotNull, waitUntilObjectSizeGreaterThan } from '../utils/WaitUtil';
import ClientHistoryRequest from '../utils/ClientHistoryRequest';

export default (auth, client, account, alert, regionSettings, composeText, messageSender) => {
  describe('ComposeText', async function () {
    this.timeout(20000);
    let conditionalDescribe = describe;
    const clientHistoryRequest = new ClientHistoryRequest(new Map(), client);

    before(async () => {
      const isLoginSuccess = await ensureLogin(auth, account);
      if (!isLoginSuccess) {
        conditionalDescribe = describe.skip;
        console.error('Skip test case as failed to login with credential ', account);
      }
      await waitUntilNotNull(() => messageSender.senderNumbersList[0].phoneNumber, 'First number in senderNumberList', 3);
      await waitUntilObjectSizeGreaterThan(() => composeText.senderNumber, 'Sender Number', 0, 3);
    });

    conditionalDescribe('Should Init Successfully with Default Setting', () => {
      this.timeout(20000);
      it('Should Set Sender Number with First SmsSender Phone Number by Default', () => {
        expect(composeText.senderNumber).to.equals(messageSender.senderNumbersList[0].phoneNumber);
      });
    });

    conditionalDescribe('Should Save Sender Number', () => {
      this.timeout(20000);
      it('Should Update Sender Number After User Change Sender Number', () => {
        composeText.updateSenderNumber(messageSender.senderNumbersList[1].phoneNumber);
        expect(composeText.senderNumber).to.equals(messageSender.senderNumbersList[1].phoneNumber);
      });

      it('Should Remember Sender Number After Logout', async () => {
        composeText.updateSenderNumber(messageSender.senderNumbersList[1].phoneNumber);
        auth.logout();
        await waitUntilEqual(() => auth.loginStatus, 'LoginStatus', loginStatus.notLoggedIn, 3);
        auth.login({
          ...account
        });
        await waitUntilEqual(() => auth.loginStatus, 'LoginStatus', loginStatus.loggedIn, 3);
        await waitInSeconds(2);
        expect(composeText.senderNumber).to.equals(messageSender.senderNumbersList[1].phoneNumber);
      });
    });

    conditionalDescribe('Should Update Typing Number', () => {
      this.timeout(20000);
      it('Should Update Typing Number When User Typing Number', () => {
        composeText.updateTypingToNumber('123');
        expect(composeText.typingToNumber).to.equals('123');
      });

      it('Should Clean Typing Number When User Click Clean Button', () => {
        composeText.updateTypingToNumber('123');
        composeText.cleanTypingToNumber();
        expect(composeText.typingToNumber).to.equals('');
      });
    });

    conditionalDescribe('Should Update Message Text', () => {
      this.timeout(20000);
      it('Should Update Message Text When User Type', () => {
        composeText.updateMessageText('1234');
        expect(composeText.messageText).to.equals('1234');
      });
    });

    conditionalDescribe('Should Update ToNumbers', () => {
      this.timeout(20000);
      beforeEach(() => {
        composeText.clean();
      });

      it('Should Add Number to Selected Number List to ToNumbers When User Add it', () => {
        composeText.addToNumber({ phoneNumber: '+18558990011' });
        expect(composeText.toNumbers).to.deep.equals([{ phoneNumber: '+18558990011' }]);
      });

      it('Should Not Repeat Add Number to Selected Number List When User had add it', () => {
        composeText.addToNumber({ phoneNumber: '+18558990011' });
        composeText.addToNumber({ phoneNumber: '+18558990011' });
        expect(composeText.toNumbers).to.deep.equals([{ phoneNumber: '+18558990011' }]);
      });

      it('Should Remove ToNumber from Selected Number List When User Click Remove Button', () => {
        composeText.addToNumber({ phoneNumber: '+18558990011' });
        composeText.removeToNumber({ phoneNumber: '+18558990011' });
        expect(composeText.toNumbers).to.deep.equals([]);
      });
    });

    conditionalDescribe('Should Clean All Inputs After User Submit', () => {
      this.timeout(20000);
      it('Should Clean All Inputs', () => {
        composeText.updateTypingToNumber('123');
        composeText.addToNumber({ phoneNumber: '+18558990011' });
        composeText.updateMessageText('1234');
        composeText.clean();
        expect(composeText.toNumbers).to.deep.equals([]);
        expect(composeText.typingToNumber).to.equals('');
        expect(composeText.messageText).to.equals('');
      });
    });

    conditionalDescribe('Should Send Message', () => {
      this.timeout(20000);
      beforeEach(() => {
        composeText.clean();
      });

      it('Should SMS Message Successfully', async () => {
        composeText.addToNumber({ phoneNumber: '+18558990011' });
        composeText.updateMessageText('test');
        const responses = await composeText.send();
        expect(responses[0]).to.include.keys('id', 'conversation');
        expect(responses[0].type).to.equals('SMS');
        expect(responses[0].subject).to.equals('test');
        const rawRequest
          = clientHistoryRequest.getRawResponse(ClientHistoryRequest.endPoints.sms);
        expect(JSON.stringify(responses[0])).to.equal(JSON.stringify(rawRequest));
      });

      it('Should Send Pager Message Successfully', async () => {
        composeText.addToNumber({ phoneNumber: '101' });
        composeText.updateMessageText('test 2');
        const responses = await composeText.send();
        expect(responses[0]).to.include.keys('id', 'conversation');
        expect(responses[0].type).to.equals('Pager');
        expect(responses[0].subject).to.equals('test 2');
        const rawRequest =
          clientHistoryRequest.getRawResponse(ClientHistoryRequest.endPoints.companyPager);
        expect(JSON.stringify(responses[0])).to.equal(JSON.stringify(rawRequest));
      });

      it('Should Send SMS and Pager Message Together Successfully', async () => {
        composeText.addToNumber({ phoneNumber: '+18558990011' });
        composeText.addToNumber({ phoneNumber: '101' });
        composeText.updateMessageText('test 3');
        const responses = await composeText.send();
        expect(responses[0]).to.include.keys('id', 'conversation');
        expect(responses[0].subject).to.equals('test 3');
        expect(responses[1].subject).to.equals('test 3');
        const smsRequest
          = clientHistoryRequest.getRawResponse(ClientHistoryRequest.endPoints.sms);
        const pagerRequest =
          clientHistoryRequest.getRawResponse(ClientHistoryRequest.endPoints.companyPager);
        expect(smsRequest.type).to.equals('SMS');
        expect(smsRequest.subject).to.equals('test 3');
        expect(pagerRequest.type).to.equals('Pager');
        expect(pagerRequest.subject).to.equals('test 3');
      });

      it('Should Send Pager Message Successfully with Typing Number', async () => {
        composeText.updateTypingToNumber('101');
        composeText.updateMessageText('test 4');
        const responses = await composeText.send();
        expect(responses[0]).to.include.keys('id', 'conversation');
        expect(responses[0].type).to.equals('Pager');
        expect(responses[0].subject).to.equals('test 4');
        const rawRequest =
          clientHistoryRequest.getRawResponse(ClientHistoryRequest.endPoints.companyPager);
        expect(JSON.stringify(responses[0])).to.equal(JSON.stringify(rawRequest));
      });
    });

    conditionalDescribe('Validation', () => {
      this.timeout(20000);
      beforeEach(async function () {
        composeText.clean();
        const isAlertClear = await waitUntilEqual(() => {
          alert.dismissAll();
          return alert.state.messages.length;
        }, 'Alert', 0, 5);
        if (!isAlertClear) {
          console.error('Alert is not cleared after dismissAll');
          conditionalDescribe = describe.skip;
        }
      });

      conditionalDescribe('Text Validation', () => {
        it('Should Alert of textEmpty When Text Is Empty', async () => {
          composeText.updateTypingToNumber('+18558990011');
          composeText.updateMessageText('');
          await composeText.send();
          expect(containsErrorMessage(
            alert.state.messages,
            messageSenderMessages.textEmpty
          )).to.not.equal(undefined);
        });

        it('Should Alert of textTooLong When Message Text length more than 1000', () => {
          const str = Array(1002).join('x');
          composeText.updateMessageText(str);
          expect(containsErrorMessage(
            alert.state.messages,
            messageSenderMessages.textTooLong
          )).to.not.equal(undefined);
          expect(composeText.messageText).to.equals('');
        });

        it('Should Alert of textEmpty When Text Is Empty with Space', async () => {
          composeText.updateTypingToNumber('+18558990011');
          composeText.updateMessageText('   ');
          const response = await composeText.send();
          expect(containsErrorMessage(
            alert.state.messages,
            messageSenderMessages.textEmpty
          )).to.not.equal(undefined);
          expect(messageSender.idle).to.equals(true);
          expect(response).to.equals(null);
        });
      });

      conditionalDescribe('Numbers Validation', () => {
        conditionalDescribe('Basic Validation', () => {
          it('Should Alert of recipientsEmpty - Not Input Recepiant Number', async () => {
            composeText.updateMessageText('test sender');
            await composeText.send();
            expect(containsErrorMessage(
              alert.state.messages,
              messageSenderMessages.recipientsEmpty
            )).to.not.equal(undefined);
          });

          it('Should Alert of noToNumber - Typing Number is not number', async () => {
            composeText.addToNumber({ phoneNumber: "iamn%@onedi!@$%^&()_=\\][';/.,~nu><.,,?/mber#*" });
            composeText.updateMessageText('test sender');
            await composeText.send();
            expect(containsErrorMessage(
              alert.state.messages,
              messageSenderMessages.noToNumber
            )).to.not.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
              .to.equal(undefined);
          });

          it('Should Alert of noToNumber - Valid Special Char but No Digital Number', async () => {
            composeText.addToNumber({ phoneNumber: '+#' });
            composeText.updateMessageText('test sender');
            await composeText.send();
            expect(containsErrorMessage(
              alert.state.messages,
              messageSenderMessages.noToNumber
            )).to.not.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
              .to.equal(undefined);
          });

          it('Should Alert of recipientNumberInvalids - Typing Number Length more than 30', () => {
            const str = Array(32).join('x');
            composeText.updateTypingToNumber(str);
            expect(containsErrorMessage(
              alert.state.messages,
              messageSenderMessages.recipientNumberInvalids
            )).to.not.equal(undefined);
            expect(composeText.typingToNumber).to.equals('');
          });

          it('Should Alert of noToNumber - Send With wrong Typing Number', async () => {
            composeText.updateTypingToNumber('test');
            composeText.updateMessageText('test 5');
            const response = await composeText.send();
            expect(containsErrorMessage(
              alert.state.messages,
              messageSenderMessages.noToNumber
            )).to.not.equal(undefined);
            expect(response).to.equals(null);
          });

          it('Should Alert of noToNumber - one of toNumber is not number', async () => {
            composeText.addToNumber({ phoneNumber: '101' });
            composeText.addToNumber({ phoneNumber: 'test' });
            composeText.updateMessageText('test sender');
            await composeText.send();
            expect(containsErrorMessage(
              alert.state.messages,
              messageSenderMessages.noToNumber
            )).to.not.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
              .to.equal(undefined);
          });

          it('Should Not Alert Anything - to Number in E.164 Format', async () => {
            composeText.addToNumber({ phoneNumber: '+18558990011' });
            composeText.updateMessageText('test');
            const response = await composeText.send();
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
              .to.equal(undefined);
          });
        });

        conditionalDescribe('Validation with US/CA Local Number Format', () => {
          beforeEach(() => {
            regionSettings.setData({ countryCode: 'US', areaCode: '' });
          });

          it('Should Not Alert Anything - To Number in (xxx)xxx-xxxx Format', async () => {
            composeText.updateTypingToNumber('(855)899-0011');
            composeText.updateMessageText('test');
            const responses = await composeText.send();
            expect(responses[0]).to.include.keys('id', 'conversation');
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notSmsToExtension))
              .to.equal(undefined);
          });

          it('Should Not Alert Anything - to Number in (xxx) xxx-xxxx Format', async () => {
            composeText.updateTypingToNumber('(855) 899-0011');
            composeText.updateMessageText('test');
            const responses = await composeText.send();
            expect(responses[0]).to.include.keys('id', 'conversation');
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notSmsToExtension))
              .to.equal(undefined);
          });

          it('Should Not Alert Anything - to Number in (xxx)xxx-xxxx*xxx Format', async () => {
            composeText.updateTypingToNumber('(866)211-8665*101');
            composeText.updateMessageText('test');
            const responses = await composeText.send();
            expect(responses[0]).to.include.keys('id', 'conversation');
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notSmsToExtension))
              .to.equal(undefined);
          });

          it('Should Not Alert Anything - to Number in (xxx) xxx-xxxx*xxx Format', async () => {
            composeText.updateTypingToNumber('(866) 211-8665*101');
            composeText.updateMessageText('test');
            const responses = await composeText.send();
            expect(responses[0]).to.include.keys('id', 'conversation');
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notSmsToExtension))
              .to.equal(undefined);
          });

          it('Should Not Alert Anything - to Number in xxx-xxx-xxxx Format', async () => {
            composeText.updateTypingToNumber('866-211-8665');
            composeText.updateMessageText('test');
            const responses = await composeText.send();
            expect(responses[0]).to.include.keys('id', 'conversation');
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notSmsToExtension))
              .to.equal(undefined);
          });

          it('Should Not Alert Anything - to Number in xxx-xxx-xxxx*xxx Format', async () => {
            composeText.updateTypingToNumber('866-211-8665*101');
            composeText.updateMessageText('test');
            const responses = await composeText.send();
            expect(responses[0]).to.include.keys('id', 'conversation');
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notSmsToExtension))
              .to.equal(undefined);
          });
        });

        conditionalDescribe('Validation with Region Setting', () => {
          it('Should Alert of noAreaCode - Typing Number length is 7 and no areaCode', async () => {
            regionSettings.setData({ countryCode: 'CA', areaCode: '' });
            composeText.updateTypingToNumber('6545672');
            composeText.updateMessageText('test 6');
            const response = await composeText.send();
            expect(containsErrorMessage(
              alert.state.messages,
              messageSenderMessages.noAreaCode
            )).to.not.equal(undefined);
            expect(response).to.equals(null);
          });

          it('Should Alert of No AreaCode - toNumber is 7 Digital Number with US Dialing Plan without Area Code', async () => {
            regionSettings.setData({ countryCode: 'US', areaCode: '' });
            composeText.addToNumber({ phoneNumber: '8990011' });
            composeText.updateMessageText('test sender');
            await composeText.send();
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
              .to.not.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
              .to.equal(undefined);
          });

          it('Should Alert of No AreaCode - toNumber is 7 Digital Number with CA Dialing Plan without Area Code', async () => {
            regionSettings.setData({ countryCode: 'CA', areaCode: '' });
            composeText.addToNumber({ phoneNumber: '8990011' });
            composeText.updateMessageText('test sender');
            await composeText.send();
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
              .to.not.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
              .to.equal(undefined);
          });

          it('Should Not Alert of Anything - toNumber is 7 Digital Number with CA Dialing Plan with Area Code', async () => {
            regionSettings.setData({ countryCode: 'CA', areaCode: '855' });
            composeText.addToNumber({ phoneNumber: '8990011' });
            composeText.updateMessageText('test sender');
            try {
              await composeText.send();
            } catch (error) {
              console.debug('message sender e:', error);
            }
            const rawRequest
              = clientHistoryRequest.getRawResponse(ClientHistoryRequest.endPoints.sms);
            expect(rawRequest.to[0].phoneNumber).to.equal('+18558990011');
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
              .to.equal(undefined);
            expect(messageSender.idle).to.equals(true);
          });

          it('Should Not Alert of Anything - toNumber is 7 Digital Number with US Dialing Plan with Area Code', async () => {
            regionSettings.setData({ countryCode: 'US', areaCode: '855' });
            composeText.addToNumber({ phoneNumber: '8990011' });
            composeText.updateMessageText('test sender');
            try {
              await composeText.send();
            } catch (error) {
              console.debug('message sender e:', error);
            }
            const rawRequest
              = clientHistoryRequest.getRawResponse(ClientHistoryRequest.endPoints.sms);
            expect(rawRequest.to[0].phoneNumber).to.equal('+18558990011');
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
              .to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
              .to.equal(undefined);
          });
        });

        conditionalDescribe('Extension/Special Validation', () => {
          conditionalDescribe('Not Included In Extension List', () => {
            it('Should Alert of notAnExtension - Typing Number', async () => {
              composeText.updateTypingToNumber('11111');
              composeText.updateMessageText('test sender');
              await composeText.send();
              expect(containsErrorMessage(
                alert.state.messages,
                messageSenderMessages.notAnExtension
              )).to.not.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
                .to.equal(undefined);
            });

            it('Should Alert of notAnExtension - To Number', async () => {
              composeText.addToNumber({ phoneNumber: '11111' });
              composeText.updateMessageText('test sender');
              await composeText.send();
              expect(containsErrorMessage(
                alert.state.messages,
                messageSenderMessages.notAnExtension
              )).to.not.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
                .to.equal(undefined);
            });

            it('Should Alert of notAnExtension - To Number (xxx)xxx-xxxx*xxx Format', async () => {
              composeText.addToNumber({ phoneNumber: '(888) 349-5556*999' });
              composeText.updateMessageText('test sender');
              await composeText.send();
              expect(containsErrorMessage(
                alert.state.messages,
                messageSenderMessages.notAnExtension
              )).to.not.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
                .to.equal(undefined);
            });
          });

          conditionalDescribe('GB Dialing Plan', () => {
            beforeEach(() => {
              regionSettings.setData({ countryCode: 'GB', areaCode: '' });
            });

            it('Should Alert Special Number - toNumber 101 (Existed Extension/Special Number)', async () => {
              composeText.addToNumber({ phoneNumber: '101' });
              composeText.updateMessageText('test sender');
              await composeText.send();
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
                .to.not.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
                .to.equal(undefined);
            });

            it('Should Alert notAnExtension - toNumber 998 (No Extension)', async () => {
              composeText.addToNumber({ phoneNumber: '998' });
              composeText.updateMessageText('test sender');
              await composeText.send();
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
                .to.not.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
                .to.equal(undefined);
            });

            it('Should Alert Special Number - toNumber 999', async () => {
              composeText.addToNumber({ phoneNumber: '999' });
              composeText.updateMessageText('test sender');
              await composeText.send();
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
                .to.not.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
                .to.equal(undefined);
            });

            it('Should Not Alert Special Number - toNumber 911', async () => {
              regionSettings.setData({ countryCode: 'GB', areaCode: '' });
              composeText.addToNumber({ phoneNumber: '911' });
              composeText.updateMessageText('test sender');
              await composeText.send();
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
                .to.equal(undefined);
            });
          });

          conditionalDescribe('US Dialing Plan', () => {
            beforeEach(() => {
              regionSettings.setData({ countryCode: 'US', areaCode: '' });
            });

            it('Should Alert notAnExtension - toNumber 102 (No Extension/Not Special Number) with US Dialing Plan', async () => {
              composeText.addToNumber({ phoneNumber: '102' });
              composeText.updateMessageText('test sender');
              await composeText.send();
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
                .to.not.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
                .to.equal(undefined);
            });

            it('Should Alert notAnExtension - toNumber 998 (No Extension)', async () => {
              composeText.addToNumber({ phoneNumber: '998' });
              composeText.updateMessageText('test sender');
              await composeText.send();
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
                .to.not.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
                .to.equal(undefined);
            });

            it('Should Alert Special Number - toNumber is 911', async () => {
              composeText.addToNumber({ phoneNumber: '911' });
              composeText.updateMessageText('test sender');
              await composeText.send();
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
                .to.not.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
                .to.equal(undefined);
            });

            it('Should Not Alert Special Number - toNumber 999', async () => {
              composeText.addToNumber({ phoneNumber: '999' });
              composeText.updateMessageText('test sender');
              await composeText.send();
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
                .to.equal(undefined);
            });

            it('Should Not Alert Anything - toNumber 101 (Existed Extension/Not Special Number)', async () => {
              regionSettings.setData({ countryCode: 'US', areaCode: '' });
              composeText.addToNumber({ phoneNumber: '101' });
              composeText.updateMessageText('test sender');
              try {
                await composeText.send();
              } catch (error) {
                console.debug('message sender e:', error);
              }
              const rawRequest
                = clientHistoryRequest.getRawResponse(ClientHistoryRequest.endPoints.companyPager);
              expect(rawRequest.to[0].extensionNumber).to.equal('101');
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
                .to.equal(undefined);
              expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
                .to.equal(undefined);
            });
          });
        });
      });

      conditionalDescribe('Validate after Send Api', () => {
        it('Should Alert of recipientNumberInvalids - toNumber is invalid', async () => {
          composeText.addToNumber({ phoneNumber: '19999999' });
          composeText.updateMessageText('test sender');
          try {
            await composeText.send();
          } catch (error) {
            console.debug('message sender e:', error);
          }
          expect(containsErrorMessage(
            alert.state.messages,
            messageSenderMessages.recipientNumberInvalids
          )).to.not.equal(undefined);
          expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
            .to.equal(undefined);
          expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
            .to.equal(undefined);
          expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
            .to.equal(undefined);
          expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
            .to.equal(undefined);
        });
        it('Should Alert of internationalSMSNotSupported - select international phone number', async () => {
          regionSettings.setData({countryCode: 'FR', areaCode: ''});
          composeText.addToNumber({ phoneNumber: '855899001' });
          composeText.updateMessageText("test sender");
          try{
            await composeText.send();
          }catch (error) {
            console.debug('message sender e:', error);
          }
          expect(containsErrorMessage(
            alert.state.messages,
            messageSenderMessages.internationalSMSNotSupported
          )).to.not.equal(undefined);
          expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noAreaCode))
            .to.equal(undefined);
          expect(containsErrorMessage(alert.state.messages, messageSenderMessages.specialNumber))
            .to.equal(undefined);
          expect(containsErrorMessage(alert.state.messages, messageSenderMessages.notAnExtension))
            .to.equal(undefined);
          expect(containsErrorMessage(alert.state.messages, messageSenderMessages.noToNumber))
            .to.equal(undefined);
        });
      });
    });
  });
};
