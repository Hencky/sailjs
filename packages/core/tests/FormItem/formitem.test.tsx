import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Instance } from '../../demos/instance';

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

    const instanceBtn = screen.getByTestId('instance');

    await userEvent.click(instanceBtn);

    expect(onGetForm).toHaveBeenCalled();
  });

  test('FormItem 状态设置', async () => {
    const container = render(<Instance />);

    const input = screen.getByTestId('inputA');
    const label = screen.getByTestId('labelA');

    const disabledBtn = screen.getByTestId('disabled');
    await userEvent.click(disabledBtn);
    expect(input).toHaveClass('ant-input-disabled');

    const readonlyBtn = screen.getByTestId('readonly');
    await userEvent.click(readonlyBtn);
    expect(input).toHaveClass('ant-input-borderless');

    // hidden属性设置在FormItem的父元素上
    const hidden = screen.getByTestId('hidden');
    await userEvent.click(hidden);
    expect(label.parentNode).toHaveClass('ant-form-item-hidden');

    const removeBtn = screen.getByTestId('remove');
    await userEvent.click(removeBtn);
    expect(container).toMatchSnapshot();
  });
});
