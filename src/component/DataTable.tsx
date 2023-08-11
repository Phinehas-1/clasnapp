import { TableData } from "../interfaces";
import { convertObjectToString } from "../utils";

export const DataTable = (data: TableData) => {
  return (
    <div>
      <table>
        <thead>
          <tr className="border">
            {data.headings.map((heading, index) => (
              <th
                key={index}
                className="p-1 sm:p-3 border-solid border-8 border-white bg-slate-300"
              >
                {heading}
              </th>
            ))}
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
                  <td key={index} className="py-3 px-9 border-4">
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
