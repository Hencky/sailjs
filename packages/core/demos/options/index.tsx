import { sleep } from 'radash';
import { Input, Select } from 'antd';
import { FormItem, Form, useForm } from '@sailjs/core';

export function Options(props: any) {
  const [form] = useForm();

  const { onGetRemoteValues } = props;

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
        data-testid="labelA"
        options={[{ label: 'a', value: 'a' }]}
        remoteOptions={async () => {
          await sleep(1000);
          return [
            { label: 'a', value: 'a' },
            { label: 'b', value: 'b' },
            { label: 'c', value: 'c' },
          ];
        }}
      >
        <Select
          data-testid="selectA"
          getPopupContainer={() => {
            return document.querySelector('[data-testid=selectA]')!;
          }}
        />
      </FormItem>

      <FormItem name="b" label="b">
        <Input
          data-testid="inputB"
          onChange={(e) => {
            console.log('changed', e.target.value);
          }}
        />
      </FormItem>

      <FormItem
        name="c"
        label="c"
        data-testid="c"
        dependencies={['b']}
        remoteOptions={async (dep1) => {
          console.log('remoteOptions', dep1);
          onGetRemoteValues?.(dep1);
          await sleep(2000);
          return [
            { label: `a  ${dep1}`, value: 'a' },
            { label: `b  ${dep1}`, value: 'b' },
            { label: `c  ${dep1}`, value: 'c' },
          ];
        }}
      >
        <Select />
      </FormItem>

      <FormItem name={['obj', 'a']} label="obj.a" data-testid="obj.a">
        <Input data-testid="inputObj" />
      </FormItem>

      <FormItem
        name={['obj', 'b']}
        label="obj.b"
        data-testid="obj.b"
        dependencies={[['obj', 'a']]}
        remoteOptions={async ([dep0]: any) => {
          console.log('remoteOptions', dep0);
          onGetRemoteValues?.(dep0);

          if (!dep0) return [];

          return new Array(dep0?.length).fill(0).map((_, i) => ({
            label: `${dep0}`,
            value: i,
          }));
        }}
      >
        <Select
          data-testid="selectObj"
          getPopupContainer={(node) => {
            return node.parentElement;
          }}
        />
      </FormItem>
    </Form>
  );
}
