import { Fragment } from 'react';
import { sleep } from 'radash';
import { Input, Select } from 'antd';
import { FormItem, Form, useForm, FieldMode } from '@sailjs/core';

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
          };
        }}
      >
        <FormItem name="a" label="a">
          <Input />
        </FormItem>
        <FormItem name="b" label="b">
          <Input
            onChange={(e) => {
              const val = e.target.value;
              const field = form.getField('a');
              field.value = val;
            }}
          />
        </FormItem>
        <FormItem name="c" label="c">
          <Select />
        </FormItem>
        <FormItem name="d" label="d">
          <Input
            onChange={(e) => {
              const val = e.target.value;
              const field = form.getField('c');
              if (val === 'a') {
                field.value = '123';
                field.mode = FieldMode.DISABLED;
              } else {
                field.value = undefined;
                field.mode = FieldMode.EDIT;
              }
            }}
          />
        </FormItem>
      </Form>
    </Fragment>
  );
}

export default Instance;
