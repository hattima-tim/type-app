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

test("typing wrong characters makes corresponding test characters red", async () => {
  render(<App testStringForTesting="আমরা" />);

  const user = userEvent.setup();

  const inputField = screen.getByRole("textbox");
  await user.type(inputField, "hello");

  const firstTestCharacterDiv = screen.getByText("আ");
  const secondTestCharacterDiv = screen.getByText("ম");

  expect(firstTestCharacterDiv).toHaveClass("text-red-600");
  expect(secondTestCharacterDiv).toHaveClass("text-red-600");
});
