import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DateInput } from "./DateInput";

describe("DateInput", () => {
  it("renders labelled segments for day, month, and year", () => {
    render(<DateInput label="Birth date" defaultValue="1990-05-15" />);
    expect(screen.getByText("Birth date")).toBeInTheDocument();
    expect(screen.getByLabelText(/day/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/month/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/year/i)).toBeInTheDocument();
  });

  it("shows calendar trigger", () => {
    render(<DateInput label="Date" />);
    expect(
      screen.getByRole("button", { name: "Open calendar" }),
    ).toBeInTheDocument();
  });
});
