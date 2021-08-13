import ReactDOM from "react-dom";
import Loading from "..";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Loading />, div);
});

it("renders Loading correcty", () => {
  const { getByTestId } = render(<Loading />);
  expect(getByTestId("loading"));
});
