import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { format } from "date-fns";

export default function FeedbackTable({ data }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "topic",
        header: "Topic",
      },
      {
        accessorKey: "comment",
        header: "Comment",
      },
      {
        accessorKey: "sentiment",
        header: "Sentiment",
        cell: (info) => info.getValue()?.toUpperCase(),
      },
      {
        accessorKey: "created_at",
        header: "Date",
        cell: (info) =>
          info.getValue() ? format(new Date(info.getValue()), "dd MMM yyyy") : "",
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm p-4">
      <input
        type="text"
        placeholder="Search..."
        className="mb-3 p-2 border rounded"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 text-gray-700 text-left text-sm font-semibold">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 cursor-pointer select-none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: " ▲",
                    desc: " ▼",
                  }[header.column.getIsSorted()] || ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-100 text-sm">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <div>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
