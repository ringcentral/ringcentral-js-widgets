import RingCentral from 'ringcentral/build/ringcentral-bundle.js'
import config from './rc-config'
var holder = {}

// for dependency injection
var sdk = (function () {
    return holder.sdk
})()

var injectSDK = function ({key, secret, sandbox}) {
    holder.sdk = new RingCentral({
        appKey: key,
        appSecret: secret,
        server: sandbox? RingCentral.server.sandbox: RingCentral.server.production
    })
}
export {
    injectSDK,
    holder as RC
}
