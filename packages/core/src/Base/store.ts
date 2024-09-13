import { makeObservable, observable } from 'mobx';
import { FieldMode } from '../FormItem';
import type { FormItemProps } from '../FormItem';

export class BaseStore {
  // ===== 状态属性 =====

  /** 表单内控件变体 */
  variant?: FormItemProps['variant'];
  /** 是否隐藏字段（依然会收集和校验字段） */
  hidden?: FormItemProps['hidden'];
  /** 配合 label 属性使用，表示是否显示 label 后面的冒号 */
  colon?: FormItemProps['colon'];
  /** 控件状态 */
  mode?: FieldMode;

  // ===== ColProps =====

  /** flex 布局属性 */
  flex?: FormItemProps['flex'];
  /** 栅格左侧的间隔格数，间隔内不可以有栅格 */
  offset?: FormItemProps['offset'];
  /** 栅格顺序 */
  order?: FormItemProps['order'];
  /** 栅格向左移动格数 */
  pull?: FormItemProps['pull'];
  /** 栅格向右移动格数 */
  push?: FormItemProps['push'];
  /** 栅格占位格数，为 0 时相当于 display: none */
  span?: FormItemProps['span'];

  // ===== 布局属性 =====

  /** 标签文本对齐方式 */
  labelAlign?: FormItemProps['labelAlign'];
  /** label 标签布局，同 <Col> 组件; 通过 Form 的 labelCol 进行统一设置，不会作用于嵌套 Item */
  labelCol?: FormItemProps['labelCol'];
  /** 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol。你可以通过 Form 的 wrapperCol 进行统一设置，不会作用于嵌套 Item。当和 Form 同时设置时，以 Item 为准 */
  wrapperCol?: FormItemProps['wrapperCol'];
  /** 表单项布局 5.18 */
  layout?: FormItemProps['layout'];

  // ===== 校验属性 =====
  /** 默认验证字段的信息 */
  messageVariables?: FormItemProps['messageVariables'];
  /** 当某一规则校验不通过时，是否停止剩下的规则的校验。设置 parallel 时会并行校验 */
  validateFirst?: FormItemProps['validateFirst'];
  /** 设置防抖，延迟毫秒数后进行校验 5.9.0 */
  validateDebounce?: FormItemProps['validateDebounce'];
  /** 设置字段校验的时机 */
  validateTrigger?: FormItemProps['validateTrigger'];

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
    });
  }
}
