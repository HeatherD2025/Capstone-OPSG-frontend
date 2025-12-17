import { faker } from "@faker-js/faker";

const fakeCompany = {
  name: faker.company.name().toUpperCase(),
  email: faker.internet.email(undefined, undefined, "example.com"),
  source: "faker-demo",
};

export default fakeCompany;
