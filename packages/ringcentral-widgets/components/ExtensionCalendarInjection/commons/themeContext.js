import React from 'react';
import PropTypes from 'prop-types';

export const themes = {
  rc: {
    key: 'rc',
    isOldUI: false,
    UI: 'google',
  },
  att: {
    key: 'att',
    isOldUI: false,
    UI: 'google',
  },
  telus: {
    key: 'telus',
    isOldUI: false,
    UI: 'google',
  },
  bt: {
    key: 'bt',
    isOldUI: false,
    UI: 'google',
  },
  officeBlue: {
    key: 'officeBlue',
    isOldUI: false,
    UI: 'google',
  },
};

export const ThemeContext = React.createContext(themes.rc);

export function ThemeProvider({
  theme,
  children,
}) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}
ThemeProvider.propTypes = {
  theme: PropTypes.object.isRequired,
  children: PropTypes.node,
};
ThemeProvider.defaultProps = {
  children: null,
};

export function ThemeConsumer(Comp) {
  function WithTheme(props) {
    return (
      <ThemeContext.Consumer>
        {
          theme => (
            <Comp
              theme={theme}
              {...props}
            />
          )
        }
      </ThemeContext.Consumer>
    );
  }
  return WithTheme;
}
