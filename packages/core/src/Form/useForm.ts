import { useRef } from 'react';
import { FormStore } from './store';
import type { FormOptions } from './interface';

export const useForm = <ValuesType = any, PluginsType = any>(
  props?: FormOptions<PluginsType>
): [FormStore<ValuesType, PluginsType>] => {
  const formRef = useRef<FormStore<ValuesType, PluginsType>>();

  if (!formRef.current) {
    formRef.current = new FormStore<ValuesType, PluginsType>(props);
  }

  return [formRef.current];
};
