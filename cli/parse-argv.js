import { errorAction } from "../error-action.js";
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
      if (nextValue[0] === "-") {
        errorAction(`After param "${value}" can't be "${nextValue}"`);
      }
      if (tupls.get(value) !== void 0) {
        errorAction(`Dublicate CLI param ${value}`);
      }
      tupls.set(value, nextValue);
      i += 2;
    } else {
      i += 1;
    }
  }
  return tupls;
};
