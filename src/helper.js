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
    return {
        login: function(props) {
            var dom = props.dom;
            return sdk.platform()
                .login({
                    username: dom.username.value,
                    extension: dom.extension.value,
                    password: dom.password.value
                })
                .then(() => registerSIP())

            function registerSIP() {
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
            var toNumber = props.toNumber;
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
                .catch(e => console.error(e));
        }
    }
}(sdk, webPhone);
export default rcHelper;
