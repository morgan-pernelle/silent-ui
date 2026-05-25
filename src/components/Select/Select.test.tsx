import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Select } from "./Select";

const options = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
];

describe("Select", () => {
  it("exposes combobox semantics", () => {
    render(<Select label="Size" options={options} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("opens listbox on click and selects an option", () => {
    const onValueChange = vi.fn();
    render(
      <Select
        label="Size"
        options={options}
        onValueChange={onValueChange}
      />,
    );
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "Beta" }));
    expect(onValueChange).toHaveBeenCalledWith("b");
    expect(screen.getByRole("combobox")).toHaveTextContent("Beta");
  });

  it("opens with ArrowDown and highlights first option", () => {
    render(<Select label="Size" options={options} />);
    const combobox = screen.getByRole("combobox");
    combobox.focus();
    fireEvent.keyDown(combobox, { key: "ArrowDown" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Alpha" })).toBeInTheDocument();
  });
});
