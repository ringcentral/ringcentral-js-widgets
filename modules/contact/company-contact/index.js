'use strict';

var _RcModule = require('../../../lib/RcModule');

var _RcModule2 = _interopRequireDefault(_RcModule);

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

var _companyContactReducer = require('./company-contact-reducer');

var _companyContactReducer2 = _interopRequireDefault(_companyContactReducer);

var _companyContactActions = require('./company-contact-actions');

var _companyContactActions2 = _interopRequireDefault(_companyContactActions);

var _fetchList = require('../../../lib/fetchList');

var _fetchList2 = _interopRequireDefault(_fetchList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['api', 'platform', 'settings']);
// TODO refactor
// /**
//  * @class
//  * @description Contact module
//  */
// export default class CompanyContact extends RcModule {
//   /**
//    * @function
//    */
//   constructor(options) {
//     super({
//       ...options,
//       actions,
//     });
//     const {
//       api,
//       platform,
//       settings,
//     } = options;
//     this[symbols.api] = api;
//     this[symbols.platform] = platform;
//     this[symbols.settings] = settings;

//     platform.on(platform.events.loginSuccess, () => {
//       this.loadCompanyContact();
//     });

//     (async () => {
//       if (await platform.loggedIn()) {
//         await this.loadCompanyContact();
//       }
//     })();
//   }

//   async loadCompanyContact({
//     userOptions = {},
//     perPage = 'max',
//   } = {}) {
//     this.store.dispatch({
//       type: this.actions.loadCompanyContact,
//     });
//     try {
//       const contacts = extractData(await this::fetchList(options => (
//         this[symbols.api].account().extension().list({
//           ...options,
//           ...userOptions,
//           perPage,
//         })
//       )));
//       this.store.dispatch({
//         type: this.actions.loadCompanyContactSuccess,
//         payload: contacts,
//       });
//     } catch (error) {
//       this.store.dispatch({
//         type: this.actions.loadCompanyContactFailed,
//         error,
//       });
//     }
//   }

//   get reducer() {
//     return reducer(this.prefix);
//   }
// }
//# sourceMappingURL=index.js.map
