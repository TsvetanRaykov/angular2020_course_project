import { TSortDirection } from '.';

export interface IOrderServiceState {
  page: number;
  pageSize: number;
  sortColumn: string;
  sortDirection: TSortDirection;
}
