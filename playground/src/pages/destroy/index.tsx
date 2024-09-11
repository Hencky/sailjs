import { Fragment, useState } from 'react';
import { Input, Button, Divider } from 'antd';
import { FormItem, Form, useForm, FieldMode } from '@sailjs/core';

function Destroy() {
  const [form] = useForm();

  const [visible, setVisible] = useState(true);

  return (
    <Fragment>
      <Button
        onClick={() => {
          setVisible(false);
        }}
      >
        销毁
      </Button>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        加载
      </Button>

      <Divider />

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
          field.mode = FieldMode.VIEW;
        }}
      >
        只读
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
          const field = form.getField('a');
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
        {visible && (
          <FormItem name="a" label="a">
            <Input />
          </FormItem>
        )}
      </Form>
    </Fragment>
  );
}

export default Destroy;
