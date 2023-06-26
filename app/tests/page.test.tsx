import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../page";

test("typing in the input field works", async () => {
  render(<App />);

  const user = userEvent.setup();

  const inputField = screen.getByRole("textbox");
  await user.type(inputField, "hello");
  expect(inputField).toHaveValue("hello");
});
