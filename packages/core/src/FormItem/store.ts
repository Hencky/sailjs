import { makeObservable, observable, runInAction } from 'mobx';
import { FormInstance } from 'antd';
import type { FormItemProps as AFormItemProps } from 'antd/lib/form/FormItem';
import { FieldMode, type FormItemProps } from './interface';
import type { NamePath } from 'antd/lib/form/interface';
import type { FormStore, FormProps } from '../Form';

export class FieldStore<ValuesType = any, OptionType = any> implements Omit<FormItemProps, 'validateStatus'> {
  /** 表单实例 */
  form: FormStore<ValuesType> & FormInstance<ValuesType>;
  /** 字段名，唯一路径标识 */
  name?: NamePath;
  /** 表单渲染状态 */
  mode: FieldMode = FieldMode.EDIT;
  /** 表单loading状态 */
  optionsLoading: boolean = false;
  /** 数据源 */
  options: OptionType[] = [];
  /** 远程数据源 */
  remoteOptions?: ((depValues?: any[]) => Promise<OptionType[]>) | undefined;
  /** 强制刷新 */
  forceUpdate: () => void;

  // ===== 内置 =====
  /** 样式 */
  style?: FormItemProps['style'];
  /** 配合 label 属性使用，表示是否显示 label 后面的冒号 */
  colon?: FormItemProps['colon'];
  /** 设置依赖字段 */
  dependencies?: FormItemProps['dependencies'];
  /** 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时 */
  extra?: FormItemProps['extra'];
  /** 设置如何将 event 的值转换成字段值 */
  getValueFromEvent?: FormItemProps['getValueFromEvent'];
  /** 为子元素添加额外的属性 (不建议通过 getValueProps 生成动态函数 prop，请直接将其传递给子组件) */
  getValueProps?: FormItemProps['getValueProps'];
  /** 配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用 此外，它还可以通过 Icons 属性获取反馈图标  5.9.0 */
  hasFeedback?: FormItemProps['hasFeedback'];
  /** 提示信息，如不设置，则会根据校验规则自动生成 */
  help?: FormItemProps['help'];
  /** 是否隐藏字段（依然会收集和校验字段） */
  hidden?: FormItemProps['hidden'];
  /** 设置子元素 label htmlFor 属性 */
  htmlFor?: FormItemProps['htmlFor'];
  /** 设置子元素默认值，如果与 Form 的 initialValues 冲突则以 Form 为准 */
  initialValue?: FormItemProps['initialValue'];
  /** label 标签的文本 */
  label?: FormItemProps['label'];
  /** 标签文本对齐方式 */
  labelAlign?: FormItemProps['labelAlign'];
  /** label 标签布局，同 <Col> 组件; 通过 Form 的 labelCol 进行统一设置，不会作用于嵌套 Item */
  labelCol?: FormItemProps['labelCol'];
  /** 默认验证字段的信息 */
  messageVariables?: FormItemProps['messageVariables'];
  /** 组件获取值后进行转换，再放入 Form 中。不支持异步 */
  normalize?: FormItemProps['normalize'];
  /** 为 true 时不带样式，作为纯字段控件使用。当自身没有 validateStatus 而父元素存在有 validateStatus 的 Form.Item 会继承父元素的 validateStatus */
  noStyle?: FormItemProps['noStyle'];
  /** 当字段被删除时保留字段值 */
  preserve?: FormItemProps['preserve'];
  /** 必填样式设置。如不设置，则会根据校验规则自动生成 */
  required?: FormItemProps['required'];
  /** 校验规则，设置字段的校验逻辑 */
  rules?: FormItemProps['rules'];
  /** 自定义字段更新逻辑 */
  shouldUpdate?: FormItemProps['shouldUpdate'];
  /** 配置提示信息 */
  tooltip?: FormItemProps['tooltip'];
  /** 设置收集字段值变更的时机 */
  trigger?: FormItemProps['trigger'];
  /** 当某一规则校验不通过时，是否停止剩下的规则的校验。设置 parallel 时会并行校验 */
  validateFirst?: FormItemProps['validateFirst'];
  /** 设置防抖，延迟毫秒数后进行校验 5.9.0 */
  validateDebounce?: FormItemProps['validateDebounce'];
  /** 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating' */
  validateStatus: FormItemProps['validateStatus'];
  /** 设置字段校验的时机 */
  validateTrigger?: FormItemProps['validateTrigger'];
  /** 子节点的值的属性 */
  valuePropName?: FormItemProps['valuePropName'];
  /** 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol。你可以通过 Form 的 wrapperCol 进行统一设置，不会作用于嵌套 Item。当和 Form 同时设置时，以 Item 为准 */
  wrapperCol?: FormItemProps['wrapperCol'];
  /** 表单项布局 5.18 */
  layout?: FormItemProps['layout'];

  constructor(props: FormItemProps, form: FormStore & FormInstance, forceUpdate: () => void) {
    this.mode = props.mode || FieldMode.EDIT;
    this.form = form;
    this.forceUpdate = forceUpdate;

    Object.keys(props).forEach((key) => {
      // @ts-expect-error
      this[key] = props[key];
    });

    this.makeObservable();
    this.fetchRemoteOptions();
  }

  makeObservable() {
    makeObservable(this, {
      mode: observable,
      validateStatus: observable,
      optionsLoading: observable,
      options: observable,
      style: observable,
      rules: observable,
      colon: observable,
      extra: observable,
      getValueFromEvent: observable,
      hasFeedback: observable,
      help: observable,
      hidden: observable,
      htmlFor: observable,
      label: observable,
      labelAlign: observable,
      labelCol: observable,
      messageVariables: observable,
      normalize: observable,
      noStyle: observable,
      preserve: observable,
      required: observable,
      shouldUpdate: observable,
      tooltip: observable,
      trigger: observable,
      validateFirst: observable,
      validateTrigger: observable,
      valuePropName: observable,
      wrapperCol: observable,
      remoteOptions: observable,
    });
  }

  /** 远程数据源 */
  fetchRemoteOptions() {
    if (!this.remoteOptions) return Promise.resolve();
    this.optionsLoading = true;

    const deps = this.dependencies?.map((key) => {
      return this.form.getFieldValue(key);
    });

    return this.remoteOptions(deps)
      .then((data) => {
        runInAction(() => {
          this.options = data;
          this.optionsLoading = false;
        });
      })
      .catch((e) => {
        console.warn(`${this.name} remote options error`, e);
        runInAction(() => {
          this.options = [];
          this.optionsLoading = false;
        });
      });
  }

  set value(val: any) {
    this.form.setFieldValue(this.name, val);
  }

  get value(): any {
    const field = this.form.getFieldValue(this.name);
    return field;
  }

  public get childProps() {
    const displayOptions: {
      variant: FormProps['variant'];
      readOnly: boolean;
    } = {
      variant: 'outlined',
      readOnly: false,
    };

    if (this.mode === FieldMode.VIEW) {
      displayOptions.variant = 'borderless';
      displayOptions.readOnly = true;
    }

    return {
      disabled: this.mode === FieldMode.DISABLED,
      options: this.options,
      ...displayOptions,
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
      hidden: this.mode === FieldMode.HIDDEN,
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
