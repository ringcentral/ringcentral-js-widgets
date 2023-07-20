# babel-preset-crius

> Babel preset for all Crius plugins.

This preset based on React's JSX always includes the following plugins:

-   [@babel/plugin-syntax-jsx](https://babeljs.io/docs/en/babel-plugin-syntax-jsx)
-   [@babel/plugin-transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx)
-   [@babel/plugin-transform-react-display-name](https://babeljs.io/docs/en/babel-plugin-transform-react-display-name)

And with the `development` option:

-   [@babel/plugin-transform-react-jsx-self](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx-self)
-   [@babel/plugin-transform-react-jsx-source](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx-source)

## Installation

```sh
npm install --save-dev babel-preset-crius
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```json
{
    "presets": ["babel-preset-crius"]
}
```

With options:

```json
{
    "presets": [
        [
            "babel-preset-crius",
            {
                "pragma": "node", // default pragma is Crius.createStep
                "pragmaFrag": "nodeFrag", // default is Crius.Flow
                "throwIfNamespace": false // defaults to true
            }
        ]
    ]
}
```

### Via CLI

```sh
babel --presets babel-preset-crius script.js
```

### Via Node API

```javascript
require('@babel/core').transform('code', {
    presets: ['babel-preset-crius'],
});
```

## Options

### `pragma`

`string`, defaults to `Crius.createStep`.

Replace the function used when compiling JSX expressions.

### `pragmaFrag`

`string`, defaults to `Crius.Fragment`.

Replace the component used when compiling JSX fragments.

### `useBuiltIns`

`boolean`, defaults to `false`.

Will use the native built-in instead of trying to polyfill behavior for any plugins that require one.

### `development`

`boolean`, defaults to `false`.

Toggles plugins that aid in development, such as [`@babel/plugin-transform-react-jsx-self`](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx-self) and [`@babel/plugin-transform-react-jsx-source`](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx-source).

This is useful when combined with the [env option](https://babeljs.io/docs/en/options#env) configuration or [js config files](https://babeljs.io/docs/en/config-files#javascript).

### `throwIfNamespace`

`boolean`, defaults to `true`.

Toggles whether or not to throw an error if a XML namespaced tag name is used. For example:

    <f:image />

Though the JSX spec allows this, it is disabled by default since React's JSX does not currently have support for it.

#### .babelrc.js

```js
module.exports = {
    presets: [
        [
            'babel-preset-crius',
            {
                development: process.env.BABEL_ENV === 'development',
            },
        ],
    ],
};
```

#### .babelrc

> Note: the `env` option will likely get deprecated soon

```json
{
    "presets": ["babel-preset-crius"],
    "env": {
        "development": {
            "presets": [["babel-preset-crius", { "development": true }]]
        }
    }
}
```

> You can read more about configuring preset options [here](https://babeljs.io/docs/en/presets#preset-options)
