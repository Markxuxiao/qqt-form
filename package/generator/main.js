import { generator } from "./generator.js";
import patSchema from "./schema/pat.js";
function main() {
  let text = generator(patSchema);
  console.log(text);
}
main();
