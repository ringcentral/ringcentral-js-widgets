console.log('contentscript.js')
var div = document.createElement('div')
div.innerHTML = 
`
    <div>
        <rc-phone 
            first-level=dial-pad,time-line
            width=250
            height=400
            key=8mOtYiilT5OUPwwdeGgvpw
            secret=cqNn89RmR2SR76Kpp8xJaAdNzNOqR8Qfmjb0B-gDOHTw>
        </rc-phone>
        <script id='rc-widgets-script' async defer src='https://ringcentral.github.io/ringcentral-js-widget/build/host.js'></script>
    </div>
`

document.body.appendChild(div)
