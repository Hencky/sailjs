import { makeObservable, observable, computed } from 'mobx';
import { FormStore } from '../Form';
import { BaseProps } from './interface';
import { GroupStore } from '../FormGroup/store';

export class BaseStore<Values = any> implements BaseProps {
  commonProps: BaseProps = {};

  /** 获取form */
  getFormStore: () => FormStore<Values>;
  /** 获取group */
  getGroupStore: () => GroupStore<Values>;

  constructor(getFormStore: () => FormStore<Values>, getGroupStore: () => GroupStore<Values>) {
    this.getFormStore = getFormStore;
    this.getGroupStore = getGroupStore;
  }

  get _parent(): BaseProps {
    return this.getGroupStore() ?? this.getFormStore() ?? {};
  }

  private getVal<K extends keyof BaseProps>(key: K) {
    return this.commonProps[key] ?? this._parent[key];
  }

  private setVal<K extends keyof BaseProps>(key: K, val: BaseProps[K]) {
    this.commonProps[key] = val;
  }

  set bordered(val) {
    this.setVal('bordered', val);
  }
  get bordered() {
    return this.getVal('bordered');
  }

  set hidden(val) {
    this.setVal('hidden', val);
  }
  get hidden() {
    return this.getVal('hidden');
  }
  set colon(val) {
    this.setVal('colon', val);
  }
  get colon() {
    return this.getVal('colon');
  }
  set mode(val) {
    this.setVal('mode', val);
  }
  get mode() {
    return this.getVal('mode');
  }
  set colProps(val) {
    this.setVal('colProps', val);
  }
  get colProps() {
    return this.getVal('colProps') || {};
  }
  set span(val) {
    this.setVal('span', val);
  }
  get span() {
    return this.getVal('span');
  }
  set labelAlign(val) {
    this.setVal('labelAlign', val);
  }
  get labelAlign() {
    return this.getVal('labelAlign');
  }
  set labelCol(val) {
    this.setVal('labelCol', val);
  }
  get labelCol() {
    return this.getVal('labelCol');
  }
  set wrapperCol(val) {
    this.setVal('wrapperCol', val);
  }
  get wrapperCol() {
    return this.getVal('wrapperCol');
  }
  set messageVariables(val) {
    this.setVal('messageVariables', val);
  }
  get messageVariables() {
    return this.getVal('messageVariables');
  }
  set validateFirst(val) {
    this.setVal('validateFirst', val);
  }
  get validateFirst() {
    return this.getVal('validateFirst');
  }
  set validateDebounce(val) {
    this.setVal('validateDebounce', val);
  }
  get validateDebounce() {
    return this.getVal('validateDebounce');
  }
  set validateTrigger(val) {
    this.setVal('validateTrigger', val);
  }
  get validateTrigger() {
    return this.getVal('validateTrigger');
  }
  set remoteOptionsDebounceProps(val) {
    this.setVal('remoteOptionsDebounceProps', val);
  }
  get remoteOptionsDebounceProps() {
    return this.getVal('remoteOptionsDebounceProps');
  }

  makeObservable() {
    makeObservable(this, {
      _parent: computed,
      commonProps: observable,
      bordered: computed,
      hidden: computed,
      colon: computed,
      mode: computed,
      colProps: computed,
      span: computed,
      labelAlign: computed,
      labelCol: computed,
      wrapperCol: computed,
      messageVariables: computed,
      validateFirst: computed,
      validateDebounce: computed,
      validateTrigger: computed,
      remoteOptionsDebounceProps: computed,
    });
  }
}
