type NameType = string | number;

type Join<T extends any[], U extends string | number> = T extends [infer F, ...infer R]
  ? R['length'] extends 0
    ? `${F & string}`
    : `${F & string}${U}${Join<R, U>}`
  : never;

export function toCompareName<T extends string>(name: T): T extends infer S ? S : never;
export function toCompareName<T extends NameType[]>(name: T): Join<T, '.'>;
export function toCompareName(name: any): any {
  if (Array.isArray(name)) {
    return name.join('.');
  }
  return name;
}
