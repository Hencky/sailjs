import type { FormProps as AFormProps, FormItemProps as AFormItemProps, ColProps } from 'antd';
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

export interface BaseProps {
  // ===== 通用 =====
  id?: string;
  className?: string;
  style?: React.CSSProperties;

  // ===== 状态属性 =====

  /** 是否显示边框 */
  bordered?: boolean;
  /** 表单内控件变体 */
  // variant?: AFormProps['variant'];
  /** 是否隐藏字段（依然会收集和校验字段） */
  hidden?: AFormProps['hidden'];
  /** 配合 label 属性使用，表示是否显示 label 后面的冒号 */
  colon?: AFormProps['colon'];
  /** 控件状态 */
  mode?: FieldMode;

  // ===== ColProps =====
  colProps?: ColProps;

  /** 常用属性，放出来；栅格占位格数，为 0 时相当于 display: none */
  span?: ColProps['span'] | null;

  // ===== 布局属性 =====

  /** 标签文本对齐方式 */
  labelAlign?: AFormProps['labelAlign'];
  /** label 标签布局，同 <Col> 组件; 通过 Form 的 labelCol 进行统一设置，不会作用于嵌套 Item */
  labelCol?: AFormProps['labelCol'];
  /** 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol。你可以通过 Form 的 wrapperCol 进行统一设置，不会作用于嵌套 Item。当和 Form 同时设置时，以 Item 为准 */
  wrapperCol?: AFormProps['wrapperCol'];
  /** 表单项布局 5.18 */
  // layout?: AFormItemProps['layout'];

  // ===== 校验属性 =====

  /** 默认验证字段的信息 */
  messageVariables?: AFormItemProps['messageVariables'];
  /** 当某一规则校验不通过时，是否停止剩下的规则的校验。设置 parallel 时会并行校验 */
  validateFirst?: AFormItemProps['validateFirst'];
  /** 设置防抖，延迟毫秒数后进行校验 5.9.0 */
  validateDebounce?: AFormItemProps['validateDebounce'];
  /** 设置字段校验的时机 */
  validateTrigger?: AFormItemProps['validateTrigger'];

  // ===== 其他 =====
  remoteOptionsDebounceProps?: DebounceOptions;
}
