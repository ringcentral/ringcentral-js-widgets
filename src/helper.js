var rcHelper = function() {
    var sdk;
    var webPhone;
    return {
        login: function(dom) {
            sdk = new RingCentral.SDK({
                appKey: dom.key.value,
                appSecret: dom.secret.value,
                server: dom.server.value || RingCentral.SDK.server.production
            });
            return sdk.platform()
                .login({
                    username: dom.username.value,
                    extension: dom.extension.value,
                    password: dom.password.value
                })
                .then(() => registerSIP())


            function registerSIP() {
                webPhone = new RingCentral.WebPhone({
                    audioHelper: {
                        incoming: '../demo/audio/incoming.ogg',
                        outgoing: '../demo/audio/outgoing.ogg'
                    }
                });
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

                    }).catch(e => {
                        console.error(e);
                        return Promise.reject(e);
                    });
            }
        },
        callout: function(dom, options) {
            console.log(options);
            var toNumber = options.toNumber;
            var fromNumber = localStorage.getItem('username');

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
                .catch(e => {
                    console.error(e);
                    this.element.panel.errorMessage.textContent = e.message;
                    if (this.interval) {
                        this.interval.cancel('Call');
                        this.interval = null;
                    }
                });
        }
    }
}();
export default rcHelper;
