import { generate } from 'marten';

export const createProcess = generate({
  async before({
    step,
    context,
    options,
  }) {
    console.log(`[${new Date().toTimeString().slice(0,8)}]`, step.__steps__.name, step.name);
  },
  async after({
    step,
    context,
    options,
  }) {
    console.log(`[${new Date().toTimeString().slice(0,8)}]`, step.__steps__.name, step.name);
  }
});


export const beforeEachCase = async () => {
  console.log('beforeEachCase');
};

export const afterEachCase = async () => {
  console.log('afterEachCase');
};
