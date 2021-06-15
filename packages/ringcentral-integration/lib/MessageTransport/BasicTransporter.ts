export default abstract class BasicTransporter {
  abstract addReceiver(args: any): any;

  abstract createEmitter(args: any): any;
}
