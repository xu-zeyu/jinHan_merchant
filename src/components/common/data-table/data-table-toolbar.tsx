"use client";

import type { ReactNode } from "react";
import { ChevronDown, ChevronUp, Search, SlidersHorizontal } from "lucide-react";

import type { DataTableFilterConfig } from "./data-table-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DataTableToolbarProps<TData> = {
  actions?: ReactNode;
  filterValues: Record<string, string>;
  filters: DataTableFilterConfig<TData>[];
  filtersExpanded: boolean;
  meta?: ReactNode;
  onFilterChange: (filterId: string, value: string) => void;
  onSearchChange: (value: string) => void;
  onToggleFilters: () => void;
  searchPlaceholder: string;
  searchValue: string;
};

export function DataTableToolbar<TData>({
  actions,
  filterValues,
  filters,
  filtersExpanded,
  meta,
  onFilterChange,
  onSearchChange,
  onToggleFilters,
  searchPlaceholder,
  searchValue,
}: DataTableToolbarProps<TData>) {
  const activeFilterCount = filters.filter((filter) => {
    const currentValue = filterValues[filter.id];
    const defaultValue = filter.defaultValue ?? "all";

    return currentValue !== defaultValue;
  }).length;

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-10 rounded-xl pl-9"
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
              value={searchValue}
            />
          </div>

          {filters.length > 0 ? (
            <Button
              className="shrink-0"
              onClick={onToggleFilters}
              size="sm"
              variant="outline"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              筛选
              {activeFilterCount > 0 ? ` ${activeFilterCount}` : ""}
              {filtersExpanded ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </Button>
          ) : null}

          {meta ? <div className="text-xs text-muted-foreground">{meta}</div> : null}
        </div>

        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </div>

      {filtersExpanded ? (
        <div className="grid gap-3 rounded-2xl border border-border/60 bg-secondary/50 p-3 md:grid-cols-2 xl:grid-cols-4">
          {filters.map((filter) => (
            <div key={filter.id} className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">{filter.label}</p>
              <Select
                onValueChange={(value) => onFilterChange(filter.id, value)}
                value={filterValues[filter.id]}
              >
                <SelectTrigger className="h-9 rounded-xl bg-background text-xs">
                  <SelectValue placeholder={filter.allLabel ?? "全部"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{filter.allLabel ?? "全部"}</SelectItem>
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
