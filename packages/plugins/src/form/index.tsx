// import React from 'react';
import { Input, InputNumber, Select } from 'antd';
import type { InputNumberProps, InputProps, SelectProps } from 'antd';

export const DEFAULT_COMPONENT_PLUGINS = {
  input: {
    component: <Input />,
    defaultComponentProps: {
      allowClear: true,
      placeholder: '请输入',
    } as InputProps,
  },
  select: {
    component: <Select />,
    defaultComponentProps: {
      allowClear: true,
      placeholder: '请选择',
    } as SelectProps,
  },
  inputnumber: {
    component: <InputNumber />,
    defaultComponentProps: {} as InputNumberProps,
  },
};

export type DefaultComponentPluginsType = typeof DEFAULT_COMPONENT_PLUGINS;
