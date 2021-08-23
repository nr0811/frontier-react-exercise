import { FormFieldRendererProps } from './FormField';
import { StyledBooleanButton } from '../styled/StyledButton';
import styled from 'styled-components';
import { StyledFlex } from '../styled/StyledFlex';

const StyleHiddenRadio = styled.input`
  float: right;
  height: 0;
  width: 0;
  padding: 0;
  opacity: 0;
`;
export const BooleanButton = (
  props: Pick<FormFieldRendererProps, 'value' | 'onChange' | 'metadata'>,
) => {
  const { onChange, metadata, value } = props;

  return (
    <div>
      <StyleHiddenRadio {...metadata} value={value} readOnly />
      <StyledFlex>
        <StyledBooleanButton
          type={'button'}
          isChecked={value === 'true'}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            onChange('true')
          }
          borderRadius={'10px 0px 0px 10px'}
        >
          Yes
        </StyledBooleanButton>
        &nbsp;
        <StyledBooleanButton
          type={'button'}
          isChecked={value === 'false'}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            onChange('false')
          }
          borderRadius={'0px 10px 10px 0px'}
        >
          No
        </StyledBooleanButton>
      </StyledFlex>
    </div>
  );
};
