import { sleep } from 'radash';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { Options } from '../../demos';
import { clickSelectDom, getSelectDropDownNodes, triggerInput } from '../utils';

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
    expect(onGetRemoteValues).toHaveBeenCalledTimes(2);
  });

  test('array name remoteOptions deps', async () => {
    render(<Options />);

    await triggerInput('inputObj', 'abc');

    await sleep(1000);
    await clickSelectDom('selectObj');
    expect(getSelectDropDownNodes('obj.b')!.length).toBe(3);

    await triggerInput('inputObj', 'def');

    await sleep(1000);
    await clickSelectDom('selectObj');
    expect(getSelectDropDownNodes('obj.b')!.length).toBe(6);
  });
});
