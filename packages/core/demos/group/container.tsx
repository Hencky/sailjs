import { Input, Card, Button } from 'antd';
import { Form, useForm, FormGroup } from '@sailjs/core';
import { plugins } from '../plugins';

export function GroupContainer() {
  const [form] = useForm({ plugins });

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
    </Form>
  );
}
