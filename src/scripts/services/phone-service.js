import sdk from './rc-sdk'
import webPhone from './rc-webphone'
import { register } from '../service'

var PhoneService = function() {
    var line
    var handlers = {
        called: [],
        callStarted: [],
        callRejected: [],
        callEnded: [],
        callFailed: []
    }
    return {
        registerSIP: function() {
            return sdk.platform()
                .post('/client-info/sip-provision', {
                    sipInfo: [{
                        transport: 'WSS'
                    }]
                })
                .then(res => {
                    return webPhone.register(res.json(), false)
                        .catch(function(e) {
                            return Promise.reject(err)
                        })
                })
        },
        callout: function(fromNumber, toNumber) {
            // TODO: validate toNumber and fromNumber
            if (!sdk || !webPhone) {
                throw Error('Need to set up SDK and webPhone first.')
                return
            }
            return sdk.platform()
                .get('/restapi/v1.0/account/~/extension/~')
                .then(res => {
                    var info = res.json()
                    if (info && info.regionalSettings && info.regionalSettings.homeCountry) {
                        return info.regionalSettings.homeCountry.id
                    }
                    return null
                })
                .then(countryId => {
                    webPhone.call(toNumber, fromNumber, countryId)
                })
        },
        answer: function() {
            return webPhone
                .answer(line)
        },
        ignore: function() {},
        cancel: function() {
            return line
                .cancel()
        },
        hangup: function() {
            return webPhone
                .hangup(line)
        },
        on: function(name, handler) {
            handlers[name].push(handler)
        },
        listen: function() {
            webPhone.ua.on('incomingCall', e => {
                line = e
                handlers.called.forEach(h => h(e))
            })
            webPhone.ua.on('callStarted', e => {
                handlers.callStarted.forEach(h => h(e))
            })
            webPhone.ua.on('callRejected', e => {
                handlers.callRejected.forEach(h => h(e))
            })
            webPhone.ua.on('callEnded', e => {
                handlers.callEnded.forEach(h => h(e))
            })
            webPhone.ua.on('callFailed', e => {
                handlers.callFailed.forEach(h => h(e))
            })
        },
    }
}()
register('phoneService', PhoneService)
