import { Scrollbar } from "@silent-ui/react";

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <Scrollbar className="props-table-wrap" orientation="horizontal" size="thin">
      <table className="props-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name}>
              <td>
                <code>{p.name}</code>
              </td>
              <td>
                <code>{p.type}</code>
              </td>
              <td>{p.default ? <code>{p.default}</code> : "—"}</td>
              <td>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Scrollbar>
  );
}
