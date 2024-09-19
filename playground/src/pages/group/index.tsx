import { Fragment } from 'react';
import { Input, Button } from 'antd';
import { Form, useForm, FormGroup } from '@sailjs/core';

function Group() {
  const [form] = useForm();

  return (
    <Fragment>
      <Button
        onClick={() => {
          const field = form.getField('a');
          field.span = field.span ? field.span - 1 : 24;
        }}
      >
        分组-
      </Button>
      <Button
        onClick={() => {
          const field = form.getField('a');
          field.span = field.span ? field.span + 1 : 1;
        }}
      >
        分组+
      </Button>

      <Button
        onClick={() => {
          const group = form.getField('group1');

          console.log('group', group);
        }}
      >
        实例
      </Button>
      <Button
        onClick={() => {
          form.span += 1;

          console.log('group', form);
        }}
      >
        表单 +
      </Button>
      <Button
        onClick={() => {
          const group = form.getField('group2');

          group.span += 1;
        }}
      >
        group +
      </Button>

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

export default Group;
