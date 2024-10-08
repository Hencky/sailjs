import { Fragment } from 'react';
import { Input, Button, Divider } from 'antd';
import { Form, useForm, FormGroup } from '@sailjs/core';

export function GroupInstance() {
  const [form] = useForm();

  return (
    <Fragment>
      <Button
        onClick={() => {
          const group = form.getField('group1');

          console.log('group', group);
        }}
      >
        实例
      </Button>

      <Divider style={{ margin: '12px 0' }} />

      <Button
        onClick={() => {
          const field = form.getField('a');
          field.span = (field.span as number) > 0 ? (field.span as number) - 1 : 0;
        }}
      >
        Item span -
      </Button>
      <Button
        onClick={() => {
          const field = form.getField('a');
          field.span = (field.span as number) <= 24 ? (field.span as number) + 1 : 24;
        }}
      >
        Item span +
      </Button>

      <Divider style={{ margin: '12px 0' }} />

      <Button
        onClick={() => {
          const group = form.getField('group2');

          group.span = (group.span as number) <= 24 ? (group.span as number) + 1 : 24;
        }}
      >
        Group span +
      </Button>
      <Button
        onClick={() => {
          const group = form.getField('group2');

          group.span = (group.span as number) > 0 ? (group.span as number) - 1 : 0;
        }}
      >
        Group span -
      </Button>

      <Divider style={{ margin: '12px 0' }} />

      <Button
        onClick={() => {
          form.span = (form.span as number) <= 24 ? (form.span as number) + 1 : 24;
        }}
      >
        Form span +
      </Button>
      <Button
        onClick={() => {
          form.span = (form.span as number) > 0 ? (form.span as number) - 1 : 0;
        }}
      >
        Form span -
      </Button>

      <Divider style={{ margin: '12px 0' }} />

      <Form
        form={form}
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
        span={12}
      >
        <FormGroup
          name="group1"
          items={[
            {
              name: 'a',
              span: 2,
              label: 'a',
              children: <Input />,
            },
            {
              name: 'b',
              label: 'b',
              children: <Input />,
            },
            {
              name: 'c',
              label: 'c',
              children: <Input />,
            },
            {
              name: 'd',
              label: 'd',
              children: <Input />,
            },
          ]}
        />
        <FormGroup
          name="group2"
          span={4}
          items={[
            {
              name: 'e',
              label: 'e',
              children: <Input />,
            },
            {
              name: 'f',
              label: 'f',
              children: <Input />,
            },
          ]}
        />
      </Form>
    </Fragment>
  );
}

export default GroupInstance;
