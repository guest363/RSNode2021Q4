/* Add new line */
export const addNewLineTransformer = async function* (source) {
  source.setEncoding("utf8");
  for await (const chunk of source) {
    yield chunk;
  }
  yield "\n";
};
