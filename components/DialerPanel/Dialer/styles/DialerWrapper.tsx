import { palette2, RcDialTextField, spacing, styled } from '@ringcentral/juno';

import { pageSpace } from '../../../../scss';

export const DialerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 auto;
  margin-top: 100px;
`;

export const TextFieldWrapper = styled.div<{ isHaveValue?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 6px;
  margin-bottom: 25px;

  ${RcDialTextField} {
    padding-left: ${({ isHaveValue }) => isHaveValue && spacing(9)};
    ${pageSpace('margin')};
    border-bottom: 1px solid ${palette2('neutral', 'l03')};

    input {
      margin: 7px 0 !important;
      text-align: center;
      font-size: 17px;

      [sf-classic] & {
        margin: 5px 0 !important;
      }
    }
  }
`;
