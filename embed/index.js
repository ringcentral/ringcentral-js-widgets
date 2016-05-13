(function() {
    const PHONE_URL = './build/widgets.js'
    const LIB_URL = './build/build.js'
    const COMMON_STYLE_URL = ['./build/styles/main.css']
    const TARGET_TAG = 'rc-phone'
    const IFRAME_URL = './embed.html'
    const useShadowDOM = false /* Always fallback to iframe for now */

    var safeEval = function(script, target) {
        var tag = document.createElement('script')
        tag.text = script
        if (target) {
            target.appendChild(tag)
            // target.removeChild(tag)
        } else {
            document.body.appendChild(tag)
            document.body.removeChild(tag)
        }
    }
    var fetchAndEval = function(url, target) {
        return function() {
            return fetch(url)
                    .then(res => res.text())
                    .then(data => safeEval(data, target))
        }
    }

    var fetchAndEvalFramework = fetchAndEval(LIB_URL)
    var fetchAndEvalWidget = fetchAndEval(PHONE_URL)

    var createContainer = function() {
        var target = document.querySelector(TARGET_TAG)
        if (!target) return
        var shadow = target.createShadowRoot()
        var container = document.createElement('div')
        shadow.appendChild(container)

        COMMON_STYLE_URL.forEach(src => {
            fetch(src)
            .then(res => res.text())
            .then(style => {
                var tag = document.createElement('style')
                tag.innerHTML = style
                shadow.appendChild(tag)
            })
        })
        appendWidget(container, shadow)
        function appendStyle() {

        }

        function appendWidget(container, shadowRoot) {
            console.log(container);
            var phone = w(TARGET_TAG, {
                shadowRoot,
                data: {
                    shadowRoot
                }
            })
            phone.mount(container)
        }
        return container
    }

    var createIframe = function(options) {
        var target = document.querySelector(TARGET_TAG)
        var options = getOptions(target)
        var iframe = document.createElement('iframe')
        iframe.height = 500
        iframe.width = 500
        iframe.style.border = 0
        iframe.src = IFRAME_URL + '?' +
                        `first-level=${options.firstLevel}&` +
                        `width=${options.width}&` +
                        `height=${options.height}`
        console.log(iframe.src);
        target.appendChild(iframe)
    }

    var getOptions = function(target) {
        return {
            firstLevel: target.getAttribute('first-level'),
            width: target.getAttribute('width'),
            height: target.getAttribute('height'),
        }
    }

    if (document.body.createShadowRoot && useShadowDOM) {
        // shadow dom is supported
        // The order is important
        fetchAndEvalWidget()
        .then(fetchAndEvalFramework)
        .then(createContainer)
        .catch(e => console.error(e))
    } else {
        // fallback to iframe
        createIframe()
    }
}())
// Fetch


// Create container
