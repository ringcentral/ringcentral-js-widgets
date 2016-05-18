import sdk from './rc-sdk'
import WebPhone from './rc-webphone'
import config from './rc-config'
var webPhone = {}
var PhoneService = function() {
    var webPhone
    var session
    var handlers = {
        invite: [],
        accept: [],
        progress: [],
        rejected: [],
        terminated: [],
        failed: [],
        bye: [],
        refer: [],
    }
    function listen(session) {
        session.on('accepted', function() {
            console.log('accept');
            handlers['accept'].forEach(handler => handler(session))
        })
        session.on('progress', function() {
            console.log('progress');
            handlers['progress'].forEach(handler => handler(session))
        })
        session.on('rejected', function() {
            console.log('rejected');
            handlers['rejected'].forEach(handler => handler(session))
        })
        session.on('terminated', function() {
            console.log('terminated');
            handlers['terminated'].forEach(handler => handler(session))
        })
        session.on('failed', function() {
            console.log('failed');
            handlers['failed'].forEach(handler => handler(session))
        })
        session.on('bye', function() {
            console.log('bye');
            handlers['bye'].forEach(handler => handler(session))
        })
        session.on('refer', function() {
            console.log('refer');
            handlers['refer'].forEach(handler => handler(session))
        })
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
                        listen(session)
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
            listen(session)
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
