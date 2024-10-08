import { Card, Input, Space } from 'antd';
import { FormItem, Form, useForm } from '@sailjs/core';

export function ValueDependencyObj() {
  const [form] = useForm();

  return (
    <Card title="被动-值联动-对象name">
      <Form
        form={form}
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
      >
        <FormItem name={['obj', 'a']} label="obj.a">
          <Input data-testid="inputObjA" />
        </FormItem>
        <FormItem
          name={['obj', 'b']}
          label="obj.b"
          reactions={[
            {
              dependencies: [['obj', 'a']],
              result: {
                value: `$deps[0]`,
              },
            },
          ]}
        >
          <Input data-testid="inputObjB" />
        </FormItem>
        <FormItem
          name={['obj', 'c']}
          label="obj.c"
          reactions={[
            {
              dependencies: [
                ['obj', 'a'],
                ['obj', 'b'],
              ],
              result: {
                value: `$deps[0] && $deps[1] ? $deps[0] + '-' + $deps[1] : ""`,
              },
            },
          ]}
        >
          <Input data-testid="inputObjC" />
        </FormItem>
      </Form>
    </Card>
  );
}
