import sdk from './rc-sdk'
import rcSubscription from './rc-subscription-service'

var CallLogService = (function(sdk) {
    var period = 7 * 24 * 3600 * 1000
    var dateFrom = new Date(Date.now() - (period))
    return {
        getCallLogs: function() {
            return sdk.platform()
                .get('/account/~/extension/~/call-log', {dateFrom: dateFrom.toISOString()})
                .then(response => {
                    return response.json().records
                })
        },
        getCallLogsByNumber: function(phoneNumber, hourFrom, hourTo) {
            return sdk.platform()
                .get('/account/~/extension/~/call-log', {
                    dateFrom: new Date(Date.now() - hourFrom * 3600 * 1000).toISOString(),
                    dateTo: new Date(Date.now() - (hourTo || 0) * 3600 * 1000).toISOString(),
                    phoneNumber
                })
                .then(response => response.json())
                .then(data => data.records)
                .then(records => records.reverse())
        }
    }
})(sdk)

export default CallLogService
