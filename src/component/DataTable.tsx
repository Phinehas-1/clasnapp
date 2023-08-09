import { TableData } from "../Interface";

export const DataTable = (data: TableData) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {data.headings.map((heading) => (
              <th key={data.headings.indexOf(heading)}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={data.items.indexOf(item)}>
              {item.map((i) => (
                <td key={item.indexOf(i)}>{i}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
