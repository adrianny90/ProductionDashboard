import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, expect, beforeEach, afterEach } from "vitest";
import AdminPanel from "../AdminPanel";
import type { MockedFunction } from "vitest";

describe("AdminPanel", () => {
  let fetchMock: MockedFunction<typeof global.fetch>;

  beforeEach(() => {
    fetchMock = vi.fn() as MockedFunction<typeof global.fetch>;
    global.fetch = fetchMock;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("fetches users", async () => {
    const mockUser = [
      {
        firstName: "John",
        email: "john@example.com",
        lastName: "Deer",
        role: "user",
      },
    ];
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    } as Response);

    render(<AdminPanel />);
    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
      expect(screen.getByText("Deer")).toBeInTheDocument();
      expect(screen.getByText("user")).toBeInTheDocument();
    });
  });
});
