import type { BaseProps } from '../Base';
import type { RowProps } from 'antd/lib/row';
import type { FormItemProps } from '../FormItem';
import { NamePath } from 'antd/es/form/interface';

export interface FormGroupProps<ValuesType = any> extends Pick<FormItemProps, keyof BaseProps>, RowProps {
  /** 唯一标识 */
  name?: NamePath;
  fields?: FormItemProps<ValuesType>[];
}
