import { Fragment } from 'react';
import { Button, Divider, Input } from 'antd';
import { Form, useForm, FormGroup, FieldMode } from '@sailjs/core';

export function GroupDependency() {
  const [form] = useForm();

  return (
    <Fragment>
      <Button
        onClick={() => {
          console.log('form', form.span);
          console.log('group', form.getGroup('group2').span);
          console.log('item', form.getField('b').span);
        }}
      >
        实例
      </Button>
      <Divider />
      <Form
        form={form}
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
      >
        <FormGroup
          name="group1"
          items={[
            {
              name: 'a',
              label: 'a',
              children: <Input />,
            },
          ]}
        />
        <FormGroup
          name="group2"
          mode={FieldMode.DISABLED}
          reactions={[
            {
              dependencies: ['a'],
              result: {
                mode: `$deps[0] ? '${FieldMode.EDIT}' : '${FieldMode.DISABLED}'`,
                span: `$deps[0] || 24`,
              },
            },
          ]}
          items={[
            {
              name: 'b',
              label: 'b',
              children: <Input style={{ width: '100%' }} />,
            },
            {
              name: 'c',
              label: 'c',
              children: <Input style={{ width: '100%' }} />,
            },
            {
              name: 'd',
              label: 'd',
              children: <Input style={{ width: '100%' }} />,
            },
          ]}
        />
      </Form>
    </Fragment>
  );
}
