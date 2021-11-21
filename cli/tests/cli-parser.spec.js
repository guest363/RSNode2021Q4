import { describe, test, beforeEach } from "@jest/globals";
import { CustomError, errorCodes } from "../../custom-error.js";
import { cliParser } from "../cli-parser";

beforeEach(() => {
  process.argv.length = 2;
});

describe(`Проверка работы функции cliParser.`, () => {
  test("Сommand ['-c', 'A-A'] ✔️", async () => {
    const mockExit = jest
      .spyOn(process, "exit")
      .mockImplementationOnce(() => {});
    const processErrorSpy = jest
      .spyOn(process.stderr, "write")
      .mockImplementationOnce(() => {});

    process.argv.push(...["-c", "A-A"]);
    cliParser(process);

    expect(processErrorSpy).toHaveBeenCalledTimes(0);
    expect(mockExit).toHaveBeenCalledTimes(0);
  });

  test("Если нет никаких аргументов ❌", async () => {
    expect(() => cliParser(process)).toThrow(new CustomError(101));
  });

  test("Если дублируются параметры ❌", async () => {
    process.argv.push(...["-c", "A", "-c", "C0"]);
    expect(() => cliParser(process)).toThrow(
      new CustomError(201, `Dublicate CLI param`)
    );
  });

  test("Если -с нет параметра ❌", async () => {
    process.argv.push(...["-c"]);
    expect(() => cliParser(process)).toThrow(
      new CustomError(201, `Need arguments to param`)
    );
  });

  test("Если -i and -o equal ❌", async () => {
    process.argv.push(...["-c", "A", "-i", "text.txt", "--output", "text.txt"]);
    expect(() => cliParser(process)).toThrow(new CustomError(103));
  });
  
  test("Если нет опции -c ❌", async () => {
    process.argv.push(...["-i", "textI.txt", "--output", "textO.txt"]);
    expect(() => cliParser(process)).toThrow(new CustomError(102));
  });
});
