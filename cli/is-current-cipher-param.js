const cipherParams = ["0", "1"];

/**
 * Проверяет поддерживается ли данный шифр
 */
export const isCurrectCipherParam = (cipherParam) =>
  cipherParams.indexOf(cipherParam) === -1;
