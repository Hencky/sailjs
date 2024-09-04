import type { NamePath } from 'antd/es/form/interface';

export const toCompareName = (name: NamePath) => {
  if (Array.isArray(name)) {
    return name.join(',');
  }
  return name;
};
