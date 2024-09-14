import { useRef } from 'react';
import { FormStore } from './store';

export type PluginType = {
  component: any;
  componentProps: any;
};

export type FormOptions = {
  plugins?: Record<string, PluginType>;
};

export const useForm = (props) => {
  const formRef = useRef<FormStore>();

  if (!formRef.current) {
    formRef.current = new FormStore();
  }

  return [formRef.current];
};
