const test = require("ava");
const gulpTaskIf = require("./index.js");

test("foo", t => {
  const input = "my-gulp-task";
  const result = gulpTaskIf(true, [input]);

  

  t.is(result[0], input);
});
