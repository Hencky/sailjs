import { Input, Card, Button } from 'antd';
import { Form, useForm, FormGroup } from '@sailjs/core';

export function GroupContainer() {
  const [form] = useForm();

  return (
    <Form
      form={form}
      onValuesChange={(_, values) => {
        console.log('values', values);
      }}
    >
      <FormGroup
        container={<Card title="分组容器" extra={<Button>按钮</Button>} />}
        name="group1"
        items={[
          {
            name: 'a',
            label: 'a',
            children: <Input style={{ width: '100%' }} />,
          },
        ]}
      />
      <FormGroup
        container={<Card title="分组容器" />}
        name="group2"
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
