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

export class BaseRootStore implements BaseProps {
  // ===== 状态属性 =====

  variant?: BaseProps['variant'];
  hidden?: BaseProps['hidden'];
  colon?: BaseProps['colon'];
  mode?: BaseProps['mode'];
  flex?: BaseProps['flex'];
  offset?: BaseProps['offset'];
  order?: BaseProps['order'];
  pull?: BaseProps['pull'];
  push?: BaseProps['push'];
  span?: BaseProps['span'] = 24;
  xs?: BaseProps['xs'];
  sm?: BaseProps['sm'];
  md?: BaseProps['md'];
  lg?: BaseProps['lg'];
  xl?: BaseProps['xl'];
  xxl?: BaseProps['xxl'];
  labelAlign?: BaseProps['labelAlign'];
  labelCol?: BaseProps['labelCol'];
  wrapperCol?: BaseProps['wrapperCol'];
  layout?: BaseProps['layout'];
  messageVariables?: BaseProps['messageVariables'];
  validateFirst?: BaseProps['validateFirst'];
  validateDebounce?: BaseProps['validateDebounce'];
  validateTrigger?: BaseProps['validateTrigger'];
  remoteOptionsDebounceProps?: BaseProps['remoteOptionsDebounceProps'];

  makeObservable() {
    makeObservable(this, {
      variant: observable.ref,
      hidden: observable.ref,
      colon: observable.ref,
      mode: observable.ref,

      flex: observable.ref,
      offset: observable.ref,
      order: observable.ref,
      pull: observable.ref,
      push: observable.ref,
      span: observable.ref,
      xs: observable,
      sm: observable,
      md: observable,
      lg: observable,
      xl: observable,
      xxl: observable,

      labelAlign: observable.ref,
      labelCol: observable,
      wrapperCol: observable,
      layout: observable.ref,

      messageVariables: observable,
      validateFirst: observable.ref,
      validateDebounce: observable.ref,
      validateTrigger: observable.ref,

      remoteOptionsDebounceProps: observable,
    });
  }
}
