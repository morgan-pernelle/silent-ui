import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Drawer } from "./Drawer";

describe("Drawer", () => {
  it("renders when open", () => {
    render(
      <Drawer open onClose={() => {}} title="Cart">
        <p>Line item</p>
      </Drawer>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Cart")).toBeInTheDocument();
    expect(screen.getByText("Line item")).toBeInTheDocument();
  });

  it("does not render panel when closed", () => {
    render(
      <Drawer open={false} onClose={() => {}} title="Cart">
        <p>Hidden</p>
      </Drawer>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose} title="Menu">
        Content
      </Drawer>,
    );
    fireEvent.click(screen.getByLabelText("Close"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose} title="Menu">
        Content
      </Drawer>,
    );
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
