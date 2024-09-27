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

/** 获取必填标签 */
export const getRequiredLabel = (testId: string) => {
  return getByTestId(testId).querySelector('label')?.getAttribute('class')?.includes('required');
};

/** 点击选择框，展开数据源面板  */
export const clickSelectDom = async (testId: string) => {
  await userEvent.click(getByTestId(testId).querySelector('.ant-select-selector')!);
};

/** 获取下拉数据源面板 */
export const getSelectDropDownNodes = (testId: string) => {
  return getByTestId(testId).querySelectorAll('.ant-select-item');
};

/** 获取下拉选择框的值 */
export const getSelectValue = (testId: string) => {
  return screen.getByTestId(testId).querySelector('.ant-select-selection-item')?.textContent;
};

/** 输入框模拟输入 */
export const triggerInput = async (testId: string, value: string) => {
  await userEvent.type(getByTestId(testId), value);
};

/** 清空输入框值 */
export const clearInput = async (testId: string) => {
  await userEvent.clear(getByTestId(testId));
};
