var sdk = new RingCentral.SDK({
    appKey: 'eac8797af1b3502F2CEAAEECAC3Ed378AA7858A386656f28A008b0c638A754B1',
    appSecret: 'c082702E4ea4DA18c4b1377917778a8aafabCA3Be579B78B66d17C36874b27F4',
    server: RingCentral.SDK.server.production
});
var webPhone = new RingCentral.WebPhone({
    audioHelper: {
        incoming: '../demo/audio/incoming.ogg',
        outgoing: '../demo/audio/outgoing.ogg'
    }
});;
var rcHelper = function(sdk, webPhone) {
    var line;
    var handlers = {
        called: [],
        callStarted: [],
        callRejected: [],
        callEnded: [],
        callFailed: []
    };
    return {
        login: function(props) {
            console.log('helper login');
            var dom = props.dom;
            return sdk.platform()
                .login({
                    username: dom.username.value,
                    extension: dom.extension.value,
                    password: dom.password.value
                })
                .then(() => registerSIP())

            function registerSIP() {
                console.log('register');
                return sdk.platform()
                    .post('/client-info/sip-provision', {
                        sipInfo: [{
                            transport: 'WSS'
                        }]
                    })
                    .then(res => {
                        var data = res.json();
                        console.log("Sip Provisioning Data from RC API: " + JSON.stringify(data));
                        console.log(data.sipFlags.outboundCallsEnabled);
                        var checkFlags = false;
                        return webPhone.register(data, checkFlags)
                            .then(function() {
                                console.log('Registered');
                            })
                            .catch(function(e) {
                                return Promise.reject(err);
                            });

                    }).catch(e => console.error(e));
            }
        },
        callout: function(props) {
            console.log('user callout');
            var toNumber = props.toNumber;
            var fromNumber = props.fromNumber;

            // TODO: validate toNumber and fromNumber
            if (!sdk || !webPhone) {
                throw Error('Need to set up SDK and webPhone first.');
                return;
            }
            return sdk.platform()
                .get('/restapi/v1.0/account/~/extension/~')
                .then(res => {
                    console.log(res);
                    var info = res.json();
                    if (info && info.regionalSettings && info.regionalSettings.homeCountry) {
                        return info.regionalSettings.homeCountry.id;
                    }
                    return null;
                })
                .then(countryId => {
                    webPhone.call(toNumber, fromNumber, countryId);
                })
                .catch(e => console.error(e));
        },
        answer: function(props) {
            return webPhone
                .answer(line)
                .catch(function(e) { console.error(e) });
        },
        ignore: function(props) {},
        cancel: function(props) {
            return line
                .cancel()
                .catch(function(e) { console.error(e) });
        },
        hangup: function(props) {
            return webPhone
                .hangup(line)
                .catch(err => console.error(err));
        },
        record: function(props) {},
        hold: function(props) {},
        mute: function(props) {},
        called: function(handler) {
            handlers.called.push(handler);
        },
        callStarted: function(handler) {
            handlers.callStarted.push(handler);
        },
        callRejected: function(handler) {
            handlers.callRejected.push(handler);
        },
        callEnded: function(handler) {
            handlers.callEnded.push(handler);
        },
        callFailed: function(handler) {
            handlers.callFailed.push(handler);
        },
        initPhoneListener: function(props) {
            webPhone.ua.on('sipIncomingCall', e => {
                console.log(handlers);
                line = e;
                handlers.called.forEach(h => h(e));
            });
            webPhone.ua.on('callStarted', e => {
                console.log(handlers);
                handlers.callStarted.forEach(h => h(e));
            });
            webPhone.ua.on('callRejected', e => {
                console.log(handlers);
                handlers.callRejected.forEach(h => h(e));
            });
            webPhone.ua.on('callEnded', e => {
                console.log(handlers);
                handlers.callEnded.forEach(h => h(e));
            });
            webPhone.ua.on('callFailed', e => {
                console.log(handlers);
                handlers.callFailed.forEach(h => h(e));
            });
        }
    }
}(sdk, webPhone);
export default rcHelper;
