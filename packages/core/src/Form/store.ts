import { makeAutoObservable } from 'mobx';
import { keys } from 'radash';
import { FieldStore } from '../FormItem/store';
import type { FormInstance, FormProps as AFormProps } from 'antd';
import type { NamePath } from 'antd/es/form/interface';
import type { FormProps } from './interface';
import { toCompareName } from '../utils';

export class FormStore<ValuesType = Record<NamePath, any>> implements Omit<AFormProps, 'fields'> {
  fields: Record<NamePath, FieldStore> = {};

  storeValue: ValuesType;

  form?: FormInstance;

  deps: Map<NamePath, Set<NamePath>> = new Map();

  constructor() {
    this.storeValue = {} as ValuesType;

    makeAutoObservable(this);
  }

  createField(name: NamePath, field: FieldStore) {
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

  onValuesChange = (value: any) => {
    this.deps.forEach((targetDeps, key) => {
      if (keys(value)[0].startsWith(key)) {
        targetDeps.forEach((targetName) => {
          this.getField(targetName).forceUpdate();
        });
      }
    });
  };

  getField(name: NamePath) {
    return this.fields[this.getName(name)];
  }

  setFormInstance(form: FormInstance) {
    this.form = form;
  }

  setProps(props: FormProps) {
    this.deps = new Map();
  }

  get values(): ValuesType {
    return this.form?.getFieldsValue();
  }

  set values(vals: ValuesType) {
    this.form?.setFieldsValue(vals);
  }

  getName(name: NamePath) {
    return toCompareName(name);
  }
}
