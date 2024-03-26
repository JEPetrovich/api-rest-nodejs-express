export type DataType =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function';

export interface CheckProps {
  value: any;
  name: string;
  type: DataType;
  isDateString: boolean;
  required: boolean;
}
