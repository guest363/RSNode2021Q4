import { describe, test } from "@jest/globals";
import { fileReader } from "../file-reader.js";
import { CustomError } from "../../custom-error.js";
jest.mock("fs");

describe("Проверка чтения файла, мокаем fs", () => {
  test("Файла не существует ❌", () => {
    expect(() => fileReader({ param: "./test.txt", rwType: "r" })).toThrow(
      new CustomError(401, "Error to access file")
    );
  });

  test("Возвращаем process.stdin ✔️", () => {
    expect(() =>
      fileReader({ param: process.stdin, rwType: "r" })
    ).not.toThrow();
  });

  test("Папка не существует ❌", () => {
    expect(() => fileReader({ param: "./test/test.txt", rwType: "r" })).toThrow(
      new CustomError(401, "Error to access file")
    );
  });
});
