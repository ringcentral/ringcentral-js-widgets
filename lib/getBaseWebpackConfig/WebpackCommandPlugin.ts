import execa from 'execa';
import { Compiler } from 'webpack';

interface PluginOptions {
  /**
   * exec command
   */
  command: string;
}

export class WebpackCommandPlugin {
  /**
   * exec command
   */
  private command: string;

  private isRunning = false;

  constructor({ command }: PluginOptions) {
    this.command = command;
  }

  apply(compiler: Compiler) {
    compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
      if (this.isRunning) return;
      execa.command(this.command, {
        stdio: 'inherit',
      });
      this.isRunning = true;
    });
  }
}
