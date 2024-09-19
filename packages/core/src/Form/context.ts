import { createContext, useContext } from 'react';
import type { FormStore } from '../Form';

export const FormContext = createContext(null as unknown as FormStore<any, any>);

export const useFormContext = <Values = any, P = any>() => {
  return useContext<FormStore<Values, P>>(FormContext);
};
