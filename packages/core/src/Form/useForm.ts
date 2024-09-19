import { useRef } from 'react';
import { FormStore } from './store';
import type { FormOptionProps } from './interface';

export const useForm = <ValuesType = any, PluginsType = any>(
  props?: FormOptionProps<PluginsType>
): [FormStore<ValuesType, PluginsType>] => {
  const formRef = useRef<FormStore<ValuesType, PluginsType>>();

  if (!formRef.current) {
    formRef.current = new FormStore<ValuesType, PluginsType>(props);
  }

  return [formRef.current];
};
