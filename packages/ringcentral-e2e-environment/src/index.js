/* eslint-disable */ 
const { createDriver } = require('./global');
const { JSDOM, VirtualConsole } = require("jsdom");
const vm = require('vm');
const { FakeTimers, installCommonGlobals } = require('jest-util');
const mock = require('jest-mock');

class WebDriverEnvironment {
  constructor(config, options) {
    this._config = config;
    this._options = options;
    this._isJSDOM = this._config.globals.execDrivers.find(driver => {
      const [name, execSetting = {}] = Array.isArray(driver) ? driver : [driver];
      return name === 'enzyme';
    });
    let global;
    if (this._isJSDOM) {
      this.dom = new JSDOM(
        '<!DOCTYPE html>',
        Object.assign({
          pretendToBeVisual: true,
          runScripts: 'dangerously',
          url: this._config.testURL,
          virtualConsole: new VirtualConsole().sendTo(
            this._options.console || console,
          ),
        },
        this._config.testEnvironmentOptions,
        ),
      );
      global = (this.global = this.dom.window.document.defaultView);
      this.global.Error.stackTraceLimit = 100;
    } else {
      this.context = vm.createContext();
      global = (this.global = vm.runInContext(
        'this',
        Object.assign(this.context, config.testEnvironmentOptions),
      ));
      global.global = global;
      global.clearInterval = clearInterval;
      global.clearTimeout = clearTimeout;
      global.setInterval = setInterval;
      global.setTimeout = setTimeout;
      if (typeof URL !== 'undefined' && typeof URLSearchParams !== 'undefined') {
        global.URL = URL;
        global.URLSearchParams = URLSearchParams;
      }
    }
    installCommonGlobals(global, this._config.globals);
    if (this._isJSDOM) {
      this.errorEventListener = event => {
        if (userErrorListenerCount === 0 && event.error) {
          process.emit('uncaughtException', event.error);
        }
      };
      global.addEventListener('error', this.errorEventListener);
      const originalAddListener = global.addEventListener;
      const originalRemoveListener = global.removeEventListener;
      let userErrorListenerCount = 0;
      global.addEventListener = function (name) {
        if (name === 'error') {
          userErrorListenerCount++;
        }
        return originalAddListener.apply(this, arguments);
      };
      global.removeEventListener = function (name) {
        if (name === 'error') {
          userErrorListenerCount--;
        }
        return originalRemoveListener.apply(this, arguments);
      };
    }  

    this.moduleMocker = new mock.ModuleMocker(global);

    const timerConfig = {
      idToRef: id => id,
      refToId: ref => ref,
    };

    this.fakeTimers = new FakeTimers({
      config: this._config,
      global,
      moduleMocker: this.moduleMocker,
      timerConfig,
    });
  }

  async setup() {
    // TODO HOOK
    const isSandbox = this._config.globals.execModes.indexOf('sandbox') > -1;
    const isHeadless = this._config.globals.execModes.indexOf('headless') > -1;
    if (isSandbox) {
      // TODO sandbox mode
    } else {
      const drivers = {};
      for (const item of this._config.globals.execDrivers) {
        const [name, execSetting = {}] = Array.isArray(item) ? item : [item];
        // TODO import browsers setting
        const defaultSetting = this._config.globals.execDefaults.browsers[name];
        const instance = createDriver(name, {
          ...defaultSetting,
          ...execSetting,
          selectorLabel: this._config.globals.execGlobal.selectorLabel
        });
        await instance.driver.run({ isHeadless });
        await instance.driver.newPage();
        drivers[name] = instance;
      }
      this.global.drivers = drivers;
    }
  }

  async teardown() {
    // TODO HOOK
    if (this._config.globals.execModes.indexOf('sandbox') > -1) {
      // TODO sandbox mode
    } else {
      for (const instance of Object.values(this.global.drivers)) {
        await instance.driver.closePage();
        await instance.driver.close();
      }
    }
    if (this.fakeTimers) {
      this.fakeTimers.dispose();
    }
    this.fakeTimers = null;
    if (this.global && this._isJSDOM) {
      if (this.errorEventListener) {
        this.global.removeEventListener('error', this.errorEventListener);
      }
      Object.defineProperty(this.global, 'document', {
        value: null
      });
      this.global.close();
    }
    this.errorEventListener = null;
    this.global = null;
    this.dom = null;
    this.context = null;
  }

  runScript(script) {
    if (this.dom) {
      return this.dom.runVMScript(script);
    }
    if (this.context) {
      return script.runInContext(this.context);
    }
    return null;
  }
}

module.exports = WebDriverEnvironment;
