import { createContext, useContext } from 'react';

export const FormGroupContext = createContext({});

export const useFormGroupContext = () => {
  return useContext(FormGroupContext);
};
