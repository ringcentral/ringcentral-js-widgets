function getChildExitCode(error) {
  return Number.isInteger(error?.exitCode) && error.exitCode > 0
    ? error.exitCode
    : 1;
}

function exitWithChildResult(commandPromise, exit = process.exit) {
  return commandPromise.then(
    () => exit(0),
    (error) => exit(getChildExitCode(error)),
  );
}

exports.exitWithChildResult = exitWithChildResult;
exports.getChildExitCode = getChildExitCode;
