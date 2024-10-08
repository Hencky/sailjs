import type { NamePath } from 'antd/es/form/interface';
import type { RowProps } from 'antd/lib/row';
import type { PluginsType } from '@sailjs/shared';
import type { BaseProps } from '../Base';
import type { FormItemProps } from '../FormItem';

export interface FormGroupProps<Values = any, P extends PluginsType = any>
  extends Pick<FormItemProps<Values, P>, keyof BaseProps | 'reactions'>,
    RowProps {
  /** 唯一标识 */
  name?: NamePath;

  items?: FormItemProps<Values, P>[];
}
