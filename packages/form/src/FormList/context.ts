import { createContext, useContext } from 'react';
import type { FormListProps } from 'antd/lib/form/FormList';

export type FormListContextValue = {
  name: FormListProps['name'];
};

export const FormListContext = createContext<FormListContextValue>({} as FormListContextValue);

export const useFormListContext = () => {
  return useContext(FormListContext);
};
