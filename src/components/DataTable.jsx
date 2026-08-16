import { Pagination } from "flowbite-react";
import { SyncLoader } from "react-spinners";
import { usePaginationStore } from "../store/paginationStore";
const DataTable = ({
  tableHead,
  tableData,
  columnMapping = {},
  columnAlignment = {},
  actionButtonsConfig = [],
  headerConfig = {
    title: "Table",
    searchPlaceholder: "Search...",
  },
  loading = false,
}) => {
  const { page, limit, totalData, search, setPage, setLimit, setSearch } =
    usePaginationStore();

  const totalPages = Math.max(1, Math.ceil(totalData / limit));
  const startIndex = (page - 1) * limit;
  const getValue = (obj, path) => {
    return path?.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  return (
    <div
      className={`
    overflow-hidden
    rounded-card
    border
    border-card-border
    dark:border-card-border-dark
    bg-card-bg
    dark:bg-card-bg-dark
    shadow-card
  `}
    >
      <div
        className="
bg-header-bg
text-header-text
px-5
py-4
flex
flex-col
lg:flex-row
justify-between
items-center
gap-4
"
      >
        <div className="bg-header-bg flex items-center gap-2">
          <span className="text-sm text-white/80">Show</span>

          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="
rounded-lg
border
border-card-border
dark:border-card-border-dark
bg-white
dark:bg-secondary
text-text
dark:text-text-dark
px-3
py-2
focus:ring-2
focus:ring-primary-500
focus:border-primary-500
"
          >
            {[5, 10, 25, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <span className="text-sm text-white/80">entries</span>
        </div>

        <h2 className="text-lg font-semibold uppercase tracking-wide text-center">
          {headerConfig.title}
        </h2>

        <input
          type="text"
          placeholder={headerConfig.searchPlaceholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="
w-full
lg:w-80
rounded-lg
border
border-card-border
dark:border-card-border-dark
bg-card-bg
dark:bg-card-bg-dark
text-text
dark:text-text-dark
placeholder:text-text-muted
px-4
py-2.5
focus:border-primary-500
focus:ring-2
focus:ring-primary-500
transition
"
        />
      </div>

      <div className="block md:hidden p-3 space-y-3">
        {loading ? (
          <div className="flex justify-center py-10">
            <SyncLoader size={10} color="#bb1919" />
          </div>
        ) : tableData?.length > 0 ? (
          tableData.map((row, index) => (
            <div
              key={row.id || index}
              className="
bg-card-bg
dark:bg-card-bg-dark
border
border-card-border
dark:border-card-border-dark
rounded-card
shadow-card
p-4
"
            >
              {tableHead.map((col) => {
                if (col === "Action") {
                  return (
                    <div
                      key={col}
                      className="flex justify-end gap-2 mt-4 pt-3 border-t border-primary-100"
                    >
                      {actionButtonsConfig.map(
                        (btn, i) =>
                          btn.show(row) && (
                            <button
                              key={i}
                              onClick={() => btn.onClick(row)}
                              className="
h-9
w-9
rounded-lg
flex
items-center
justify-center
hover:bg-primary-50
dark:hover:bg-secondary-hover
transition
"
                            >
                              {btn.icon}
                            </button>
                          ),
                      )}
                    </div>
                  );
                }

                let value;

                if (col === "SL") {
                  value = startIndex + index + 1;
                } else {
                  const key =
                    columnMapping[col] || col.toLowerCase().replace(/\s+/g, "");

                  // value = row[key] ?? "-";
                  value = getValue(row, key) ?? "-";
                }

                return (
                  <div
                    key={col}
                    className="flex justify-between gap-4 py-2 border-b border-primary-100 last:border-b-0"
                  >
                    <span
                      className="text-primary-500
font-semibold"
                    >
                      {col}
                    </span>

                    <span className="text-right break-words max-w-[60%]">
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <div className="text-center py-8">No data found</div>
        )}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full">
          <thead
            className="
bg-secondary
dark:bg-diganta-darker
text-text-dark
uppercase
text-xs
tracking-wider
"
          >
            <tr>
              {tableHead.map((col) => {
                const align =
                  columnAlignment[col] === "right"
                    ? "text-right"
                    : columnAlignment[col] === "center"
                      ? "text-center"
                      : "text-left";

                return (
                  <th
                    key={col}
                    className={`
px-5
py-4
font-semibold
whitespace-nowrap
${align}
`}
                  >
                    {col}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody
            className="
bg-card-bg
dark:bg-card-bg-dark
divide-y
divide-card-border
dark:divide-card-border-dark
"
          >
            {loading ? (
              <tr>
                <td colSpan={tableHead.length} className="py-10">
                  <div className="flex justify-center items-center w-full">
                    <SyncLoader size={10} className="text-primary-500" />
                  </div>
                </td>
              </tr>
            ) : tableData?.length > 0 ? (
              tableData.map((row, index) => (
                <tr
                  key={row.id || index}
                  className="
transition-colors
duration-200
hover:bg-card-hover
dark:hover:bg-card-hover-dark
"
                >
                  {tableHead.map((col) => {
                    if (col === "SL") {
                      return (
                        <td key={col} className="px-4 py-2">
                          {startIndex + index + 1}
                        </td>
                      );
                    }

                    if (col === "Action") {
                      return (
                        <td key={col} className="px-4 py-2">
                          <div className="flex gap-2">
                            {actionButtonsConfig.map(
                              (btn, i) =>
                                btn.show(row) && (
                                  <button
                                    key={i}
                                    onClick={() => btn.onClick(row)}
                                    className="text-primary-600 hover:text-primary-800"
                                  >
                                    {btn.icon}
                                  </button>
                                ),
                            )}
                          </div>
                        </td>
                      );
                    }

                    const key =
                      columnMapping[col] ||
                      col.toLowerCase().replace(/\s+/g, "");

                    // const value = row[key];
                    const value = getValue(row, key);
                    const align =
                      columnAlignment[col] === "right"
                        ? "text-right"
                        : columnAlignment[col] === "center"
                          ? "text-center"
                          : "text-left";
                    if (col.toLowerCase() === "status") {
                      const statusColors = {
                        Pending:
                          "bg-warning/10 text-warning border border-warning/30",

                        Approved:
                          "bg-success/10 text-success border border-success/30",

                        Rejected:
                          "bg-danger/10 text-danger border border-danger/30",

                        Active:
                          "bg-success/10 text-success border border-success/30",

                        InActive:
                          "bg-secondary-light text-text-dark border border-sidebar-border",

                        Assigned: "bg-info/10 text-info border border-info/30",

                        Shortlisted:
                          "bg-info/10 text-info border border-info/30",
                      };

                      return (
                        <td key={col} className={`px-4 py-2 ${align}`}>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                              statusColors[value] || "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {value || "-"}
                          </span>
                        </td>
                      );
                    }
                    return (
                      <td
                        key={col}
                        className={`
px-5
py-3.5
text-sm
text-text
dark:text-text-dark-light
${align}
`}
                      >
                        {value ?? "-"}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHead.length} className="py-6 text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        className="
    flex flex-col md:flex-row
    items-center
    justify-between
    gap-4
    px-5
    py-4
    border-t
    border-card-border
    dark:border-card-border-dark
    bg-card-bg
    dark:bg-card-bg-dark
  "
      >
        <div className="text-sm text-text-light dark:text-text-dark-light">
          Showing{" "}
          <span className="font-semibold text-text dark:text-text-dark">
            {totalData === 0 ? 0 : startIndex + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-text dark:text-text-dark">
            {Math.min(page * limit, totalData)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-text dark:text-text-dark">
            {totalData}
          </span>
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
          showIcons
          theme={{
            pages: {
              selector: {
                active: "bg-primary-500 text-white hover:bg-primary-600",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default DataTable;
