import { createContext, useContext } from 'react';
import type { FormStore } from '../Form';

export const FormContext = createContext(null as unknown as FormStore);

export const useFormContext = () => {
  return useContext(FormContext);
};
