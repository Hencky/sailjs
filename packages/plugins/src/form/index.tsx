// import React from 'react';
import { Cascader, Checkbox, Input, InputNumber, Radio, Select, TreeSelect } from 'antd';
import type {
  InputNumberProps,
  InputProps,
  SelectProps,
  CascaderProps,
  CheckboxProps,
  RadioProps,
  RadioGroupProps,
  TreeSelectProps,
} from 'antd';
import { OSwitch, DatePicker, TimePicker, RangePicker } from './all';
import type { TimePickerProps, SwitchProps, RangePickerProps, DatePickerProps } from './all';
import type { CheckboxGroupProps } from 'antd/es/checkbox';

export * from './all';

export const DEFAULT_COMPONENT_PLUGINS = {
  cascader: {
    component: <Cascader />,
    defaultComponentProps: {} as CascaderProps,
  },
  checkbox: {
    component: <Checkbox />,
    defaultComponentProps: {} as CheckboxProps,
    defaultFormItemProps: {
      valuePropName: 'checked',
    },
  },
  'checkbox.group': {
    component: <Checkbox.Group />,
    defaultComponentProps: {} as CheckboxGroupProps,
  },
  datepicker: {
    component: <DatePicker />,
    defaultComponentProps: {} as DatePickerProps,
  },
  input: {
    component: <Input />,
    defaultComponentProps: {
      allowClear: true,
      placeholder: '请输入',
    } as InputProps,
  },
  inputnumber: {
    component: <InputNumber />,
    defaultComponentProps: {} as InputNumberProps,
  },
  radio: {
    component: <Radio />,
    defaultComponentProps: {} as RadioProps,
  },
  'radio.group': {
    component: <Radio.Group />,
    defaultComponentProps: {} as RadioGroupProps,
  },
  rangepicker: {
    component: <RangePicker />,
    defaultComponentProps: {} as RangePickerProps,
  },
  select: {
    component: <Select />,
    defaultComponentProps: {
      allowClear: true,
      placeholder: '请选择',
    } as SelectProps,
  },
  switch: {
    component: <OSwitch />,
    defaultComponentProps: {} as SwitchProps,
    defaultFormItemProps: {
      valuePropName: 'checked',
    },
  },
  timepicker: {
    component: <TimePicker />,
    defaultComponentProps: {} as TimePickerProps,
  },
  treeselect: {
    component: <TreeSelect />,
    defaultComponentProps: {} as TreeSelectProps,
    defaultFormItemProps: {
      optionsPropsName: 'treeData',
    },
  },
};

export type DefaultComponentPluginsType = typeof DEFAULT_COMPONENT_PLUGINS;
