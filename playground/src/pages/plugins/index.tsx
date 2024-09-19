import { Fragment, useEffect } from 'react';
import { Input } from 'antd';
import { FormItem, Form, useForm, DEFAULT_COMPONENT_PLUGINS } from '@sailjs/core';

const plugins = Object.assign({}, DEFAULT_COMPONENT_PLUGINS, {
  input2: {
    component: Input,
    componentProps: { showCount: true },
  },
});

type CustomPluginsType = typeof plugins;

function Plugins() {
  const [form] = useForm<any, typeof plugins>({ plugins });

  useEffect(() => {
    setTimeout(() => {
      const formA = form.getField('a1');
      formA.componentProps.placeholder = 'aabbcc';
    }, 2000);
  }, []);

  return (
    <Fragment>
      <Form<any>
        form={form}
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
      >
        <FormItem<any, CustomPluginsType>
          name={'a1'}
          label="a1"
          component="inputnumber"
          componentProps={{
            allowClear: true,
          }}
        />
        <FormItem<any, CustomPluginsType>
          name={'a2'}
          label="a2"
          component="input"
          componentProps={{
            allowClear: true,
          }}
        />

        <FormItem<any, CustomPluginsType>
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
