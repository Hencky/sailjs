import type { FormProps as AFormProps } from 'antd/lib/form';
import type { FormStore } from './store';
import type { BaseStore } from '../Base';

export interface FormProps<Values = any> extends Omit<AFormProps<Values>, 'form' | keyof BaseStore>, BaseStore {
  form: FormStore;

  remoteValues?: () => Promise<Values>;
}
