import { makeAutoObservable } from 'mobx';
import { FieldStore } from '../FormItem/store';
import type { FormInstance } from 'antd';

export type NamePath = string;

export class FormStore<ValuesType = Record<NamePath, any>> {
  fields: Record<NamePath, FieldStore> = {};

  storeValue: ValuesType;

  form?: FormInstance;

  constructor() {
    this.storeValue = {} as ValuesType;

    makeAutoObservable(this);
  }

  createField(name: NamePath, field: FieldStore) {
    this.fields[name] = field;
    return field;
  }

  getField(name: NamePath) {
    return this.fields[name];
  }

  getFieldValue(name: keyof ValuesType) {
    return this.storeValue[name];
  }

  setFormInstance(form: FormInstance) {
    this.form = form;
  }

  get values(): ValuesType {
    return this.form?.getFieldsValue();
  }

  set values(vals: ValuesType) {
    this.form?.setFieldsValue(vals);
  }
}
