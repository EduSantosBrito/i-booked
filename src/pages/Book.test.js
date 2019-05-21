import React from "react";
import Enzyme, { shallow } from "enzyme";
import Book from "./book";
import Adapter from "enzyme-adapter-react-16";
import moment from 'moment';

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
    quantity: 1,
    restaurant: {
      available: 1,
      reserved: []
    }
  });
  wrapper.find("#submitButton").simulate("click");
  expect(wrapper.state().errorMsg).toBe("Campos em Branco");
});

it("lastName field blank", () => {
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
    name: "Ismael",
    lastName: "",
    cpf: "13727934611",
    rg: "040183805-5",
    birthday: "02/06/2000",
    quantity: 1,
    restaurant: {
      available: 1,
      reserved: []
    }
  });
  wrapper.find("#submitButton").simulate("click");
  expect(wrapper.state().errorMsg).toBe("Campos em Branco");
});

it("CPF field blank", () => {
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
    name: "Ismael",
    lastName: "Pereira",
    cpf: "",
    rg: "040183805-5",
    birthday: "02/06/2000",
    quantity: 1,
    restaurant: {
      available: 1,
      reserved: []
    }
  });
  wrapper.find("#submitButton").simulate("click");
  expect(wrapper.state().errorMsg).toBe("Campos em Branco");
});

it("invalid CPF", () => {
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
    name: "Ismael",
    lastName: "Pereira",
    cpf: "11111111111111",
    rg: "040183805-5",
    birthday: "02/06/2000",
    quantity: 1,
    restaurant: {
      available: 1,
      reserved: []
    }
  });
  wrapper.find("#submitButton").simulate("click");
  expect(wrapper.state().errorMsg).toBe("CPF inválido");
});

it("RG field blank", () => {
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
    name: "Ismael",
    lastName: "Pereira",
    cpf: "13727934611",
    rg: "",
    birthday: "02/06/2000",
    quantity: 1,
    restaurant: {
      available: 1,
      reserved: []
    }
  });
  wrapper.find("#submitButton").simulate("click");
  expect(wrapper.state().errorMsg).toBe("Campos em Branco");
});

it("Birthday field blank", () => {
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
    name: "Ismael",
    lastName: "Pereira",
    cpf: "13727934611",
    rg: "040183805-5",
    birthday: "",
    quantity: 1,
    restaurant: {
      available: 1,
      reserved: []
    }
  });
  wrapper.find("#submitButton").simulate("click");
  expect(wrapper.state().errorMsg).toBe("Campos em Branco");
});

it("Quantity field blank", () => {
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
    name: "Ismael",
    lastName: "Pereira",
    cpf: "13727934611",
    rg: "040183805-5",
    birthday: "02/06/2000",
    quantity: null,
    restaurant: {
      available: 1,
      reserved: []
    }
  });
  wrapper.find("#submitButton").simulate("click");
  expect(wrapper.state().errorMsg).toBe("Campos em Branco");
});

it("Quantity field zero", () => {
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
    name: "Ismael",
    lastName: "Pereira",
    cpf: "13727934611",
    rg: "040183805-5",
    birthday: "02/06/2000",
    quantity: 0,
    restaurant: {
      available: 1,
      reserved: []
    }
  });
  wrapper.find("#submitButton").simulate("click");
  expect(wrapper.state().errorMsg).toBe("Campos em Branco");
});

it("Quantity bigger than available", () => {
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
    name: "Ismael",
    lastName: "Pereira",
    cpf: "13727934611",
    rg: "040183805-5",
    birthday: "02/06/2000",
    quantity: 50,
    restaurant: {
      available: 1,
      reserved: []
    }
  });
  wrapper.find("#submitButton").simulate("click");
  expect(wrapper.state().errorMsg).toBe("Quantidade maior que a disponível");
});

it("All fields filled out", () => {
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
    name: "Ismael",
    lastName: "Pereira",
    cpf: "13727934611",
    rg: "040183805-5",
    birthday: "02/06/2000",
    quantity: 1,
    restaurant: {
      available: 1,
      reserved: []
    }
  });
  wrapper.find("#submitButton").simulate("click");
  expect(wrapper.state().errorMsg).toBe(null);
});

it("Under age", () => {
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
    name: "Ismael",
    lastName: "Pereira",
    cpf: "13727934611",
    rg: "040183805-5",
    birthday: "02/06/2002",
    quantity: 1,
    restaurant: {
      available: 10,
      reserved: []
    }
  });
  wrapper.find("#submitButton").simulate("click");
  expect(wrapper.state().errorMsg).toBe("Menor de idade");
});

