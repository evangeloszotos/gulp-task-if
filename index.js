function emptyGulpTask(done) {
  done();
}

function gulpTaskIf(condition, ...tasks) {
  let finalTasks = [];

  tasks.forEach(task => {
    if (Array.isArray(task)) {
      finalTasks = finalTasks.concat(task);
    } else {
      finalTasks.push(task);
    }
  });

  const containsOnlyStringsAndFunctions = finalTasks.every(
    task => typeof task === "string" || typeof task === "function"
  );

  if (!containsOnlyStringsAndFunctions) {
    throw new Error("ArgumentException!, Please provide only");
  }

  const result = condition ? finalTasks : [emptyGulpTask];

  return result;
}

module.exports = gulpTaskIf;
