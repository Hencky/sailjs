import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { ValueEffects, PropEffects } from '../../demos';
import { getInputValue, triggerInput, clearInput, getRequiredLabel, getByTestId } from '../utils';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('reactions', () => {
  test('reactions effects value', async () => {
    render(<ValueEffects />);

    await triggerInput('inputA', '1');
    expect(getInputValue('inputA')).toBe('1');
    expect(getInputValue('inputB')).toBe('1');
    expect(getInputValue('inputC')).toBe('1');
    expect(getInputValue('inputD')).toBe('1');

    await clearInput('inputA');
    await triggerInput('inputA', '2');
    expect(getInputValue('inputA')).toBe('2');
    expect(getInputValue('inputB')).toBe('2');
    expect(getInputValue('inputC')).toBe('2');
    expect(getInputValue('inputD')).toBe('2');

    await clearInput('inputB');
    await triggerInput('inputB', '1');
    expect(getInputValue('inputA')).toBe('2');
    expect(getInputValue('inputB')).toBe('1');
    expect(getInputValue('inputC')).toBe('1');
    expect(getInputValue('inputD')).toBe('1');

    await clearInput('inputB');
    await triggerInput('inputB', '2');
    expect(getInputValue('inputA')).toBe('2');
    expect(getInputValue('inputB')).toBe('2');
    expect(getInputValue('inputC')).toBe('2');
    expect(getInputValue('inputD')).toBe('2');

    await clearInput('inputC');
    await triggerInput('inputC', '1');
    expect(getInputValue('inputA')).toBe('2');
    expect(getInputValue('inputB')).toBe('2');
    expect(getInputValue('inputC')).toBe('1');
    expect(getInputValue('inputD')).toBe('1');

    await clearInput('inputC');
    await triggerInput('inputC', '2');
    expect(getInputValue('inputA')).toBe('2');
    expect(getInputValue('inputB')).toBe('2');
    expect(getInputValue('inputC')).toBe('2');
    expect(getInputValue('inputD')).toBe('2');
  });

  test('reactions effects prop', async () => {
    render(<PropEffects />);

    await triggerInput('inputA', '1');
    expect(getInputValue('inputA')).toBe('1');
    expect(getRequiredLabel('labelB')).toBeTruthy();
    expect(getRequiredLabel('labelC')).toBeTruthy();
    expect(getByTestId('inputB')).not.toHaveClass('ant-input-disabled');
    expect(getByTestId('inputC')).not.toHaveClass('ant-input-disabled');

    await clearInput('inputA');
    expect(getRequiredLabel('labelB')).toBeFalsy();
    expect(getRequiredLabel('labelC')).toBeFalsy();
    expect(getByTestId('inputB')).toHaveClass('ant-input-disabled');
    expect(getByTestId('inputC')).toHaveClass('ant-input-disabled');

    await triggerInput('inputA', '2');
    expect(getRequiredLabel('labelB')).toBeFalsy();
    expect(getRequiredLabel('labelC')).toBeFalsy();
    expect(getByTestId('inputB')).toHaveClass('ant-input-disabled');
    expect(getByTestId('inputC')).toHaveClass('ant-input-disabled');

    await clearInput('inputA');
    await triggerInput('inputA', '1');
    await triggerInput('inputC', '1');
    expect(getRequiredLabel('labelD')).toBeTruthy();
  });
});
