import { CustomError } from "../custom-error.js";
import { isCurrectCipherType } from "./is-currect-cipher-type.js";
import { isCurrectCipherParam } from "./is-current-cipher-param.js";

/**
 * Тестирует последовательность команд на корректность
 * В случае ошибки завершает приложение
 */
export const testCommands = (command) => {
  const cipherSymbol = command[0]?.toLowerCase();
  const cipherParam = command[1];

  if (isCurrectCipherType(cipherSymbol)) {
    throw new CustomError(301);
  }
  if (cipherSymbol === "a") {
    if (cipherParam) {
      throw new CustomError(302);
    }
  } else if (isCurrectCipherParam(cipherParam)) {
    throw new CustomError(303);
  }
};
