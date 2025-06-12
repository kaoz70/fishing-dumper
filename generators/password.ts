import { randomItem, randomNumberBetween, times } from "../utils";
import { emailSeparators } from "../dictionaries/emailSeparators";

const easyPasswords = ["password", "123456", "123456789", "qwerty", "12345678", "111111", "contraseña", "1234567"];

const randomString = (length: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  const charactersLength = characters.length;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const randomPassword = (length: number): string => {
  if (randomItem([true, false])) {
    return randomString(length);
  }

  // Random length between 1 and 4
  const easyPasswordLength = randomNumberBetween(1, 4);

  // Create a random password
  const easyArray = times(easyPasswordLength, () => randomItem(easyPasswords));
  let separator = randomItem(emailSeparators);

  if (easyArray.length === 1) {
    return easyArray[0] + separator;
  }

  return easyArray.join(separator);
};
