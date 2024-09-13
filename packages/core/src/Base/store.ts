import { makeObservable, observable } from 'mobx';
import { BaseProps } from './interface';

export const commonKeys = [
  'variant',
  'hidden',
  'colon',
  'mode',
  'flex',
  'offset',
  'order',
  'pull',
  'push',
  'span',
  'labelAlign',
  'labelCol',
  'wrapperCol',
  'layout',
  'messageVariables',
  'validateFirst',
  'validateDebounce',
  'validateTrigger',
  'remoteOptionsDebounceProps',
] as const;

export class BaseStore implements BaseProps {
  // ===== 状态属性 =====

  /** 表单内控件变体 */
  variant?: BaseProps['variant'];
  /** 是否隐藏字段（依然会收集和校验字段） */
  hidden?: BaseProps['hidden'];
  /** 配合 label 属性使用，表示是否显示 label 后面的冒号 */
  colon?: BaseProps['colon'];
  /** 控件状态 */
  mode?: BaseProps['mode'];

  // ===== ColProps =====

  /** flex 布局属性 */
  flex?: BaseProps['flex'];
  /** 栅格左侧的间隔格数，间隔内不可以有栅格 */
  offset?: BaseProps['offset'];
  /** 栅格顺序 */
  order?: BaseProps['order'];
  /** 栅格向左移动格数 */
  pull?: BaseProps['pull'];
  /** 栅格向右移动格数 */
  push?: BaseProps['push'];
  /** 栅格占位格数，为 0 时相当于 display: none */
  span?: BaseProps['span'];

  // ===== 布局属性 =====

  /** 标签文本对齐方式 */
  labelAlign?: BaseProps['labelAlign'];
  /** label 标签布局，同 <Col> 组件; 通过 Form 的 labelCol 进行统一设置，不会作用于嵌套 Item */
  labelCol?: BaseProps['labelCol'];
  /** 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol。你可以通过 Form 的 wrapperCol 进行统一设置，不会作用于嵌套 Item。当和 Form 同时设置时，以 Item 为准 */
  wrapperCol?: BaseProps['wrapperCol'];
  /** 表单项布局 5.18 */
  layout?: BaseProps['layout'];

  // ===== 校验属性 =====
  /** 默认验证字段的信息 */
  messageVariables?: BaseProps['messageVariables'];
  /** 当某一规则校验不通过时，是否停止剩下的规则的校验。设置 parallel 时会并行校验 */
  validateFirst?: BaseProps['validateFirst'];
  /** 设置防抖，延迟毫秒数后进行校验 5.9.0 */
  validateDebounce?: BaseProps['validateDebounce'];
  /** 设置字段校验的时机 */
  validateTrigger?: BaseProps['validateTrigger'];

  // ===== 其他 =====
  remoteOptionsDebounceProps?: BaseProps['remoteOptionsDebounceProps'];

  makeObservable() {
    makeObservable(this, {
      variant: observable,
      hidden: observable,
      colon: observable,
      mode: observable,

      flex: observable,
      offset: observable,
      order: observable,
      pull: observable,
      push: observable,
      span: observable,

      labelAlign: observable,
      labelCol: observable,
      wrapperCol: observable,
      layout: observable,

      messageVariables: observable,
      validateFirst: observable,
      validateDebounce: observable,
      validateTrigger: observable,

      remoteOptionsDebounceProps: observable,
    });
  }
}
