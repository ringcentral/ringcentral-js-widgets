import { RC } from './rc-sdk'

var rcSubscription = function() {
    var _init = false
    var cacheKey = 'ringcentral-subscription'
    var subscription
    var handlers = {}
    function init() {
        _init = true
        subscription = RC.sdk.createCachedSubscription(cacheKey).restore()
        subscription.on(subscription.events.notification, function(msg) {
            for (var key in handlers) {
                if (handlers.hasOwnProperty(key)) {
                    if (msg.event.indexOf(key) > -1) {
                        handlers[key].forEach(h => {
                            try {
                                h(msg)
                            } catch (e) {
                                console.error('Error occurs when invoking subscription notification handler for "' +
                            msg.event + '": ' + e)
                            }
                        })
                    }
                }
            }
        })
    }
    

    return {
        subscribe: function(suffix, event, handler) {
            if (!_init) init()
            if (event && suffix) {
                if (!handlers[suffix]) {
                    handlers[suffix] = []
                }
                handlers[suffix].push(handler)
                subscription.addEventFilters(event).register()
            }
        }
    }
}()

export default rcSubscription
