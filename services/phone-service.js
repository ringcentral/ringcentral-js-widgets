import sdk from './rc-sdk'
import WebPhone from './rc-webphone'
import config from './rc-config'
var webPhone = {}
var PhoneService = function() {
    var webPhone
    var session
    var handlers = {
        invite: []
    }
    return {
        init: function(options) {
            console.log('init phone');
            return sdk.platform()
                .post('/client-info/sip-provision', {
                    sipInfo: [{
                        transport: 'WSS'
                    }]
                })
                .then(res => {
                    console.log(res.json());
                    return new WebPhone(res.json(), { // optional
                        appKey: config.key,
                        logLevel: 1,
                        audioHelper: {
                            enabled: true, // enables audio feedback when web phone is ringing or making a call
                            incoming: options.incomingAudio, // path to audio file for incoming call
                            outgoing: options.outgoingAudio // path to aduotfile for outgoing call
                        }
                    })
                })
                .then(phone => {
                    webPhone = phone
                    webPhone.userAgent.on('invite', function (s) {
                        session = s
                        handlers['invite'].forEach(handler => handler(session))
                    })
                })
        },
        on: function(name, callback) {
            handlers[name].push(callback)
        },
        call: function(fromNumber, toNumber, options) {
            session = webPhone.userAgent.invite(toNumber, {
                media: {
                    render: {
                        remote: options.remoteVideo,
                        local: options.localVideo
                    }
                },
                fromNumber: fromNumber
            })
            session.on('accept', function() {
                console.log('accept');
            })
            session.on('progress', function() {
                console.log('progress');
            })
            session.on('rejected', function() {
                console.log('rejected');
            })
            session.on('terminated', function() {
                console.log('terminated');
            })
            session.on('bye', function() {
                console.log('bye');
            })
            session.on('refer', function() {
                console.log('refer');
            })
        },
        accept: function(options) {
            return session.accept({
                media: {
                    render: {
                        remote: options.remoteVideo,
                        local: options.localVideo
                    }
                }
            })
        },
        hangup: function() {
            return session.bye()
        },
        hold: function() {
            return session.hold()
        },
        mute: function() {
            return session.mute()
        },
        flip: function(number) {
            return session.flip(number)
        },
        forward: function(number) {
            return session.forward(number)
        },
        transfer: function(number) {
            return session.transfer(number)
        },
        park: function() {
            return session.park()
        },
        record: function() {
            return session.startRecord()
        }
    }
}()
export default PhoneService
