import { expect } from 'chai';
import sinon from 'sinon';
import { createStore } from 'redux';
import NumberValidate from './index';
import getNumberValidateReducer from './getNumberValidateReducer';
import actionTypes from './numberValidateActionTypes';

describe('NumberValidate Unit Test', () => {
  let numberValidate;
  let store;

  beforeEach(() => {
    numberValidate = sinon.createStubInstance(NumberValidate);
    store = createStore(getNumberValidateReducer(actionTypes));
    numberValidate._store = store;
    numberValidate._brand = {
      ready: true,
      id: '1210'
    };
    numberValidate._prefixedActionTypes = actionTypes;
    [
      '_onStateChange',
      '_shouldInit',
      '_shouldReset',
      '_initModuleStatus',
      '_resetModuleStatus',
      'isNoToNumber',
      'isNoAreaCode',
      '_isSpecial',
      'isNotAnExtension',
      'isCompanyExtension',
      'validateNumbers',
      'validateFormat',
      'validateWithNumberParser',
      '_numberParser',
      '_numberParserApi',
    ].forEach((key) => {
      numberValidate[key].restore();
    });
  });

  describe('_onStateChange', () => {
    it('_initModuleStatus should be called once when _shouldInit is true', () => {
      sinon.stub(numberValidate, '_shouldInit').callsFake(() => true);
      sinon.stub(numberValidate, '_shouldReset').callsFake(() => false);
      sinon.stub(numberValidate, '_initModuleStatus');
      sinon.stub(numberValidate, '_resetModuleStatus');
      numberValidate._onStateChange();
      sinon.assert.calledOnce(numberValidate._initModuleStatus);
      sinon.assert.notCalled(numberValidate._resetModuleStatus);
    });

    it('_resetModuleStatus should be called once when _shouldReset is true', () => {
      sinon.stub(numberValidate, '_shouldInit').callsFake(() => false);
      sinon.stub(numberValidate, '_shouldReset').callsFake(() => true);
      sinon.stub(numberValidate, '_resetModuleStatus');
      sinon.stub(numberValidate, '_initModuleStatus');
      numberValidate._onStateChange();
      sinon.assert.notCalled(numberValidate._initModuleStatus);
      sinon.assert.calledOnce(numberValidate._resetModuleStatus);
    });

    it('_initModuleStatus and _resetModuleStatus should Not be called', () => {
      sinon.stub(numberValidate, '_shouldInit').callsFake(() => false);
      sinon.stub(numberValidate, '_shouldReset').callsFake(() => false);
      sinon.stub(numberValidate, '_resetModuleStatus');
      sinon.stub(numberValidate, '_initModuleStatus');
      numberValidate._onStateChange();
      sinon.assert.notCalled(numberValidate._resetModuleStatus);
      sinon.assert.notCalled(numberValidate._initModuleStatus);
    });
  });

  describe('_shouldInit', () => {
    describe('when numberValidate is not ready', () => {
      beforeEach(() => {
        sinon.stub(numberValidate, 'ready', { get: () => false });
      });

      describe('when accountInfo is ready', () => {
        beforeEach(() => {
          numberValidate._accountInfo = {
            ready: true
          };
        });

        it('Should return true when _regionSettings is ready, _accountExtension is ready', () => {
          numberValidate._regionSettings = {
            ready: true
          };
          numberValidate._accountExtension = {
            ready: true
          };
          expect(numberValidate._shouldInit()).to.equal(true);
        });

        it(`Should return false when _regionSettings is not ready and
            _accountExtension is ready`, () => {
          numberValidate._regionSettings = {
            ready: false
          };
          numberValidate._accountExtension = {
            ready: true
          };
          expect(numberValidate._shouldInit()).to.equal(false);
        });

        it(`Should return false when _regionSettings is ready and
            _accountExtension is not ready`, () => {
          numberValidate._regionSettings = {
            ready: true
          };
          numberValidate._accountExtension = {
            ready: false
          };
          expect(numberValidate._shouldInit()).to.equal(false);
        });

        it(`Should return false when _regionSettings is not ready and
            _accountExtension is not ready`, () => {
          numberValidate._regionSettings = {
            ready: false
          };
          numberValidate._accountExtension = {
            ready: false
          };
          expect(numberValidate._shouldInit()).to.equal(false);
        });
      });

      describe('when accountInfo is not ready', () => {
        beforeEach(() => {
          numberValidate._accountInfo = {
            ready: false
          };
        });

        it('Should return false when _regionSettings is ready, _accountExtension is ready', () => {
          numberValidate._regionSettings = {
            ready: true
          };
          numberValidate._accountExtension = {
            ready: true
          };
          expect(numberValidate._shouldInit()).to.equal(false);
        });

        it(`Should return false when _regionSettings is not ready and
            _accountExtension is ready`, () => {
          numberValidate._regionSettings = {
            ready: false
          };
          numberValidate._accountExtension = {
            ready: true
          };
          expect(numberValidate._shouldInit()).to.equal(false);
        });

        it(`Should return false when _regionSettings is ready and
            _accountExtension is not ready`, () => {
          numberValidate._regionSettings = {
            ready: true
          };
          numberValidate._accountExtension = {
            ready: false
          };
          expect(numberValidate._shouldInit()).to.equal(false);
        });

        it(`Should return false when _regionSettings is not ready and
            _accountExtension is not ready`, () => {
          numberValidate._regionSettings = {
            ready: false
          };
          numberValidate._accountExtension = {
            ready: false
          };
          expect(numberValidate._shouldInit()).to.equal(false);
        });
      });
    });

    describe('when numberValidate is ready', () => {
      beforeEach(() => {
        sinon.stub(numberValidate, 'ready', { get: () => true });
      });

      describe('when accountInfo is ready', () => {
        beforeEach(() => {
          numberValidate._accountInfo = {
            ready: true
          };
        });

        it('Should return false when _regionSettings is ready, _accountExtension is ready', () => {
          numberValidate._regionSettings = {
            ready: true
          };
          numberValidate._accountExtension = {
            ready: true
          };
          expect(numberValidate._shouldInit()).to.equal(false);
        });

        it(`Should return false when _regionSettings is not ready and
            _accountExtension is ready`, () => {
          numberValidate._regionSettings = {
            ready: false
          };
          numberValidate._accountExtension = {
            ready: true
          };
          expect(numberValidate._shouldInit()).to.equal(false);
        });

        it(`Should return false when _regionSettings is ready and
            _accountExtension is not ready`, () => {
          numberValidate._regionSettings = {
            ready: true
          };
          numberValidate._accountExtension = {
            ready: false
          };
          expect(numberValidate._shouldInit()).to.equal(false);
        });

        it('Should return false when _regionSettings and _accountExtension is not ready', () => {
          numberValidate._regionSettings = {
            ready: false
          };
          numberValidate._accountExtension = {
            ready: false
          };
          expect(numberValidate._shouldInit()).to.equal(false);
        });
      });

      describe('when accountInfo is not ready', () => {
        beforeEach(() => {
          numberValidate._accountInfo = {
            ready: false
          };
        });

        it('Should return false when _regionSettings is ready, _accountExtension is ready', () => {
          numberValidate._regionSettings = {
            ready: true
          };
          numberValidate._accountExtension = {
            ready: true
          };
          expect(numberValidate._shouldInit()).to.equal(false);
        });

        it(`Should return false when _regionSettings is not ready and
            _accountExtension is ready`, () => {
          numberValidate._regionSettings = {
            ready: false
          };
          numberValidate._accountExtension = {
            ready: true
          };
          expect(numberValidate._shouldInit()).to.equal(false);
        });

        it(`Should return false when _regionSettings is ready and
            _accountExtension is not ready`, () => {
          numberValidate._regionSettings = {
            ready: true
          };
          numberValidate._accountExtension = {
            ready: false
          };
          expect(numberValidate._shouldInit()).to.equal(false);
        });

        it(`Should return false when _regionSettings and
            _accountExtension is all not ready`, () => {
          numberValidate._regionSettings = {
            ready: false
          };
          numberValidate._accountExtension = {
            ready: false
          };
          expect(numberValidate._shouldInit()).to.equal(false);
        });
      });
    });
  });

  describe('_shouldReset', () => {
    describe('when numberValidate is not ready', () => {
      beforeEach(() => {
        sinon.stub(numberValidate, 'ready', { get: () => false });
      });

      describe('when accountInfo is not ready', () => {
        beforeEach(() => {
          numberValidate._accountInfo = {
            ready: false
          };
        });

        it('Should return false when _regionSettings _accountExtension is all ready', () => {
          numberValidate._regionSettings = {
            ready: true
          };
          numberValidate._accountExtension = {
            ready: true
          };
          expect(numberValidate._shouldReset()).to.equal(false);
        });

        it(`Should return false when _regionSettings is not ready,
            _accountExtension is ready`, () => {
          numberValidate._regionSettings = {
            ready: false
          };
          numberValidate._accountExtension = {
            ready: true
          };
          expect(numberValidate._shouldReset()).to.equal(false);
        });

        it(`Should return false when _regionSettings is ready,
            _accountExtension is not ready`, () => {
          numberValidate._regionSettings = {
            ready: true
          };
          numberValidate._accountExtension = {
            ready: false
          };
          expect(numberValidate._shouldReset()).to.equal(false);
        });

        it('Should return false when _regionSettings and _accountExtension is not ready', () => {
          numberValidate._regionSettings = {
            ready: false
          };
          numberValidate._accountExtension = {
            ready: false
          };
          expect(numberValidate._shouldReset()).to.equal(false);
        });
      });

      describe('when accountInfo is ready', () => {
        beforeEach(() => {
          numberValidate._accountInfo = {
            ready: true
          };
        });

        it('Should return false when _regionSettings _accountExtension is all ready', () => {
          numberValidate._regionSettings = {
            ready: true
          };
          numberValidate._accountExtension = {
            ready: true
          };
          expect(numberValidate._shouldReset()).to.equal(false);
        });

        it(`Should return false when _regionSettings is not ready and
            _accountExtension is ready`, () => {
          numberValidate._regionSettings = {
            ready: false
          };
          numberValidate._accountExtension = {
            ready: true
          };
          expect(numberValidate._shouldReset()).to.equal(false);
        });

        it(`Should return false when _regionSettings is ready,
            _accountExtension is not ready`, () => {
          numberValidate._regionSettings = {
            ready: true
          };
          numberValidate._accountExtension = {
            ready: false
          };
          expect(numberValidate._shouldReset()).to.equal(false);
        });

        it('Should return false when _regionSettings and _accountExtension is not ready', () => {
          numberValidate._regionSettings = {
            ready: false
          };
          numberValidate._accountExtension = {
            ready: false
          };
          expect(numberValidate._shouldReset()).to.equal(false);
        });
      });
    });

    describe('when numberValidate is ready', () => {
      beforeEach(() => {
        sinon.stub(numberValidate, 'ready', { get: () => true });
      });

      describe('when accountInfo is not ready', () => {
        beforeEach(() => {
          numberValidate._accountInfo = {
            ready: false
          };
        });

        it('Should return true when _regionSettings and _accountExtension is all ready', () => {
          numberValidate._regionSettings = {
            ready: true
          };
          numberValidate._accountExtension = {
            ready: true
          };
          expect(numberValidate._shouldReset()).to.equal(true);
        });

        it(`Should return true when _regionSettings is not ready and
            _accountExtension is ready`, () => {
          numberValidate._regionSettings = {
            ready: false
          };
          numberValidate._accountExtension = {
            ready: true
          };
          expect(numberValidate._shouldReset()).to.equal(true);
        });

        it(`Should return true when _regionSettings is ready,
            _accountExtension is not ready`, () => {
          numberValidate._regionSettings = {
            ready: true
          };
          numberValidate._accountExtension = {
            ready: false
          };
          expect(numberValidate._shouldReset()).to.equal(true);
        });

        it(`Should return true when _regionSettings is not ready,
            _accountExtension is not ready`, () => {
          numberValidate._regionSettings = {
            ready: false
          };
          numberValidate._accountExtension = {
            ready: false
          };
          expect(numberValidate._shouldReset()).to.equal(true);
        });
      });

      describe('when accountInfo is ready', () => {
        beforeEach(() => {
          numberValidate._accountInfo = {
            ready: true
          };
        });

        it('Should return false when _regionSettings and _accountExtension is all ready', () => {
          numberValidate._regionSettings = {
            ready: true
          };
          numberValidate._accountExtension = {
            ready: true
          };
          expect(numberValidate._shouldReset()).to.equal(false);
        });

        it(`Should return true when _regionSettings is not ready and
            _accountExtension is ready`, () => {
          numberValidate._regionSettings = {
            ready: false
          };
          numberValidate._accountExtension = {
            ready: true
          };
          expect(numberValidate._shouldReset()).to.equal(true);
        });

        it(`Should return true when _regionSettings is ready and
            _accountExtension is not ready`, () => {
          numberValidate._regionSettings = {
            ready: true
          };
          numberValidate._accountExtension = {
            ready: false
          };
          expect(numberValidate._shouldReset()).to.equal(true);
        });

        it(`Should return true when _regionSettings is not ready and
            _accountExtension is not ready`, () => {
          numberValidate._regionSettings = {
            ready: false
          };
          numberValidate._accountExtension = {
            ready: false
          };
          expect(numberValidate._shouldReset()).to.equal(true);
        });
      });
    });
  });

  describe('isNoToNumber', () => {
    it('should return true if phoneNumber is blank', () => {
      const result = numberValidate.isNoToNumber('');
      expect(result).to.equal(true);
    });

    it('should return true if cleanNumber is blank', () => {
      const result = numberValidate.isNoToNumber("iamn%@onedi!@$%^&()_=\\][';/.,~nu><.,,?/mber");
      expect(result).to.equal(true);
    });

    it('should return false if phoneNumber is extensionNumber', () => {
      const result = numberValidate.isNoToNumber('1234');
      expect(result).to.equal(false);
    });

    it('should return false if phoneNumber is valid', () => {
      const result = numberValidate.isNoToNumber('(999) 1234 567');
      expect(result).to.equal(false);
    });

    it('should return false if phoneNumber is e164 format', () => {
      const result = numberValidate.isNoToNumber('(+1234567890');
      expect(result).to.equal(false);
    });
  });

  describe('isNoAreaCode', () => {
    it('should return false if phoneNumber is ServiceNumber', () => {
      numberValidate._regionSettings = {
        countryCode: 'US',
        areaCode: '666'
      };
      const result = numberValidate.isNoAreaCode('*101');
      expect(result).to.equal(false);
    });

    it('should return false if phoneNumber is hasPlus', () => {
      numberValidate._regionSettings = {
        countryCode: 'US',
        areaCode: '666'
      };
      const result = numberValidate.isNoAreaCode('+16508370000');
      expect(result).to.equal(false);
    });

    it('should return false if phoneNumber length is not 7', () => {
      numberValidate._regionSettings = {
        countryCode: 'US',
        areaCode: '666',
      };
      const result = numberValidate.isNoAreaCode('16508370000');
      expect(result).to.equal(false);
    });

    it('should return false if phoneNumber length is 7 and countryCode is not CA or US', () => {
      numberValidate._regionSettings = {
        countryCode: 'GB',
        areaCode: '',
      };
      const result = numberValidate.isNoAreaCode('8370000');
      expect(result).to.equal(false);
    });

    it('should return false if phoneNumber length is 7, countryCode is CA and has areaCode', () => {
      numberValidate._regionSettings = {
        countryCode: 'CA',
        areaCode: '666',
      };
      const result = numberValidate.isNoAreaCode('8370000');
      expect(result).to.equal(false);
    });

    it('should return false if phoneNumber length is 7, countryCode is US and has areaCode', () => {
      numberValidate._regionSettings = {
        countryCode: 'US',
        areaCode: '666',
      };
      const result = numberValidate.isNoAreaCode('8370000');
      expect(result).to.equal(false);
    });

    it('should return true if phoneNumber length is 7, countryCode is US and has not areaCode', () => {
      numberValidate._regionSettings = {
        countryCode: 'US',
        areaCode: '',
      };
      const result = numberValidate.isNoAreaCode('8370000');
      expect(result).to.equal(true);
    });

    it('should return true if phoneNumber length is 7, countryCode is CA and has not areaCode', () => {
      numberValidate._regionSettings = {
        countryCode: 'CA',
        areaCode: '',
      };
      const result = numberValidate.isNoAreaCode('8370000');
      expect(result).to.equal(true);
    });
  });

  describe('_isSpecial', () => {
    it('should return false if phoneNumber is null', () => {
      const result = numberValidate._isSpecial(null);
      expect(result).to.equal(false);
    });

    it('should return false if special is false', () => {
      const result = numberValidate._isSpecial({ special: false });
      expect(result).to.equal(false);
    });

    it('should return true if special is true', () => {
      const result = numberValidate._isSpecial({ special: true });
      expect(result).to.equal(true);
    });
  });

  describe('isNotAnExtension', () => {
    it('should return false if extensionNumber is null', () => {
      numberValidate._accountExtension = {
        isAvailableExtension: () => false,
      };
      const result = numberValidate.isNotAnExtension(null);
      expect(result).to.equal(false);
    });

    it('should return false if extensionNumber length is more than 6', () => {
      numberValidate._accountExtension = {
        isAvailableExtension: () => false,
      };
      const result = numberValidate.isNotAnExtension('1234567');
      expect(result).to.equal(false);
    });

    it('should return false if extensionNumber is isAvailableExtension', () => {
      numberValidate._accountExtension = {
        isAvailableExtension: () => true,
      };
      const result = numberValidate.isNotAnExtension('12345');
      expect(result).to.equal(false);
    });

    it('should return true if extensionNumber is not isAvailableExtension', () => {
      numberValidate._accountExtension = {
        isAvailableExtension: () => false,
      };
      const result = numberValidate.isNotAnExtension('12345');
      expect(result).to.equal(true);
    });
  });

  describe('isCompanyExtension', () => {
    it('should return false if companyNumber is not mainCompanyNumber', () => {
      numberValidate._accountExtension = {
        isAvailableExtension: () => true,
      };
      numberValidate._regionSettings = {
        countryCode: 'US',
        areaCode: '',
      };
      numberValidate._accountInfo = {
        mainCompanyNumber: '+1234567890',
      };
      const result = numberValidate.isCompanyExtension('+1234567891', '101');
      expect(result).to.equal(false);
    });

    it('should return false if extensionNumber is not AvailableExtension', () => {
      numberValidate._accountExtension = {
        isAvailableExtension: () => false,
      };
      numberValidate._regionSettings = {
        countryCode: 'US',
        areaCode: '',
      };
      numberValidate._accountInfo = {
        mainCompanyNumber: '+1234567890',
      };
      const result = numberValidate.isCompanyExtension('+1234567890', '999');
      expect(result).to.equal(false);
    });

    it('should return true if extensionNumber is AvailableExtension', () => {
      numberValidate._accountExtension = {
        isAvailableExtension: () => true,
      };
      numberValidate._regionSettings = {
        countryCode: 'US',
        areaCode: '',
      };
      numberValidate._accountInfo = {
        mainCompanyNumber: '+1234567890',
      };
      const result = numberValidate.isCompanyExtension('+1234567890', '999');
      expect(result).to.equal(true);
    });
  });

  describe('validateNumbers', () => {
    it('should call validateWithNumberParser once if validateFormat result is true', async () => {
      sinon.stub(numberValidate, 'validateFormat').callsFake(() => ({ result: true }));
      sinon.stub(numberValidate, 'validateWithNumberParser');
      await numberValidate.validateNumbers(['1234']);
      sinon.assert.calledOnce(numberValidate.validateWithNumberParser);
    });

    it('should not call validateWithNumberParser once if validateFormat result is false', async () => {
      sinon.stub(numberValidate, 'validateFormat').callsFake(() => ({ result: false }));
      sinon.stub(numberValidate, 'validateWithNumberParser');
      await numberValidate.validateNumbers(['1234']);
      sinon.assert.notCalled(numberValidate.validateWithNumberParser);
    });
  });

  describe('validateFormat', () => {
    it('should result false if isNoToNumber return true', () => {
      sinon.stub(numberValidate, 'isNoToNumber').callsFake(() => true);
      sinon.stub(numberValidate, 'isNoAreaCode').callsFake(() => false);
      const result = numberValidate.validateFormat(['aaa']);
      expect(result).to.deep.equal({
        result: false,
        errors: [{ phoneNumber: 'aaa', type: 'noToNumber' }],
      });
    });

    it('should result false if isNoAreaCode return true', () => {
      sinon.stub(numberValidate, 'isNoToNumber').callsFake(() => false);
      sinon.stub(numberValidate, 'isNoAreaCode').callsFake(() => true);
      const result = numberValidate.validateFormat(['8370000']);
      expect(result).to.deep.equal({
        result: false,
        errors: [{ phoneNumber: '8370000', type: 'noAreaCode' }],
      });
    });

    it('should result true if phoneNumbers is valid', () => {
      sinon.stub(numberValidate, 'isNoToNumber').callsFake(() => false);
      sinon.stub(numberValidate, 'isNoAreaCode').callsFake(() => false);
      const result = numberValidate.validateFormat(['8370000']);
      expect(result).to.deep.equal({
        result: true,
        errors: [],
      });
    });
  });

  describe('validateWithNumberParser', () => {
    it('should return result false if one number is special number', async () => {
      sinon.stub(numberValidate, '_numberParser').callsFake(
        () => [{ special: true, originalString: '999' }]
      );
      sinon.stub(numberValidate, '_isSpecial').callsFake(() => true);
      sinon.stub(numberValidate, 'isNotAnExtension').callsFake(() => false);
      const result = await numberValidate.validateWithNumberParser(['999']);
      expect(result).to.deep.equal({
        result: false,
        numbers: [],
        errors: [{ phoneNumber: '999', type: 'specialNumber' }],
      });
    });

    it('should return result false if one number is not an extension number', async () => {
      sinon.stub(numberValidate, '_numberParser').callsFake(
        () => [{ special: true, originalString: '999' }]
      );
      sinon.stub(numberValidate, '_isSpecial').callsFake(() => false);
      sinon.stub(numberValidate, 'isNotAnExtension').callsFake(() => true);
      const result = await numberValidate.validateWithNumberParser(['999']);
      expect(result).to.deep.equal({
        result: false,
        numbers: [],
        errors: [{ phoneNumber: '999', type: 'notAnExtension' }],
      });
    });

    it('should return result true if phoneNumbers is valid', async () => {
      sinon.stub(numberValidate, '_numberParser').callsFake(
        () => [{ special: true, originalString: '999' }]
      );
      sinon.stub(numberValidate, '_isSpecial').callsFake(() => false);
      sinon.stub(numberValidate, 'isNotAnExtension').callsFake(() => false);
      const result = await numberValidate.validateWithNumberParser(['999']);
      expect(result).to.deep.equal({
        result: true,
        numbers: [{ special: true, originalString: '999' }],
        errors: [],
      });
    });
  });

  describe('_numberParser', () => {
    it('should call _numberParserApi if countryCode is exist', async () => {
      sinon.stub(numberValidate, '_numberParserApi').callsFake(
        () => ({ phoneNumbers: [123] })
      );
      numberValidate._regionSettings = {
        countryCode: 'US',
        areaCode: '666',
      };
      await numberValidate._numberParser(['999']);
      sinon.assert.calledOnce(numberValidate._numberParserApi);
    });

    it('should call _numberParserApi if countryCode is exist', async () => {
      sinon.stub(numberValidate, '_numberParserApi').callsFake(
        () => ({ phoneNumbers: [123] })
      );
      numberValidate._regionSettings = {
        countryCode: null,
        areaCode: '666',
      };
      await numberValidate._numberParser(['999']);
      sinon.assert.calledOnce(numberValidate._numberParserApi);
    });
  });
});
