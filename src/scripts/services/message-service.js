import sdk from './rc-sdk'
import { register } from '../service'
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
        }
    }
})(sdk)

register('messageService', messageService)
export default messageService
