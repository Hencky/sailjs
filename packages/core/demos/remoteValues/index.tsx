import { sleep } from 'radash';
import { Input } from 'antd';
import { FormItem, Form, useForm } from '@sailjs/core';

export function RemoteValues() {
  const [form] = useForm();

  return (
    <div data-testid="container">
      <Form
        form={form}
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
        spinProps={{ size: 'large' }}
        remoteValues={async () => {
          await sleep(2000);
          return {
            a: '1',
            b: '2',
            c: '3',
            d: '4',
          };
        }}
      >
        <FormItem name="a" label="a">
          <Input data-testid="inputA" />
        </FormItem>
        <FormItem name="b" label="b">
          <Input data-testid="inputB" />
        </FormItem>
        <FormItem name="c" label="c">
          <Input data-testid="inputC" />
        </FormItem>
        <FormItem name="d" label="d">
          <Input data-testid="inputD" />
        </FormItem>
      </Form>
    </div>
  );
}
