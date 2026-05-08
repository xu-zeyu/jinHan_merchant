export type DataTableSearchKey<TData> = Extract<keyof TData, string>;

export type DataTableFilterOption = {
  label: string;
  value: string;
};

export type DataTableFilterConfig<TData> = {
  id: string;
  label: string;
  options: DataTableFilterOption[];
  allLabel?: string;
  defaultValue?: string;
  valueGetter: (row: TData) => string;
};
