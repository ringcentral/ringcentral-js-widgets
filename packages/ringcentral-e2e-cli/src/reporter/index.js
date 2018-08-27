const reporter = {
  specDone(result) {
    if (result.status === 'failed') {
      // TODO: handle failed for Test Reporter
    }
    // console.log('specDone');
  },
};

jasmine.getEnv().addReporter(reporter);
