import { RcThemeInput } from '@ringcentral-integration/rcui';

export const defaultTheme: RcThemeInput = {
  palette: {
    primary: {
      main: '#0684bd',
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
