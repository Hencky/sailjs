import type { FormProps as AFormProps } from 'antd/lib/form';
import type { FormStore } from './store';
import type { BaseProps, BaseRootStore } from '../Base';
import type { FormItemProps } from '../FormItem';

export interface FormProps<ValuesType = any, PluginsType = any>
  extends Omit<AFormProps<ValuesType>, 'form' | keyof BaseRootStore>,
    BaseProps {
  /** 表单实例 */
  form: FormStore<ValuesType, PluginsType>;
  /** 表单项 */
  items?: FormItemProps[];
  /** 远程表单值 */
  remoteValues?: () => Promise<ValuesType>;
}

export type FormOptionProps<PluginsType = any> = {
  plugins?: PluginsType;
};
