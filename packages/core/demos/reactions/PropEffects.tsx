import { Card, Input } from 'antd';
import { FormItem, Form, useForm } from '@sailjs/core';

export function PropEffects() {
  const [form] = useForm();

  return (
    <Card title="主动-其他联动">
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
                mode(self: string) {
                  if (self === '1') {
                    return 'edit';
                  }
                  return 'disabled';
                },
                required: `$self === '1'`,
              },
            },
            {
              effects: ['c'],
              result: {
                mode: `$self === '1' ? 'edit' : 'disabled'`,
                required: `$self === '1'`,
              },
            },
          ]}
        >
          <Input data-testid="inputA" />
        </FormItem>
        <FormItem name="b" label="b" data-testid="labelB">
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
                required: `$self === '1'`,
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
