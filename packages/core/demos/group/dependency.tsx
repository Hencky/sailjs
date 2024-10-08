import { Input, Select } from 'antd';
import { Form, useForm, FormGroup, FieldMode } from '@sailjs/core';

export function GroupDependency() {
  const [form] = useForm();

  return (
    <Form
      form={form}
      onValuesChange={(_, values) => {
        console.log('values', values);
      }}
    >
      <FormGroup
        name="group1"
        items={[
          {
            name: 'mode',
            label: '状态',
            options: [
              { label: '编辑', value: FieldMode.EDIT },
              { label: '禁用', value: FieldMode.DISABLED },
              { label: '查看', value: FieldMode.VIEW },
              { label: '隐藏', value: FieldMode.HIDDEN },
            ],
            children: <Select />,
          },
          {
            name: 'span',
            label: '栅格',
            children: <Input />,
          },
        ]}
      />
      <FormGroup
        name="group2"
        mode={FieldMode.DISABLED}
        reactions={[
          {
            dependencies: ['mode'],
            result: {
              mode: `$deps[0]`,
            },
          },
          {
            dependencies: ['span'],
            result: {
              span: `$deps[0]`,
            },
          },
        ]}
        items={[
          {
            name: 'b',
            label: 'b',
            children: <Input style={{ width: '100%' }} />,
          },
          {
            name: 'c',
            label: 'c',
            children: <Input style={{ width: '100%' }} />,
          },
          {
            name: 'd',
            label: 'd',
            children: <Input style={{ width: '100%' }} />,
          },
        ]}
      />
    </Form>
  );
}
