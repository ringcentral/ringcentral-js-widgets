import { RcThemeInput } from '@ringcentral/juno';

const defaultMainColor = '#0684bd';

function getThemeColor(color: string = defaultMainColor): RcThemeInput {
  return {
    palette: {
      primary: {
        main: color,
        '700': color,
        '600': color,
      },
      bg: {
        primary: color,
      },
      element: {
        primary: color,
      },
      border: {
        primary: color,
      },
      text: {
        info: color,
        button: color,
      },
      icon: {
        primary: color,
        bookmark: color,
      },
      label: {
        blue: {
          icon: color,
          text: color,
        },
      },
      globalHeader: {
        bgDark: color,
        bgDefault: color,
      },
      action: {
        primary: color,
      },
      accent: {
        blue: color,
      },
    },
  };
}

export const defaultTheme: RcThemeInput = getThemeColor();

export const getBrandTheme = (
  brand: string = 'rc',
  rcMainColor: string = null,
): RcThemeInput => {
  const color: string = ({
    rc: rcMainColor || defaultMainColor,
    bt: '#5514B4',
    att: '#067AB4',
    telus: '#57a708',
  } as any)[brand];

  return getThemeColor(color);
};
