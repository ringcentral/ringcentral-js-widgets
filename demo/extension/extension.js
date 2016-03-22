var container = document.querySelector('div.tNsA5e-nUpftc.nUpftc.mP').parentNode;
var template = `
<div id='rc-phone' class='rc-phone'>
</div>
`
var border = document.createElement('div');
border.innerHTML = template;
border.style = `
border-left: 1px solid #e5e5e5;
    z-index: 2;
    width: 250px;
    position: fixed;
    margin-top: 60px;
    top: 0px;
    bottom: 0;
    right: 0;
    overflow: auto;
    background: #fff;
    transition: all 0.3s ease;`
container.appendChild(border);
w.config({
    path: localStorage.getItem('base-path') + 'template/',
    preload: {
        'rc-phone': 'rc-phone'
    },
}, function() { w('rc-phone').render('#rc-phone'); })
