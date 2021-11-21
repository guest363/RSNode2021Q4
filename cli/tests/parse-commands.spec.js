import { describe, test } from "@jest/globals";
import { CustomError } from "../../custom-error.js";
import { parseCommands } from "../parse-commnads.js";

describe("Проверка парсинга аргументов command", () => {
  test("Сommand С1-С0 ✔️", () => {
    expect(parseCommands("C1-C0")).toStrictEqual(["C1", "C0"]);
  });
  test("Сommand A-A1-C0 ❌", () => {
    expect(() => parseCommands("A-A1-C0")).toThrow(new CustomError(302));
  });
  test("Сommand A-F0-C0-C0 ❌", () => {
    expect(() => parseCommands("A-F0-C0-C0")).toThrow(new CustomError(302));
  });
  test("Сommand -A-A-A- ❌", () => {
    expect(() => parseCommands("-A-A-A-")).toThrow(new CustomError(302));
  });
  test("Сommand A-A-A-A-C0-R0-R1-R1-R1 ✔️", () => {
    expect(parseCommands("A-A-A-A-C0-R0-R1-R1-R1")).toStrictEqual([
      "A",
      "A",
      "A",
      "A",
      "C0",
      "R0",
      "R1",
      "R1",
      "R1",
    ]);
  });
});
