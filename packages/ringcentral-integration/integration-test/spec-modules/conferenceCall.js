import {
  ensureLogin,
  containsErrorMessage
} from '../utils/HelpUtil';
import {
  waitInSeconds
} from '../utils/WaitUtil';
import * as mock from '../mock';
import ClientHistoryRequest from '../utils/ClientHistoryRequest';
import conferenceCallErrors from '../../modules/ConferenceCall/conferenceCallErrors';
import conferenceCallStatus from '../../modules/ConferenceCall/conferenceCallStatus';
import callingOptions from '../../modules/CallingSettings/callingOptions';
import callDirection from '../../enums/callDirections';
import sinon from 'sinon';

export default (auth, client, conferenceCall, alert, account) => {
  describe('ConferenceCall:', function () {
    this.timeout(20000);
    mock.mockClient(client);
    const clientHistoryRequest = new ClientHistoryRequest(new Map(), client);
    let isLoginSuccess;

    describe('Should Init Successfully with Default Setting', () => {
      it('Should Have Empty Records of Conferences By Default', () => {
        expect(conferenceCall.state.conferences).to.be.an('object').that.is.empty;
      });
      it('Should Be Idle By Default', () => {
        expect(conferenceCall.state.conferenceCallStatus).to.equal(conferenceCallStatus.idle);
      });
    });

    describe('Should Update Conference Successfully', function () {
      after(async function () {
        await auth.logout();
        await waitInSeconds(1);
      });

      before(async function () {
        mock.restore();
        mock.mockForLogin({
          mockAuthzProfile: false
        });
        isLoginSuccess = await ensureLogin(auth, account);

        if (!isLoginSuccess) {
          console.error('Skip test case as failed to login with credential ', account);
          this.skip();
        }
        mock.conferenceCall();
        mock.numberParse({}, 'US');
      });

      it('Should Update Records of Conferences When Request One', async () => {
        let sessionData;
        sessionData = await conferenceCall._makeConference();
        const rawRequest =
          clientHistoryRequest.getRawResponse(ClientHistoryRequest.endPoints.conferenceCall);
        expect(JSON.stringify(sessionData)).to.equal(JSON.stringify(rawRequest.session));
        // FIXME: because we are unable to mock sip.js instance, so skip the session assertation below:        
        // expect(conferenceCall.conferences).to.have.key(rawRequest.session.id);
      });

      it('Should Not Have Failure Alert', () => {
        Object.values(conferenceCallErrors).forEach(err => {
          expect(containsErrorMessage(
            alert.state.messages,
            err
          )).to.equal(undefined);
        });
      });
    });

    describe('Should Failed to Update Conference', async () => {
      after(async function () {
        await auth.logout();
        await waitInSeconds(1);
      });

      before(async function () {
        conferenceCall._reset();
        mock.restore();
        mock.mockForLogin({
          mockAuthzProfile: false
        });
        isLoginSuccess = await ensureLogin(auth, account);

        if (!isLoginSuccess) {
          console.error('Skip test case as failed to login with credential ', account);
          this.skip();
        }
        mock.mockForbidden({
          method: 'POST',
          path: ClientHistoryRequest.endPoints.conferenceCall
        });
        mock.numberParse({}, 'US');
      });

      it('Should Have No Records of Conference', async () => {
        await conferenceCall._makeConference(false);
        expect(conferenceCall.conferences).to.be.an('object').that.is.empty;
      });

      it('Should Have A Failure Alert', () => {
        expect(containsErrorMessage(
          alert.state.messages,
          conferenceCallErrors.makeConferenceFailed
        )).to.not.equal(undefined);
      });

      it('Should Not Bring Session into Non-existent Conference', async () => {
        try {
          await conferenceCall.bringInToConference(Math.random(), {
            direction: callDirection.outbound
          });
        } catch (e) {
          // skip the error that were throwed intentinally
        }
        expect(containsErrorMessage(
          alert.state.messages,
          conferenceCallErrors.makeConferenceFailed
        )).to.not.equal(undefined);
      });
    });
  });
};
