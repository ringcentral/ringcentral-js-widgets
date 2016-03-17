import sdk from './rc-sdk'
import { register } from '../service'
var accountService = (function(sdk) {
    var info;
    return {
        getAccountInfo: function() {
            return sdk.platform()
                .get('/account/~/extension/~')
                .then(response => {
                    console.debug(response.json());
                    info = response.json();
                })
                .catch(function(e) {
                    console.error('Recent Calls Error: ' + e.message);
                });
        },
        hasServiceFeature: function(name) {
            if (!info)
                return Error('Need to fetch account info by accountService.getAccountInfo');
            return info.serviceFeatures
                .filter(feature => feature.featureName.toLowerCase() === name.toLowerCase())
                .length > 0;
        }
    };
})(sdk);
register('accountService', accountService);
export default accountService;
