import type { FormProps as AFormProps } from 'antd/lib/form';
import type { FormStore } from './store';
import type { BaseRootStore } from '../Base';

export interface FormProps<Values = any> extends Omit<AFormProps<Values>, 'form' | keyof BaseRootStore> {
  form: FormStore;

  remoteValues?: () => Promise<Values>;
}

export type PluginType = {
  component: any;
  defaultComponentProps: any;
};

export type FormOptions<PluginsType = any> = {
  plugins?: PluginsType;
};
