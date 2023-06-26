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

  const firstTestCharacter = screen.getByText("আ");
  const secondTestCharacter = screen.getByText("ম");

  expect(firstTestCharacter).toHaveClass("text-red-600");
  expect(secondTestCharacter).toHaveClass("text-red-600");
});

test("typing correct chars makes corresponding test chars black from gray", async () => {
  render(<App testStringForTesting="আমরা" />);

  const user = userEvent.setup();

  const inputField = screen.getByRole("textbox");
  await user.type(inputField, "আমরা");

  const firstTestCharacter = screen.getByText("আ");
  const secondTestCharacter = screen.getByText("ম");
  const thirdTestCharacter = screen.getByText("রা");

  expect(firstTestCharacter).toHaveClass("text-black");
  expect(secondTestCharacter).toHaveClass("text-black");
  expect(thirdTestCharacter).toHaveClass("text-black");
});
