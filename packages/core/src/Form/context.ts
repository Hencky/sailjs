import { createContext, useContext } from 'react';
import { FormStore } from './store';

export const FormContext = createContext({} as FormStore);

export const useFormContext = () => {
  return useContext(FormContext);
};
