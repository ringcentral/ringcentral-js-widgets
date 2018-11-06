import { createProcess } from 'marten';
import salesforce from '../salesforce/entry';
import widgets from '../widgets/entry';
import office from '../office/entry';

export default class Entry {
  static async enter(context) {
    if (context.options.isVirtual) {
      context.app = context.page;
      return;
    }
    const entries = {
      office,
      widgets,
      salesforce,
    };
    const Entrance = entries[context.options.tag.project];
    const process = createProcess(
      Entrance,
    )(context);
    await process.exec();
  }

  static get steps() {
    return [
      this.enter,
    ];
  }
}
