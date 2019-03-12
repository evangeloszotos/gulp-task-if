function emptyGulpTask(done) {
  done();
}

function gulpTaskIf(condition, ...tasks) {
  return condition ? tasks : [emptyGulpTask];
}

module.exports = gulpTaskIf;