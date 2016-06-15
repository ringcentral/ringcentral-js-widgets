export function oauth(authUrl) {
    return window.open(
        authUrl,
        'rc-iframe-2',
        'width=400, height=600'
    )
}
