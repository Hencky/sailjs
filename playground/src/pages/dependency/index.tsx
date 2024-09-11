import { Input } from 'antd';
import { FormItem, Form, useForm } from '@sailjs/core';

function Dependency() {
  const [form] = useForm();

  return (
    <Form
      form={form}
      onValuesChange={(_, values) => {
        console.log('values', values);
      }}
    >
      <FormItem
        name="a"
        label="a"
        reactions={[
          {
            targets: ['b'],
            result: {
              // mode: `$self === '1' ? 'disabled' : 'edit'`,
              // mode(self) {
              //   if (self === '1') {
              //     return 'disabled';
              //   }
              //   return 'edit';
              // },
              value: `$self ? $self === '2' ? 'a' : 'b' : ''`,
              // colon: `$self === '1' ? true : false`,
            },
          },
        ]}
      >
        <Input />
      </FormItem>
      <FormItem
        name="b"
        label="b"
        reactions={[
          {
            targets: ['c'],
            result: {
              // mode: `$self === '1' ? 'disabled' : 'edit'`,
              // mode(self) {
              //   if (self === '1') {
              //     return 'disabled';
              //   }
              //   return 'edit';
              // },
              value: `$self ? $self === 'a' ? '1' : '2' : ''`,
              // colon: `$self === '1' ? true : false`,
            },
          },
        ]}
      >
        <Input />
      </FormItem>
      <FormItem name="c" label="c">
        <Input />
      </FormItem>
      <FormItem name="d" label="d">
        <Input />
      </FormItem>
    </Form>
  );
}

export default Dependency;
