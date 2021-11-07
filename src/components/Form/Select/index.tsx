import { FC, useMemo } from 'react';
import { useFormContext } from 'providers/FormProvider/FormContext';
import { FormActionType } from 'providers/FormProvider/formReducer';

interface SelectProps {
  element: Frontier.Element;
}

const Select: FC<SelectProps> = ({ element }) => {
  const {
    state: { formFields },
    dispatch,
  } = useFormContext();

  const { id, question_text, metadata } = element;

  const selectedOptions = useMemo(
    () => new Set((formFields[id] as readonly string[]) || undefined),
    [formFields, id],
  );

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = e.target;

    const selected = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }

    dispatch({
      type: FormActionType.CHANGE_FIELD_VALUE,
      payload: { field: name, value: selected },
    });
  };

  return (
    <label>
      {question_text}{' '}
      <select name={id} onChange={onChange} multiple>
        {metadata.options?.map(option => (
          <option
            key={option.value}
            value={option.value}
            selected={selectedOptions.has(option.value)}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
