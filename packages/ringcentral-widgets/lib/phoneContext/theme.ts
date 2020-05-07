import { RcThemeInput } from '@ringcentral-integration/rcui';

export const defaultTheme: RcThemeInput = {
  palette: {
    primary: {
      light: '#05a8f3',
      main: '#0684bd',
      dark: '#045d86',
      '700': '#0684bd',
      '600': '#0684bd',
    },
  },
};

export const getBrandTheme = (brand: string = 'rc'): RcThemeInput => ({
  palette: {
    primary: {
      main: {
        rc: '#0684bd',
        bt: '#00528E',
        att: '#067AB4',
        telus: '#57a708',
      }[brand],
    },
  },
});
