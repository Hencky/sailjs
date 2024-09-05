import { makeAutoObservable } from 'mobx';
import { keys } from 'radash';
import { toCompareName } from '../utils';
import { FieldStore } from '../FormItem/store';
import type { FormInstance, FormProps as AFormProps } from 'antd';
import type { NamePath } from 'antd/es/form/interface';
import type { FormProps } from './interface';

export class FormStore<ValuesType = any> implements Omit<AFormProps, 'fields'> {
  fields: Record<NamePath, FieldStore> = {};

  form?: FormInstance<ValuesType>;

  deps: Map<NamePath, Set<NamePath>> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  createField<NameType extends keyof ValuesType, OptionType>(
    name: NameType,
    field: FieldStore<ValuesType[NameType], OptionType>
  ) {
    this.fields[this.getName(name)] = field;

    if (field.dependencies) {
      field.dependencies.forEach((depFieldName) => {
        const depName = this.getName(depFieldName);
        const actionKeys = this.deps.get(depName);

        if (actionKeys) {
          actionKeys.add(this.getName(field.name));
          this.deps.set(depName, actionKeys);
        } else {
          this.deps.set(depName, new Set([name]));
        }
      });
    }

    return field;
  }

  getField<NameType extends keyof ValuesType>(name: NameType): FieldStore<ValuesType[NameType]> {
    return this.fields[this.getName(name)];
  }

  onValuesChange = (value: ValuesType) => {
    this.deps.forEach((targetDeps, key) => {
      if (keys(value)[0].startsWith(key)) {
        targetDeps.forEach((targetName) => {
          this.getField(targetName).forceUpdate();
        });
      }
    });
  };

  setFormInstance(form: FormInstance<ValuesType>) {
    this.form = form;
  }

  setProps(props: FormProps) {
    this.deps = new Map();
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
}
