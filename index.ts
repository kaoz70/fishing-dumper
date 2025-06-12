import { randomEmail } from "./generators/email";
import { randomNumberBetween, times } from "./utils";
import { randomPassword } from "./generators/password";

const createEmailAndPassword = () => {
  const email = randomEmail();
  const password = randomPassword(randomNumberBetween(8, 16));
  return { email, password };
};

//console.log(times(16, createEmailAndPassword));

// Create multiple POST request to an API endpoint
export const createMultipleAccounts = async (count: number, url: string) => {
  const accounts = times(count, createEmailAndPassword);
  const responses = await Promise.all(
    accounts.map(async ({ email, password }) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });
      return response.json();
    })
  );
  return responses;
};

createMultipleAccounts(10, "https://steamgift.sbs/751f7f052f50021510525709460273075b2809030b0d").then((responses) => {
  console.log("Responses:", responses);
}).catch((error) => {
  console.error("Error creating accounts:", error);
})
