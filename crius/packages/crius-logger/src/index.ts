import { Plugins, StepType, Step } from 'crius-test';
import * as fs from 'fs';
import * as path from 'path';

interface Log {
  key: string;
  desc: string | undefined | null;
  type: 'builder' | 'step';
  status: 'start' | 'end';
  time: number;
  target: StepType | Step;
}

interface Config {
  path: string;
}

const logger = (
  config?: Config,
): Plugins<{ desc?: string }, { __logger?: Log[] }> => {
  return {
    beforeEach(props, context, step) {
      if (!Array.isArray(context.__logger)) context.__logger = [];
      const key = step.name;
      context.__logger.push({
        key,
        desc: props.desc,
        type: (step as any).__isBuilder ? 'builder' : 'step',
        status: 'start',
        time: Date.now(),
        target: step,
      });
    },
    afterEach(props, context, step) {
      if (!Array.isArray(context.__logger)) context.__logger = [];
      const key = step.name;
      context.__logger.push({
        key,
        desc: props.desc,
        type: (step as any).__isBuilder ? 'builder' : 'step',
        status: 'end',
        time: Date.now(),
        target: step,
      });
      if (
        typeof config !== 'undefined' &&
        config !== null &&
        typeof config.path === 'string' &&
        key === 'Scenario'
      ) {
        const file = path.join(
          process.cwd(),
          config.path,
          `${context.__logger[0].key}.json`,
        );
        try {
          fs.writeFileSync(
            file,
            JSON.stringify(context.__logger, null, 2),
            'ascii',
          );
        } catch (e) {
          console.error(`Log failure in ${file}`);
        }
      }
    },
  };
};

export { logger as default };
