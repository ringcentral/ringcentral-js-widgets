console.log('contentscript.js')
var preloadTarget = document.createElement('div')
preloadTarget.innerHTML = 
`
<rc-phone 
    first-level=dial-pad,time-line
    width=272
    height=400
    key=8mOtYiilT5OUPwwdeGgvpw
    secret=cqNn89RmR2SR76Kpp8xJaAdNzNOqR8Qfmjb0B-gDOHTw>
</rc-phone>
<script id='rc-widgets-script' async defer src='https://ringcentral.github.io/ringcentral-js-widget/build/host.js'></script>
`
document.body.appendChild(preloadTarget)
function insert() {
    if (document.querySelector('#activitybarui-1 .activity-bar') &&
        document.querySelector('#uimanager-0') &&
        document.querySelector('.agent-reports-ui-reveal-bg')) {
        var buttonWrapper = document.querySelector('#activitybarui-1 .activity-bar')
        var button = document.createElement('button')
        button.classList.add('agent-report')
        button.textContent = 'RC'
        
        buttonWrapper.appendChild(button)

        var div = document.createElement('div')
        var outer = document.createElement('div')
        var bg = document.querySelector('.agent-reports-ui-reveal-bg')
        bg.addEventListener('click', function(e) {
            div.style.display = 'none'
            div.style.opacity = '0'
            div.style.visibility = 'hidden'
            bg.style.display = 'none'
            div.classList.remove('open')
        })
        outer.classList.add('agentReportsUI')
        div.classList.add('reveal-main-panel')
        div.classList.add('main-panel')
        
        div.style.display = 'none'
        div.style.opacity = '0'
        div.style.visibility = 'hidden'
        outer.appendChild(div)
        div.appendChild(preloadTarget)
        button.addEventListener('click', function(e) {
            if (div.style.display === 'none') {
                div.style.display = 'block'
                div.style.opacity = '1'
                div.style.visibility = 'visible'
                bg.style.display = 'block'
                div.classList.add('open')
            } else {
                div.style.display = 'none'
                div.style.opacity = '0'
                div.style.visibility = 'hidden'
                bg.style.display = 'none'
                div.classList.remove('open')
            }
        })
        document.querySelector('#uimanager-0').appendChild(outer)
        return true
    }
    return false
}
var interval = setInterval(function() {
    if (insert()) {
        clearInterval(interval)
    }
}, 1000)
