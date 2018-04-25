import { expect } from 'chai';
import sinon from 'sinon';
import RolesAndPermissions from './';

describe('RolesAndPermissions Test', () => {
  let rolesAndPermissions;

  beforeEach(() => {
    rolesAndPermissions = new RolesAndPermissions({
      auth: {},
      client: {},
      alert: {},
      extensionInfo: {},
      isCRM: false,
    });
    sinon.stub(rolesAndPermissions, 'ready').get(() => true);
  });

	describe('callingEnabled', () => {
    it('should have calling permission when webphone and ringout are enabled', () => {
      const s1 = sinon.stub(rolesAndPermissions, 'webphoneEnabled').get(() => true);
      const s2 = sinon.stub(rolesAndPermissions, 'ringoutEnabled').get(() => true);
      expect(rolesAndPermissions.callingEnabled).to.equal(true);
      s1.restore();
      s2.restore();
    });

    it('should have calling permission when webphone or ringout is enabled', () => {
      const s1 = sinon.stub(rolesAndPermissions, 'webphoneEnabled').get(() => true);
      const s2 = sinon.stub(rolesAndPermissions, 'ringoutEnabled').get(() => false);
      expect(rolesAndPermissions.callingEnabled).to.equal(true);
      s1.restore();
      s2.restore();
    });

    it('should have calling permission when webphone or ringout is enabled', () => {
      const s1 = sinon.stub(rolesAndPermissions, 'webphoneEnabled').get(() => false);
      const s2 = sinon.stub(rolesAndPermissions, 'ringoutEnabled').get(() => true);
      expect(rolesAndPermissions.callingEnabled).to.equal(true);
      s1.restore();
      s2.restore();
    });

    it('should not have calling permission when webphone and ringout are not enabled', () => {
      const s1 = sinon.stub(rolesAndPermissions, 'webphoneEnabled').get(() => false);
      const s2 = sinon.stub(rolesAndPermissions, 'ringoutEnabled').get(() => false);
      expect(rolesAndPermissions.callingEnabled).to.equal(false);
      s1.restore();
      s2.restore();
    });
  });

  describe('hasComposeTextPermission', () => {
    it('should have compose text permission when Pager or SMS is enabled', () => {
      const s1 = sinon.stub(rolesAndPermissions, 'serviceFeatures').get(() => ({
        Pager: { enabled: true },
        SMS: { enabled: false },
      }));
      expect(rolesAndPermissions.hasComposeTextPermission).to.equal(true);
      s1.restore();
    });

    it('should not have compose text permission when Pager or SMS is not enabled', () => {
      const s1 = sinon.stub(rolesAndPermissions, 'serviceFeatures').get(() => ({
        Pager: { enabled: false },
        SMS: { enabled: false },
      }));
      expect(rolesAndPermissions.hasComposeTextPermission).to.equal(false);
      s1.restore();
    });
  });

  describe('readTextPermissions', () => {
    it('should have readTextPermissions when Pager or SMS Receiving is enabled', () => {
      const s1 = sinon.stub(rolesAndPermissions, 'serviceFeatures').get(() => ({
        PagerReceiving: { enabled: false },
        SMSReceiving: { enabled: true },
      }));
      expect(rolesAndPermissions.readTextPermissions).to.equal(true);
      s1.restore();
    });

    it('should not have readTextPermissions when Pager and SMS Receiving are not enabled', () => {
      const s1 = sinon.stub(rolesAndPermissions, 'serviceFeatures').get(() => ({
        PagerReceiving: { enabled: false },
        SMSReceiving: { enabled: false },
      }));
      expect(rolesAndPermissions.readTextPermissions).to.equal(false);
      s1.restore();
    });
  });

  describe('voicemailPermissions', () => {
    it('should not have voicemailPermission when has no voicemail permission', () => {
      const s1 = sinon.stub(rolesAndPermissions, 'serviceFeatures').get(() => ({
        Voicemail: { enabled: true },
      }));
      const s2 = sinon.stub(rolesAndPermissions, 'permissions').get(() => ({
        Voicemail: false,
      }));
      expect(rolesAndPermissions.voicemailPermissions).to.equal(false);
      s1.restore();
      s2.restore();
    });
  });
});
