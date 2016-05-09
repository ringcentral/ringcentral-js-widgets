# ringcentral-js-widget
This is the personal repository to do some experimental implementation of UI widget based on RingCentral JS SDK

## Project structure

This repo includes 5 indepentently project which could be used for different developers:

1. w.js view framework (`src/` folder and `build/build.js` bundled file)

   This is the base framework for building templates (widgets). For now it also includes the RingCetnral specific business login (`src/service`) which will be extracted in the future.

2. Compiler (`compiler/` and `build/widgets.js` file for a bundled files include all templates in `template/` folder)

   Compiler is a Nodejs app which run a bundle process.

   The compiler is for widget development, it will bundle and tranpiler the widget components into a browser-ready bundled file.

3. Template (`template/`)

   This folder includes all widget templates, mainly for the phone system related interface. For detailed explanation of each widgets, see the `template/docs`.

4. Embed (`embed/`)

   WIP.

   This folder merely includes a file used for embedded widgets. For detailed explanation, see `embed/readme.md`.

5. Factory (`factory/`)

   WIP.

   Factory is used for creating a functionality-ready widgets that includes RingCentral specific logic. For now it's used in the rc-phone widget(`template/rc-phone.html`).

## Development
#### Installation process
`npm install`
`bower install`
#### Development process
`gulp`
#### Test process
`npm test`

[Demo](http://lingforcc.github.io/ringcentral-js-widget/demo/fancy.html)

