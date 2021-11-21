import { describe, test, beforeEach } from "@jest/globals";
import { CustomError, errorCodes } from "../../custom-error.js";
import { cliParser } from "../cli-parser";

beforeEach(() => {
  process.argv.length = 2;
});

describe(`Проверка работы функции cliParser. 
Мокаем process.stderr и process.exit`, () => {
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
    const mockExit = jest
      .spyOn(process, "exit")
      .mockImplementationOnce((error) => error);

    expect(() => cliParser(process)).toThrow(new CustomError(101));

    expect(mockExit).toHaveBeenCalledWith(101);
  });
});
