import { describe, test } from "@jest/globals";
import { CustomError } from "../../custom-error.js";
import { parseTemplate } from "../cli-parser.js";
import { parseArgv } from "../parse-argv.js";

describe("Проверка парсинга аргументов", () => {
  test("-c A ✔️", async () => {
    const expectMap = new Map();
    expectMap.set("-c", "A");
    expect(parseArgv(["-c", "A"], parseTemplate)).toStrictEqual(expectMap);
  });

  test("-c A-C0 -i ./text.txt ✔️", async () => {
    const expectMap = new Map();
    expectMap.set("-c", "A-C0");
    expectMap.set("-i", "./text.txt");
    expect(
      parseArgv(["-c", "A-C0", "-i", "./text.txt"], parseTemplate)
    ).toStrictEqual(expectMap);
  });

  test("❌", async () => {
    expect(() => parseArgv([], parseTemplate)).toThrow(
      new CustomError(201, `Need params`)
    );
  });

  test("-c ❌", async () => {
    expect(() => parseArgv(["-c"], parseTemplate)).toThrow(
      new CustomError(201, `Need arguments to param`)
    );
  });
  test("-c -i ❌", async () => {
    expect(() => parseArgv(["-c", "-i"], parseTemplate)).toThrow(
      new CustomError(
        201,
        `After param "-" cant't be new param "-" without arguments`
      )
    );
  });
  test("-c A -c A ❌", async () => {
    expect(() => parseArgv(["-c", "A", "-c", "A"], parseTemplate)).toThrow(
      new CustomError(201, `Dublicate CLI param`)
    );
  });
  test("-d -c A ✔️ Ignore unknown options", async () => {
    const expectMap = new Map();
    expectMap.set("-c", "A");

    expect(parseArgv(["-d", "-c", "A"], parseTemplate)).toStrictEqual(
      expectMap
    );
  });
});
