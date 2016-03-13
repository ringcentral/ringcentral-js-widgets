import sdk from './rc-sdk'
import webPhone from './rc-webphone'
import LoginService from './login-service'


var PhoneService = function() {
    var line;
    var handlers = {
        called: [],
        callStarted: [],
        callRejected: [],
        callEnded: [],
        callFailed: []
    };

    return {

        registerSIP: function() {
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
        },

        callout: function(fromNumber, toNumber) {
            console.log('user callout');

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
            console.log('init phone');
            console.log(webPhone);
            webPhone.ua.on('invite', e => {
                console.log(handlers);
                line = e;
                handlers.called.forEach(h => h(e));
            });
            webPhone.ua.on('callStarted', e => {
                console.log(handlers);
                console.log(this);
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
        },

    };


}();

export default PhoneService
