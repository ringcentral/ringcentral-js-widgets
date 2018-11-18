import { generate } from 'marten';

export const createProcess = generate({
  async before({
    step,
    context,
    options,
  }) {
    console.log(step.name);
  },
  async after({
    step,
    context,
    options,
  }) {
    console.log(step.name);
  }
});


export const beforeEachCase = async () => {
  console.log('beforeEachCase');
};

export const afterEachCase = async () => {
  console.log('afterEachCase');
};
