import { Fragment } from 'react';
import { Input, Button, Divider, Select } from 'antd';
import { FormItem, Form, useForm, FieldMode } from '@sailjs/core';

function Instance() {
  const [form] = useForm();

  return (
    <Fragment>
      <Button
        onClick={() => {
          const field = form.getField('a');
          console.log('a', form, field);
        }}
      >
        获取实例
      </Button>

      <Button
        onClick={() => {
          const field = form.getField('a');
          field.mode = FieldMode.DISABLED;
        }}
      >
        禁用
      </Button>
      <Button
        onClick={() => {
          const field = form.getField('a');
          field.mode = FieldMode.HIDDEN;
        }}
      >
        隐藏
      </Button>
      <Button
        onClick={() => {
          const field = form.getField('a');
          field.mode = FieldMode.NODE;
        }}
      >
        移除
      </Button>
      <Button
        onClick={() => {
          const field = form.getField('a');
          field.mode = FieldMode.EDIT;
        }}
      >
        编辑
      </Button>
      <Button
        onClick={() => {
          const field = form.getField('a');
          field.value = field.value ? field.value + 1 : 1;
        }}
      >
        设置值
      </Button>
      <Button
        onClick={() => {
          form.values = { a: '1', c: '3', d: '4' };
        }}
      >
        批量设置值
      </Button>
      <Button
        onClick={() => {
          const field = form.getField('a');
          field.rules = [{ required: true, message: '请输入' }];
        }}
      >
        必填
      </Button>
      <Button
        onClick={() => {
          const field = form.getField('a');
          field.rules = [{ required: false, message: '请输入' }];
        }}
      >
        非必填
      </Button>
      <Button
        onClick={() => {
          const field = form.getField('c');
          field.options = [{ label: 'a', value: 'a' }];
        }}
      >
        数据源
      </Button>

      <Button
        onClick={() => {
          const field = form.getField('a');
          field.label = '更新';
        }}
      >
        更换label
      </Button>
      <Button
        onClick={() => {
          const field = form.getField('c');
          field.forceUpdate();
        }}
      >
        刷新
      </Button>

      <Divider type="horizontal" />

      <Form
        form={form}
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
      >
        <FormItem name="a" label="a" rules={[{ required: true, message: '请输入' }]}>
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
