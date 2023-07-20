import { Compiler } from 'webpack';

export class NoChunkChecker {
  private _files: string[];

  constructor(private _options: { files?: string[] } = {}) {
    this._files = this._options.files ?? [];
  }

  apply(compiler: Compiler) {
    compiler.hooks.shouldEmit.tap('NoChunkChecker', (compilation) => {
      let shouldEmit = true;
      compilation.chunks.forEach((chunk) => {
        this._files.forEach((file) => {
          if (
            chunk.name !== file &&
            ((typeof chunk.runtime === 'string' && chunk.runtime === file) ||
              (typeof chunk.runtime === 'object' && chunk.runtime.has(file)))
          ) {
            shouldEmit = false;
            console.error(
              `NoChunkChecker: entry: '${file}' found to load chunk: '${chunk.name}'`,
            );
          }
        });
      });
      if (!shouldEmit) {
        throw new Error('Bad chunks found!!!');
      }
      return shouldEmit;
    });
  }
}
