import sdk from './rc-sdk'
import rcSubscription from './rc-subscription-service'
import { register } from '../service'

var CallLogService = (function(sdk) {
    var period = 7 * 24 * 3600 * 1000
    var dateFrom = new Date(Date.now() - (period))
    function onCallLogUpdate(d) {
        console.log(d)
    }
    return {
        getCallLogs: function() {
            return sdk.platform()
                .get('/account/~/extension/~/call-log', {dateFrom: dateFrom.toISOString()})
                .then(response => {
                    return response.json().records
                })
        },
        subscribeToCallLogUpdate: function() {
            rcSubscription.subscribe(
                'call-log',
                '/restapi/v1.0/account/~/extension/~/call-log-sync',
                onCallLogUpdate
            )
        },
    }
})(sdk)

register('callLogService', CallLogService)
export default CallLogService
