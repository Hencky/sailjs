import type { NamePath } from 'antd/es/form/interface';
import type { RowProps } from 'antd/lib/row';
import type { BaseProps } from '../Base';
import type { FormItemProps } from '../FormItem';

export interface FormGroupProps<ValuesType = any> extends Pick<FormItemProps, keyof BaseProps>, RowProps {
  /** 唯一标识 */
  name?: NamePath;

  fields?: FormItemProps<ValuesType>[];
}
