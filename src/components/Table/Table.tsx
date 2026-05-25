import {
  type HTMLAttributes,
  type ReactNode,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";
import { cn } from "../../utils/cn";
import styles from "./Table.module.css";

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  compact?: boolean;
  children: ReactNode;
}

export function Table({ compact = false, className, children, ...props }: TableProps) {
  return (
    <div className={styles.wrap}>
      <table
        className={cn(styles.table, compact && styles.compact, className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHead({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn(styles.head, className)} {...props}>
      {children}
    </thead>
  );
}

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

export function TableRow({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn(styles.row, className)} {...props}>
      {children}
    </tr>
  );
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  header?: boolean;
  numeric?: boolean;
}

export function TableCell({
  header,
  numeric,
  className,
  children,
  ...props
}: TableCellProps) {
  const cellClass = cn(
    header ? styles.headCell : styles.cell,
    numeric && styles.numeric,
    className,
  );

  if (header) {
    return (
      <th className={cellClass} scope="col" {...(props as ThHTMLAttributes<HTMLTableCellElement>)}>
        {children}
      </th>
    );
  }

  return (
    <td className={cellClass} {...props}>
      {children}
    </td>
  );
}
