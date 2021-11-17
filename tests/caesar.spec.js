import { assert, describe, exec, it } from "jest";
const script = `node ../index.js`;

describe("Проверка работы шифра Цезаря", () => {
  describe("Проверка парсинга cli параметров", () => {
    test("Ошибка если нет параметра action", async () => {
      const myCLI = await exec(script);
      assert.exitCode(myCLI, 1);
    });
  });
});
