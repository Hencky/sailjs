import type { FormProps as AFormProps } from 'antd/lib/form';
import type { FormStore } from './store';

export interface FormProps<Values = any> extends Omit<AFormProps<Values>, 'form'> {
  form: FormStore;

  remoteValues?: () => Promise<Values>;
}
