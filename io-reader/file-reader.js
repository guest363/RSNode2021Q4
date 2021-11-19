import fs from "fs";
import { CustomError } from "../custom-error.js";

/**
 * Создает поток чтения\записи в файл
 * Если передана не строка, возвращает входной параметр без изменения
 * Сам обрабатывает ошибки в случае отсутствия файла
 * @param {string | stream} o.param - может быть либо путь до файла или поток io
 * @param {'encode' | 'decode'} o.rwType
 */
export const fileReader = ({ param, rwType }) => {
  const errorMessages = {
    ENOENT: `No such ${rwType === "read" ? "input" : "output"} file`,
  };

  if (typeof param === "string") {
    /**
     *  Если файла на запись или чтения нет, но параметр передан
     *  выбросить ошибку и завершить выполнение
     */
    try {
      if (!fs.existsSync(param)) {
        throw new CustomError(401, errorMessages["ENOENT"]);
      }
    } catch (err) {
      throw new CustomError(401, "Error to access file");
    }

    const returndStream =
      rwType === "read"
        ? fs.createReadStream(param, { encoding: "utf-8" })
        : fs.createWriteStream(param, { encoding: "utf-8", flags: "a" });

    returndStream.on("error", (error) => {
      const CustomError = errorMessages[error.code] || error.message;
      throw new CustomError(401, CustomError);
    });

    return returndStream;
  }
  return param;
};
