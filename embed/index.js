
(function() {

    const PHONE_URL = './build/widgets.js'
    const LIB_URL = './build/build.js'
    const COMMON_STYLE_URL = ['./build/styles/main.css']
    const TARGET_TAG = 'rc-phone'

    var safeEval = function(script) {
        var tag = document.createElement('script')
        tag.text = script
        document.body.appendChild(tag)
        document.body.removeChild(tag)
    }
    var fetchAndEval = function(url) {
        return function() {
            return fetch(url)
                    .then(res => res.text())
                    .then(data => safeEval(data))
        }
    }

    var fetchAndEvalFramework = fetchAndEval(LIB_URL)
    var fetchAndEvalWidget = fetchAndEval(PHONE_URL)

    var createContainer = function() {
        var target = document.querySelector(TARGET_TAG)
        if (!target) return
        // shadow dom
        var shadow = target.createShadowRoot()
        var container = document.createElement('div')
        COMMON_STYLE_URL.forEach(src => {
            fetch(src)
            .then(res => res.text())
            .then(style => {
                var tag = document.createElement('style')
                tag.innerHTML = style
                shadow.appendChild(tag)
            })
        })
        shadow.appendChild(container)
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

    // The order is important
    fetchAndEvalWidget()
    .then(fetchAndEvalFramework)
    .then(createContainer)
    .catch(e => console.error(e))
}())
// Fetch


// Create container
