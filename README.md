# ringcentral-js-widget

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for detailed roadmap.

## Getting Started

Copy below code into your page:
```html
<rc-widget
    tag=rc-phone
    first-level=dial-pad,time-line 
    width=250
    height=400
    key=YOUR_APP_KEY
    secret=YOUR_APP_SECRET
    sandbox
    fixed>
</rc-widget>
<script id='rc-widgets-script' async defer src='https://ringcentral.github.io/ringcentral-js-widget/build/host.js'></script>
```

Replace `YOUR_APP_KEY` and `YOUR_APP_SECRET` with your application key and secret.

## Development

#### Installation process
`npm install`
`bower install`
#### Development process
`webpack --watch`
#### Widget development process
`node compile/index.js`
#### Test process
`npm test`
