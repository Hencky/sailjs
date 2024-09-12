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
          field.span -= 1;
        }}
      >
        分组-
      </Button>
      <Button
        onClick={() => {
          const field = form.getField('a');
          field.span += 1;
        }}
      >
        分组+
      </Button>

      <Form
        form={form}
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
      >
        <FormGroup
          span={12}
          fields={[
            {
              name: 'a',
              // span: 12,
              label: 'a',
              children: <Input />,
            },
            {
              name: 'b',
              // span: 12,
              label: 'b',
              children: <Input />,
            },
            {
              name: 'c',
              span: 12,
              label: 'c',
              children: <Input />,
            },
            {
              name: 'd',
              span: 12,
              label: 'd',
              children: <Input />,
            },
          ]}
        />
      </Form>
    </Fragment>
  );
}

export default Group;
