export function oauth(sdk) {
    var redirectUri = window.location.origin + '/ringcentral-js-widget/demo/redirect.html'
    window.open(
        sdk.platform().authUrl({redirectUri}),
        'rc-iframe-2',
        'width=400, height=600'
    )
    return new Promise((resolve, reject) => {
        window.addEventListener('message', function(e) {
            if (e.data.type === 'oauth') {
                var qs = sdk.platform().parseAuthRedirectUrl(e.data.value);
                qs.redirectUri = redirectUri;
                resolve(qs)
            }
        })
    })
}
