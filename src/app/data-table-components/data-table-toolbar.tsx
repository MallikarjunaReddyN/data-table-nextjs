"use client";

import {Cross2Icon, TrashIcon, DownloadIcon, PlusIcon} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { incomeType, categories } from "./data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { CalendarDatePicker } from "@/components/calendar-date-picker";
import { useState } from "react";
import { DataTableViewOptions } from "./data-table-view-options";
import {CreateNewDialog} from "@/app/data-table-components/create-new-dialog";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date()
  });

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    setDateRange({ from, to });
    // Filter table data based on selected date range
    table.getColumn("date")?.setFilterValue([from, to]);
  };

  const excludeColumns: string[] = ["select", "actions"]
  const exportData = () => {
      const headers = table
          .getAllLeafColumns()
          .map((column) => column.id)
          .filter((id) => !excludeColumns.includes(id))

      // Build CSV content
      const csvContent = [
          headers.join(","),
          ...(table.getFilteredSelectedRowModel().rows.length > 0
                  ? table.getFilteredSelectedRowModel().rows
                  : table.getRowModel().rows
          ).map((row) =>
              headers
                  .map((header) => {
                      const cellValue = row.getValue(header)
                      // Handle values that might contain commas or newlines
                      return typeof cellValue === "string"
                          ? `"${cellValue.replace(/"/g, '""')}"`
                          : cellValue
                  })
                  .join(",")
          ),
      ].join("\n")

      // Create a Blob with CSV content
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

      // Create a link and trigger the download
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `expenses.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
  }

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filter labels..."
          value={(table.getColumn("note")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("note")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="Category"
            options={categories}
          />
        )}
        {table.getColumn("type") && (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Type"
            options={incomeType}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <CalendarDatePicker
          date={dateRange}
          onDateSelect={handleDateSelect}
          className="w-[250px] h-8"
          variant="outline"
        />
      </div>
      <div className="flex gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
          >
            <TrashIcon className="mr-2 h-4 w-4" />
            Delete({table.getFilteredSelectedRowModel().rows.length})
          </Button>
      )}
          <CreateNewDialog />
          <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
              onClick={() => exportData()}
          >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export
          </Button>
      <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
