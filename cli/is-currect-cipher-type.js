const cipherTypes = ["c", "r", "a"];
/**
 * Проверяет поддерживается ли данный шифр
 */
export const isCurrectCipherType = (cipherSymbol) =>
  cipherTypes.indexOf(cipherSymbol) === -1;
