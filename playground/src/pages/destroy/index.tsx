import { Fragment, useState } from 'react';
import { Input, Button, Divider, Card } from 'antd';
import { FormItem, Form, useForm, FieldMode } from '@sailjs/core';

function Destroy() {
  const [form] = useForm();

  const [visibleA, setVisibleA] = useState(true);
  const [visibleB, setVisibleB] = useState(true);
  const [visibleC, setVisibleC] = useState(true);

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
        <Card
          extra={
            <Fragment>
              <Button
                onClick={() => {
                  setVisibleA(false);
                  console.log('form', form);
                }}
              >
                销毁
              </Button>
              <Button
                onClick={() => {
                  setVisibleA(true);
                }}
              >
                加载
              </Button>
            </Fragment>
          }
        >
          {visibleA && (
            <FormItem name="a" label="a">
              <Input />
            </FormItem>
          )}
        </Card>
        <Card
          extra={
            <Fragment>
              <Button
                onClick={() => {
                  setVisibleB(false);
                  console.log('form', form);
                }}
              >
                销毁
              </Button>
              <Button
                onClick={() => {
                  setVisibleB(true);
                }}
              >
                加载
              </Button>
            </Fragment>
          }
        >
          {visibleB && (
            <FormItem name="b" label="b" dependencies={['a']}>
              <Input />
            </FormItem>
          )}
        </Card>
        <Card
          extra={
            <Fragment>
              <Button
                onClick={() => {
                  setVisibleC(false);
                  console.log('form', form);
                }}
              >
                销毁
              </Button>
              <Button
                onClick={() => {
                  setVisibleC(true);
                }}
              >
                加载
              </Button>
            </Fragment>
          }
        >
          {visibleC && (
            <FormItem name="c" label="c" dependencies={['a', 'b']}>
              <Input />
            </FormItem>
          )}
        </Card>
      </Form>
    </Fragment>
  );
}

export default Destroy;
