import { makeObservable, observable } from 'mobx';
import { BaseProps } from './interface';

export const commonKeys = [
  'id',
  'className',
  'style',
  'bordered',
  'hidden',
  'colon',
  'mode',
  'colProps',
  'span',
  'labelAlign',
  'labelCol',
  'wrapperCol',
  // 'layout',
  'messageVariables',
  'validateFirst',
  'validateDebounce',
  'validateTrigger',
  'remoteOptionsDebounceProps',
] as const;

export class BaseRootStore implements BaseProps {
  id: BaseProps['id'];
  className?: BaseProps['className'];
  style?: BaseProps['style'];

  // ===== 状态属性 =====
  bordered?: BaseProps['bordered'];
  hidden?: BaseProps['hidden'];
  colon?: BaseProps['colon'];
  mode?: BaseProps['mode'];
  colProps?: BaseProps['colProps'];
  span?: BaseProps['span'] = 24;
  labelAlign?: BaseProps['labelAlign'];
  labelCol?: BaseProps['labelCol'];
  wrapperCol?: BaseProps['wrapperCol'];
  messageVariables?: BaseProps['messageVariables'];
  validateFirst?: BaseProps['validateFirst'];
  validateDebounce?: BaseProps['validateDebounce'];
  validateTrigger?: BaseProps['validateTrigger'];
  remoteOptionsDebounceProps?: BaseProps['remoteOptionsDebounceProps'];

  makeObservable() {
    makeObservable(this, {
      id: observable.ref,
      className: observable.ref,
      style: observable,

      bordered: observable.ref,
      hidden: observable.ref,
      colon: observable.ref,
      mode: observable.ref,

      colProps: observable,
      span: observable.ref,

      labelAlign: observable.ref,
      labelCol: observable,
      wrapperCol: observable,

      messageVariables: observable,
      validateFirst: observable.ref,
      validateDebounce: observable.ref,
      validateTrigger: observable.ref,

      remoteOptionsDebounceProps: observable,
    });
  }
}
