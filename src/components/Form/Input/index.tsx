import { FC, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { useFormContext } from 'providers/FormProvider/FormContext';
import { FormActionType } from 'providers/FormProvider/formReducer';

interface InputProps {
  element: Frontier.Element;
}

const Input: FC<InputProps> = ({ element }) => {
  const {
    state: { formFields, errors },
    dispatch,
  } = useFormContext();

  const { id, type, metadata, question_text } = element;

  const checkFieldValidity = useMemo(
    () =>
      debounce((name: string, value: string, pattern: string) => {
        const isValid = new RegExp(pattern).test(value);

        if (!isValid) {
          dispatch({
            type: FormActionType.ADD_ERROR,
            payload: { value: name },
          });
        } else if (errors.includes(name)) {
          dispatch({
            type: FormActionType.REMOVE_ERROR,
            payload: { value: name },
          });
        }
      }, 200),
    [errors, dispatch],
  );

  useEffect(() => {
    return () => {
      checkFieldValidity.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, pattern } = e.target;

    dispatch({
      type: FormActionType.CHANGE_FIELD_VALUE,
      payload: { field: name, value: value.trim ? value.trim() : value },
    });

    if (pattern) {
      checkFieldValidity(name, value, pattern);
    }
  };

  if (type !== 'boolean') {
    return (
      <label className="block text-gray-700 text-sm font-bold mb-5">
        {question_text} {metadata.required ? '(required)' : ''}
        <input
          className={`bg-background_color focus:outline-none focus:shadow-outline border ${
            errors.includes(id) ? 'border-red-700' : 'border-gray-300'
          } rounded-lg py-2 px-4 block w-full appearance-none leading-normal`}
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
    <div className="mb-5">
      <h4 className="text-gray-700 text-sm font-bold">
        {question_text} {metadata.required ? '(required)' : ''}
      </h4>
      <div className="flex">
        {['Yes', 'No'].map(option => (
          <div className="flex items-center mr-2" key={option}>
            <label>
              <input
                onChange={onChange}
                name={id}
                type="radio"
                value={option}
                checked={formFields[id] === option}
              />
              <span className="ml-2 text-sm">{option}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Input;
