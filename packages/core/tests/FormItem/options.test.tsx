import { sleep } from 'radash';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Options } from '../../demos';
import {
  clickByTestId,
  clickSelectDom,
  getByTestId,
  getInputValue,
  getSelectDropDownNodes,
  triggerInput,
} from '../utils';

const fn = {
  onGetRemoteValues: (deps: any) => {
    return deps;
  },
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Options', () => {
  test('options & remoteOptions', async () => {
    render(<Options />);

    await clickSelectDom('selectA');
    expect(getSelectDropDownNodes('selectA')!.length).toBe(1);

    await sleep(2000);
    expect(getSelectDropDownNodes('selectA')!.length).toBe(3);
  });

  test('remoteOptions deps', async () => {
    const onGetRemoteValues = vi.spyOn(fn, 'onGetRemoteValues');
    render(<Options onGetRemoteValues={onGetRemoteValues} />);

    await triggerInput('inputB', 'abc');

    await sleep(1000);
    expect(onGetRemoteValues).toHaveBeenCalledWith(['abc']);
    // TODO: 初始不生效
    expect(onGetRemoteValues).toHaveBeenCalledTimes(1);
  });
});
