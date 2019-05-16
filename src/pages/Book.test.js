import React from "react";
import Enzyme, { shallow } from "enzyme";
import Book from "./book";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

it("Book renders without crashing", () => {
  const styles = {};
  const context = { styles };
  const wrapper = shallow(
    <Book
      match={{
        params: { id: 5 },
        isExact: true,
        path: "/book/:id",
        url: "/book/5"
      }}
    />
  ).dive(context);
  expect(wrapper.find("h1")).toHaveLength(1);
});

it("Name field blank", () => {
  const styles = {};
  const context = { styles };
  const wrapper = shallow(
    <Book
      match={{
        params: { id: 5 },
        isExact: true,
        path: "/book/:id",
        url: "/book/5"
      }}
    />
  ).dive(context);
  wrapper.setState({
    name: "",
    lastName: "Pereira",
    cpf: "13727934611",
    rg: "040183805-5",
    birthday: "02/06/2000",
    quantity: 1
  });
  wrapper.find("#submitButton").simulate("click");
  console.log(wrapper.find(".Toastify__toast-body").debug());
  expect(wrapper.find(".Toastify__close-button--error")).toHaveLength(1);
});
