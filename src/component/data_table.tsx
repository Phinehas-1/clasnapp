import { TableData } from "../interfaces";
import { convertObjectToString } from "../utils";

export const DataTable = (data: TableData) => {
  return (
    <div className="max-w-xs sm:max-w-screen-lg mt-3 p-1 py-3 text-xs sm:text-sm border-solid border-2 border-gray-200 md:border-none">
      <span className="m-2 py-2 px-3 inline-block font-semibold bg-blue-50 rounded-2xl">
        {data.items.length > 0 && `${data.items.length} users found`}
      </span>
      <div className="max-w-xs sm:max-w-screen-lg overflow-x-scroll sm:overflow-hidden">
        <table className="w-max">
          <thead>
            <tr className="border">
              {data.headings.map(
                (heading, index) =>
                  index != 0 && (
                    <th
                      key={index}
                      className={`px-4 py-2 w-max min-w-10 border-solid border-8 border-white bg-slate-300 text-center ${
                        index === 1 &&
                        `text-blue-800 absolute inline-block md:relative md:table-cell border-t-0 md:border-t-8 shadow-slate-700 shadow-md`
                      } ${index === 2 && `pl-44 md:pl-3`}`}
                    >
                      {heading}
                    </th>
                  )
              )}
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={Object.values(item)?.[0] ?? index}>
                {Object.values(item).map((value, index) => {
                  value =
                    typeof value === "object"
                      ? convertObjectToString(value)
                      : value;
                  return (
                    index != 0 && (
                      <td
                        key={index}
                        className={`py-3 w-max min-w-10 px-4 border-4 ${
                          index === 1 &&
                          `absolute inline-block md:relative md:table-cell w-32 z-10 bg-blue-100 border-white shadow-slate-700 shadow-md`
                        } ${index === 2 && `pl-44 md:pl-3`}`}
                      >
                        {value}
                      </td>
                    )
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
