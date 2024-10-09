import { Form } from '@sailjs/core';
import { Input } from 'antd';

const { useForm, Item, Group } = Form;

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
    </Form>
  );
};
