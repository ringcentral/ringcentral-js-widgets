import childProcess from 'child_process';

const DEAULT_PROCESS_STDIO = 'inherit';
const DEAULT_PROCESS_OPTIONS = {
  stdio: DEAULT_PROCESS_STDIO,
  cwd: process.cwd()
};
const DEAULT_PROCESS_EXIT = (code, signal) => {
  // TODO: Process exit
};
const DEAULT_PROCESS_CLOSE = (code, signal) => {
  // TODO: Process exit
};

export default function createProcess({
  command,
  args,
  options = DEAULT_PROCESS_OPTIONS,
  exit = DEAULT_PROCESS_EXIT,
  close = DEAULT_PROCESS_CLOSE,
}) {
  const commandProcess = childProcess.spawn(command, args, options);
  commandProcess.on('exit', exit);
  commandProcess.on('close', close);
  return commandProcess;
}
