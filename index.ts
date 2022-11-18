import { randomEmail } from "./generators/email";
import { randomNumberBetween, times } from "./utils";
import { randomPassword } from "./generators/password";

const createEmailAndPassword = () => {
  const email = randomEmail();
  const password = randomPassword(randomNumberBetween(8, 16));
  return { email, password };
};

console.log(times(16, createEmailAndPassword));
