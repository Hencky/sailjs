import { Fragment } from 'react';
import { Input, Button, Divider, Select, Space } from 'antd';
import { FormItem, Form, useForm, FieldMode } from '@sailjs/core';

export function ItemInstance(props: any) {
  const [form] = useForm();

  return (
    <Fragment>
      <Button
        data-testid="instance"
        onClick={() => {
          const field = form.getField('a');
          props.onGetForm?.(form, field);
          console.log('a', form, field);
        }}
      >
        获取实例
      </Button>
      <Divider style={{ margin: '12px 0' }} />
      <Space>
        <Button
          data-testid="disabled"
          onClick={() => {
            const field = form.getField('a');
            field.mode = FieldMode.DISABLED;
          }}
        >
          禁用
        </Button>
        <Button
          data-testid="readonly"
          onClick={() => {
            const field = form.getField('a');
            field.mode = FieldMode.VIEW;
          }}
        >
          只读
        </Button>
        <Button
          data-testid="hidden"
          onClick={() => {
            const field = form.getField('a');
            field.mode = FieldMode.HIDDEN;
          }}
        >
          隐藏
        </Button>
        <Button
          data-testid="remove"
          onClick={() => {
            const field = form.getField('a');
            field.mode = FieldMode.NODE;
          }}
        >
          移除
        </Button>
        <Button
          data-testid="edit"
          onClick={() => {
            const field = form.getField('a');
            field.mode = FieldMode.EDIT;
          }}
        >
          编辑
        </Button>
      </Space>
      <Divider style={{ margin: '12px 0' }} />
      <Space>
        <Button
          data-testid="setValue"
          onClick={() => {
            const field = form.getField('a');
            field.value = field.value ? String(1 + Number(field.value)) : '1';
          }}
        >
          设置值
        </Button>
        <Button
          data-testid="setValues"
          onClick={() => {
            form.values = { a: '1', b: '2', c: '3', d: '4' };
          }}
        >
          批量设置值
        </Button>
        <Button
          data-testid="reset"
          onClick={() => {
            form.values = null;
          }}
        >
          清空值
        </Button>
      </Space>
      <Divider style={{ margin: '12px 0' }} />
      <Space>
        <Button
          onClick={() => {
            form.colon = false;
          }}
        >
          取消冒号
        </Button>
        <Button
          data-testid="required"
          onClick={() => {
            const field = form.getField('a');
            field.rules = [{ required: true, message: '请输入' }];
          }}
        >
          必填
        </Button>
        <Button
          data-testid="unRequired"
          onClick={() => {
            const field = form.getField('a');
            field.rules = [{ required: false, message: '请输入' }];
          }}
        >
          非必填
        </Button>

        <Button
          data-testid="replaceLabel"
          onClick={() => {
            const field = form.getField('a');
            field.label = 'replaced';
          }}
        >
          更换label
        </Button>
      </Space>
      <Divider style={{ margin: '12px 0' }} />
      <Button
        data-testid="options"
        onClick={() => {
          const field = form.getField('c');
          field.options = [{ label: 'a', value: 'a' }];
        }}
      >
        数据源
      </Button>
      <Button
        data-testid="forceUpdate"
        onClick={() => {
          const field = form.getField('c');
          field.forceUpdate();
        }}
      >
        刷新
      </Button>
      <Divider type="horizontal" style={{ margin: '12px 0' }} />
      <Space>
        <Button
          data-testid="obj.a"
          onClick={() => {
            const field = form.getField(['obj', 'a']);
            field.value = 'a';
            field.mode = FieldMode.DISABLED;
          }}
        >
          数组实例1
        </Button>
        <Button
          data-testid="array.0"
          onClick={() => {
            const field = form.getField(['array', 0]);
            field.value = 'a';
            field.mode = FieldMode.DISABLED;
          }}
        >
          数组实例2
        </Button>
      </Space>
      <Divider type="horizontal" style={{ margin: '12px 0' }} />

      <Form
        form={form}
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
      >
        <FormItem name="a" label="a" data-testid="labelA">
          <Input data-testid="inputA" />
        </FormItem>
        <FormItem name="b" label="b">
          <Input
            data-testid="inputB"
            onChange={(e) => {
              const val = e.target.value;
              const field = form.getField('a');
              field.value = val;
            }}
          />
        </FormItem>
        <FormItem name="c" label="c" data-testid="labelC">
          <Select
            data-testid="inputC"
            getPopupContainer={(p) => {
              return document.querySelector('[data-testid=inputC]')!;
            }}
          />
        </FormItem>
        <FormItem name="d" label="d">
          <Input
            data-testid="inputD"
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

        <FormItem name={['obj', 'a']} label="obj.a">
          <Input data-testid="inputObj" />
        </FormItem>
        <FormItem name={['array', 0]} label="array[0]">
          <Input data-testid="inputArr" />
        </FormItem>
      </Form>
    </Fragment>
  );
}
