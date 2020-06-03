import SDK from './agentLibrary';

// Close Logger in development,
SDK.prototype.openConsoleLogger = () => {};

export default SDK;
