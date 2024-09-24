import { sleep } from 'radash';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Instance } from '../../demos/instance';
import { click } from '../utils';

const fn = {
  onGetForm: (a: any, b: any) => {
    return { a, b };
  },
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('FormItem', () => {
  test('FormItem 渲染正确', async () => {
    const onGetForm = vi.spyOn(fn, 'onGetForm');

    render(<Instance onGetForm={onGetForm} />);

    await click('instance');

    expect(onGetForm).toHaveBeenCalled();
  });

  test('item 状态设置', async () => {
    const container = render(<Instance />);

    const input = screen.getByTestId('inputA');
    const label = screen.getByTestId('labelA');

    await click('disabled');
    expect(input).toHaveClass('ant-input-disabled');

    await click('readonly');
    expect(input).toHaveClass('ant-input-borderless');

    // hidden属性设置在FormItem的父元素上
    await click('hidden');
    expect(label.parentNode).toHaveClass('ant-form-item-hidden');

    await click('remove');
    expect(container).toMatchSnapshot();
  });

  test('item 值设置', async () => {
    render(<Instance />);

    const inputA = screen.getByTestId('inputA');
    const inputB = screen.getByTestId('inputB');
    const inputC = screen.getByTestId('inputC');
    const inputD = screen.getByTestId('inputD');
    await click('setValue');
    expect(inputA.getAttribute('value')).toBe('1');

    await click('setValue');
    expect(inputA.getAttribute('value')).toBe('2');

    // TODO: 2？
    // await click('reset');
    // expect(inputA.getAttribute('value')).toBe(undefined);

    await click('setValues');
    expect(inputA.getAttribute('value')).toBe('1');
    expect(inputB.getAttribute('value')).toBe('2');
    expect(inputC.querySelector('.ant-select-selection-item')?.textContent).toBe('3');
    expect(inputD.getAttribute('value')).toBe('4');
  });
});
