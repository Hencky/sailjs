import { sleep } from 'radash';
import { Input, Select } from 'antd';
import { FormItem, Form, useForm } from '@sailjs/core';

export function Options(props) {
  const [form] = useForm();

  const { onGetRemoteValues } = props;

  return (
    <Form form={form} onValuesChange={(_, values) => {}}>
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
          getPopupContainer={(p) => {
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
    </Form>
  );
}
