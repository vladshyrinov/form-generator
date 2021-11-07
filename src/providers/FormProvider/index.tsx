import { FC, useMemo, useReducer } from 'react';

import { FormContext } from './FormContext';
import { formReducer, initialState } from './formReducer';

interface FormProviderProps {
  children: React.ReactNode;
}

const FormProvider: FC<FormProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export default FormProvider;
