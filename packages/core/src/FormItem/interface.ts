import type { FormItemProps as AFormItemProps } from 'antd/lib/form/FormItem';
import type { NamePath } from 'antd/es/form/interface';
import type { BaseProps } from '../Base';

export type ReactionResultKeyType = keyof Omit<FormItemProps, 'reactions' | 'dependencies'> & 'value';

export type ReactionResultFunctionType<Key extends keyof FormItemProps> = (target: any) => FormItemProps[Key];

export type ReactionResultType<Key extends keyof FormItemProps> = ReactionResultFunctionType<Key> | string;

export interface FormItemProps<ValuesType = any, OptionType = any>
  extends Omit<AFormItemProps<ValuesType>, keyof BaseProps>,
    BaseProps {
  /** 数据源类型 */
  options?: OptionType[];
  /** 远程数据源 */
  remoteOptions?: (depValues?: any[]) => Promise<OptionType[]>;
  /** 联动关系 */
  reactions?: ReactionType[];
}

export type ReactionType = {
  /** 被动关联 */
  dependencies?: NamePath[];
  /** 主动关联 */
  effects?: NamePath[];
  result: {
    [Key in ReactionResultKeyType]: ReactionResultType<Key>;
  };
};
