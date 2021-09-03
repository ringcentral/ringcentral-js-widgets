import { RcPaletteProp } from '@ringcentral/juno';

type GetIconColorParams = {
  disable: boolean;
  active: boolean;
};

export function getIconColor({
  disable,
  active,
}: GetIconColorParams): RcPaletteProp {
  if (active) {
    return 'interactive.f01';
  }
  return disable ? 'disabled.f02' : 'neutral.f06';
}
