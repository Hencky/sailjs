import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

export const getByTestId = (testId: string) => {
  return screen.getByTestId(testId);
};

/** 通过 data-testid 点击元素 */
export function clickByTestId(testId: string) {
  return userEvent.click(getByTestId(testId));
}

/** 获取输入框的值 */
export const getInputValue = (testId: string) => {
  return getByTestId(testId).getAttribute('value');
};

/** 点击选择框，展开数据源面板  */
export const clickSelectDom = async (testId: string) => {
  await userEvent.click(getByTestId(testId).querySelector('.ant-select-selector')!);
};

/** 获取下拉数据源面板 */
export const getSelectDropDownNodes = (testId: string) => {
  return getByTestId(testId).querySelectorAll('.ant-select-item');
};

/** 输入框模拟输入 */
export const triggerInput = async (testId: string, value: string) => {
  await userEvent.type(getByTestId(testId), value);
};
