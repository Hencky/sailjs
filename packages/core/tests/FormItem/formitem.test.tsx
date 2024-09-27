import { sleep } from 'radash';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { Instance } from '../../demos';
import { clickByTestId, getByTestId, getInputValue, clickSelectDom, getSelectDropDownNodes } from '../utils';

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

    await clickByTestId('instance');

    expect(onGetForm).toHaveBeenCalled();
  });

  test('item 状态设置', async () => {
    const container = render(<Instance />);

    await clickByTestId('disabled');
    expect(getByTestId('inputA')).toHaveClass('ant-input-disabled');

    await clickByTestId('readonly');
    expect(getByTestId('inputA')).toHaveClass('ant-input-borderless');

    // hidden属性设置在FormItem的父元素上
    await clickByTestId('hidden');
    expect(getByTestId('labelA').parentNode).toHaveClass('ant-form-item-hidden');

    await clickByTestId('remove');
    expect(container).toMatchSnapshot();
  });

  test('item 值设置', async () => {
    render(<Instance />);

    await clickByTestId('setValue');
    expect(getInputValue('inputA')).toBe('1');

    await clickByTestId('setValue');
    expect(getInputValue('inputA')).toBe('2');

    await clickByTestId('reset');
    expect(getInputValue('inputA')).toBe('');

    await clickByTestId('setValues');
    expect(getInputValue('inputA')).toBe('1');
    expect(getInputValue('inputB')).toBe('2');
    expect(screen.getByTestId('inputC').querySelector('.ant-select-selection-item')?.textContent).toBe('3');
    expect(getInputValue('inputD')).toBe('4');
  });

  test('属性更新', async () => {
    render(<Instance />);

    await clickByTestId('required');
    expect(getByTestId('labelA').querySelector('label')?.getAttribute('class')?.includes('required')).toBeTruthy();

    await clickByTestId('unRequired');
    expect(getByTestId('labelA').querySelector('label')?.getAttribute('class')?.includes('required')).toBeFalsy();

    await clickByTestId('replaceLabel');
    expect(getByTestId('labelA').querySelector('label')?.textContent).toBe('replaced');

    /** 数据源设置生效 */
    await clickByTestId('options');
    await clickSelectDom('inputC');
    await sleep(200);
    expect(getSelectDropDownNodes('inputC')?.length).toBe(1);
  });
});
