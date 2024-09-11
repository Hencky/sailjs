import { Fragment } from 'react';
import { sleep } from 'radash';
import { Divider, Input, Select } from 'antd';
import { FormItem, Form, useForm } from '@sailjs/core';

function Instance() {
  const [form] = useForm();

  return (
    <Fragment>
      <Divider type="horizontal" />
      <Form
        form={form}
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
      >
        <FormItem
          name="a"
          label="a"
          options={[{ label: 'a', value: 'a' }]}
          remoteOptions={async () => {
            await sleep(2000);
            return [
              { label: 'a', value: 'a' },
              { label: 'b', value: 'b' },
              { label: 'c', value: 'c' },
            ];
          }}
        >
          <Select />
        </FormItem>

        <FormItem name="b1" label="b1">
          <Input />
        </FormItem>

        <FormItem
          name="b2"
          label="b2"
          dependencies={['b1']}
          remoteOptions={async (dep1) => {
            console.log('remoteOptions', dep1);
            await sleep(2000);
            return [
              { label: `a  ${dep1}`, value: 'a' },
              { label: `b  ${dep1}`, value: 'b' },
              { label: `c  ${dep1}`, value: 'c' },
            ];
          }}
        >
          <Select />
        </FormItem>
        <FormItem name="c" label="c">
          <Select />
        </FormItem>
        <FormItem name="d" label="d">
          <Select />
        </FormItem>
      </Form>
    </Fragment>
  );
}

export default Instance;
