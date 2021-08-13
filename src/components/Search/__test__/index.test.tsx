import ReactDOM from "react-dom";
import Search from "..";
import { render, cleanup } from "@testing-library/react";

const setup = () => {
  const component = <Search value="pasta" onChange={() => void 0} />;
  const utils = render(component);
  const input = utils.getByTestId("search") as HTMLInputElement;

  return {
    component,
    input,
    ...utils,
  };
};

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  const { component } = setup();
  ReactDOM.render(component, div);
});

it("renders correct placeholder", () => {
  const { input } = setup();
  expect(input.placeholder).toBe("Search...");
});

it("renders correct value", () => {
  const { input } = setup();
  expect(input.value).toBe("pasta");
});

it("changes value on change", () => {
  const { input, rerender } = setup();
  const newValue = "pasta with tuna";
  rerender(<Search value={newValue} onChange={() => void 0} />);
  expect(input.value).toBe(newValue);
});
