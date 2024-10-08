import { Input, Select, InputNumber, Card } from 'antd';
import type { CardProps, InputNumberProps, InputProps, SelectProps } from 'antd';

export const DEFAULT_COMPONENT_PLUGINS = {
  input: {
    component: Input,
    defaultComponentProps: {
      allowClear: true,
      placeholder: '请输入',
    } as InputProps,
  },
  select: {
    component: Select,
    defaultComponentProps: {
      allowClear: true,
      placeholder: '请选择',
    } as SelectProps,
  },
  inputnumber: {
    component: InputNumber,
    defaultComponentProps: {} as InputNumberProps,
  },

  card: {
    component: Card,
    defaultComponentProps: {} as CardProps,
  },
} as const;

export type DefaultComponentPluginsType = typeof DEFAULT_COMPONENT_PLUGINS;
