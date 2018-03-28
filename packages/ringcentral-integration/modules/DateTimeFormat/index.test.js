import { expect } from 'chai';
import sinon from 'sinon';
import { createStore } from 'redux';
import DateTimeFormat from './index';
import getDateTimeFormatReducer from './getDateTimeFormatReducer';
import actionTypes from './actionTypes';
import moduleStatuses from '../../enums/moduleStatuses';

describe('DateTimeFormat Unit Test', () => {
  let dateTimeFormat;
  let store;

  beforeEach(() => {
    dateTimeFormat = sinon.createStubInstance(DateTimeFormat);
    store = createStore(getDateTimeFormatReducer(actionTypes));
    dateTimeFormat._store = store;
    dateTimeFormat._prefixedActionTypes = actionTypes;
    [
      '_onStateChange',
      '_shouldInit',
      '_shouldReset',
      'formatDateTime',
      'formatDate',
      'formatTime',
      'addFormatter',
    ].forEach((key) => {
      dateTimeFormat[key].restore();
    });
  });
  describe('_shouldInit', () => {
    [true, false].forEach((localeReady) => {
      [true, false].forEach((pending) => {
        const expectedResult = localeReady && pending;
        it(`should return ${expectedResult} when this._locale.ready === ${localeReady}
            and this.pending === ${pending}`, () => {
          dateTimeFormat._locale = {
            get ready() {
              return localeReady;
            },
          };
          sinon.stub(dateTimeFormat, 'pending', {
            get: () => pending,
          });
          expect(dateTimeFormat._shouldInit())
            .to.equal(expectedResult);
        });
      });
    });
  });
  describe('_shouldReset', () => {
    [true, false].forEach((localeReady) => {
      [true, false].forEach((ready) => {
        const expectedResult = !localeReady && ready;
        it(`should return ${expectedResult} when this._locale.ready === ${localeReady}
            and this.ready === ${ready}`, () => {
          dateTimeFormat._locale = {
            get ready() {
              return localeReady;
            },
          };
          sinon.stub(dateTimeFormat, 'ready', {
            get: () => ready,
          });
          expect(dateTimeFormat._shouldReset())
            .to.equal(expectedResult);
        });
      });
    });
  });
  describe('_onStateChange', () => {
    it('should initialze module when _shouldInit() is true', () => {
      sinon.stub(dateTimeFormat, '_shouldInit').callsFake(() => true);
      sinon.stub(dateTimeFormat, '_shouldReset').callsFake(() => false);
      const checker = sinon.stub();
      dateTimeFormat.store.subscribe(checker);
      dateTimeFormat._onStateChange();
      sinon.assert.calledTwice(checker);
      expect(dateTimeFormat.store.getState().status).to.equal(moduleStatuses.ready);
      expect(dateTimeFormat._defaultFormatter).to.be.a('function');
    });
    it('should reset module when _shouldReset() is true', () => {
      sinon.stub(dateTimeFormat, '_shouldInit').callsFake(() => false);
      sinon.stub(dateTimeFormat, '_shouldReset').callsFake(() => true);
      dateTimeFormat.store.dispatch({
        type: actionTypes.initSuccess,
      });
      const checker = sinon.stub();
      dateTimeFormat.store.subscribe(checker);
      dateTimeFormat._onStateChange();
      sinon.assert.calledTwice(checker);
      expect(dateTimeFormat.store.getState().status).to.equal(moduleStatuses.pending);
    });

    it('should not do anything else', () => {
      sinon.stub(dateTimeFormat, '_shouldInit').callsFake(() => false);
      sinon.stub(dateTimeFormat, '_shouldReset').callsFake(() => false);
      const checker = sinon.stub();
      dateTimeFormat.store.subscribe(checker);
      dateTimeFormat._onStateChange();
      sinon.assert.notCalled(checker);
    });
  });

  describe('addFormatter', () => {
    it('should add formatter function to the module', () => {
      const module = new DateTimeFormat({ locale: {} });
      const name = 'foo';
      const formatter = () => { };
      module.addFormatter({
        name,
        formatter,
      });
      expect(module._formatters[name]).to.equal(formatter);
    });
    [null, undefined, ''].forEach((value) => {
      it(`should throw if name is ${JSON.stringify(value)}`, () => {
        const module = new DateTimeFormat({ locale: {} });
        const formatter = () => { };
        expect(() => {
          module.addFormatter({
            name: value,
            formatter,
          });
        }).to.throw();
      });
    });
    [undefined, 123, {}, 'bar'].forEach((formatter) => {
      it(`should throw if formatter is ${typeof formatter}`, () => {
        const module = new DateTimeFormat({ locale: {} });
        const name = 'foo';
        expect(() => {
          module.addFormatter({
            name,
            formatter,
          });
        }).to.throw();
      });
    });
    it('should throw if formatter of the same name exists', () => {
      const module = new DateTimeFormat({ locale: {} });
      const name = 'foo';
      module.addFormatter({
        name,
        formatter: () => { },
      });
      expect(() => {
        module.addFormatter({
          name,
          formatter: () => { },
        });
      }).to.throw();
    });
  });

  describe('formatDateTime', () => {
    it('should default to _defaultFormatter with name === undefined', () => {
      const module = new DateTimeFormat({ locale: { currentLocale: 'en-US' } });
      module._defaultFormatter = sinon.stub();
      module.formatDateTime({ utcTimestamp: Date.now() });
      sinon.assert.calledOnce(module._defaultFormatter);
    });
    it('should default to _defaultFormatter if formatter is not found', () => {
      const module = new DateTimeFormat({ locale: { currentLocale: 'en-US' } });
      module._defaultFormatter = sinon.stub();
      module.formatDateTime({
        name: 'foo',
        utcTimestamp: Date.now(),
      });
      sinon.assert.calledOnce(module._defaultFormatter);
    });
    it('should call named formatter', () => {
      const module = new DateTimeFormat({ locale: { currentLocale: 'en-US' } });
      const name = 'foo';
      const formatter = sinon.stub();
      module.addFormatter({
        name,
        formatter,
      });
      module.formatDateTime({
        name,
        utcTimestamp: Date.now(),
      });
      sinon.assert.calledOnce(formatter);
    });
    it('should pass utcTimestamp, locale, type to formatter', () => {
      const module = new DateTimeFormat({ locale: { currentLocale: 'en-US' } });
      const options = {
        locale: 'foo',
        type: 'bar',
        utcTimestamp: Date.now(),
      };
      module._defaultFormatter = (args) => {
        expect(args).to.deep.equal(options);
      };
      module.formatDateTime(options);
    });
    it('should default locale to this._locale.currentLocale', () => {
      const currentLocale = 'foo';
      const module = new DateTimeFormat({ locale: { currentLocale } });
      const options = {
        type: 'bar',
        utcTimestamp: Date.now(),
      };
      module._defaultFormatter = (args) => {
        expect(args).to.deep.equal({
          ...options,
          locale: currentLocale,
        });
      };
      module.formatDateTime(options);
    });
  });

  describe('formatDate', () => {
    it('should call formatDateTime with type set to "date"', () => {
      const module = new DateTimeFormat({ locale: { currentLocale: 'en-US' } });
      const options = {
        locale: 'foo',
        name: 'bar',
        utcTimestamp: Date.now(),
      };
      sinon.stub(module, 'formatDateTime');
      module.formatDate(options);
      expect(module.formatDateTime.args[0][0])
        .to.deep.equal({
          ...options,
          type: 'date',
        });
    });
  });
  describe('formatTime', () => {
    it('should call formatDateTime with type set to "time"', () => {
      const module = new DateTimeFormat({ locale: { currentLocale: 'en-US' } });
      const options = {
        locale: 'foo',
        name: 'bar',
        utcTimestamp: Date.now(),
      };
      sinon.stub(module, 'formatDateTime');
      module.formatTime(options);
      expect(module.formatDateTime.args[0][0])
        .to.deep.equal({
          ...options,
          type: 'time',
        });
    });
  });
});
