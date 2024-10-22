import React from 'react';
import { Form } from '@voyagejs/form';
import { Input, Button } from 'antd';

const { useForm, Item, Group, useFormIntance } = Form;

const Child = () => {
  const form = useFormIntance();

  return (
    <div>
      <Button
        onClick={() => {
          console.log(form.getFieldsValue());
          form.values = { childItem: 123 };
        }}
      >
        FormInstance
      </Button>
      <Item name="childItem" label="childItem">
        <Input />
      </Item>
    </div>
  );
};

export const Simplify = () => {
  const [form] = useForm();

  return (
    <Form
      form={form}
      onValuesChange={(_, values) => {
        console.log(values);
      }}
    >
      <Item name="itemA" label="itemA">
        <Input />
      </Item>

      <Group
        name="group"
        items={[
          {
            name: 'groupA',
            label: 'groupA',
            children: <Input />,
          },
          {
            name: 'groupB',
            label: 'groupB',
            children: <Input />,
          },
        ]}
      />

      <Child />
    </Form>
  );
};
