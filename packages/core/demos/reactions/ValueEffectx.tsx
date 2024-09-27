import { Card, Input } from 'antd';
import { FormItem, Form, useForm } from '@sailjs/core';

export function ValueEffects() {
  const [form] = useForm();

  return (
    <Card title="主动-值联动">
      <Form
        form={form}
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
      >
        <FormItem
          name="a"
          label="a"
          data-testid="labelA"
          reactions={[
            {
              effects: ['b'],
              result: {
                value: `$self ? $self === '1' ? '1' : '2' : ''`,
              },
            },
          ]}
        >
          <Input data-testid="inputA" />
        </FormItem>
        <FormItem
          name="b"
          label="b"
          data-testid="labelB"
          reactions={[
            {
              effects: ['c'],
              result: {
                value: `$self ? $self === '1' ? '1' : '2' : ''`,
              },
            },
          ]}
        >
          <Input data-testid="inputB" />
        </FormItem>
        <FormItem
          name="c"
          label="c"
          data-testid="labelC"
          reactions={[
            {
              effects: ['d'],
              result: {
                value: `$self ? $self === '1' ? '1' : '2' : ''`,
              },
            },
          ]}
        >
          <Input data-testid="inputC" />
        </FormItem>
        <FormItem name="d" label="d" data-testid="labelD">
          <Input data-testid="inputD" />
        </FormItem>
      </Form>
    </Card>
  );
}
