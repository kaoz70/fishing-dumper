// Random item from the array function
import { firstNames } from "../dictionaries/firstNames";
import { lastNames } from "../dictionaries/lastNames";
import { emailDomains } from "../dictionaries/emailDomains";
import { emailSeparators } from "../dictionaries/emailSeparators";
import { adjectives, uniqueNamesGenerator } from "unique-names-generator";
import { randomItem, randomNumberBetween } from "../utils";

export const randomEmail = () => {
  let firstName = randomItem(firstNames);
  const lastName = randomItem(lastNames);
  const domain = randomItem(emailDomains);
  let firstSeparator = "";
  let lastSeparator = "";

  // Set the year or not
  let year = "";
  if (randomItem([true, false])) {
    // Random year between 1950 and 2008
    year = randomNumberBetween(1950, 2008).toString();

    // Randomize last 2 or 4 digits
    if (randomItem([true, true, true, false])) {
      year = year.slice(2);
    }
  }

  if (randomItem([true, false])) {
    // Get the first letter of the first name
    firstName = firstName[0];
  }

  // Randomize separator
  if (randomItem([true, false])) {
    firstSeparator = randomItem(emailSeparators);
  }
  if (randomItem([true, false]) && year) {
    lastSeparator = randomItem(emailSeparators);
  }

  if (!year) {
    year = uniqueNamesGenerator({
      dictionaries: [adjectives],
      style: "lowerCase",
    });
    lastSeparator = firstSeparator;
  }

  let email = `${firstName}${firstSeparator}${lastName}${lastSeparator}${year}@${domain}`;

  // Replace special characters from the email
  const replacer = [
    [" ", firstSeparator],
    ["á", "a"],
    ["é", "e"],
    ["í", "i"],
    ["ó", "o"],
    ["ú", "u"],
    ["ñ", "n"],
  ];

  replacer.forEach((item) => {
    email = email.replace(item[0], item[1]);
  });

  return email.toLowerCase();
};
