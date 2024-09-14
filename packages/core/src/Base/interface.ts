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

export interface BaseProps {
  // ===== 状态属性 =====

  /** 表单内控件变体 */
  variant?: AFormProps['variant'];
  /** 是否隐藏字段（依然会收集和校验字段） */
  hidden?: AFormProps['hidden'];
  /** 配合 label 属性使用，表示是否显示 label 后面的冒号 */
  colon?: AFormProps['colon'];
  /** 控件状态 */
  mode?: FieldMode;

  // ===== ColProps =====

  /** flex 布局属性 */
  flex?: ColProps['flex'];
  /** 栅格左侧的间隔格数，间隔内不可以有栅格 */
  offset?: ColProps['offset'];
  /** 栅格顺序 */
  order?: ColProps['order'];
  /** 栅格向左移动格数 */
  pull?: ColProps['pull'];
  /** 栅格向右移动格数 */
  push?: ColProps['push'];
  /** 栅格占位格数，为 0 时相当于 display: none */
  span?: ColProps['span'] | null;
  /** 屏幕 < 576px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  xs?: ColProps['xs'];
  /** 屏幕 ≥ 576px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  sm?: ColProps['sm'];
  /** 屏幕 ≥ 768px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  md?: ColProps['md'];
  /** 屏幕 ≥ 992px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  lg?: ColProps['lg'];
  /** 屏幕 ≥ 1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  xl?: ColProps['xl'];
  /** 屏幕 ≥ 1600px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  xxl?: ColProps['xxl'];



  // ===== 布局属性 =====

  /** 标签文本对齐方式 */
  labelAlign?: AFormProps['labelAlign'];
  /** label 标签布局，同 <Col> 组件; 通过 Form 的 labelCol 进行统一设置，不会作用于嵌套 Item */
  labelCol?: AFormProps['labelCol'];
  /** 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol。你可以通过 Form 的 wrapperCol 进行统一设置，不会作用于嵌套 Item。当和 Form 同时设置时，以 Item 为准 */
  wrapperCol?: AFormProps['wrapperCol'];
  /** 表单项布局 5.18 */
  layout?: AFormItemProps['layout'];

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
