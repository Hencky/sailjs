import { Fragment } from 'react';
import { sleep } from 'radash';
import { Input } from 'antd';
import { FormItem, Form, useForm } from '@sailjs/core';

function Instance() {
  const [form] = useForm();

  return (
    <Fragment>
      <Form
        form={form}
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
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
          <Input />
        </FormItem>
        <FormItem name="b" label="b">
          <Input />
        </FormItem>
        <FormItem name="c" label="c">
          <Input />
        </FormItem>
        <FormItem name="d" label="d">
          <Input />
        </FormItem>
      </Form>
    </Fragment>
  );
}

export default Instance;
