import { palette2, RcDialTextField, spacing, styled } from '@ringcentral/juno';
import { pageSpace } from '../../../../scss';

export const DialerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 auto;
`;

export const TextFieldWrapper = styled.div<{ isHaveValue?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 6px;
  margin-bottom: 7px;

  ${RcDialTextField} {
    padding-left: ${({ isHaveValue }) => isHaveValue && spacing(9)};
    ${pageSpace('margin')};
    border-bottom: 1px solid ${palette2('neutral', 'l03')};

    input {
      margin: 7px 0 !important;
      text-align: center;

      [sf-classic] & {
        margin: 5px 0 !important;
      }
    }
  }
`;

export const DialPadWrapper = styled.div`
  width: 75%;
  margin: 10px auto 6px;

  [sf-classic] & {
    width: 90%;
  }

  button > span {
    width: 100%;
    height: 100%;
  }
`;
