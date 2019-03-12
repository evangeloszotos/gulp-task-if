const gulpTaskIf = require("./index.js");

describe("Accepts", () => {
  it("strings", () => {
    const task1 = "clean";
    const task2 = "build";
    const result = gulpTaskIf(true, task1, task2);

    expect(result[0]).toBe(task1);
    expect(result[1]).toBe(task2);
  });

  it("array", () => {
    const task1 = "clean";
    const tasks = ["build", "copy"];
    const result = gulpTaskIf(true, task1, tasks);

    expect(result[0]).toBe(task1);
    expect(result[1]).toBe(tasks[0]);
    expect(result[2]).toBe(tasks[1]);
  });

  it("functions", () => {
    const inlineTask = function() {};

    const task1 = "clean";
    const tasks = ["build", "copy", inlineTask];
    const result = gulpTaskIf(true, inlineTask, task1, tasks, inlineTask);

    expect(typeof result[0] === "function").toBe(true);
  });

  it("arrow functions", () => {
    const inlineTask = () => {};

    const task1 = "clean";
    const tasks = ["build", "copy", inlineTask];
    const result = gulpTaskIf(true, inlineTask, task1, tasks, inlineTask);

    expect(typeof result[0] === "function").toBe(true);
  });
});

describe("Condition Handling", () => {
  it("false - returns [Function] and calles provided callback", () => {
    let called = false;
    const asyncDone = () => (called = true);

    const emptyTask = gulpTaskIf(false, "task1", "task2")[0];
    emptyTask(asyncDone);
    
    expect(called).toBe(true);
  });
});

describe("Throws", () => {
  it("on with double nested arrays", () => {
    const task1 = "clean";
    const tasks = ["double nested!", ["build", "copy"]];

    expect(() => {
      gulpTaskIf(true, task1, tasks);
    }).toThrow();
  });

  it("on objects", () => {
    const task1 = {};
    const tasks = ["double nested!", ["build", "copy"]];

    expect(() => {
      gulpTaskIf(true, task1, tasks);
    }).toThrow();
  });

  it("on numbers", () => {
    const task1 = 2;
    const tasks = ["double nested!", ["build", "copy"]];

    expect(() => {
      gulpTaskIf(true, task1, tasks);
    }).toThrow();
  });

  it("on null", () => {
    const task1 = null;
    const tasks = ["double nested!", ["build", "copy"]];

    expect(() => {
      gulpTaskIf(true, task1, tasks);
    }).toThrow();
  });

  it("on undefined", () => {
    const task1 = undefined;
    const tasks = ["double nested!", ["build", "copy"]];

    expect(() => {
      gulpTaskIf(true, task1, tasks);
    }).toThrow();
  });
});
