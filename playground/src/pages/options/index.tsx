import { Divider, Select } from 'antd';
import { Fragment } from 'react/jsx-runtime';
import { FormItem, Form, useForm } from '@sailjs/core';
import { sleep } from '@/utils';

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
        <FormItem name="b" label="b">
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
