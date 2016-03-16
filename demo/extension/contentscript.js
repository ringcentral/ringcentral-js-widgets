localStorage.setItem('auth-panel', chrome.extension.getURL('template/auth-panel.html'))
localStorage.setItem('dial-pad', chrome.extension.getURL('template/dial-pad.html'))
localStorage.setItem('call-panel', chrome.extension.getURL('template/call-panel.html'))
insertScript('bower_components/ringcentral/build/ringcentral-bundle.js', function() {
    insertScript('bower_components/ringcentral-web-phone/build/ringcentral-web-phone.js', function() {
        insertScript('build/build.js', function() {
            insertScript('demo/extension/extension.js', function() {})
        })
    })
})

function insertScript(src, callback) {
    var s = document.createElement('script');
    console.log(chrome.extension.getURL(src));
    s.src = chrome.extension.getURL(src);
    (document.head || document.documentElement).appendChild(s);
    s.onload = function() {
        s.parentNode.removeChild(s);
        callback();
    };
}
