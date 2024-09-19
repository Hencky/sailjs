import type { NamePath } from 'antd/es/form/interface';
import type { RowProps } from 'antd/lib/row';
import type { BaseProps } from '../Base';
import type { FormItemProps } from '../FormItem';
import type { PluginsType } from '../plugins';

export interface FormGroupProps<ValuesType = any, P extends PluginsType = any>
  extends Pick<FormItemProps<ValuesType, P>, keyof BaseProps>,
    RowProps {
  /** 唯一标识 */
  name?: NamePath;

  fields?: FormItemProps<ValuesType, P>[];
}
