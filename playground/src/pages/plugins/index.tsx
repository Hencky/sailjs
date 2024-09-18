import { Fragment, useEffect } from 'react';
import { Input } from 'antd';
import { FormItem, Form, useForm } from '@sailjs/core';

function Plugins() {
  const plugins = {
    input2: {
      component: Input,
      componentProps: { showCount: true },
    },
  } as const;

  const [form] = useForm<any, typeof plugins>({ plugins });

  useEffect(() => {
    setTimeout(() => {
      const formA = form.getField('a1');
      formA.componentProps.placeholder = 'aabbcc';
    }, 2000);
  }, []);

  return (
    <Fragment>
      <Form
        form={form}
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
      >
        <FormItem<any, typeof plugins>
          name={'a1'}
          label="a1"
          component="input2"
          componentProps={{
            showCount: true,
          }}
        />
        <FormItem
          name={'a2'}
          label="a2"
          component="input"
          componentProps={{
            allowClear: true,
          }}
        />

        <FormItem
          name={'b'}
          label="b"
          component="select"
          componentProps={{ placeholder: '请选择xx' }}
          remoteOptions={async () => {
            return [
              { label: 'a', value: 'a' },
              { label: 'b', value: 'b' },
              { label: 'c', value: 'c' },
            ];
          }}
        />
      </Form>
    </Fragment>
  );
}

export default Plugins;
