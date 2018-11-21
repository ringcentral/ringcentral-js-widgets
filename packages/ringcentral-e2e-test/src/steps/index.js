import { generate } from 'marten';

const getNowTime = () => new Date().toTimeString().slice(0,8);

export const createProcess = generate({
  async before({
    step,
    context,
    options,
  }) {
    console.log(`[${getNowTime()}]`, step.__steps__.name, step.name);
  },
  async after({
    step,
    context,
    options,
  }) {
    console.log(`[${getNowTime()}]`, step.__steps__.name, step.name);
  }
});


export const beforeEachCase = async () => {
  console.log(`[${getNowTime()}]`, 'beforeEachCase');
};

export const afterEachCase = async () => {
  console.log(`[${getNowTime()}]`, 'afterEachCase');
};
