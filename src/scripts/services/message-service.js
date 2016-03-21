import sdk from './rc-sdk';
import { register } from '../service';
var messageService = (function(sdk) {
    return {
        sendSMSMessage: function(text, fromNumber, toNumber) {
            return sdk.platform()
                .post('/account/~/extension/~/sms/', {
                    from: {phoneNumber: fromNumber},
                    to: [
                        {phoneNumber: toNumber}
                    ],
                    text: text
                })
                .then(response => {
                    console.debug(response.json().id);
                })
                .catch(function(e) {
                    console.error('Recent Calls Error: ' + e.message);
                });
        }
    };
})(sdk);

register('messageService', messageService);
export default messageService;
