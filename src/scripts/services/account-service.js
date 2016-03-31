import sdk from './rc-sdk';
import { register } from '../service';
var accountService = (function(sdk) {
    var info;
    var numbers;
    var fetchNumbers = null;
    
    function getNumbersByType(type) {
        return numbers
            .filter(number => number.type === type)
            .map(number => number.phoneNumber)
    }
    
    return {
        getAccountInfo: function() {
            return sdk.platform()
                .get('/account/~/extension/~')
                .then(response => {
                    info = response.json();
                    return info;
                })
                .catch(e => console.error('Recent Calls Error: ' + e.message));
        },

        getPhoneNumber: function() {
            fetchNumbers = sdk.platform()
                .get('/account/~/extension/~/phone-number')
                .then(response => {
                    var data = response.json();
                    numbers = data.records;
                    fetchNumbers = null;
                    return data.records;
                })
                .catch(e => console.error('Recent Calls Error: ' + e.message));
            return fetchNumbers;
        },

        hasServiceFeature: function(name) {
            if (!info)
                return Error('Need to fetch account info by accountService.getAccountInfo');
            return info.serviceFeatures
                .filter(feature => feature.featureName.toLowerCase() === name.toLowerCase())
                .length > 0;
        },

        listNumber: function(type) {
            if(fetchNumbers){
                return fetchNumbers.then(() => {
                    return getNumbersByType(type);
                });
            }else{
                return getNumbersByType(type);
            }
        },
    };
})(sdk);

register('accountService', accountService);
export default accountService;
