import React from "react";
import { render, screen } from "@testing-library/react";
import UserDashboard from "./components/userDashboard/UserDashboard";

test("renders Dashboard Header on page load", () => {
  render(<UserDashboard />);

  const headerElement = screen.getByText(/dashboard/i);
  expect(headerElement).toBeInTheDocument();
});
