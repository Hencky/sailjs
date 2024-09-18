import { Input, Select, InputNumber } from 'antd';
import type { InputNumberProps, InputProps, SelectProps } from 'antd';

export const DEFAULT_COMPONENT_PLUGINS = {
  input: {
    component: Input,
    componentProps: {
      allowClear: true,
      placeholder: '请输入',
    } as InputProps,
  },
  select: {
    component: Select,
    componentProps: {
      allowClear: true,
      placeholder: '请选择',
    } as SelectProps,
  },
  inputnumber: {
    component: InputNumber,
    componentProps: {} as InputNumberProps,
  },
} as const;

export type DefaultComponentPluginsType = typeof DEFAULT_COMPONENT_PLUGINS;

export type DefaultPluginKeys = keyof DefaultComponentPluginsType;

export type DefaultPluginType<Key extends DefaultPluginKeys> = DefaultComponentPluginsType[Key];

export type PluginComponentType<Key extends DefaultPluginKeys> = DefaultPluginType<Key>['component'];

export type PluginComponentPropsType<Key extends DefaultPluginKeys> = DefaultPluginType<Key>['componentProps'];
