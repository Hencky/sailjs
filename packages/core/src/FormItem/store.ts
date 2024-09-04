import { makeAutoObservable } from 'mobx';
import { FormStore, NamePath } from '../Form/store';
import { FormInstance, FormRule } from 'antd';
import { FormItemProps as AFormItemProps, FeedbackIcons } from 'antd/lib/form/FormItem';
import { ReactNode } from 'react';
import { FormLabelAlign, Store, StoreValue } from 'antd/lib/form/interface';
import { ColProps } from 'antd/lib';
import { LabelTooltipType } from 'antd/lib/form/FormItemLabel';
import { FieldMode, ValidateStatus } from './interface';
import type { FormItemProps } from './interface';

export class FieldStore<ValueType = any, OptionsType = any> implements Omit<AFormItemProps, 'validateStatus'> {
  form: FormStore & FormInstance;
  name: NamePath;
  /** 表单渲染状态 */
  mode: FieldMode = FieldMode.EDIT;
  /** 表单校验状态 */
  validateStatus: ValidateStatus = ValidateStatus.NONE;
  /** 表单loading状态 */
  loading: boolean = false;
  /** 数据源 */
  options: OptionsType[] = [];

  style: React.CSSProperties = {};

  rules?: FormRule[] | undefined;
  colon?: boolean | undefined;
  dependencies?: any[] | undefined;
  extra?: ReactNode;
  getValueFromEvent?: any;
  hasFeedback?: boolean | { icons: FeedbackIcons } | undefined;
  help?: ReactNode;
  hidden?: boolean | undefined;
  htmlFor?: string | undefined;
  initialValue?: any;
  label?: ReactNode;
  labelAlign?: FormLabelAlign | undefined;
  labelCol?: ColProps | undefined;
  messageVariables?: Record<string, string> | undefined;
  normalize?: ((value: StoreValue, prevValue: StoreValue, allValues: Store) => StoreValue) | undefined;
  noStyle?: boolean | undefined;
  preserve?: boolean | undefined;
  required?: boolean | undefined;
  shouldUpdate?: any;
  tooltip?: LabelTooltipType;
  trigger?: string | undefined;
  validateFirst?: boolean | 'parallel' | undefined;
  validateTrigger?: string | false | string[] | undefined;
  valuePropName?: string | undefined;
  wrapperCol?: ColProps | undefined;

  forceUpdate: () => void;

  constructor(props: FormItemProps, form: FormStore & FormInstance, forceUpdate: () => void) {
    this.name = props.name;
    this.mode = props.mode || FieldMode.EDIT;
    this.options = props.options || [];
    this.form = form;
    this.forceUpdate = forceUpdate;

    Object.keys(props).forEach((key) => {
      this[key] = props[key];
    });

    this.makeObservable();
  }

  makeObservable() {
    makeAutoObservable(this);
  }

  set value(val: ValueType) {
    this.form.setFieldValue(this.name, val);
  }

  get value() {
    const field = this.form.getFieldValue(this.name);
    return field;
  }

  public get childProps() {
    return {
      disabled: this.mode === FieldMode.DISABLED,
      options: this.options,
    };
  }

  public get fieldProps(): AFormItemProps {
    return {
      colon: this.colon,
      dependencies: this.dependencies,
      extra: this.extra,
      getValueFromEvent: this.getValueFromEvent,
      hasFeedback: this.hasFeedback,
      help: this.help,
      hidden: this.hidden,
      htmlFor: this.htmlFor,
      initialValue: this.initialValue,
      label: this.label,
      labelAlign: this.labelAlign,
      labelCol: this.labelCol,
      messageVariables: this.messageVariables,
      normalize: this.normalize,
      noStyle: this.noStyle,
      preserve: this.preserve,
      required: this.required,
      rules: this.rules,
      shouldUpdate: this.shouldUpdate,
      tooltip: this.tooltip,
      trigger: this.trigger,
      validateFirst: this.validateFirst,
      validateTrigger: this.validateTrigger,
      valuePropName: this.valuePropName,
      wrapperCol: this.wrapperCol,
    };
  }
}
