import { FC } from 'react';
import { useFormContext } from 'providers/FormProvider/FormContext';
import { FormActionType } from 'providers/FormProvider/formReducer';

interface InputProps {
  element: Frontier.Element;
}

const Input: FC<InputProps> = ({ element }) => {
  const {
    state: { formFields },
    dispatch,
  } = useFormContext();

  const { id, type, metadata, question_text } = element;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: FormActionType.CHANGE_FIELD_VALUE,
      payload: { field: name, value: value.trim ? value.trim() : value },
    });
  };

  if (type !== 'boolean') {
    return (
      <label>
        {question_text}{' '}
        <input
          type={metadata.format}
          placeholder={metadata.placeholder}
          pattern={metadata.pattern}
          onChange={onChange}
          name={id}
          value={formFields[id]}
          step={metadata.step}
          min={metadata.min}
          max={metadata.max}
        />
      </label>
    );
  }

  return (
    <>
      <h4>{question_text}</h4>
      {['Yes', 'No'].map(option => (
        <div key={option}>
          <label>
            <input
              onChange={onChange}
              name={id}
              type="radio"
              value={option}
              checked={formFields[id] === option}
            />
            {option}
          </label>
        </div>
      ))}
    </>
  );
};

export default Input;
