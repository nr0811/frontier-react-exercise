import { StyledInput } from '../styled/StyledInput';
import { StyledTextArea } from '../styled/StyledTextArea';
import { BooleanButton } from './BooleanButton';
import { ChangeEvent } from 'react';

export type FormFieldRendererProps = {
  fieldType: Frontier.Element['type'];
  value: string | number;
  onChange: (value: string | number) => void;
  metadata: Frontier.ElementMeta;
};

export const FormFieldRenderer = ({
  fieldType,
  ...props
}: FormFieldRendererProps) => {
  switch (fieldType) {
    case 'boolean':
      return (
        <BooleanButton
          value={props.value}
          onChange={props.onChange}
          metadata={props.metadata}
        />
      );

    case 'multichoice':
      return (
        <select name="cars" id="cars" multiple>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
        </select>
      );
    //   return <SelectField id={id} onChange={onChange} multiple {...rest} />
    case 'textarea':
      return (
        <StyledTextArea
          value={props.value as string}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            props.onChange(event.target.value)
          }
          {...props.metadata}
        />
      );
    default:
      return (
        <StyledInput
          value={props.value as string}
          type={props.metadata.format}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            props.onChange(event.target.value)
          }
          {...props.metadata}
        />
      );
  }
};
