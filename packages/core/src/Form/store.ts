import { makeObservable, observable, runInAction } from 'mobx';
import { isFunction, pick, isEqual } from 'radash';
import { isFieldChange, toCompareName } from '../utils';
import type { FieldStore, ReactionResultType, ReactionResultFunctionType } from '../FormItem';
import type { FormInstance } from 'antd/lib/form';
import type { NamePath } from 'antd/lib/form/interface';
import type { FormProps } from './interface';

export type InnerDependencyType = {
  name: NamePath;
  result?: ReactionResultType<NamePath>;
  dependencies?: NamePath[];
  /** 来源 */
  _source: NamePath;
};

export class FormStore<ValuesType = any> implements Omit<FormProps, 'form'> {
  private store: Record<NamePath, FieldStore | null> = {};
  /** 表单实例 */
  form?: FormInstance<ValuesType>;

  /** 被动关联关系,dependencies关联关系 */
  private deps: Record<NamePath, InnerDependencyType[]> = {};
  /** 关联关系 */
  private effects: Record<NamePath, InnerDependencyType[]> = {};

  /** 表单loading状态 */
  loading: boolean = false;
  /** 获取表单值 */
  remoteValues?: () => Promise<any>;

  // ===== 内置 =====
  autoComplete?: FormProps['autoComplete'];
  /** 配置 Form.Item 的 colon 的默认值。表示是否显示 label 后面的冒号 (只有在属性 layout 为 horizontal 时有效) */
  colon?: FormProps['colon'];
  /** 设置表单组件禁用，仅对 antd 组件有效 */
  disabled?: FormProps['disabled'];
  /** 设置 Form 渲染元素，为 false 则不创建 DOM 节点 */
  component?: FormProps['component'];
  /** 通过状态管理（如 redux）控制表单字段，如非强需求不推荐使用 */
  fields?: FormProps['fields'];
  /** 当 Form.Item 有 hasFeedback 属性时可以自定义图标 5.9.0 */
  feedbackIcons?: FormProps['feedbackIcons'];
  /** 表单默认值，只有初始化以及重置时生效 */
  initialValues?: FormProps['initialValues'];
  /** label 标签的文本对齐方式 */
  labelAlign?: FormProps['labelAlign'];
  /** label 标签的文本换行方式 */
  labelWrap?: FormProps['labelWrap'];
  /** label 标签布局，同 <Col> 组件 */
  labelCol?: FormProps['labelCol'];
  /** 表单布局 */
  layout?: FormProps['layout'];
  /** 表单名称，会作为表单字段 id 前缀使用 */
  name?: FormProps['name'];
  /** 当字段被删除时保留字段值。你可以通过 getFieldsValue(true) 来获取保留字段值 */
  preserve?: FormProps['preserve'];
  /** 必选样式，可以切换为必选或者可选展示样式。此为 Form 配置，Form.Item 无法单独配置 */
  requiredMark?: FormProps['requiredMark'];
  /** 提交失败自动滚动到第一个错误字段 */
  scrollToFirstError?: FormProps['scrollToFirstError'];
  /** 设置字段组件的尺寸（仅限 antd 组件） */
  size?: FormProps['size'];
  /** 验证提示模板 */
  validateMessages?: FormProps['validateMessages'];
  /** 统一设置字段触发验证的时机 */
  validateTrigger?: FormProps['validateTrigger'];
  /** 表单内控件变体  5.13.0 */
  variant?: FormProps['variant'];
  /** 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol */
  wrapperCol?: FormProps['wrapperCol'];
  /** 字段更新时触发回调事件 */
  onFieldsChange?: FormProps['onFieldsChange'];
  /** 提交表单且数据验证成功后回调事件 */
  onFinish?: FormProps['onFinish'];
  /** 提交表单且数据验证失败后回调事件 */
  onFinishFailed?: FormProps['onFinishFailed'];
  /** 字段值更新时触发回调事件 */
  onValuesChange?: FormProps['onValuesChange'];
  /** 当表单被卸载时清空表单值 5.18.0 */
  clearOnDestroy?: FormProps['clearOnDestroy'];

  constructor() {
    this.makeObservable();
  }

  private makeObservable() {
    makeObservable(this, {
      loading: observable,
      autoComplete: observable,
      colon: observable,
      disabled: observable,
      component: observable,
      feedbackIcons: observable,
      initialValues: observable,
      labelAlign: observable,
      labelWrap: observable,
      labelCol: observable,
      layout: observable,
      name: observable,
      preserve: observable,
      requiredMark: observable,
      scrollToFirstError: observable,
      size: observable,
      validateMessages: observable,
      validateTrigger: observable,
      variant: observable,
      wrapperCol: observable,
      onFieldsChange: observable,
      onFinish: observable,
      onFinishFailed: observable,
      onValuesChange: observable,
      clearOnDestroy: observable,
    });
  }

  private addToMap(map: Record<NamePath, InnerDependencyType[]>, name: NamePath, value: InnerDependencyType) {
    const strName = this.getName(name);
    map[strName] = [...(map[strName] || []), value];
  }

  createField<NameType extends keyof ValuesType, OptionType>(
    name: NameType,
    field: FieldStore<ValuesType[NameType], OptionType>
  ) {
    this.addField(name, field);
    field.created = true;

    return field;
  }

  addField<NameType extends keyof ValuesType, OptionType>(
    name: NameType,
    field: FieldStore<ValuesType[NameType], OptionType>
  ) {
    if (this.getField(name)) return;

    this.store[this.getName(name)] = field;

    // 构建被动关联关系，用于field依赖的dependencies项值变化时，更新FormItem组件，触发remoteOptions
    field.dependencies?.forEach((depName) => {
      this.addToMap(this.deps, depName, { name, _source: name });
    });

    field.reactions?.forEach((reaction) => {
      const { dependencies, effects, result } = reaction;
      // 构建主动联动关系
      effects?.forEach((target) => {
        this.addToMap(this.effects, name, { name: target, result, _source: name });
      });

      // 构建被动联动关系成主动关联关系
      dependencies?.forEach((depName) => {
        this.addToMap(this.effects, depName, { name: name, result, dependencies, _soruce: name });
      });
    });
  }

  removeField(name: NamePath) {
    const field = this.getField(name);

    // 清空dependencies的关联关系
    field.dependencies?.forEach((depName) => {
      this.deps[this.getName(depName)] = this.deps[this.getName(depName)].filter(
        (item) => !isEqual(item._source, name)
      );
    });

    // 清空reactions构造的关联关系
    field.reactions?.forEach(({ dependencies }) => {
      this.effects[this.getName(field.name)] = [];
      dependencies?.forEach((effectName) => {
        this.effects[this.getName(effectName)] = this.effects[this.getName(effectName)].filter(
          (item) => !isEqual(item._source, name)
        );
      });
    });

    this.store[this.getName(name)] = null;
  }

  getField<NameType extends keyof ValuesType>(name: NameType): FieldStore<ValuesType[NameType]> {
    return this.store[this.getName(name)]!;
  }

  triggerChange(
    list: Record<string, InnerDependencyType[]>,
    value: ValuesType,
    callback: (config: InnerDependencyType, depName: NamePath) => void
  ) {
    Object.keys(list).forEach((depName) => {
      if (isFieldChange(value, depName)) {
        list[depName].forEach((item) => callback(item, depName));
      }
    });
  }

  innerValueChange = (value: ValuesType) => {
    // 被动关联触发组件更新
    this.triggerChange(this.deps, value, ({ name: effectName }) => {
      this.getField(effectName).forceUpdate();
    });

    this.triggerReactions(value);
  };

  triggerReactions(value: ValuesType) {
    runInAction(() => {
      this.triggerChange(this.effects, value, ({ name: effectName, result, dependencies }, changeName) => {
        // @ts-expect-error
        Object.keys(result).forEach((key: keyof typeof result) => {
          let resultValue;

          const changeValue = this.getField(changeName).value;
          const depValues = dependencies ? dependencies.map((depName) => this.getField(depName).value) : [];

          if (isFunction(result![key])) {
            resultValue = (result![key] as ReactionResultFunctionType<any>)(changeValue);
          } else {
            resultValue = new Function('$root', `with($root) { return (${result![key]}); }`)({
              $self: changeValue,
              $deps: depValues,
              $values: this.values,
            });
          }

          // 循环触发 a -> b -> c
          if (key === 'value') {
            this.triggerReactions({ [effectName]: resultValue } as ValuesType);
          }

          // @ts-expect-error
          this.getField(effectName)[key] = resultValue;
        });
      });
    });
  }

  setFormInstance(form: FormInstance<ValuesType>) {
    this.form = form;
  }

  init(props: FormProps) {
    Object.keys(props).forEach((key) => {
      // @ts-expect-error
      this[key] = props[key];
    });

    if (this.remoteValues) {
      this.loading = true;
      this.remoteValues()
        .then((values) => {
          this.form?.setFieldsValue(values);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }

  get values(): ValuesType {
    return this.form!.getFieldsValue();
  }

  set values(vals: ValuesType) {
    this.form!.setFieldsValue(vals!);
  }

  getName(name: NamePath) {
    return toCompareName(name);
  }

  get formProps() {
    return pick(this, [
      'autoComplete',
      'colon',
      'disabled',
      'component',
      'fields',
      'feedbackIcons',
      'initialValues',
      'labelAlign',
      'labelWrap',
      'labelCol',
      'layout',
      'name',
      'preserve',
      'requiredMark',
      'scrollToFirstError',
      'size',
      'validateMessages',
      'validateTrigger',
      'variant',
      'wrapperCol',
      'onFieldsChange',
      'onFinish',
      'onFinishFailed',
      'clearOnDestroy',
    ]);
  }
}
