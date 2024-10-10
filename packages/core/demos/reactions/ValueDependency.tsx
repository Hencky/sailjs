import { Card, Input } from 'antd';
import { FormItem, Form, useForm } from '@sailjs/core';

export function ValueDependency() {
  const [form] = useForm();

  return (
    <Card title="被动-值联动">
      <Form
        form={form}
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
      >
        <FormItem name="a" label="a">
          <Input data-testid="inputA" />
        </FormItem>
        <FormItem
          name="b"
          label="b"
          reactions={[
            {
              dependencies: ['a'],
              result: {
                value: `$deps[0]`,
              },
            },
          ]}
        >
          <Input data-testid="inputB" />
        </FormItem>
        <FormItem
          name="c"
          label="c"
          reactions={[
            {
              dependencies: ['a', 'b'],
              result: {
                value: `$deps[0] && $deps[1] ? $deps[0] + '-' + $deps[1] : ""`,
              },
            },
          ]}
        >
          <Input data-testid="inputC" />
        </FormItem>
      </Form>
    </Card>
  );
}
