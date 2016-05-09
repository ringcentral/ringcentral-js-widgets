# ringcentral-js-widget


## Project structure

This repo includes 5 indepentently project which could be used for different developers:

1. w.js view framework (`src/` folder and `build/build.js` bundled file)

   This is the base framework for building templates (widgets). 

2. Compiler (`compiler/` and `build/widgets.js` file for a bundled files include all templates in `template/` folder)

   Compiler is a Nodejs app which run a bundle process.

   ​

3. Template (`template/`)

   This folder includes all widget templates, mainly for the phone system related interface. For detailed explanation of each widgets, see the `template/docs`.

4. Embed (`embed/`)

   WIP.

   This folder merely includes a file used for embedded widgets. For detailed explanation, see `embed/readme.md`.

5. Service (`services/`)

   For now it includes the RingCetnral specific business logic which will be extracted in the future.

6. Factory (`factory/`)

   WIP.

   Factory is used for creating a functionality-ready widgets that includes RingCentral specific logic. Therefore, Factory is rely on the Service(`service`). For now, Factory is used in the rc-phone widget(`template/rc-phone.html`) only.

## Development
#### Installation process
`npm install`
`bower install`
#### Development process
`gulp`
#### Test process
`npm test`

[Demo](http://lingforcc.github.io/ringcentral-js-widget/demo/fancy.html)

