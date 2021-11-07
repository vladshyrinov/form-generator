import { FC } from 'react';
import { useFormContext } from 'providers/FormProvider/FormContext';
import { FormActionType } from 'providers/FormProvider/formReducer';

interface TextAreaProps {
  element: Frontier.Element;
}

const TextArea: FC<TextAreaProps> = ({ element }) => {
  const {
    state: { formFields },
    dispatch,
  } = useFormContext();

  const { id, metadata, question_text } = element;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: FormActionType.CHANGE_FIELD_VALUE,
      payload: { field: name, value: value.trim ? value.trim() : value },
    });
  };

  return (
    <label>
      {question_text}{' '}
      <textarea
        name={id}
        placeholder={metadata.placeholder}
        onChange={onChange}
        value={formFields[id]}
      />
    </label>
  );
};

export default TextArea;
