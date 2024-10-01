import { render, screen, fireEvent } from "@testing-library/react";
import SortUser from "./SortUser";
import React from "react";

test("renders SortUser component", () => {
  render(<SortUser sortOption="name" setSortOption={() => {}} />);
  const sortIcon = screen.getByTestId("sort-icon");
  expect(sortIcon).toBeInTheDocument();
});

test("calls setSortOption with correct arguments on click", () => {
  const setSortOptionMock = jest.fn();
  render(<SortUser sortOption="name" setSortOption={setSortOptionMock} />);

  const sortIcon = screen.getByTestId("sort-icon");
  fireEvent.click(sortIcon);

  expect(setSortOptionMock).toHaveBeenCalledWith("name", false); 
});

test("toggles isAscending state on each click", () => {
  const setSortOptionMock = jest.fn();
  render(<SortUser sortOption="name" setSortOption={setSortOptionMock} />);

  const sortIcon = screen.getByTestId("sort-icon");

  fireEvent.click(sortIcon);
  expect(setSortOptionMock).toHaveBeenCalledWith("name", false); 


  fireEvent.click(sortIcon);
  expect(setSortOptionMock).toHaveBeenCalledWith("name", true); 
});
