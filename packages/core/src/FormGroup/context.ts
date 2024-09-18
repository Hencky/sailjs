import { createContext, useContext } from 'react';
import { GroupStore } from './store';

export const FormGroupContext = createContext<GroupStore>(null as unknown as GroupStore<any, any>);

export const useFormGroupContext = <ValuesType = any, PluginsType = any>() => {
  return useContext<GroupStore<ValuesType, PluginsType>>(FormGroupContext);
};
