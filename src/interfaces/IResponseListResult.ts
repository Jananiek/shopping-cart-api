import { IPagination } from './IPagination';

export interface IResponseListResult<T> {
  items: T[];
  pagination: IPagination;
}
