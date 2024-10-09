import type { NamePath } from 'antd/es/form/interface';
import type { RowProps } from 'antd/lib/row';
import type { PluginsType } from '@sailjs/shared';
import type { BaseProps } from '../Base';
import type { FormItemProps } from '../FormItem';

export interface FormGroupProps<Values = any, P extends PluginsType = any>
  extends Pick<FormItemProps<Values, P>, keyof BaseProps | 'reactions'> {
  /** 唯一标识 */
  name?: NamePath;

  /** 容器 */
  container?: React.ReactNode;
  /** 容器属性 */
  containerProps?: any;

  rowProps?: RowProps;

  /** 表单项 */
  items?: (FormItemProps<Values, P> | FormGroupProps<Values, P>)[];

  children?: React.ReactNode;
}
