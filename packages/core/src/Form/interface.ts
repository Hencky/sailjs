import type { FormProps as AFormProps } from 'antd/lib/form';
import type { FormStore } from './store';
import type { BaseProps, BaseRootStore } from '../Base';
import type { FormItemProps } from '../FormItem';

export interface FormProps<Values = any, P = any>
  extends Omit<AFormProps<Values>, 'form' | keyof BaseRootStore>,
    BaseProps {
  /** 表单实例 */
  form: FormStore<Values, P>;
  /** 表单项 */
  items?: FormItemProps[];
  /** 远程表单值 */
  remoteValues?: () => Promise<Values>;
}

export type FormOptionProps<P = any> = {
  plugins?: P;
};
