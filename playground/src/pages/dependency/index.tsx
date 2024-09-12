import { Card, Input, Space } from 'antd';
import { FormItem, Form, useForm } from '@sailjs/core';

function Dependency() {
  const [form1] = useForm();
  const [form2] = useForm();
  const [form3] = useForm();
  const [form4] = useForm();

  return (
    <Space direction="vertical" style={{ display: 'flex' }}>
      <Card title="主动-值联动">
        <Form
          form={form1}
          onValuesChange={(_, values) => {
            console.log('values', values);
          }}
        >
          <FormItem
            name="a"
            label="a"
            reactions={[
              {
                effects: ['b'],
                result: {
                  value: `$self ? $self === '1' ? '1' : '2' : ''`,
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
                effects: ['c'],
                result: {
                  value: `$self ? $self === '1' ? '1' : '2' : ''`,
                },
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            name="c"
            label="c"
            reactions={[
              {
                effects: ['d'],
                result: {
                  value: `$self ? $self === '1' ? '1' : '2' : ''`,
                },
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem name="d" label="d">
            <Input />
          </FormItem>
        </Form>
      </Card>

      <Card title="主动-其他联动">
        <Form
          form={form2}
          onValuesChange={(_, values) => {
            console.log('values', values);
          }}
        >
          <FormItem
            name="a"
            label="a"
            reactions={[
              {
                effects: ['b'],
                result: {
                  mode(self) {
                    if (self === '1') {
                      return 'disabled';
                    }
                    return 'edit';
                  },
                  colon: `$self === '1'`,
                },
              },
              {
                effects: ['c'],
                result: {
                  mode: `$self === '1' ? 'disabled' : 'edit'`,
                  colon: `$self === '1'`,
                },
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem name="b" label="b">
            <Input />
          </FormItem>
          <FormItem
            name="c"
            label="c"
            reactions={[
              {
                effects: ['d'],
                result: {
                  colon: `$self === '2'`,
                },
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem name="d" label="d">
            <Input />
          </FormItem>
        </Form>
      </Card>

      <Card title="被动-值联动">
        <Form
          form={form3}
          onValuesChange={(_, values) => {
            console.log('values', values);
          }}
        >
          <FormItem name="a" label="a">
            <Input />
          </FormItem>
          <FormItem
            name="b"
            label="b"
            reactions={[
              {
                dependencies: ['a'],
                result: {
                  value: `$deps[0] === '1' ? '1' : '2'`,
                },
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            name="c"
            label="c"
            reactions={[
              {
                dependencies: ['a', 'b'],
                result: {
                  value: `$deps[0] + '--' + $deps[1]`,
                },
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem name="d" label="d">
            <Input />
          </FormItem>
        </Form>
      </Card>
      <Card title="被动-其他联动">
        <Form
          form={form4}
          onValuesChange={(_, values) => {
            console.log('values', values);
          }}
        >
          <FormItem name="a" label="a">
            <Input />
          </FormItem>
          <FormItem
            name="b"
            label="b"
            reactions={[
              {
                dependencies: ['a'],
                result: {
                  mode: `$deps[0] === '1' ? 'disabled' : 'edit'`,
                },
              },
              {
                effects: ['c'],
                result: {
                  value: `$self`,
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
      </Card>
    </Space>
  );
}

export default Dependency;
