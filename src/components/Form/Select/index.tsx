import { FC } from 'react';
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
    <label className="block text-gray-700 text-sm font-bold mb-5">
      {question_text}{' '}
      <select
        className="block appearance-none w-full bg-background_color border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        name={id}
        onChange={onChange}
        value={formFields[id]}
        multiple
      >
        {metadata.options?.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
