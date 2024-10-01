import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserDashboard from "./UserDashboard";
import { getUsers } from "../../services/GetUsers";
import React from "react";

jest.mock("../../services/GetUsers");

const mockGetUsers = getUsers as jest.Mock;

const mockUsers = [
  { id: 1, name: "John Doe", username: "johndoe", email: "john@example.com" },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
  },
];

test("renders UserDashboard component", async () => {
  mockGetUsers.mockResolvedValue(mockUsers);

  render(<UserDashboard />);

  expect(screen.getByText(/content is loading.../i)).toBeInTheDocument();

  await waitFor(() =>
    expect(screen.getByText(/john doe/i)).toBeInTheDocument()
  );

  expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
});

test("filters users based on search input", async () => {
  mockGetUsers.mockResolvedValue(mockUsers);

  render(<UserDashboard />);

  await waitFor(() =>
    expect(screen.getByText(/john doe/i)).toBeInTheDocument()
  );

  fireEvent.change(screen.getByRole("textbox"), { target: { value: "Jane" } });

  expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
  expect(screen.queryByText(/john doe/i)).not.toBeInTheDocument();
});

test("allows user editing and updates the name in the table after save", async () => {
    mockGetUsers.mockResolvedValue(mockUsers);
  
    render(<UserDashboard />);
  
    await waitFor(() =>
      expect(screen.getByText(/john doe/i)).toBeInTheDocument()
    );
  
    const editButton = screen.getByTestId("edit-button-1"); 
    fireEvent.click(editButton);
  
    const nameInput = await screen.findByTestId("edit-name-1");
  
    fireEvent.change(nameInput, { target: { value: "John Doe Updated" } });
  
    const saveButton = screen.getByText(/save/i);
    fireEvent.click(saveButton);
  
    await waitFor(() => {
      expect(screen.getByTestId("name-1")).toHaveTextContent("John Doe Updated");
    });
  });
  