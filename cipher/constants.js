/**
 * Колличество букв английского алфавита
 */
export const ENG_MODULE_ALPHABET = 26;
/**
 * Смещения для различных типов шифров
 */
export const SHIFT_TYPES = {
  c: 1,
  /** Так как в английском четное колличество букв проблем нет */
  a: ENG_MODULE_ALPHABET - 1,
  r: 8,
};
