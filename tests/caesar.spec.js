import { describe, test } from "@jest/globals";
const script = `../index.js`;
/*   const spy = jest.spyOn(console, "log");
      expect(spy.mock.calls).toEqual([["Testing..."]]); */

describe("Проверка CLI", () => {
  describe("Проверка парсинга cli параметров", () => {
    test("Ошибка если нет параметра command", async () => {
      jest.spyOn(process, "exit").mockImplementationOnce(() => {
        throw new Error("process.exit() was called.");
      });
      expect(() => {
        require(script);
      }).toThrow("process.exit() was called.");

      expect(process.exit).toHaveBeenCalledWith(101);
    });
  });
});
