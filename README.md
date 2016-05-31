# ringcentral-js-widget

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for detailed explanation.

## Getting Start

Copy below code into your page:
```html
<rc-phone 
    first-level=dial-pad,time-line
    width=250
    height=400
    key=YOUR_APP_KEY
    secret=YOUR_APP_SECRET
    fixed>
</rc-phone>
<script id='rc-widgets-script' async defer src='https://ringcentral.github.io/ringcentral-js-widget/build/host.js'></script>
```

For now, the widget is running in **sandbox** env, so please use sandbox app key and secret.

## Development

#### Installation process
`npm install`
`bower install`
#### Development process
`gulp`
#### Test process
`npm test`

[Demo](http://lingforcc.github.io/ringcentral-js-widget/demo/fancy.html)



