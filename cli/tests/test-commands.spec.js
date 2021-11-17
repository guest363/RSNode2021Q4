import { describe, test } from "@jest/globals";
import { CustomError } from "../../custom-error.js";
import { testCommands } from "../test-commands.js";

describe("Проверка парсинга аргументов command", () => {
  test("C1 ✔️", async () => {
    expect(() => testCommands("C1")).not.toThrow();
  });
  test("C2 ❌", async () => {
    expect(() => testCommands("C2")).toThrow(new CustomError(303));
  });
});
