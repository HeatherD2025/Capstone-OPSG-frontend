import { faker } from "@faker-js/faker";

const fakeCompany = {
  name: faker.company.name().toUpperCase(),
  email: faker.internet.email(undefined, undefined, "example.com"),
  source: "faker-demo",
};

// const demoBalance = faker.finance.amount({
//   min: 150,
//   max: 5450,
//   dec: 5,
//   symbol: "$",
// });

// const demoInvoice = faker.finance.amount({
//   min: 150,
//   max: 5450,
//   dec: 5,
//   symbol: "$",
// });

export default fakeCompany;
