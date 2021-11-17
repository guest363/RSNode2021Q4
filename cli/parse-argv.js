import { CustomError } from "../custom-error.js";
/**
 * Возвращает мапу с параметрами
 * принятыми в шаблоне
 */
export const parseArgv = (argv, template) => {
  const params = Object.values(template);
  /**
   * param:value
   */
  const tupls = new Map();
  let i = 0;

  for (; i < argv.length; ) {
    const value = argv[i].toLowerCase();
    const nextValue = argv[i + 1];
    if (params.some((param) => param === value)) {
      if (!nextValue) {
        throw new CustomError(201, `Need arguments to param`);
      }
      if (nextValue[0] === "-") {
        throw new CustomError(
          201,
          `After param "${value}" can't be "${nextValue}"`
        );
      }
      if (tupls.get(value) !== void 0) {
        throw new CustomError(201, `Dublicate CLI param ${value}`);
      }
      tupls.set(value, nextValue);
      i += 2;
    } else {
      i += 1;
    }
  }
  return tupls;
};
