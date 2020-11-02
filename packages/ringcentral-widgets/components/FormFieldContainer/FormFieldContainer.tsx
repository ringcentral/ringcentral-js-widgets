import React, { FunctionComponent } from 'react';
import { RcIconButton, typography, styled, spacing } from '@ringcentral/juno';
import InfoIcon from '@ringcentral/juno/icons/icon-info.svg';
import { IFormFieldContainerProps, labelVariant as variant } from './interface';

const StyledContainer = styled('section')`
  & {
    display: block;
    max-width: 100%;
  }
`;

const LabelRow = styled('section')`
  & {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    * + * {
      margin-left: ${spacing(3)};
    }
  }
`;

const StyledLabelBold = styled('label')`
  & {
    ${typography('caption2')};
    color: #6c7489;
  }
`;

const StyledLabel = styled('label')`
  & {
    ${typography('caption1')};
    color: #7575;
  }
`;

const FieldRow = styled('section')`
  & {
    display: block;
  }
`;

export const FormFieldContainer: FunctionComponent<IFormFieldContainerProps> = (
  props,
) => {
  const { htmlFor, label, children, tooltip, labelVariant, ariaOwns } = props;
  const LabelComp =
    labelVariant === variant.bold ? StyledLabelBold : StyledLabel;
  return (
    <StyledContainer aria-owns={`${ariaOwns} ${label}`}>
      <LabelRow>
        <LabelComp htmlFor={htmlFor} id={label}>
          {label}
        </LabelComp>
        {!!tooltip && (
          <RcIconButton
            variant="plain"
            size="small"
            color="grey.400"
            data-sign="info"
            symbol={InfoIcon}
            tooltipTitle={tooltip}
          />
        )}
      </LabelRow>
      <FieldRow>{children}</FieldRow>
    </StyledContainer>
  );
};

FormFieldContainer.defaultProps = {
  labelVariant: variant.normal,
  ariaOwns: '',
};
