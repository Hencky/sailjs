import { createContext, useContext } from 'react';
import { GroupStore } from './store';

export const FormGroupContext = createContext<GroupStore>(null as unknown as GroupStore<any, any>);

export const useFormGroupContext = <Values = any, P = any>() => {
  return useContext<GroupStore<Values, P>>(FormGroupContext);
};
