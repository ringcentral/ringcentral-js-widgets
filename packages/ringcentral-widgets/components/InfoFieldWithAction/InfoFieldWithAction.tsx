import React, { FunctionComponent, memo, PropsWithChildren } from 'react';
// eslint-disable-next-line import/no-unresolved
import { styled, typography, spacing } from '@ringcentral/juno';
import { FormFieldContainer } from '../FormFieldContainer';
import { IInfoFieldWithActionProps } from './interface';

const StyledInfo = styled<
  PropsWithChildren<{ fullSize?: boolean; breakSpace?: boolean }>,
  'section'
>('section')`
  & {
    ${typography('body1')};
    white-space: ${({ breakSpace }) =>
      breakSpace ? 'break-spaces' : 'nowrap'};
    overflow: hidden;
    text-overflow: ellipsis;
    ${({ fullSize }) => (fullSize ? `flex-grow: 1;` : '')};
    margin: 0 ${spacing(2)} 0 0;
  }
`;

const StyledContainer = styled('section')`
  & {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    max-width: 100%;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const InfoFieldWithAction: FunctionComponent<IInfoFieldWithActionProps> = memo(
  ({
    label,
    value,
    name,
    tooltip,
    btn,
    children,
    fullSize,
    breakSpace,
    labelVariant,
  }) => {
    return (
      <FormFieldContainer
        label={label}
        htmlFor={name}
        tooltip={tooltip}
        labelVariant={labelVariant}
      >
        <StyledContainer>
          <StyledInfo
            data-sign={`${name}Field`}
            fullSize={fullSize}
            breakSpace={breakSpace}
          >
            {value}
          </StyledInfo>
          {btn}
          {children}
        </StyledContainer>
      </FormFieldContainer>
    );
  },
);

InfoFieldWithAction.defaultProps = {
  btn: null,
  fullSize: true,
  breakSpace: false,
};
