import sdk from './rc-sdk'
import { register } from '../service'
var accountService = (function(sdk) {
    var info;
    var numbers;
    return {
        getAccountInfo: function() {
            return sdk.platform()
                .get('/account/~/extension/~')
                .then(response => {
                    console.debug(response.json());
                    info = response.json();
                    return info;
                })
                .catch(function(e) {
                    console.error('Recent Calls Error: ' + e.message);
                });
        },
        getPhoneNumber: function() {
            return sdk.platform()
                .get('/account/~/extension/~/phone-number')
                .then(response => {
                    console.debug(response.json());
                    // info = response.json();
                    return response.json();
                })
                .then(data => {
                    numbers = data.records;
                    return data.records;
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
        },
        listNumber: function(type) {
            console.debug(numbers);
            return numbers
            .filter(number => number.type === type)
            .map(number => number.phoneNumber);
        }
    };
})(sdk);
register('accountService', accountService);
export default accountService;
