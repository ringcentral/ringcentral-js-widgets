#!/usr/bin/env node

const { spawnSync } = require('child_process');
const { readFileSync, rmSync } = require('fs');
const { tmpdir } = require('os');
const { join } = require('path');

// Keep this list limited to segments with active tests. The report assertion
// below prevents explicitly skipped suites from becoming a no-op CI gate.
const segments = [
  {
    name: 'common-widgets-ha',
    pattern: 'test/features/CommonWidgets/Ha/.*\\.(test|spec)\\.tsx',
  },
  {
    name: 'common-widgets-messages',
    pattern: 'test/features/CommonWidgets/Messages/.*\\.(test|spec)\\.tsx',
  },
  {
    name: 'common-widgets-settings',
    pattern: 'test/features/CommonWidgets/Settings/.*\\.(test|spec)\\.tsx',
  },
  {
    name: 'common-widgets-call',
    pattern: 'test/features/CommonWidgets/Call/.*\\.(test|spec)\\.tsx',
  },
  {
    name: 'common-widgets-small',
    pattern:
      'test/features/CommonWidgets/(Common|LogInLogOut|Contacts|History|Meeting|Others|WebPhoneRegistration|MakeCallWith|Auth|SmartDialPlan)/.*\\.(test|spec)\\.tsx',
  },
  {
    name: 'common-widgets-cross-module',
    pattern: 'test/features/CommonWidgets/CrossModule/.*\\.(test|spec)\\.tsx',
  },
  {
    name: 'crm-common',
    pattern: 'test/features/CrmCommon/.*\\.(test|spec)\\.tsx',
  },
  {
    name: 'misc-top-level',
    pattern:
      'test/features/(AuthCode|CallMonitorBar|CallingSettings|Commons|ContactList|DialPad|Messages|NumberValidate|OutlookScheduler|PresenceSettingSection|RegionSettings\\.|Salesforce|Toasts|Transfer|WebPhone|renderViewPanel|virtuoso|Exploratory).*\\.(test|spec)\\.tsx',
  },
];

const requestedSegments = (process.env.REACT18_TEST_SEGMENTS || '')
  .split(',')
  .map((segment) => segment.trim())
  .filter(Boolean);

const availableSegmentNames = new Set(segments.map(({ name }) => name));
const invalidRequestedSegments = requestedSegments.filter(
  (segment) => !availableSegmentNames.has(segment),
);

if (invalidRequestedSegments.length > 0) {
  console.error(
    `Unknown React 18 test segments: ${invalidRequestedSegments.join(', ')}`,
  );
  console.error(
    `Available segments: ${segments.map(({ name }) => name).join(', ')}`,
  );
  process.exit(1);
}

const selectedSegments =
  requestedSegments.length === 0
    ? segments
    : segments.filter((segment) => requestedSegments.includes(segment.name));

if (selectedSegments.length === 0) {
  console.error(
    `No matching segments for REACT18_TEST_SEGMENTS=${process.env.REACT18_TEST_SEGMENTS}`,
  );
  console.error(
    `Available segments: ${segments.map(({ name }) => name).join(', ')}`,
  );
  process.exit(1);
}

const nodeOptions = process.env.NODE_OPTIONS || '';
const heapOption = '--max-old-space-size=12288';
const env = {
  ...process.env,
  NODE_OPTIONS: nodeOptions.includes('--max-old-space-size')
    ? nodeOptions
    : `${nodeOptions} ${heapOption}`.trim(),
};

for (const { name, pattern } of selectedSegments) {
  console.log(`\n[react18-segmented] Running ${name}`);
  const reportPath = join(
    tmpdir(),
    `react18-app-demo-test-${process.pid}-${name}.json`,
  );
  rmSync(reportPath, { force: true });
  const result = spawnSync(
    'yarn',
    [
      'test',
      `--testPathPatterns=${pattern}`,
      // Memory grows across suites; restart workers instead of running in band,
      // which runs out of heap on the larger segments.
      `--maxWorkers=${process.env.REACT18_TEST_MAX_WORKERS || 2}`,
      '--workerIdleMemoryLimit=1GB',
      '--silent',
      '--json',
      `--outputFile=${reportPath}`,
      // extra Jest flags, e.g. --updateSnapshot in CI
      ...process.argv.slice(2),
    ],
    {
      env,
      stdio: 'inherit',
    },
  );

  if (result.error) {
    rmSync(reportPath, { force: true });
    console.error(result.error);
    process.exit(1);
  }

  if (result.status !== 0) {
    rmSync(reportPath, { force: true });
    process.exit(result.status || 1);
  }

  let report;
  try {
    report = JSON.parse(readFileSync(reportPath, 'utf8'));
  } catch (error) {
    console.error(
      `[react18-segmented] Unable to read Jest report for ${name}:`,
      error,
    );
    process.exit(1);
  } finally {
    rmSync(reportPath, { force: true });
  }

  if (report.numPassedTests === 0) {
    console.error(
      `[react18-segmented] ${name} did not execute any passing tests`,
    );
    process.exit(1);
  }
}
