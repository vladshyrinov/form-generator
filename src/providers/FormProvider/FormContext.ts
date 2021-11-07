import { createContext, useContext } from 'react';
import { FormState, FormAction } from './formReducer';

interface FormContextType {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}

export const FormContext = createContext<FormContextType | undefined>(
  undefined,
);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext can be used just inside FormProvider and should be defined');
  }
  return context;
};
