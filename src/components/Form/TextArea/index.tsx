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
      payload: { field: name, value: value.trim()},
    });
  };

  return (
    <label className="block text-gray-700 text-sm font-bold mb-5">
      {question_text} {metadata.required ? '(required)' : ''}
      <textarea
        className="bg-background_color w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        rows={4}
        name={id}
        placeholder={metadata.placeholder}
        onChange={onChange}
        value={formFields[id]}
      />
    </label>
  );
};

export default TextArea;
