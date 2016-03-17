localStorage.setItem('base-path', getBasePath('template/auth-panel.html'))
insertScript('bower_components/ringcentral/build/ringcentral-bundle.js', function() {
    insertScript('bower_components/ringcentral-web-phone/build/ringcentral-web-phone.js', function() {
        insertScript('build/build.js', function() {
            insertScript('demo/extension/extension.js', function() {})
        })
    })
})

function getBasePath(src) {
    var path = chrome.extension.getURL(src);
    path = path.slice(0, path.indexOf(src) - 1) + '/';
    console.log(path);
    return path;
}
function insertScript(src, callback) {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(src);
    (document.head || document.documentElement).appendChild(s);
    s.onload = function() {
        s.parentNode.removeChild(s);
        callback();
    };
}
