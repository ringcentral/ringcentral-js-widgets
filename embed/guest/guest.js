;(function(parent) {
    var firstLevel = getURLParameter('first-level')
    var width = getURLParameter('width')
    var height = getURLParameter('height')
    var origin = getURLParameter('origin')

    var phone = w('rc-phone', {
        data: {
            firstLevel: firstLevel,
            width: width,
            height: height
        }
    })
    phone.mount(document.body)
    window.addEventListener('message', function(e) {
        var data = e.data
        if (data.type === 'PHONE_NUMBER') {
            phone.props.dialPad.setNumber(data.value)
        }
    })
    parent.postMessage({
        type: 'init'
    }, origin)

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [,''])[1].replace(/\+/g, '%20')) || null
    }
}(window.parent))

