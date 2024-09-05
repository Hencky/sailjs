import type { FormItemProps as AFormItemProps } from 'antd/lib/form/FormItem';
import type { DebounceOptions } from 'ahooks/lib/useDebounce/debounceOptions';

export enum FieldMode {
  /** 编辑状态 */
  EDIT = 'edit',
  /** 查看状态 */
  VIEW = 'view',
  /** 禁用状态 */
  DISABLED = 'disabled',
  /** 隐藏状态，渲染组件 */
  HIDDEN = 'hidden',
  /** 隐藏状态，不渲染组件 */
  NODE = 'none',
}

export enum ValidateStatus {
  /** 无校验 */
  NONE = 'none',
  /** 校验通过 */
  SUCCESS = 'success',
  /** 警告 */
  WARNING = 'warning',
  /** 校验失败 */
  ERROR = 'error',
  /** 校验中 */
  VALIDATING = 'VALIDATING',
}

export interface FormItemProps<OptionType = any> extends AFormItemProps {
  /** 控件状态 */
  mode?: FieldMode;
  /** 数据源类型 */
  options?: OptionType[];
  /** 远程数据源 */
  remoteOptions?: (depValues?: any[]) => Promise<OptionType[]>;
  /** 远程数据源属性设置 */
  remoteOptionsDebounceProps?: DebounceOptions;
}
