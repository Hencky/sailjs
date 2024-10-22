import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { sleep } from 'radash';
import { RemoteValues } from '..';
import { getByTestId, getInputValue } from '../../../tests/utils';

describe('remoteValues', () => {
  test('remoteValues set', async () => {
    render(<RemoteValues />);

    await sleep(200);

    expect(getByTestId('container').querySelector('.ant-spin-lg')).not.toBeNull();

    await sleep(3000);

    expect(getByTestId('container').querySelector('.ant-spin')).toBeNull();

    expect(getInputValue('inputA')).toBe('1');
    expect(getInputValue('inputB')).toBe('2');
    expect(getInputValue('inputC')).toBe('3');
    expect(getInputValue('inputD')).toBe('4');
  });
});
